import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiServicesService {

  constructor( private http:HttpClient) { }

  public covid19Reports(){
    return this.http.get("https://disease.sh/v3/covid-19/countries");
   }
}
