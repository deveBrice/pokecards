import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { UserModel } from '../models/user.model';
import { map, Observable, tap } from 'rxjs';

export interface Credentials {
  username: string;
  password: string;
}

@Injectable({
  providedIn: 'root',
})

export class LoginService {
  private http = inject(HttpClient);
  private readonly BASE_URL = "http://localhost:3000";

  public user = signal<UserModel | null | undefined>(undefined);

  public login(credentials: Credentials): Observable<UserModel | null | undefined> {
    return this.http.post(this.BASE_URL + '/api/login', credentials)
      .pipe(tap((result: any) => {
        localStorage.setItem('token', result['token'])
        const user = Object.assign(new UserModel(), result['user'])
        this.user.set(user)
      }),
        map((result: any) => {
          return this.user()
        })
      )
  }

  public getUsers(): Observable<UserModel | null | undefined> {
    return this.http.get(this.BASE_URL + '/api/user')
      .pipe(tap((result: any) => {
        const user = Object.assign(new UserModel(), result)
        this.user.set(user)
      }),
        map((result: any) => {
          return this.user()
        })
      )
  }

  public logout(): Observable<null> {
    return this.http.get(this.BASE_URL + '/api/logout')
      .pipe(tap((result: any) => {
        localStorage.removeItem('token');
        this.user.set(null);
      }))
  }
}
