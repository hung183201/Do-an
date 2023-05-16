import { Component, AfterViewInit, ViewChild, ViewContainerRef } from '@angular/core';
import { FieldBaseComponent } from '../field-base';

@Component({
    selector: 'app-form-template',
    styleUrls: ['form-template.component.scss'],
    queries: {
		contentRef: new ViewChild( "contentRef" )
	},
    templateUrl: 'form-template.component.html'
})
export class FormTemplateComponent extends FieldBaseComponent implements  AfterViewInit {
    @ViewChild('viewContainer') viewContainerRef: ViewContainerRef;
    ngAfterViewInit(): void {
        // this.viewContainerRef.createEmbeddedView(this.config.templateReference);
		// var embeddedViewRef = this.viewContainerRef.createEmbeddedView( this.config.templateReference );
		// embeddedViewRef.detectChanges();
    }
}
