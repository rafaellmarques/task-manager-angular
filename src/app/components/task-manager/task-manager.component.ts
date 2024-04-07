import { Component, OnInit, inject } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

import { ITask } from '../../interfaces/task.interface';
import { TaskManagerService } from '../../services/task-manager.service';

@Component({
  selector: 'app-task-manager',
  templateUrl: './task-manager.component.html',
  styleUrls: ['./task-manager.component.scss']
})
export class TaskManagerComponent  implements OnInit {
  // tasks$ = new Observable<ITask[]>();
  tasks: ITask[] = [];
  
  // tasksFiltered: ITask[] = [];
  filterStatus: 'pending' | 'done' | 'all' = 'all';
  filterTitle: string = '';

  private router = inject(Router);
  private snackBar = inject(MatSnackBar);
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
  deleteTask(id: string, title: string): void {
    this.taskManagerService.deleteTask(id).subscribe({
      next: res => {
        this.getAllTasks();
        this.snackBar.open(`Task ${title} deleted!`, '', {
          duration: 5000
        });
      },
      error: err => console.error(err)
    });
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
    // this.tasks$ = this.taskManagerService.getAllTasks();
    this.taskManagerService.getAllTasks(this.filterTitle, this.filterStatus).subscribe(
      tasks => this.tasks = tasks
    );
  }

  /**
   * 
   */
  taskFilter(): void {
    this.getAllTasks();
  }
}

