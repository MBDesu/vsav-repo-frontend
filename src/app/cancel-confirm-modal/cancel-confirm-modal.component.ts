import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

/**
 * A general purpose modal with a cancel and confirm button.
 * Defaults to a generic confirmation prompt.
 *
 * @author Jordyn Tucker
 */
@Component({
  selector: 'app-cancel-confirm-modal',
  templateUrl: './cancel-confirm-modal.component.html',
  styleUrls: ['./cancel-confirm-modal.component.scss']
})
export class CancelConfirmModalComponent {

  title: string;
  description: string;
  confirmText: string;
  cancelText: string;

  constructor(
    public dialogRef: MatDialogRef<CancelConfirmModalComponent>,
    @Inject(MAT_DIALOG_DATA) data: any
  ) {
    ({
      title: this.title = 'Confirmation',
      description: this.description = 'Are you sure?',
      confirmText: this.confirmText = 'Yes',
      cancelText: this.cancelText = 'No'
    } = data);
  }

}
