import {Component} from '@angular/core';
import { OnInit } from '@angular/core';
import { ApiCallService } from './api-call.service';
import { Task } from './task';
import { FormBuilder } from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'angularClient';
  tasks: Task[] = [];
  taskForm;

  constructor(private api: ApiCallService,
              private formBuilder: FormBuilder) {
    this.getTasks();

    this.taskForm = this.formBuilder.group({
      name: '',
      days: ''
    });

  }

  getTasks() {
    this.api.getTasks()
      .subscribe(data => {
        console.log(data);
        this.tasks = data;
      });
  }
  deleteTask(task: Task) {
    this.api.deleteTask(task._id)
      .subscribe(data => {
        console.log(data);
        this.getTasks();
      });
  }

  onSubmit(task) {
    // Process checkout data here

    if (task.name.length < 1 || task.days.length < 1) {
      alert('Can\'t send task with empty data');
      return;
    }
    console.warn('task has been sent', task);
    this.api.sendTask(task)
      .subscribe(data => {
        console.log(data);
        this.getTasks();
      });
    this.taskForm.reset();
  }

}
