import { AfterViewInit, ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { MatCard } from '@angular/material/card';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
//import { read } from 'fs';
import { Observable, tap } from 'rxjs';
import { CardComponent } from 'src/app/@components/card/card.component';

const getAllTasks = () => {
  return JSON.parse(localStorage.getItem('tasks') || '[]');
}

const saveTask = (task: any) => {
  try {
    const tasks = getAllTasks();
    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
    
    return true;
  } catch {
    return false;
  }
}


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  @ViewChild('firstPaginator',{static:true}) paginator!: MatPaginator;
  @ViewChild('secondPaginator',{static:true}) paginatorDone!: MatPaginator;    
  obs!: Observable<any>;
  obsDone!: Observable<any>;
  constructor(private changeDetectorRef: ChangeDetectorRef)   { }
   
  tasks: any[] = getAllTasks();
  doneTask = this.tasks.filter(f => f.status.toLowerCase() === 'done');
  todoTask = this.tasks.filter(f => f.status.toLowerCase() !== 'done');
  dataSource: MatTableDataSource<CardComponent> = new MatTableDataSource<CardComponent>(this.todoTask);
  dataSourceDone: MatTableDataSource<CardComponent> = new MatTableDataSource<CardComponent>(this.doneTask);
  
  setStatus(task: any) {
    const index = this.tasks.findIndex(f => f.id === task.id);
    this.tasks[index].status = task.status;
    localStorage.setItem('tasks', JSON.stringify(this.tasks));

    this.doneTask = this.tasks.filter(f => f.status.toLowerCase() === 'done');
    this.todoTask = this.tasks.filter(f => f.status.toLowerCase() !== 'done');
    this.dataSource.data = this.todoTask;
    this.dataSourceDone.data = this.doneTask;
  }
  
  ngOnInit(): void {

    this.changeDetectorRef.detectChanges();
    this.obs = this.dataSource.connect();
    this.dataSource.paginator = this.paginator;
    this.obsDone = this.dataSourceDone.connect();
    this.dataSourceDone.paginator = this.paginatorDone;
    
  }
  
  
}
