import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {

  nameFromUrl: string = "";
  userId: string = "";

   constructor(private activatedRoute: ActivatedRoute) { }
 
   ngOnInit(): void {
    //1st first way of reading the URL params
    //this.nameFromUrl = this.activatedRoute.snapshot.params['name'];
    //this.userId = this.activatedRoute.snapshot.queryParams['id'];
    //http://localhost:4200/welcome/Sai?id=abcdefghij

    //2nd way of subscribe the URL
    this.activatedRoute.params.subscribe(parameter=>{
      this.nameFromUrl = parameter['name'];
    });
    this.activatedRoute.queryParams.subscribe(parameter=>{
      this.userId = parameter['userId'];
    });
    console.log(this.nameFromUrl);
    console.log("id is "+this.userId);
  }

}
