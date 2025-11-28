import { Component, inject } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  imports: [CommonModule,FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  authService: AuthService = inject(AuthService);

  constructor(){
    this.authService.login({email:"aline@example.com", senha:"123456"})
                    .subscribe(data =>{
                console.log('data', data);
                return data;
              }) 
  }
}
