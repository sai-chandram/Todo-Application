import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

declare const appTodoUrl: string;
declare const appUserUrl: string;

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  constructor(private http: HttpClient) { }

  getAllTodos(userId:String): Observable<any> {       //by using userId we get the todo list. userId: string, name: string
    //const params = new HttpParams();
    //params.set('userId', userId); 
   // console.log(name);
    //console.log(userId);
   // const token = sessionStorage.getItem('Auth_token');
    return this.http.get(appTodoUrl+"getAllTodos")
   // return (this.http.get(appTodoUrl+"getAllTodos/"+name, {params}));
  }

  deleteTodo(todoId: BigInt): Observable<any> {
    console.log("id is"+todoId);
    return this.http.delete(appTodoUrl+"deleteTodo/"+todoId);
  }

  getAtodo(todoId: BigInt): Observable<any> {
    console.log("Todo id is "+todoId);
    //return this.http.get(appTodoUrl+'getTodo/'+todoId);//updateTodo
    return this.http.get(appTodoUrl+'getTodo/'+todoId);//updateTodo
  }

  updateTodo(id: string, objTodo: any) {
    return this.http.put(appTodoUrl+'updateTodo/'+id, JSON.stringify(objTodo), {headers : {'Content-Type': 'application/json'}});
  }

  createTodo(objTodo: any) {
    return this.http.post(appTodoUrl+'createTodo', JSON.stringify(objTodo), {headers : {'Content-Type': 'application/json'}});
  }

  registerUser(userData: any) {
    return this.http.post(appUserUrl+'createUser', JSON.stringify(userData), {headers : {'Content-Type': 'application/json'}});
  }
}







//{headers: {"Authorization": sessionStorage.getItem("Auth_token")}}