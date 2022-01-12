import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {User} from "../common/user";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  baseURL: string = "http://localhost:3000/user";

  constructor(private httpClient:HttpClient) { }

  addUser(user:User):Observable<any> {
    const headers = { 'content-type': 'application/json'};
    const body=JSON.stringify(user);
    console.log(body);
    return this.httpClient.post(this.baseURL, body,{'headers':headers});
  }

  getAuthenticatedUser(token: String) : Observable<User> | null{
    const url=`http://localhost:3000/user/me`;
    const headers = { 'content-type': 'application/json','Authorization': `Bearer ${token}` };
    return this.httpClient.get<User>(url,{'headers': headers});
  }
}
