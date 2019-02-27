import { 
  Component,
  Input,  
  EventEmitter,  
  Output,
  OnInit,
  Injectable
} from '@angular/core';
import { WeatherService} from '../../shared/weather.service';
import { WeatherModel} from '../../shared/model';
import { ConsumerService } from 'src/app/shared/consumer.service';

@Component({
  selector: 'app-weatherinfo',
  templateUrl: './weatherinfo.component.html'
})
export class WeatherInfoComponent implements OnInit{
  w : any = new WeatherModel();
  constructor(private _weatherServices : WeatherService, private _consumer:ConsumerService){}

  /**
   * Handling success results
   * @param data 
   */
  handlerSuccess(data){
      // Location
      this.w.name = data.name;
      this.w.region = data.region;
      this.w.country = data.country;
      this.w.ltime = data.ltime;
      this.w.lon = data.lon;
      this.w.lat = data.lat;
      this.w.tz = data.tz;

      // Current
      this.w.temp = data.temp;
      this.w.pressure = data.pressure;
      this.w.cloud = data.cloud;
      this.w.icon = data.icon;
      this.w.text = data.text;
      this.w.humidity = data.humidity;
      this.w.precip = data.precip;
      this.w.wind = data.wind
  }

  // Initialize the component by displaying weather data
  ngOnInit(){
    this._consumer._data$
    .subscribe(data => this.handlerSuccess(data));
  }

}
