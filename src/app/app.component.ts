import { Component } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent { 
  users = [];
  showAddUser = false;
  addForm: FormGroup;

  constructor(private httpClient: HttpClient,
    private formBuilder: FormBuilder) { 
    this.httpClient.get('https://reqres.in/api/users?page=2').subscribe((response) => {
  this.users =  response.data;
    });
  }
  

  addUser() {
    this.addForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required]
    });

    this.showAddUser = true;

  }

  onSubmit() {
    this.httpClient.post('https://reqres.in/api/users', this.addForm.value);
  }
  deleteUser(id:number) {
    this.httpClient.delete(`https://reqres.in/api/users/{id}`)
  }
}
