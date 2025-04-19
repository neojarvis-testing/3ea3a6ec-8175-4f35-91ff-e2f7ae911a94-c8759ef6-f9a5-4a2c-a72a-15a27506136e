import { Component } from '@angular/core';
import { ICellRendererParams } from 'ag-grid-community';

@Component({
  selector: 'app-delete-button-renderer',
  template: `
    <button class="btn btn-danger" (click)="onDelete()">Delete</button>
  `,
  styleUrls: ['./delete-button-renderer.component.css']
})
export class DeleteButtonRendererComponent {
  private params: any;

  /**
   * Initialize the cell renderer with params passed by AG Grid
   */
  agInit(params: ICellRendererParams): void {
    this.params = params;
  }

  /**
   * Handles the delete action when the button is clicked
   */
  onDelete(): void {
    if (this.params && this.params.context && this.params.context.componentParent) {
      this.params.context.componentParent.confirmDelete(this.params.data);
    }
  }
}