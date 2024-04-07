import { Component, Input, OnInit, booleanAttribute, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { MatSnackBar } from '@angular/material/snack-bar';
import { ITask } from '../../interfaces/task.interface';
import { TaskManagerService } from '../../services/task-manager.service';

export type TaskStatus = 'pending' | 'done';

@Component({
  selector: 'app-task-detail',
  templateUrl: './task-detail.component.html',
  styleUrls: ['./task-detail.component.scss']
})
export class TaskDetailComponent implements OnInit {
  @Input({ transform: booleanAttribute }) viewMode: boolean = true;

  task: ITask = {
    title: '',
    description: '',
    status: 'pending'
  };
  taskId!: string;
  taskForm!: FormGroup;
  message!: string;

  private activedRoute = inject(ActivatedRoute);
  private formBuilder = inject(FormBuilder);
  private router = inject(Router);
  private snackBar = inject(MatSnackBar);
  private taskManagerService = inject(TaskManagerService);

  ngOnInit(): void {
    this.getTask(this.activedRoute.snapshot.params['id']);
  }

  /**
   * 
   */
  backToTaskManager(): void {
    this.router.navigate(['/']);
  }

  /**
   * 
   */
  deleteTask(): void {
    this.taskManagerService.deleteTask(this.task.id!).subscribe({
      next: res => {
        this.router.navigate(['/tasks']);
      },
      error: err => console.error(err)
    });
  }

  /**
   * 
   */
  editTask(): void {
    this.viewMode = !this.viewMode;


  }

  /**
   * 
   * @param id 
   */
  getTask(id: string): void {
    this.taskManagerService.getTask(id).subscribe({
      next: task => {
        this.task = task;
        this.taskId = id;
        this.taskForm = this.formBuilder.group({
          title: [this.task.title, Validators.required],
          description: [this.task.description],
          status: [this.task.status]
        });       
      },
      error: err => console.error(err)
    });
  }

  /**
   * 
   */
  updateTask(): void {
    if (this.taskForm.valid) {
      this.task = {
        title: this.taskForm.value.title,
        description: this.taskForm.value.description,
        status: this.taskForm.value.status
      };

      this.taskManagerService.updateTask(this.taskId, this.task).subscribe({
        next: () => {
          this.viewMode = true;
          this.snackBar.open('Task updated!', '', {
            duration: 5000
          });
        },
        error: err => console.error(err)
      });
    } else {
      console.log('ínvalid');
      
    }
  }
}
