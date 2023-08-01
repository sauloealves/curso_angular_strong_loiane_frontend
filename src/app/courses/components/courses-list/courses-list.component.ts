import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { Course } from '../../containers/courses/model/course';

@Component({
  selector: 'app-courses-list',
  templateUrl: './courses-list.component.html',
  styleUrls: ['./courses-list.component.scss']
})
export class CoursesListComponent implements OnInit {

  @Input() courses: Course[] = [];
  @Output() add = new EventEmitter(false);
  @Output() edit = new EventEmitter(false);
  @Output() delete = new EventEmitter(false);

  readonly displayedColumns: string[] = ['name', 'category', 'actions'];

  ngOnInit(): void {
  }

  constructor(){
  }

  onAdd(){
    this.add.emit(true);
  }

  onEdit(course: Course){
    this.edit.emit(course);
  }

  onDelete(course: Course){
    console.log(course._id);
    this.delete.emit(course._id);
  }

}
