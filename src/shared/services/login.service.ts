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
  private readonly BASE_URL = "http://localhost:3000/api/auth";

  public user = signal<UserModel | null | undefined>(undefined);

  public login(credentials: Credentials): Observable<UserModel | null | undefined> {
    return this.http.post(this.BASE_URL + '/signin', credentials)
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
    return this.http.get(this.BASE_URL + '/user')
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
    console.log(this.BASE_URL + '/logout')
    return this.http.get(this.BASE_URL + '/logout')
      .pipe(tap((result: any) => {
        console.log('test')
        localStorage.removeItem('token');
        this.user.set(null);
      }))
  }
}
