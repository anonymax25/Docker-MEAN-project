import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'angularClient';
<<<<<<< Updated upstream
=======
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
    this.api.deleteTask(task)
      .subscribe(data => {
        console.log(data);
      });
  }



>>>>>>> Stashed changes
}
