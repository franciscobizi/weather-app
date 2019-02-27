import { Injectable} from '@angular/core';
import { environment} from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/map';

@Injectable()
export class WeatherService{
    private query : string;
    private API_KEY : string = environment.APUX_API_KEY;
    private API_URL : string = environment.APUX_API_URL;
    private endpoint: string = this.API_URL + this.API_KEY + "&q=";
    constructor(private http: HttpClient) { }
    getWeather(query) {
        return this.http.get(this.endpoint + query)
                        .map(res => res);
    }
}