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

  getUriInfo(uri:string): Observable<any> {
    const authParams = this.createAuthParams();
    const headers = { 'Accept': 'application/json' };
    return this.http.get<any>(`${uri}?${authParams}`);    
  }

  getCharacters(page: number, limit:number): Observable<any> {
    const authParams = this.createAuthParams();
    const offset = page * limit;
    return this.http.get(`${this.baseUrl}/characters?${authParams}&limit=${limit}&offset=${offset}`);
  }

  getCharactersByName(page: number, limit:number, name: string): Observable<any> {
    const authParams = this.createAuthParams();
    const offset = page * limit;
    return this.http.get(`${this.baseUrl}/characters?${authParams}&limit=${limit}&offset=${offset}&nameStartsWith=${name}`);
  }

  getCharacterById(id:string): Observable<any> {
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

  getComics(page: number, limit:number): Observable<any> {
    const authParams = this.createAuthParams();
    const offset = page * limit;
    return this.http.get(`${this.baseUrl}/comics?${authParams}&limit=${limit}&offset=${offset}`);
  }

  getComicById(id:number): Observable<any> {
    const authParams = this.createAuthParams();
    return this.http.get(`${this.baseUrl}/comics/${id}?${authParams}`);
  }

  getComicsByTitle(page: number, limit:number, name: string): Observable<any> {
    const authParams = this.createAuthParams();
    const offset = page * limit;
    return this.http.get(`${this.baseUrl}/comics?${authParams}&limit=${limit}&offset=${offset}&titleStartsWith=${name}`);
  }

  getCharacterByComic(id:number): Observable<any> {
    const authParams = this.createAuthParams();
    return this.http.get(`${this.baseUrl}/comics/${id}/charcters?${authParams}`);
  }

  getCreatorsByComic(id:number): Observable<any> {
    const authParams = this.createAuthParams();
    return this.http.get(`${this.baseUrl}/comics/${id}/creators?${authParams}`);
  }

  getEventsByComic(id:number): Observable<any> {
    const authParams = this.createAuthParams();
    return this.http.get(`${this.baseUrl}/comics/${id}/events?${authParams}`);
  }

  getStoriesByComic(id:number): Observable<any> {
    const authParams = this.createAuthParams();
    return this.http.get(`${this.baseUrl}/comics/${id}/stories?${authParams}`);
  }

  getCreators(): Observable<any> {
    const authParams = this.createAuthParams();
    return this.http.get(`${this.baseUrl}/creators?${authParams}`);
  }

  getCreatorById(id:number): Observable<any> {
    const authParams = this.createAuthParams();
    return this.http.get(`${this.baseUrl}/creators/${id}?${authParams}`);
  }

  getComicsByCreator(id:number): Observable<any> {
    const authParams = this.createAuthParams();
    return this.http.get(`${this.baseUrl}/creators/${id}/comics?${authParams}`);
  }

  getEventsByCreator(id:number): Observable<any> {
    const authParams = this.createAuthParams();
    return this.http.get(`${this.baseUrl}/creators/${id}/events?${authParams}`);
  }

  getSeriesByCreator(id:number): Observable<any> {
    const authParams = this.createAuthParams();
    return this.http.get(`${this.baseUrl}/creators/${id}/series?${authParams}`);
  }

  getStoriesByCreator(id:number): Observable<any> {
    const authParams = this.createAuthParams();
    return this.http.get(`${this.baseUrl}/creators/${id}/stories?${authParams}`);
  }

  getEvents(): Observable<any> {
    const authParams = this.createAuthParams();
    return this.http.get(`${this.baseUrl}/events?${authParams}`);
  }

  getEventsById(id:number): Observable<any> {
    const authParams = this.createAuthParams();
    return this.http.get(`${this.baseUrl}/events/${id}?${authParams}`);
  }

  getCharactersByEvent(id:number): Observable<any> {
    const authParams = this.createAuthParams();
    return this.http.get(`${this.baseUrl}/events/${id}/characters?${authParams}`);
  }

  getComicsByEvent(id:number): Observable<any> {
    const authParams = this.createAuthParams();
    return this.http.get(`${this.baseUrl}/events/${id}/comics?${authParams}`);
  }

  getCreatorsByEvent(id:number): Observable<any> {
    const authParams = this.createAuthParams();
    return this.http.get(`${this.baseUrl}/events/${id}/creators?${authParams}`);
  }

  getSeriesByEvent(id:number): Observable<any> {
    const authParams = this.createAuthParams();
    return this.http.get(`${this.baseUrl}/events/${id}/series?${authParams}`);
  }

  getStoriesByEvent(id:number): Observable<any> {
    const authParams = this.createAuthParams();
    return this.http.get(`${this.baseUrl}/events/${id}/stories?${authParams}`);
  }

  getSeries(): Observable<any> {
    const authParams = this.createAuthParams();
    return this.http.get(`${this.baseUrl}/series?${authParams}`);
  }

  getSeriesById(id:number): Observable<any> {
    const authParams = this.createAuthParams();
    return this.http.get(`${this.baseUrl}/series/${id}?${authParams}`);
  }

  getCharactersBySeries(id:number): Observable<any> {
    const authParams = this.createAuthParams();
    return this.http.get(`${this.baseUrl}/series/${id}/characters?${authParams}`);
  }

  getComicsBySeries(id:number): Observable<any> {
    const authParams = this.createAuthParams();
    return this.http.get(`${this.baseUrl}/series/${id}/comics?${authParams}`);
  }

  getCreatorsBySeries(id:number): Observable<any> {
    const authParams = this.createAuthParams();
    return this.http.get(`${this.baseUrl}/series/${id}/creators?${authParams}`);
  }

  getEventsBySeries(id:number): Observable<any> {
    const authParams = this.createAuthParams();
    return this.http.get(`${this.baseUrl}/series/${id}/events?${authParams}`);
  }

  getStoriesBySeries(id:number): Observable<any> {
    const authParams = this.createAuthParams();
    return this.http.get(`${this.baseUrl}/series/${id}/stories?${authParams}`);
  }

  getStories(): Observable<any> {
    const authParams = this.createAuthParams();
    return this.http.get(`${this.baseUrl}/stories?${authParams}`);
  }

  getStoriesById(id:number): Observable<any> {
    const authParams = this.createAuthParams();
    return this.http.get(`${this.baseUrl}/stories/${id}?${authParams}`);
  }

  getCharactersByStories(id:number): Observable<any> {
    const authParams = this.createAuthParams();
    return this.http.get(`${this.baseUrl}/stories/${id}/characters?${authParams}`);
  }

  getComicsByStories(id:number): Observable<any> {
    const authParams = this.createAuthParams();
    return this.http.get(`${this.baseUrl}/stories/${id}/comics?${authParams}`);
  }

  getCreatorsByStories(id:number): Observable<any> {
    const authParams = this.createAuthParams();
    return this.http.get(`${this.baseUrl}/stories/${id}/creators?${authParams}`);
  }

  getEventsByStories(id:number): Observable<any> {
    const authParams = this.createAuthParams();
    return this.http.get(`${this.baseUrl}/stories/${id}/events?${authParams}`);
  }

  getSeriesByStories(id:number): Observable<any> {
    const authParams = this.createAuthParams();
    return this.http.get(`${this.baseUrl}/stories/${id}/series?${authParams}`);
  }

}