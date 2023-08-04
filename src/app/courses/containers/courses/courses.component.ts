import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError, Observable, of } from 'rxjs';
import { ErrorDialogComponent } from 'src/app/shared/components/error-dialog/error-dialog.component';

import { CoursesService } from '../../services/courses.service';
import { Course } from './model/course';
import { ConfirmationDialogComponent } from 'src/app/shared/components/confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss']
})
export class CoursesComponent implements OnInit {

  courses$: Observable<Course[]> | undefined; // simbolo de $ é uma notação que é um observable

  constructor(
    private courseService: CoursesService,
    public dialog: MatDialog,
    private router: Router,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar
  ) {
    this.refresh();
  }


  onError(errorMsg: string) {
    this.dialog.open(ErrorDialogComponent, {
      data: errorMsg,
    });
  }

  ngOnInit(): void { }

  onAdd() {
    this.router.navigate(['new'], { relativeTo: this.route });
  }

  onEdit(course: Course) {
    this.router.navigate(["edit", course._id], { relativeTo: this.route });

  }

  onDelete(id: number) {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: "Deseja realmente excluir esse curso ?",
    });

    dialogRef.afterClosed().subscribe((result: boolean) => {
      if (result) {
        this.courseService.delete(id)
          .subscribe(
            () => {
              this.snackBar.open("Curso removido com sucesso", 'X', { duration: 5000, verticalPosition: 'top', horizontalPosition: 'center' });
              this.refresh();
            },
            error => this.onError("Erro ao remover o curso")
          );
      }
    });
  }

  refresh() {
    this.courses$ = this.courseService.list()
      .pipe(
        catchError(error => {
          this.onError("Erro ao carregar cursos");
          return of([])
        }));
  }
}
