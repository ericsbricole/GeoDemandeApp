import { Component, OnInit, Input, AfterViewChecked } from '@angular/core';
import { SearchService } from "../search.service";
import { Country } from '../country';
import { Observable } from 'rxjs';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  private _cForm: FormGroup;

  get cForm() {
    return this._cForm;
  }

  private _countries: Country[] = [];

  private _responses: Country[][];
  private _searched: boolean = false;

  get countries() {
    return this._countries;
  }

  get responses() {
    return this._responses;
  }

  get searched() {
    return this._searched;
  }

  searchName: string = "nom du pays";

  constructor(private searchService: SearchService,
    private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.initForm();
  }


  private initForm(): void {
    this._cForm = this.formBuilder.group({
      inpAlphaCode: "",
      inpName: "",
      inpLang: "",
      inpCall: "",
      inpReg: "",
      inpRegBloc: "",
      inpCapital: "",
    });
  }

  research(): void {
    this._searched = true;
    const formValue = this._cForm.value;
    let alphaCode: string = formValue["inpAlphaCode"];
    let name: string = formValue["inpName"];
    let lang: string = formValue["inpLang"];
    let call: string = formValue["inpCall"];
    let reg: string = formValue["inpReg"] === "Ne pas filtrer" ? "" : formValue["inpReg"];
    let regBloc: string = formValue["inpRegBloc"] === "Ne pas filtrer" ? "" : formValue["inpRegBloc"].split(" (")[0];
    let capital: string = formValue["inpCapital"];

    this._countries = [];
    let obsToRequest: Observable<Country[]>[] = [];

    if (alphaCode.trim() !== "") {
      this.searchService.searchCountryByAlphaCode(alphaCode)
        .subscribe(
          (country) => this._countries[0] = country
        );
    }
    else {

      if (name.trim() !== "") {
        obsToRequest.push(this.searchService.searchCountryByName(name));
      }
      if (reg !== "") {
        obsToRequest.push(this.searchService.searchCountryByReg(reg));
      }
      if (capital !== "") {
        obsToRequest.push(this.searchService.searchCountryByCapital(capital));
      }
      if (call !== "") {
        obsToRequest.push(this.searchService.searchCountryByCallingCode(call));
      }
      if (lang !== "") {
        obsToRequest.push(this.searchService.searchCountryByLanguage(lang));
      }
      if (regBloc !== "") {
        obsToRequest.push(this.searchService.searchCountryByRegBloc(regBloc));
      }
    }


    if (obsToRequest.length > 0) {
      this.searchService.requestDataFromMultipleSources(obsToRequest)
        .subscribe(
          (countries) => { this._responses = countries; },
          (error) => console.error("this error occured hile getting countries from several requests: " + error.name),
          () => {
            this.findSelectedByUser();
          }
        );
    }

  }

  findSelectedByUser(): void {
    let countIterationsOfCountries = {};
    this._responses.forEach((countriesFound) => {
      countriesFound.forEach((countryFound) => {
        countryFound.name in countIterationsOfCountries ? countIterationsOfCountries[countryFound.name]++ : countIterationsOfCountries[countryFound.name] = 1;
      })
    }); // at this point, countIterationsOfCountries knows how many times we have found each country

    let hits = Object.values(countIterationsOfCountries);
    let max = Math.max.apply(null, hits);

    //we loop responses again to push countries found in each list, thus selected by each user-defined filters
    this._responses.forEach((countriesFound) => {
      countriesFound.forEach((countryFound) => {
        if (countIterationsOfCountries[countryFound.name] === this._responses.length && this.canPushInCountries(countryFound)) {

          this._countries.push(countryFound);
        }
      })
    });
  }

  canPushInCountries(newCountry: Country): boolean {
    let newName = newCountry.name;
    let response: boolean = true;
    this._countries.forEach((country) => {
      if (country.name === newName) {
        response = false; //the country has already been added as a response filtered by the user, no need to add it again 
      }
    })
    return response;
  }


  getAllCountries() {
    this.searchService.getAllCountries()
      .subscribe(
        (countries) => { this._countries = countries; },
        (error) => console.error("an error occured hile getting countries " + error),
        () => console.log("completion of search for countries")
      );
  }

  searchCountries(criteria: string) {
    this.searchService.searchCountryByName(criteria)
      .subscribe(
        (countries) => {
          this._countries = countries;
        },
        (error) => console.error("an error occured hile getting countries"),
        () => console.log("completion of search for countries by name.")
      );
  }

}
