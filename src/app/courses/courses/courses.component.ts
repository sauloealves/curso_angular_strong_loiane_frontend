import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { catchError, Observable, of } from 'rxjs';
import { ErrorDialogComponent } from 'src/app/shared/components/error-dialog/error-dialog.component';

import { CoursesService } from './../services/courses.service';
import { Course } from './model/course';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss']
})
export class CoursesComponent implements OnInit {

  displayedColumns: string[] = ['name', 'category', 'actions'];
  courses$: Observable<Course[]>; // simbolo de $ é uma notação que é um observable

  constructor(
    private courseService: CoursesService,
    public dialog: MatDialog,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.courses$ = this.courseService.list()
      .pipe(
        catchError(error => {
          this.onError("Erro ao carregar cursos");
          return of([])
        }));
  }


  onError(errorMsg: string) {
    this.dialog.open(ErrorDialogComponent, {
      data: errorMsg,
    });
  }

  ngOnInit(): void { }

  onAdd(){
    this.router.navigate(['new'], {relativeTo: this.route});
  }


}
