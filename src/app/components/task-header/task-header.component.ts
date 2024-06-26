import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-task-header',
  templateUrl: './task-header.component.html',
  styleUrls: ['./task-header.component.scss']
})
export class TaskHeaderComponent {
  @Input() title?: string;

  @Input() subTitle?: any;

  @Output() action = new EventEmitter<KeyboardEvent | MouseEvent>();
  
  @Output() back = new EventEmitter<KeyboardEvent | MouseEvent>();

  onClick(): void {
    if (this.action.observed) this.action.emit();
    if (this.back.observed) this.back.emit();
  }
}
