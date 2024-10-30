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
  private baseUrl = 'https://gateway.marvel.com/v1/public';
  constructor(private http: HttpClient) {}

  private createAuthParams() {
    const ts = Date.now().toString();
    const hash = md5(ts + this.privateKey + this.publicKey).toString();
    return `ts=${ts}&apikey=${this.publicKey}&hash=${hash}`;
  }

  getCharacters(): Observable<any> {
    const authParams = this.createAuthParams();
    return this.http.get(`${this.baseUrl}/characters?${authParams}`);
  }

  getCharacterById(id:number): Observable<any> {
    const authParams = this.createAuthParams();
    return this.http.get(`${this.baseUrl}/characters/${id}?${authParams}`);
  }

  getComicsByCharacter(id:number): Observable<any> {
    const authParams = this.createAuthParams();
    return this.http.get(`${this.baseUrl}/characters/${id}/comics?${authParams}`);
  }

  getEventsByCharacter(id:number): Observable<any> {
    const authParams = this.createAuthParams();
    return this.http.get(`${this.baseUrl}/characters/${id}/events?${authParams}`);
  }

  getSeriesByCharacter(id:number): Observable<any> {
    const authParams = this.createAuthParams();
    return this.http.get(`${this.baseUrl}/characters/${id}/series?${authParams}`);
  }

  getStoriesByCharacter(id:number): Observable<any> {
    const authParams = this.createAuthParams();
    return this.http.get(`${this.baseUrl}/characters/${id}/stories?${authParams}`);
  }

  getComics(): Observable<any> {
    const authParams = this.createAuthParams();
    return this.http.get(`${this.baseUrl}/comics?${authParams}`);
  }

  getComicById(id:number): Observable<any> {
    const authParams = this.createAuthParams();
    return this.http.get(`${this.baseUrl}/comics/${id}?${authParams}`);
  }

}