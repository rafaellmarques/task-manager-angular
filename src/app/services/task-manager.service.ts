import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs/operators';

import { environment } from 'src/environments/environment';
import { ITask } from '../interfaces/task.interface';

@Injectable({
  providedIn: 'root'
})
export class TaskManagerService {
  apiUrl = `${environment.apiTask}/tasks`;

  private httpClient = inject(HttpClient);

  createTask(task: ITask): Observable<ITask> {
    return this.httpClient.post<ITask>(this.apiUrl, task);
  }

  deleteAllTasks(): Observable<ITask> {
    return this.httpClient.delete<ITask>(this.apiUrl);
  }

  deleteTask(id: string): Observable<ITask> {
    return this.httpClient.delete<ITask>(`${this.apiUrl}/${id}`);
  }

  getAllTasks(titelFilter: string = '', statusFilter: 'pending' | 'done' | 'all'): Observable<ITask[]> {
    // return this.httpClient.get<ITask[]>(this.apiUrl);
    return this.httpClient.get<ITask[]>(this.apiUrl).pipe(
      map(tasks => tasks.filter(task => (statusFilter === 'all' || task.status === statusFilter) && task.title.toLowerCase().includes(titelFilter.toLowerCase())))
    );
  }

  getTask(id: string): Observable<ITask> {
    return this.httpClient.get<ITask>(`${this.apiUrl}/${id}`);
  }

  getTaskByTitle(title: string): Observable<ITask> {
    return this.httpClient.get<ITask>(`${this.apiUrl}?title=${title}`);
  }

  updateTask(id: string, task: ITask): Observable<ITask> {
    return this.httpClient.put<ITask>(`${this.apiUrl}/${id}`, task);
  }
}
