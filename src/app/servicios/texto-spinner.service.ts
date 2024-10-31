import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {
  public loadingText:string = '';

  setLoadingText(text: string) {
    this.loadingText = text;
  }
}