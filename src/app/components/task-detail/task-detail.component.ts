import { Component, Input, OnInit, booleanAttribute, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { ITask } from '../../interfaces/task.interface';
import { TaskManagerService } from '../../services/task-manager.service';

export type TaskStatus = 'pending' | 'done';

@Component({
  selector: 'app-task-detail',
  templateUrl: './task-detail.component.html',
  styleUrls: ['./task-detail.component.scss']
})
export class TaskDetailComponent  implements OnInit {
  @Input({ transform: booleanAttribute }) viewMode: boolean = true;

  @Input() task: ITask = {
    title: '',
    description: '',
    status: 'pending'
  }

  taskForm!: FormGroup;
  message!: string;

  private activedRoute = inject(ActivatedRoute);
  private formBuilder = inject(FormBuilder);
  private router = inject(Router);
  private taskManagerService = inject(TaskManagerService);

  ngOnInit(): void {
    this.getTask(this.activedRoute.snapshot.params['id']);
    
    this.taskForm = this.formBuilder.group({
      title: [this.task.title, Validators.required],
      description: [this.task.description],
      status: [this.task.status]      
    });

    this.task = {
      title:  this.taskForm.value.title,
      description: this.taskForm.value.description,
      status: this.taskForm.value.status
    };
  }

  /**
   * 
   */
  backToTaskManager(): void {
    // window.history.back();
    this.router.navigate(['/']);
  }

  /**
   * 
   */
  createTask(): void {
    if (this.taskForm.valid) {
      this.taskManagerService.createTask(this.task).subscribe({
        next: res => {
          this.message = 'Task created!';
          this.resetForm();
          this.router.navigate(['/tasks']);
        },
        error: err => console.error(err)
      });
    }
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
      next: data => {
        this.task = data;
      },
      error: err => console.error(err)
    });
  }

  /**
   * 
   */
  updateTask(): void {
    this.taskManagerService.updateTask(this.task.id!, this.task).subscribe({
      next: () => {
        this.message = 'Task was updated!'
      },
      error: err => console.error(err)
    });
  }

  /**
   * 
   */
  resetForm(): void {
    this.taskForm.reset();
  }
}
