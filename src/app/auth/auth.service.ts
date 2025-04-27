import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private validUsername = 'admin';  // Hardcoded username
  private validPassword = 'password123';  // Hardcoded password

  constructor() {}

  // Simulate login method
  login(username: string, password: string): Observable<{ success: boolean }> {
    if (username === this.validUsername && password === this.validPassword) {
      // Simulate a successful login response
      return of({ success: true });
    } else {
      // Simulate a failed login response
      return of({ success: false });
    }
  }
}
