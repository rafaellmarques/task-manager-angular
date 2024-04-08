import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { v4 as uuidv4 } from 'uuid';

import { MatSnackBar } from '@angular/material/snack-bar';
import { ITask } from 'src/app/interfaces/task.interface';
import { TaskManagerService } from 'src/app/services/task-manager.service';

@Component({
  selector: 'app-task-create',
  templateUrl: './task-create.component.html',
  styleUrls: ['./task-create.component.scss']
})
export class TaskCreateComponent implements OnInit {
  task: ITask = {
    title: '',
    description: '',
    status: 'pending'
  }

  id = uuidv4();
  taskForm!: FormGroup;
  taskTitleExists!: boolean;

  private formBuilder = inject(FormBuilder);
  private router = inject(Router);
  private snackBar = inject(MatSnackBar);
  private taskManagerService = inject(TaskManagerService);

  ngOnInit(): void {
    this.taskForm = this.formBuilder.group({
      title: ['', Validators.required],
      description: [''],
      status: ['pending']
    });
  }

  /**
   * 
   */
  backToTaskManager(): void {
    this.router.navigateByUrl('/');
  }

  /**
   * 
   */
  createTask(): void {
    if (this.taskForm.valid) {
      this.task = {
        id: this.id,
        title: this.taskForm.value.title,
        description: this.taskForm.value.description,
        status: this.taskForm.value.status
      };

      // this.validateTaskByTitle(this.task.title);      

      this.taskManagerService.createTask(this.task).subscribe({
        next: res => {
          this.router.navigate(['/tasks']);
          this.snackBar.open(`Task ${this.task.title} created!`, '', {
            duration: 5000
          });
        },
        error: err => {
          console.error(err);
        }
      });
    } else {
      this.snackBar.open(`You must enter a value for title!`, '', {
        duration: 5000
      });      
    }
  }

  /**
   * 
   */
  resetForm(): void {
    this.taskForm.reset();
  }

  /**
   * 
   */
  validateTaskByTitle(title: string): void {
    const taskExists = this.taskManagerService.getTaskByTitle(title);

    console.log(taskExists);
    
    this.taskTitleExists = taskExists ? true : false;
  }
}
