import { Component, OnInit} from '@angular/core';

import { WeatherService} from './shared/weather.service';
import { ConsumerService } from './shared/consumer.service';
import { WeatherModel} from './shared/model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  private geolocation : string = "";
  private corrd : string = localStorage.getItem("geoloc") === null ? '' : localStorage.getItem('geoloc');
  w : any = new WeatherModel();
  constructor(private _weatherServices : WeatherService, private _consumer: ConsumerService) {}

  // Ask the user location on the browser
  Geolocation() {

    if (!navigator.geolocation){
      return false;
    }
  
    function success(position) {
      var latitude  = position.coords.latitude;
      var longitude = position.coords.longitude;
      var coordinator = latitude + "-" + longitude;
      localStorage.setItem("geoloc", JSON.stringify(coordinator));
    }
  
    function error() {
      return false;
    }
  
    navigator.geolocation.getCurrentPosition(success, error);
  }
  
  // Intialize all methods to display weather data on load app
  ngOnInit(){
    this.Geolocation();
    var lat_ln = this.corrd.split('-');
    this.geolocation = lat_ln[0].slice(0,5) + "," + lat_ln[1].slice(0,5);
    this.weatherByGeol(this.geolocation);
    console.log('App loaded...');
  }

  /**
   * Handling success results
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
   * Fetching data by geolocation on load app
   * @param query 
   */
  weatherByGeol(query : string){
    return this._weatherServices
    .getWeather(query)
    .subscribe(
      data => this.handlerSuccess(data),
      error => console.log(error),
      () => "Request completed..."
    );
  }

}
