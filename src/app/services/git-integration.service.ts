import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GitIntegrationService {
http = inject(HttpClient)
  constructor() { }

  getGrant(): Observable<any> {
    return this.http.get<any>(`https://github.com/login/oauth/authorize?client_id=Ov23liWqBQtYIbTnHBXi`);
  }
}
