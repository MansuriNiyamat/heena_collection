import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class ErrorLogsService {

  constructor() { }
  private apiUrl = 'http://localhost:3000/errors';
  private _snackBar = inject(MatSnackBar);
  http: HttpClient = inject(HttpClient);
  logError(data: {statusCode: number, errorMessage: string, datetime: Date}){
      this.http.post(this.apiUrl, data)
      .subscribe();
  }
  openSnackBar(message:string) {
    this._snackBar.open(message, 'ok', {
      horizontalPosition: 'center',
      verticalPosition: 'top',
    });
  }
  fetcherrors(){
      this.http.get(this.apiUrl)
      .subscribe((data) => {
          console.log(data);
      })
  }
}
