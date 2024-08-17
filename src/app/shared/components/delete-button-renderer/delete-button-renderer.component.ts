import { Component } from '@angular/core'
import { ICellRendererParams } from 'ag-grid-community'

@Component({
  selector: 'app-delete-button-renderer',
  template: `<button (click)="onDelete()">Delete</button>`,
})
export class DeleteButtonRendererComponent {
  params?: ICellRendererParams // Optional chaining for params

  agInit(params: ICellRendererParams): void {
    this.params = params
  }

  onDelete() {
    if (this.params?.api && this.params?.data) {
      this.params.api.applyTransaction({ remove: [this.params.data] })
    }
  }
}
