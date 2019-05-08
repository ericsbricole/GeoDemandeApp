import { Injectable } from '@angular/core';
import { Observable, forkJoin } from 'rxjs';
import { Country } from './country';
import { HttpClient, HttpResponse } from "@angular/common/http";
import { map } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  private url: string = "https://restcountries.eu/rest/v2";

  constructor( private http: HttpClient ) { }

  getAllCountries(): Observable<Country[]>{
    return this.http.get<Country[]>(this.url + "/all");
  }

  searchCountryByName(name:string):Observable<Country[]>{
    return this.http.get<Country[]>(this.url + "/name/" + name);
  }

  searchCountryByAlphaCode(alphaCode:string):Observable<Country>{
    return this.http.get<Country>(this.url + "/alpha/" + alphaCode);
  }

  searchCountryByCapital(capital:string):Observable<Country[]>{
    return this.http.get<Country[]>(this.url + "/capital/" + capital);
  }

  searchCountryByLanguage(lang:string): Observable<Country[]>{
    return this.http.get<Country[]>(this.url + "/lang/" + lang);
  }

  searchCountryByCallingCode(call:string): Observable<Country[]>{
    return this.http.get<Country[]>(this.url + "/callingcode/" + call);
  }

  searchCountryByReg(reg:string):Observable<Country[]>{
    return this.http.get<Country[]>(this.url + "/region/" + reg);
  }

  searchCountryByRegBloc(regBloc:string):Observable<Country[]>{
    return this.http.get<Country[]>(this.url + "/regionalbloc/" + regBloc);
  }

  public requestDataFromMultipleSources(observables: Observable<Country[]>[]): Observable<Country[][]> {
    return forkJoin(observables);
}

}
