import { Component, OnInit, Input } from '@angular/core';
import { Country } from '../country';
import { ActivatedRoute } from '@angular/router';
import { SearchService } from '../search.service';
import { of } from 'rxjs';

@Component({
  selector: 'app-country-detail',
  templateUrl: './country-detail.component.html',
  styleUrls: ['./country-detail.component.css']
})
export class CountryDetailComponent implements OnInit {
  private _country: Country;
  private _kTranslations: string[];

  get country() {
    return this._country;
  }

  get kTranslations() {
    return this._kTranslations;
  }

  constructor(private searchService: SearchService,
    private route: ActivatedRoute) { }

  ngOnInit() {
    let alphaCode = this.route.snapshot.params["alpha3Code"];
    this.searchService.searchCountryByAlphaCode(alphaCode)
      .subscribe(
        (country) => {
          this._country = country;
          this._kTranslations = Object.keys(this._country.translations);
        }
      );
  }

}
