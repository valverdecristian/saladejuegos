import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class GithubService {
  private apiUrl = 'https://api.github.com/users/valverdecristian';

  constructor(private http: HttpClient) {}

  getUserData() {
    return this.http.get(this.apiUrl);
  }
}