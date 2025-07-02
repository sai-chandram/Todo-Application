import { Component, OnInit } from '@angular/core';
import { AuthenticationServiceService } from '../service/authentication-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {

  constructor(private authService: AuthenticationServiceService, private route: Router) { }

  ngOnInit(): void {
    this.authService.logoutUser();
    this.route.navigateByUrl('/login');
  }

}
