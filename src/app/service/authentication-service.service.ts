import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs';

declare const appUrl: String

@Injectable({
  providedIn: 'root'
})
export class AuthenticationServiceService {

  constructor(private http: HttpClient) { }

  // we create a function here
  handleBEAuthentication(postData:any) {
    return (this.http.post(appUrl+'login', postData, {headers : {'Content-Type': 'application/json'}, observe: 'response'}).pipe(
      map(data=>{
        const token = data.headers.get("Authorization");
        //console.log("Now "+token);
        if(token) {
          sessionStorage.setItem("Auth_token", token);
        }
        return data;
      })
    ));
  }

  isUserLoggedIn() {
    return sessionStorage.getItem("Auth_token");
  }

  isAuthenticationTokenAvailable() : string | null {
    if(this.isUserLoggedIn()) {
      return sessionStorage.getItem("Auth_token");
    }
    return null;
  }

  logoutUser() {
    sessionStorage.removeItem("Auth_token");
    sessionStorage.removeItem("user_id");
  }
  // deleteItemFromSession() {

  // }
}







// map is used to get the data
//let headers = successResponse.headers.get('Authorization')  // Authorization = 'Bearer wertyjkmnbvdsdfg'
