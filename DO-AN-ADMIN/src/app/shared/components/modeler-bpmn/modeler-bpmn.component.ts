import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-modeler-bpmn',
  templateUrl: './modeler-bpmn.component.html',
  styleUrls: ['./modeler-bpmn.component.scss']
})
export class ModelerBpmnComponent implements OnInit {
  title = 'Bpmn';
  diagramUrl = '../../../../assets/Xulytranhchapdatdai.bpmn20.xml';
  importError?: Error;
  constructor() { }

  ngOnInit(): void {
  }

  handleImported(event) {

    const {type, error, warnings } = event;

    if (type === 'success') {
      console.log(`Rendered diagram (%s warnings)`, warnings.length);
    }

    if (type === 'error') {
      console.error('Failed to render diagram', error);
    }

    this.importError = error;
  }
}
