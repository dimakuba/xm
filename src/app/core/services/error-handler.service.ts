import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ErrorHandler {
  handle(e: Error) {
    alert(e.message);
  }
}
