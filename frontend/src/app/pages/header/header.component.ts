import { Component } from '@angular/core';
import { RouterLink } from '@angular/router'; //Faz com que eu possa referenciar as rotas definidas no app.routes.ts

@Component({
  selector: 'app-header',
  imports: [RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

}
