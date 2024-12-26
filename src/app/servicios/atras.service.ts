import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AtrasService {
  public pageNum!:number | null;
  public pageTitle!:string | null;
  public filterText!:string | null;
  public totalPages!:number | null;

  setBackInfo(pagN: number, pagT:string, filT:string, totalP:number) {
    this.pageNum = pagN;
    this.pageTitle = pagT;
    this.filterText = filT;
    this.totalPages = totalP;
  }

  reset() {
    this.pageNum = null;
    this.pageTitle = null;
    this.filterText = null;
    this.totalPages = null;
  }
}