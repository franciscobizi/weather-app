import { 
  Component,
  OnInit
} from '@angular/core';
import { WeatherService} from '../../shared/weather.service';
import { ConsumerService } from 'src/app/shared/consumer.service';
import { WeatherModel } from 'src/app/shared/model';


@Component({
  selector: 'app-search',
  templateUrl: './search.component.html'
})
export class SearchComponent implements OnInit{
  w : any = new WeatherModel();
  constructor(private _weatherServices : WeatherService, private _consumer: ConsumerService){}

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

  ngOnInit(){}

  /**
   * Fetch data by searching city weather info on the search field
   * @param event 
   */
  onKeydown(event) {
    if (event.key === "Enter") {
      return this._weatherServices
      .getWeather(event.target.value)
      .subscribe(
        data => this.handlerSuccess(data),
        error => console.log(error),
        () => "Request completed..."
      );
    }
  }
}
