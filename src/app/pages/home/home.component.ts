import { Component, OnInit } from '@angular/core';
import { TodoService } from '../../services/todo.service';
import { Todo } from '../../models/todo';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  todos: any[];

  constructor(private _todoService:TodoService) { }

  ngOnInit() {
    this.todos = [];
    this._todoService.getTodos().subscribe(res => {
      this.todos = res.todos;
    })
  }

  addTodo (event, todoText) {
    let result;
    let newTodo = {
      text: todoText.value,
      isCompleted: false
    };

    result = this._todoService.saveTodo(newTodo);
    result.subscribe(x => {
      this.todos.push(newTodo);
      todoText.value = ''; // Clear text box
    }); 
  }

  setEditState (todo, state) {
    if (state) {
      todo.isEditMode = state;
    } else {
      delete todo.isEditMode;
    }
  }

  updateStatus (todo) {
    let _todo = {
      _id: todo._id,
      text: todo.text,
      isCompleted: !todo.isCompleted,
    };

    this._todoService.updateTodo(_todo).subscribe(data => {
      todo.isCompleted = !todo.isCompleted
    });
  }

  updateTodoText (event, todo) {
    if (event.which === 13) {
      todo.text = event.target.value;
      let _todo = {
        _id: todo._id,
        text: todo.text,
        isCompleted: todo.isCompleted,
      };
      
      this._todoService.updateTodo(_todo).subscribe(data => {
        this.setEditState(todo, false);
      });
    }
  }

  deleteTodo (todo) {
    let todos = this.todos;
    this._todoService.deleteTodo(todo._id)
      .subscribe(data => {
        if (data.n === 1) {
          for (let i=0; i<=todos.length; i++) {
            if (todo._id === todos[i]._id) {
              todos.splice(i, 1);
            }
          }
        }
      });
  }

}
