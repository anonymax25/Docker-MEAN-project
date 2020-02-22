import {Component} from '@angular/core';
import { OnInit } from '@angular/core';
import { ApiCallService } from './api-call.service';
import { Task } from './task';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'angularClient';
  tasks: Task[] = [];
  private headers: string[];

  constructor(private api: ApiCallService) {
    this.getTasks();
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
        console.log(data)
        this.getTasks();
      });
  }

}
