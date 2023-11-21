import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/enviroments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  url = environment.apiUrl;

  constructor(private http: HttpClient) { }

  register(obj: any): Observable<any> {
    return this.http.post<any>(this.url + "RegisterCustomer", obj);
  }

  login(obj: any): Observable<any> {
    return this.http.post<any>(this.url + "Login", obj);
  }
}
