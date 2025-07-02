import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { ErrorComponent } from './error/error.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { ListTodoComponent } from './list-todo/list-todo.component';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { HttpInterceptorService } from './service/http/http-interceptor.service';
import { TodoComponent } from './todo/todo.component';
import { RegistrationComponent } from './registration/registration.component';
import { LogoutComponent } from './logout/logout.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ErrorComponent,
    ListTodoComponent,
    FooterComponent,
    HeaderComponent,
    WelcomeComponent,
    TodoComponent,
    RegistrationComponent,
    LogoutComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [{provide: HTTP_INTERCEPTORS,             //to enable our interceptors requests..
  useClass: HttpInterceptorService,
  multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
