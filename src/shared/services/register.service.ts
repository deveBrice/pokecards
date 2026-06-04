import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface Register {
  firstname: string;
  lastname: string;
  username: string;
  password: string | number;
}

@Injectable({
  providedIn: 'root',
})

export class RegisterService {
  private readonly BASE_URL: string = "http://localhost:3000/api/auth/signup";

  private http = inject(HttpClient);

  public register(user: Register): Observable<any> {
     return this.http.post(this.BASE_URL, user, {observe: 'body'});
  }
}
