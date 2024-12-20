import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavComponent } from './Components/nav/nav.component';
import { FooterComponent } from './Components/footer/footer.component';
import { LoaderComponent } from './Components/loader/loader.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavComponent,FooterComponent,LoaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'OnlineShop';

  
}
