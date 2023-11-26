import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import * as moment from 'moment';

interface ITask {
  to: string;
  status: 'done' | 'todo';
  severity: number;
  title: string;
  description: string;
  created:string;  
  finished:string;
}

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})
export class CardComponent implements OnInit {
  @Input() options: ITask = {} as any;
  @Output() optionsChange: EventEmitter<any> = new EventEmitter();
  
  constructor() {
    
  }

  setToDone() {
    this.options.status = 'done';
    this.options.finished = moment().format('YYYY-MM-DDTHH:mm');
    this.optionsChange?.emit(this.options);    
  }

  setToToDo() {
    this.options.status = 'todo';
    this.optionsChange?.emit(this.options);
  }

  ngOnInit(): void {
    this.options.created = moment(this.options.created).format('YYYY-MM-DDTHH:mm');
  }
}
