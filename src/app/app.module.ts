import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { HeaderComponent } from './weather/header/header.component';
import { FooterComponent } from './weather/footer/footer.component';
import { SearchComponent } from './weather/search/search.component';
import { ListCityComponent } from './weather/list-city/list-city.component';
import { WeatherInfoComponent } from './weather/weather-info/weatherinfo.component';

//Services
import { WeatherService } from './shared/weather.service';
import { CommonModule } from '@angular/common';

import { FormsModule }   from '@angular/forms';
import { ConsumerService } from "./shared/consumer.service";

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    WeatherInfoComponent,
    ListCityComponent,
    SearchComponent,

  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    CommonModule,
    FormsModule 
  ],
  providers: [WeatherService, ConsumerService],
  bootstrap: [AppComponent]
})
export class AppModule { }
