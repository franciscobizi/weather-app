import { Component} from '@angular/core';


@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html'
})
export class FooterComponent{
  author : string = 'Francisco Bizi';
  Year : any = new Date();
}
