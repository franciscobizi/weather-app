import { Component, OnInit} from '@angular/core';
import { WeatherService} from '../../shared/weather.service';
import { WeatherModel } from 'src/app/shared/model';
import { ConsumerService } from 'src/app/shared/consumer.service';


@Component({
  selector: 'app-list-city',
  templateUrl: './list-city.component.html'
})
export class ListCityComponent implements OnInit{
  mycity : boolean = false;
  errortext : string;
  weatherFound: boolean = false;
  cities = localStorage.getItem("cities") === null ? [] : JSON.parse(localStorage.getItem('cities'));
  w : any = new WeatherModel();
  
  constructor(private _weatherServices : WeatherService, private _consumer : ConsumerService){}

  ngOnInit(){
     this.cities;
  }

  /**
   * Removing city from the list cities
   * @param index 
   */
  onClickRemove(index) {
    this.errortext = ""; 
    this.cities.splice(index, 1);
    localStorage.setItem('cities',JSON.stringify(this.cities));
  }

  /**
   * Fetch weather data by clicking on the each city on the list
   * @param query 
   */
  onClickCity(query) {
    return this._weatherServices
    .getWeather(query)
    .subscribe(
      data => this.handlerSuccess(data),
      error => console.log(error),
      () => "Request completed..."
    );
  }

  /**
   * Handling success result
   * @param data 
   */
  handlerSuccess(data){

    // Location
    this.w.name = data.location.name;
    this.w.region = data.location.region;
    this.w.country = data.location.country;
    this.w.ltime = data.location.localtime;
    this.w.lon = data.location.lon;
    this.w.lat = data.location.lat;
    this.w.tz = data.location.tz_id;

    // Current
    this.w.temp = data.current.temp_c;
    this.w.pressure = data.current.precip_mm;
    this.w.cloud = data.current.cloud;
    this.w.icon = data.current.condition.icon;
    this.w.text = data.current.condition.text;
    this.w.humidity = data.current.humidity;
    this.w.precip = data.current.precip_in;
    this.w.wind = data.current.wind_mph

    this._consumer.shareData(this.w);
    
}
  /**
   * Adding city to the list cities
   * @param newCity 
   */
  clickAddCity(newCity:HTMLInputElement){
        if (!newCity.value) {return;}
        if (this.cities.indexOf(newCity.value) == -1) { 
          this.cities.push(newCity.value);
          localStorage.setItem("cities", JSON.stringify(this.cities));
        } else {
            this.errortext = "The city is already in your city list.";
        }
  }
}
