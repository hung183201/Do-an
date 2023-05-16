import { Component } from '@angular/core';

import { FieldBaseComponent } from '../field-base';

@Component({
    selector: 'app-form-editor',
    styleUrls: ['form-editor.component.scss'],
    templateUrl: 'form-editor.component.html'
})
export class FormEditorComponent extends FieldBaseComponent {
    //events starts
    // modules = {
    //     // toolbar: {
    //     //     container: [
    //     //         ['bold', 'italic', 'underline'],        // toggled buttons
    //     //         ['link', 'image', 'video'],           // link and image, video
    //     //     ],  // Selector for toolbar container
    //     // },
    //     blotFormatter: {
    //         // empty object for default behaviour.
    //     }

    // };
    content = 'abc';
    modules = {
      'toolbar': [
          ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
          ['blockquote'],
          [{ 'list': 'ordered' }, { 'list': 'bullet' }],
          [{ 'indent': '-1' }, { 'indent': '+1' }],          // outdent/indent
          [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
          [{ 'align': [] }],
          ['clean'],                                         // remove formatting button
          ['link'],                         // link and image, video
        ]
    };
    setFocus($event) {
        $event.focus();
    }

}
