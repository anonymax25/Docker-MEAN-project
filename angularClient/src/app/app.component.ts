import {Component} from '@angular/core';
import { OnInit } from '@angular/core';
import { ApiCallService } from './services/api-call.service';
import { Task } from './task';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'angularClient';

}
