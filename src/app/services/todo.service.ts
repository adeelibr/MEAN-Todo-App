import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class TodoService {

  constructor(private _http:Http) { }

  baseUrl = () => 'http://localhost:3000/';

  getTodos () {
    let url = this.baseUrl() + 'api/todos';
    return this._http.get(url).map(res => res.json());
  }

  saveTodo (newTodo) {
    let url = this.baseUrl() + 'api/todos';
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this._http
               .post(url, JSON.stringify(newTodo), {headers: headers})
               .map(res => res.json());
  }

  updateTodo (todo) {
    let url = this.baseUrl() + 'api/todos/' + todo._id;
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this._http
               .put(url, JSON.stringify(todo), {headers: headers})
               .map(res => res.json());
  }

  deleteTodo (id) {
    let url = this.baseUrl() + 'api/todos/' + id;
    return this._http.delete(url).map(res => res.json());
  }

}
