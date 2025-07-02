import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { AuthenticationServiceService } from '../service/authentication-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  isLoginSuccess: boolean = true;
  email: string = "";
  password: string = "";
  firstName: any;
  userId: any;

  constructor(private route: Router, private authService: AuthenticationServiceService) {}

  handleLogin() {
    //backend
    const postData = {
      email: this.email,
      password: this.password
    };
    this.authService.handleBEAuthentication(postData).subscribe({
      next: (successResponse) => {
        console.log(successResponse);
        this.isLoginSuccess = true;

        //its a success, so we will navigate to list-todo page
        //backend call here to get the firstName with the help of email

       let firstName = 'sai';

       // this.firstName = successResponse.headers.get("firstName");

        this.userId = successResponse.headers.get("userId");
        console.log(successResponse.headers.get("firstName"));
        console.log(successResponse.headers.get("userId"));
        console.log(successResponse.headers.get("Authorization"));

      //  sessionStorage.setItem("Auth_token", successResponse.headers.get("Authorization") || '');

        this.route.navigate(['/welcome', firstName], {queryParams: {userId: this.userId}, replaceUrl: true});

       // this.route.navigate(['/welcome', firstName], {queryParams: {id: "9kukgdfrduhyhjkbmdkjv9gkvymvnh"}})  //9kukgdfrduhyhjkbmdkjv9gkvymvnh
      },
      error: (errorValue) => {
        console.log(errorValue);
        this.isLoginSuccess = !this.isLoginSuccess;
      }
    });
  }
}
