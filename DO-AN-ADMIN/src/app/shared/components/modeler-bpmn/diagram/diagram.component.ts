import {
  AfterContentInit,
  Component,
  ElementRef,
  Input,
  OnChanges,
  OnDestroy,
  Output,
  ViewChild,
  SimpleChanges,
  EventEmitter,
  AfterViewInit,
  OnInit,
} from '@angular/core';
import { saveAs } from 'file-saver';
import Modeler from 'bpmn-js/lib/Modeler.js';
import propertiesPanelModule from 'bpmn-js-properties-panel';
import propertiesProviderModule from '../bpmn-js-properties-panel/lib/provider/camunda';
import camundaModdleDescriptor from 'camunda-bpmn-moddle/resources/camunda.json';
import { HttpClient } from '@angular/common/http';
import { map, switchMap } from 'rxjs/operators';
import * as BpmnJS from 'bpmn-js/dist/bpmn-modeler.development.js';
import customTranslate from '../customTranslate/customTranslate';
import { from, Observable, Subscription } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import * as _ from 'lodash';

@Component({
  selector: 'app-diagram',
  templateUrl: 'diagram.component.html',
  styleUrls: ['diagram.component.scss'],
})
export class DiagramComponent
  implements OnInit, AfterContentInit, OnChanges, OnDestroy, AfterViewInit {
  private bpmnJS: BpmnJS;
  private currentId: string;
  private elementRegistry: any;
  private overlays;
  modeler: Modeler;
  fileString: any = '';

  @ViewChild('ref', { static: true }) private el: ElementRef;
  @Output() private importDone: EventEmitter<any> = new EventEmitter();
  @Output() private elementClick: EventEmitter<any> = new EventEmitter();
  @Output() private taskElements: EventEmitter<any> = new EventEmitter();
  @Input() private url: string;

  constructor(private http: HttpClient, private toastr: ToastrService) {}
  ngOnInit(): void {
    const customTranslateModule = {
      translate: ['value', customTranslate],
    };

    this.modeler = new Modeler({
      keyboard: { bindTo: document },
      container: '#canvas',
      width: '100%',
      height: '600px',
      propertiesPanel: {
        parent: '#properties',
      },
      additionalModules: [
        propertiesPanelModule,
        propertiesProviderModule,
        customTranslateModule,
      ],
      moddleExtensions: {
        camunda: camundaModdleDescriptor,
      },
    });
    this.load();
  }
  ngAfterViewInit(): void {
    this.modeler.on('element.click', (event) => this.nodeClick(event.element));
  }

  ngAfterContentInit(): void {
    // this.modeler.attachTo(this.el.nativeElement);
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.url) {
      this.loadUrl(changes.url.currentValue);
    }
  }

  ngOnDestroy(): void {
    this.modeler.destroy();
  }

  loadUrl(url: string): Subscription {
    return this.http
      .get(url, { responseType: 'text' })
      .pipe(
        switchMap((xml: string) => this.importDiagram(xml)),
        map((result) => result.warnings)
      )
      .subscribe(
        (warnings) => {
          this.importDone.emit({
            type: 'success',
            warnings,
          });
        },
        (err) => {
          this.importDone.emit({
            type: 'error',
            error: err,
          });
        }
      );
  }

  private importDiagram(xml: string): Observable<{ warnings: Array<any> }> {
    return from(
      this.modeler.importXML(xml) as Promise<{ warnings: Array<any> }>
    );
  }

  saveXml() {
    this.modeler.saveXML().then((x) => {
      const blob = new Blob([x.xml], { type: 'text/xml;charset=utf-8' });
      saveAs(blob, 'diagram.bpmn');
    });
  }

  zoomIn() {
    this.modeler.get('zoomScroll').stepZoom(1);
  }

  zoomOut() {
    this.modeler.get('zoomScroll').stepZoom(-1);
  }

  resetZoom() {
    this.modeler.get('zoomScroll').reset();
  }

  nodeClick(node) {
    this.currentId = node.id;
    this.elementClick.emit({
      node: node,
    });
  }

  load(): void {
    this.getInitNewDiagram().subscribe((data) => {
      this.modeler.importXML(data, (value) => this.handleError(value));
    });
  }

  handleError(err: any) {
    if (err) {
      console.warn('Ups, error: ', err);
    }
  }

  public getInitNewDiagram(): Observable<string> {
    const url = '/assets/bpmn/diagram.bpmn';
    return this.http.get(url, { responseType: 'text' });
  }

  async fileProgress(fileInput) {
    if (fileInput.target.files && fileInput.target.files[0]) {
      for (let i = 0; i < fileInput.target.files.length; i++) {
        const max_size = 209715200;
        const allowed_types = ['', 'text/xml'];
        const max_height = 15200;
        const max_width = 25600;

        if (fileInput.target.files[i].size > max_size) {
          this.toastr.warning(
            'Dung lượng cho phép tối đa ' + max_size / 1000 + 'Mb'
          );
          return false;
        }

        if (!_.includes(allowed_types, fileInput.target.files[i].type)) {
          this.toastr.warning(
            'Chỉ chấp nhận những file có định dạng sau: (BPMN | XML )'
          );
          return false;
        }

        const fileReader = new FileReader();
        fileReader.onloadend = (e) => {
          this.fileString = fileReader.result;
          this.modeler.importXML(this.fileString, (value) =>
            this.handleError(value)
          );
        };
        fileReader.readAsText(fileInput.target.files[i]);
      }
    }
  }
}
