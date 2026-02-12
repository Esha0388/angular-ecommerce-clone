import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TemplateService {

  constructor(private http:HttpClient){

  }

  getAllProducts():Observable<any[]>{
    const url="https://api.escuelajs.co/api/v1/products"
    return this.http.get<any[]>(url);
  }
  
}
