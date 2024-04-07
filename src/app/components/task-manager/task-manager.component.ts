import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/internal/Observable';

import { ITask } from '../../interfaces/task.interface';
import { TaskManagerService } from '../../services/task-manager.service';

@Component({
  selector: 'app-task-manager',
  templateUrl: './task-manager.component.html',
  styleUrls: ['./task-manager.component.scss']
})
export class TaskManagerComponent  implements OnInit {
  tasks$ = new Observable<ITask[]>();
  
  private router = inject(Router);
  private taskManagerService = inject(TaskManagerService);

  ngOnInit(): void {
    this.getAllTasks();
  }

  /**
   * 
   */
  addTask(): void {
    this.router.navigateByUrl(`tasks/new`);
  }

  /**
   * 
   * @param id 
   */
  deleteTask(id: string): void {
    this.taskManagerService.deleteTask(id);
  }

  /**
   * 
   * @param id 
   */
  editTask(id?: string): void {
    this.router.navigateByUrl(`tasks/${id}`);
  }

  /**
   * 
   */
  getAllTasks(): void {
    this.tasks$ = this.taskManagerService.getAllTasks();
  }
}

