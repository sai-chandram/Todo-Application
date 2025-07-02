import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TodoService } from '../service/todo.service';
import { NgForm } from '@angular/forms';
import { ListTodoComponent } from '../list-todo/list-todo.component';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit {

  //http://localhost:4200/todo/2
  todoId: any;
  todoObject: any={"name":"", "description":"", "endDate": new Date()};
    //todoObject: any={"name":"", "description":""};

  buttonName = "Add";
  updateMessage: string = "";
  addMessage: string = "";

  userId: string="";
  name: string="";

  constructor(private activatedRoute: ActivatedRoute, private todoService: TodoService, private route: Router) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(data=>{
      this.todoId = data['id'];
    });
    if(this.todoId != -1) {
      this.todoService.getAtodo(this.todoId).subscribe({
        next: (successResponse)=>{
          this.todoObject = successResponse;
          this.buttonName = "Update";
        },
        error: (error)=>{
          console.error(error);
        }
      });
    }
  }

  saveTodo(form:NgForm) {
    console.log("form is "+form);
    if(form.valid) {
      if(this.todoId != -1) {
        this.todoService.updateTodo(this.todoId, this.todoObject).subscribe({
          next: (successResponse) => {
            console.log("Todo Updated Successfully..");
            this.updateMessage = "Todo updated Successfully";
            this.route.navigate(['/todos', this.name], {queryParams: {id: this.userId}});
            //this.route.navigate(['/todos', this.nameFromUrl], { queryParams: {id : this.userId}});
          }
        });
      } else {
        this.todoService.createTodo(this.todoObject).subscribe({
          next: (successResponse)  => {
            console.log("Todo Added Successfully");
            this.addMessage = "Todo Added successfully";
            this.route.navigate(['/todos', this.name], {queryParams: {id: this.userId}});
          }
        });
      }
    }
  }

}
