import { Component, OnInit } from '@angular/core';

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

  constructor() { }

  tasks: any[] = getAllTasks();
  doneTask = this.tasks.filter(f => f.status.toLowerCase() === 'done');
  todoTask = this.tasks.filter(f => f.status.toLowerCase() !== 'done');

  setStatus(task: any) {
    const index = this.tasks.findIndex(f => f.id === task.id);
    this.tasks[index].status = task.status;
    localStorage.setItem('tasks', JSON.stringify(this.tasks));

    this.doneTask = this.tasks.filter(f => f.status.toLowerCase() === 'done');
    this.todoTask = this.tasks.filter(f => f.status.toLowerCase() !== 'done');
  }

  ngOnInit(): void {
  }

}
