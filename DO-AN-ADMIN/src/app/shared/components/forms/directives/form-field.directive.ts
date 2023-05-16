import { ComponentFactoryResolver, ComponentRef, Directive, Input, OnChanges, OnInit, Type, ViewContainerRef } from '@angular/core';

import {
    FormButtonComponent,
    FormInputComponent,
    FormFileComponent,
    FormEditorComponent,
    FormDateComponent,
    FormTimeComponent,
    FormSelectComponent,
    FormCheckboxComponent,
    FormCheckboxListComponent,
    FormTextareaComponent,
    FormRadioListComponent,
    FormTemplateComponent
} from '../components';

import { Field, IFieldConfig } from '@app/shared/models/commonModels';

const components: { [type: string]: Type<Field> } = {
    button: FormButtonComponent,
    input: FormInputComponent,
    number: FormInputComponent,
    file: FormFileComponent,
    editor: FormEditorComponent,
    password: FormInputComponent,
    email: FormInputComponent,
    date: FormDateComponent,
    time: FormTimeComponent,
    textarea: FormTextareaComponent,
    checkbox: FormCheckboxComponent,
    checkboxlist: FormCheckboxListComponent,
    radiolist: FormRadioListComponent,
    select: FormSelectComponent,
    template: FormTemplateComponent
};

@Directive({
    selector: '[appFormField]'
})
export class FormFieldDirective implements Field, OnChanges, OnInit {
    @Input() config: IFieldConfig;
    component: ComponentRef<Field>;

    constructor(
        private resolver: ComponentFactoryResolver,
        private container: ViewContainerRef
    ) { }

    ngOnChanges() {
        if (this.component) {
            this.component.instance.config = this.config;
        }
    }

    ngOnInit() {
        if (!components[this.config.type]) {
            const supportedTypes = Object.keys(components).join(', ');
            throw new Error(`Trying to use an unsupported type (${this.config.type}). Supported types: ${supportedTypes}`);
        }
        const component = this.resolver.resolveComponentFactory<Field>(components[this.config.type]);
        this.component = this.container.createComponent(component);
        this.component.instance.config = this.config;
    }
}
