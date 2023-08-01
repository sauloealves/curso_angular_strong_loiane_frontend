import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NonNullableFormBuilder } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';

import { CoursesService } from './../services/courses.service';
import { Course } from '../containers/courses/model/course';

@Component({
  selector: 'app-course-form',
  templateUrl: './course-form.component.html',
  styleUrls: ['./course-form.component.scss']
})
export class CourseFormComponent implements OnInit {

  form = this.formBuilder.group({
    _id: [''],
    name: [''],
    category: ['']
  });

  constructor(
    private formBuilder: NonNullableFormBuilder,
    private courseService: CoursesService,
    private snackBar: MatSnackBar,
    private location: Location,
    private route: ActivatedRoute
    ){
  }

  ngOnInit(): void {
    const course: Course = this.route.snapshot.data['course'];
    this.form.setValue({
      _id: course._id,
      name: course.name,
      category: course.category
    })
  }

  onSubmit(){
    this.courseService.save(this.form.value)
    .subscribe(
      result => this.onSuccess(),
      error => this.onError());
  }
  onCancel(){
    this.location.back();
  }


  private onError(){
    this.snackBar.open("Erro ao salvar o curso",'',{duration: 3000})
  }

  private onSuccess(){
    this.snackBar.open("Curso salvo com sucesso",'',{duration: 3000});
    this.onCancel();

  }
}
