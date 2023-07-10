import { CoursesService } from './../services/courses.service';
import { Component, OnInit } from '@angular/core';

import { Course } from './model/course';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss']
})
export class CoursesComponent implements OnInit {

  displayedColumns: string[] = ['name', 'category'];
  courses: Observable<Course[]>  ;

  constructor(private courseService: CoursesService ){
    this.courses = this.courseService.list();
  }

  ngOnInit(): void {}


}
