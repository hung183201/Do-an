import { Component } from '@angular/core';
import { ModalStateService } from '../../services/modal-state.service';
import { ModalOptions } from '../../models/modal';

/**
 * The component displayed in the confirmation modal opened by the ModalService.
 */
@Component({
  selector: 'app-modal-component',
  styleUrls: ['modal.component.scss'],
  templateUrl: './modal.component.html',
})
export class ModalComponent {
  options: ModalOptions;

  constructor(private state: ModalStateService) {
    this.options = state.options;
  }

  yes() {
    this.state.modal.close('confirmed');
  }

  no() {
    this.state.modal.dismiss('not confirmed');
  }
}
