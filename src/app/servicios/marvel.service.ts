// src/app/servicios/marvel.service.ts
import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import md5 from 'blueimp-md5';

@Injectable({
  providedIn: 'root',
})
export class MarvelService {
  private publicKey = 'b4c0ada736cd81ac3d68af8adb04b48d';
  private privateKey = '41ad26dad2015a711a1f2e37e04726c851ac67b6'; // Reemplaza con tu private key
  private baseUrl = 'https://gateway.marvel.com/v1/public/characters';

  constructor(private http: HttpClient) {}

  getCharacters(): Observable<any> {
    const ts = Date.now().toString();
    const hash = md5(ts + this.privateKey + this.publicKey).toString();
    const url = `${this.baseUrl}?ts=${ts}&apikey=${this.publicKey}&hash=${hash}`;

    return this.http.get(url);
  }
}