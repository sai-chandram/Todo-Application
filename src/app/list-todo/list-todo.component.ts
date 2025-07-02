import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TodoService } from '../service/todo.service';

@Component({
  selector: 'app-list-todo',
  templateUrl: './list-todo.component.html',
  styleUrls: ['./list-todo.component.css']
})
export class ListTodoComponent implements OnInit {

  //http://localhost:4200/welcome/Sai?id=abcdefghij
  todos: any;
  userId: string="";
  name: string="";
  deleteMessage: string="";

  constructor(private activatedroute: ActivatedRoute, private todoService : TodoService, private route: Router) {}

  ngOnInit(): void {
    this.activatedroute.queryParams.subscribe(queryParams=>{
      this.userId = queryParams['userId'];
    });
    this.activatedroute.params.subscribe(pathParams=>{
      this.name = pathParams['name'];
    });
    console.log(this.name);
    console.log(this.userId);
    this.todoService.getAllTodos(this.userId).subscribe({      //this.userId, this.name
      next: (successResponse)=>{
        console.log(successResponse) // for our confirmation
        this.todos = successResponse;
      },
      error: (error)=>{
        //console.error(error);
        console.error(error);
      }
    });
  }

  deleteTodo(id: BigInt) : void {
    //delete a todo
    console.log("id is "+id);
    this.todoService.deleteTodo(id).subscribe({
      next: (res)=>{
        this.todos.splice(this.todos.indexOf(id), 1)
        this.deleteMessage = "Todo has been deleted";
      }
    })
  }

  updateTodo(id: BigInt): void {
    //update a todo
    this.route.navigate(["/todo", id])
  }

  addTodo() {
    this.route.navigate(["/todo", -1])
  }
}
