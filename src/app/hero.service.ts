import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';

import { Hero } from './hero';

import { MessageService } from './message.service';
import { HttpClient } from '@angular/common/http';

const baseUrl = "http://localhost:9090/v1/users"


@Injectable({ providedIn: 'root' })
export class HeroService {

  constructor(private messageService: MessageService, private http: HttpClient) { }

  getHeroes(): Observable<Hero[]> {
    //this.messageService.add('HeroService: fetched heroes');
    return this.http.get<Hero[]>(`${baseUrl}`);
  }

  getHero(id: string): Observable<Hero> {
    this.messageService.add(`HeroService: fetched hero id=${id}`);
    return this.http.get<Hero>(`${baseUrl}/${id}`);
  }

  addHero(data: any):Observable<any>{
    return this.http.post(`${baseUrl}/signup`, data)
  }
  updateHero(id:any,data:any):Observable<any>{
    return this.http.put(`${baseUrl}/${id}`, data)
  }
  searchHero(term: string): Observable<Hero[]> {
    if (!term.trim()) {
      // if not search term, return empty hero array.
     
    }
    return this.http.get<Hero[]>(`${baseUrl}`);
  }
  removeHero(id:any):Observable<any>{
    return this.http.delete(`${baseUrl}/${id}`)
  }
}