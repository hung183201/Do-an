import {
  AfterContentInit,
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map, switchMap } from 'rxjs/operators';
import { from, Observable, Subscription } from 'rxjs';
import { saveAs } from 'file-saver';
import * as BpmnJS from 'bpmn-js/dist/bpmn-navigated-viewer.production.min.js';
import { is } from 'bpmn-js/lib/util/ModelUtil';
import { ToastrService } from 'ngx-toastr';
import { ta } from 'date-fns/locale';

@Component({
  selector: 'app-bpmn',
  templateUrl: './bpmn.component.html',
  styleUrls: ['./bpmn.component.scss'],
  // encapsulation: ViewEncapsulation.Native
})
export class BpmnComponent
  implements AfterContentInit, OnDestroy, OnInit, AfterViewInit, OnChanges {
  private bpmnJS: BpmnJS;
  listStep: string[] = [];
  assigneeTasks = [];
  @ViewChild('ref', { static: true }) private el: ElementRef;
  @Output() private importDone: EventEmitter<any> = new EventEmitter();
  @Output() private elementClick: EventEmitter<any> = new EventEmitter();
  @Input() url: string;
  @Input() xml: string;
  @Input() dsBuocXuLy: Array<any>;
  listOverlayBuocXuLy = [];

  constructor(private http: HttpClient, private toastr: ToastrService) {
    this.bpmnJS = new BpmnJS();
    this.bpmnJS.on('import.done', ({ error }) => {
      if (!error) {
        this.bpmnJS.get('canvas').zoom('fit-viewport');
      }
    });
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (this.xml !== undefined && this.xml !== null && this.dsBuocXuLy !== null) {
      this.import(this.xml, this.dsBuocXuLy)
    }
  }

  ngOnInit(): void {
  }

  ngAfterContentInit(): void {
    this.bpmnJS.attachTo(this.el.nativeElement);
  }

  ngAfterViewInit(): void {
    this.bpmnJS.on('element.click', (event) => this.nodeClick(event.element));
    this.bpmnJS.on('element.hover', (event) => this.nodeHover(event.element));
    this.bpmnJS.on('element.out', (event) => this.nodeOut(event.element));
  }

  ngOnDestroy(): void {
    this.bpmnJS.destroy();
  }

  loadUrl(url: string): Subscription {

    return (
      this.http.get(url, { responseType: 'text' }).pipe(
        switchMap((xml: string) => this.importDiagram$(xml)),
        map(result => result.warnings),
      ).subscribe(
        (warnings) => {
          this.importDone.emit({
            type: 'success',
            warnings
          });
        },
        (err) => {
          this.importDone.emit({
            type: 'error',
            error: err
          });
        }
      )
    );
  }

  private importDiagram$(xml: string): Observable<{ warnings: Array<any> }> {
    return from(this.bpmnJS.importXML(xml) as Promise<{ warnings: Array<any> }>);
  }

  public async importDiagram(xml: string, listTask: Array<string> = null, assigneeTasks: Array<any> = null) {
    try {
      if (xml !== '') {
        this.listStep = listTask;
        await this.bpmnJS.importXML(xml);
        const canvas = this.bpmnJS.get('canvas');
        if (listTask !== null) {
          for (const taskDefinitionKey of listTask) {
            canvas.addMarker(taskDefinitionKey, 'highlight');
          }
        }
        if (assigneeTasks !== null) {
          this.assigneeTasks = assigneeTasks;
          const overlays = this.bpmnJS.get('overlays');
          overlays.clear();
          const elementRegistry = this.bpmnJS.get('elementRegistry');
          for (const task of assigneeTasks) {
            const node = elementRegistry.get(task.taskId);
            if (node !== undefined && node.businessObject !== undefined) {
              const nodeType = node.businessObject.$type as string;
              if (nodeType !== null && nodeType.includes('Task')) {
                const thoiGianThucHienSoNgay = task.thoiGianThucHien > 0 ? task.thoiGianThucHien + ' Ngày ' : '';
                const thoiGianThucHienSoGio = task.thoiGianThucHienTime > 0 ? task.thoiGianThucHienTime + ' Giờ' : '';
                const thoiGianThucHien = (task.thoiGianThucHien > 0 || task.thoiGianThucHienTime > 0) ? `Thời gian xử lý: ${thoiGianThucHienSoNgay} ${thoiGianThucHienSoGio}` : '';
                overlays.add(node.businessObject.id as string, {
                  position: {
                    top: (thoiGianThucHien ? -40 : -25),
                    left: -50
                  },
                  html: `<p style="opacity: 0.5; display: block; min-width: 200px; text-align: center;
                  box-shadow: -8px 8px 14px 0 rgb(25 42 70 / 11%);"
                  >${task.userName}<br>${thoiGianThucHien}</p>`
                });
              }
            }
          }
        }
      }
      return 1;
    } catch {
      this.toastr.warning('Kiểm tra lại định dạng file cập nhật phải theo chuẩn bpmn!', 'Có lỗi khi thực hiện xử lý');
      return -1;
    }
  }

  private async import(xml: string, tasks: Array<any> = null) {
    try {
      if (xml !== '') {
        await this.bpmnJS.importXML(xml);
        const canvas = this.bpmnJS.get('canvas');
        if (tasks !== null) {
          // console.log('import tasks : ' + JSON.stringify(tasks));
          for (const task of tasks) {
            if (task.id && task.hienTai === 1) {
              canvas.addMarker(task.maBuoc, 'highlight');
            };
            if (task.id && task.hienTai === 0) {
              canvas.addMarker(task.maBuoc, 'highlightBlue');
            }
          }
        }
      }
      return 1;
    } catch {
      this.toastr.warning('Kiểm tra lại định dạng file cập nhật phải theo chuẩn bpmn!', 'Có lỗi khi thực hiện xử lý');
      return -1;
    }
  }

  nodeClick(node) {
    this.elementClick.emit({
      node: node,
    });
  }

  nodeHover(node) {
    // console.log('Hover: ' + node.id);
    const overlays = this.bpmnJS.get('overlays');
    if (node.businessObject !== undefined) {
      const nodeType = node.businessObject.$type as string;
      if (nodeType !== null && nodeType.includes('Task')) {
        if (this.listStep !== undefined && this.listStep !== null) {
          if (this.listStep.includes(node.businessObject.id)) {
            overlays.add(node.businessObject.id as string, {
              position: {
                top: -30,
                left: -55
              },
              html: '<p style="pointer-events: none; color: red; display: inline-block; width:250px;">Bước chưa cấu hình phân công</p>'
            });
          };
        };
        if (this.dsBuocXuLy !== undefined && this.dsBuocXuLy !== null) {
          const task = this.dsBuocXuLy.find(t => t.maBuoc === node.businessObject.id)
          if (task !== undefined && task !== null) {
            const color = task.hienTai === 1 ? 'red' : 'blue';
            const thoiGianThucHien = task.thoiGianThucHien >= 0 ? 'Thời gian thực hiện: <strong>'
                    + (task.id ? this.formatSizeUnits(task.thoiGianThucHien) : 'Chưa đến bước này')  + '</strong><br>' : '';
            const thoiGianThucHienDuKien = task.thoiGianDuKien >= 0 ? 'Thời gian dự kiên: <strong>'
                    + this.formatSizeUnits(task.thoiGianDuKien) + '</strong><br>' : '';
            const $overlayHtml =
              `<div style="pointer-events: none;  border-radius: 10px; border: solid whitesmoke; background-color:whitesmoke;">
                          <p style="text-align: center; width:300px; margin: 0;">
                            <strong>${task.tenNguoiXuLy}</strong><br>
                            <span>${thoiGianThucHien}</span>
                            <span>${thoiGianThucHienDuKien}</span>
                          </p>
              </div>`;
            const overlayId = overlays.add(node.businessObject.id as string, {
              position: {
                top: -75,
                left: -100
              },
              html: $overlayHtml
            });
            this.listOverlayBuocXuLy.push({ id: task.maBuoc, overlayId: overlayId });
          }
        }
      } else {
          for (const i of this.listOverlayBuocXuLy) {
            overlays.remove(i.overlayId)
          }
      }
    }
  }

  nodeOut(node) {
    // console.log('Out: ' + node.id);
    const overlays = this.bpmnJS.get('overlays');
    if (node.businessObject !== undefined) {
      const nodeType = node.businessObject.$type as string;
      if (nodeType.includes('Task')) {
        if (this.listStep && this.listStep.filter(a => a === node.businessObject.id).length > 0) {
          overlays.remove({ element: node.businessObject.id })
        }
      }
    }
  }

  zoomIn() {
    this.bpmnJS.get('zoomScroll').stepZoom(1);
  }

  zoomOut() {
    this.bpmnJS.get('zoomScroll').stepZoom(-1);
  }

  resetZoom() {
    this.bpmnJS.get('zoomScroll').reset();
  }

  saveXml() {
    this.bpmnJS.saveXML().then((x) => {
      const elementRegistry = this.bpmnJS.get('elementRegistry');
      let element = elementRegistry.filter(function (element) {
        return is(element, 'bpmn:Process');
      })[0];
      const blob = new Blob([x.xml], { type: 'text/xml;charset=utf-8' });
      const fileName = element ? element.businessObject.id + '.bpmn' : 'diagram.bpmn'
      saveAs(blob, fileName);
    });
  }

  formatSizeUnits(minutes) {
    let ngay, gio, phut;
    if (minutes >= 480) {
      ngay = Math.floor(minutes / 480);
      gio = Math.floor((minutes % 480) / 60);
      phut = minutes - ngay * 480 - gio * 60;
      return ngay + ' Ngày ' + (gio > 0 ? gio + ' Giờ ' : '') + (phut > 0 ? phut + ' Phút' : '');
    } else if (minutes >= 60) {
      gio = Math.floor(minutes / 60);
      phut = minutes % 60;
      return gio + ' Giờ ' + (phut > 0 ? phut + ' Phút' : '');
    } else if (minutes >= 1) {
      return  minutes + ' Phút';
    } else {
      minutes = '0';
    }
    return minutes;
  }

  savePNG() {
    const elementRegistry = this.bpmnJS.get('elementRegistry');
    let element = elementRegistry.filter(function (element) {
      return is(element, 'bpmn:Process');
    })[0];
    this.bpmnJS.saveSVG(function (err, svg) {
      if (err) {
        return;
      }
      try {
        let domUrl = URL || webkitURL;
        if (!domUrl) {
          throw new Error("(browser doesnt support this)")
        }
        let match = svg.match(/height=\"(\d+)/m);
        let height = match && match[1] ? parseInt(match[1], 10) : 200;
        match = svg.match(/width=\"(\d+)/m);
        let width = match && match[1] ? parseInt(match[1], 10) : 200;
        let margin = 50; // set margin
        let fill = '#ffffff'; // set fill color
        if (!svg.match(/xmlns=\"/mi)) {
          svg = svg.replace('<svg ', '<svg xmlns="http://www.w3.org/2000/svg" ');
        }

        let canvas = document.createElement("canvas");
        canvas.width = width + margin * 2;
        canvas.height = height + margin * 2;
        let ctx = canvas.getContext("2d");
        let blob = new Blob([svg], {
          type: "image/svg+xml;charset=utf-8"
        });

        let url = domUrl.createObjectURL(blob);
        let img = new Image;
        img.onload = function () {
          ctx.drawImage(img, margin, margin);
          if (fill) {
            let styled = document.createElement("canvas");
            styled.width = canvas.width;
            styled.height = canvas.height;
            let styledCtx = styled.getContext("2d");
            styledCtx.save();
            styledCtx.fillStyle = fill;
            styledCtx.fillRect(0, 0, canvas.width, canvas.height);
            styledCtx.strokeRect(0, 0, canvas.width, canvas.height);
            styledCtx.restore();
            styledCtx.drawImage(canvas, 0, 0);
            canvas = styled;
          }
          domUrl.revokeObjectURL(url);

          let fileName = element ? element.businessObject.id + '.png' : 'diagram.png'
          let downloadLink = document.createElement('a');
          downloadLink.download = fileName;
          downloadLink.innerHTML = 'Get BPMN PNG';
          downloadLink.href = canvas.toDataURL();
          downloadLink.style.visibility = 'hidden';
          document.body.appendChild(downloadLink);
          downloadLink.click();
        };
        img.src = url;
      } catch (err) {
        console.log(err);
      }
    });
  }

}
