import { Injectable } from '@angular/core';
import {HttpClient } from "@angular/common/http"
import { delay, first } from 'rxjs';
import { Course } from '../containers/courses/model/course';

@Injectable({
  providedIn: 'root'
})

export class CoursesService {

  private readonly API = 'api/courses';

  constructor(private httpClient: HttpClient) { }

  list(){
    return this.httpClient.get<Course[]>(this.API)
    .pipe(
      first(),
      delay(1000)
      )
    ;
  }

  save(record: Partial<Course>){
    if (record._id){
      return this.update(record);
    }
    return this.create(record);
  }

  private create(record: Partial<Course>){
    return this.httpClient.post<Course>(this.API, record)

  }
  private update(record: Partial<Course>){
    return this.httpClient.put<Course>(`${this.API}/${record._id}`, record)
  }

  getById(id: string){
    return this.httpClient.get<Course>(`${this.API}/${id}`)
  }
  public delete(id: number){
    return this.httpClient.delete(`${this.API}/${id}`)
  }

}
