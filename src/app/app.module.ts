import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { AppComponent } from './app.component';
import { SearchComponent } from './search/search.component';
import { HttpClientModule } from '@angular/common/http';
import { CountryDetailComponent } from './country-detail/country-detail.component';
import { Routes, RouterModule } from '@angular/router';
import { numberThousandsSeparatorPipe } from './numberThousandsSeparatorPipe';
import { FourZeroFourComponent } from './four-zero-four/four-zero-four.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

const appRoutes: Routes = [
  { path: "", component: SearchComponent },
  { path: "countryDetail/:alpha3Code", component: CountryDetailComponent },
  { path: "not-found", component: FourZeroFourComponent },
  { path: '**', redirectTo: 'not-found' }
];

@NgModule({
  declarations: [
    AppComponent,
    SearchComponent,
    CountryDetailComponent,
    numberThousandsSeparatorPipe,
    FourZeroFourComponent,
    numberThousandsSeparatorPipe
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
