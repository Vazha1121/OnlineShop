import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { retry } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(public http: HttpClient) {}

  getProdWithId(id: any) {
    return this.http.get(`https://api.everrest.educata.dev/shop/products/id/${id}`);
  }
  updateProdWithId(id: any, body: any) {
    return this.http.patch(`https://api.everrest.educata.dev/shop/products/id/${id}`,body);
  }
  productRate(body:any){
    return this.http.post(`https://api.everrest.educata.dev/shop/products/rate`,body)
  }
  addProd(body:any) {
    return this.http.post(`https://api.everrest.educata.dev/shop/products`, body)
  }
  getProd(pgIndex:any, pgSize:any) {
    return this.http.get(`https://api.everrest.educata.dev/shop/products/all?page_index=${pgIndex}&page_size=${pgSize}`)
  }
  deleteProd(){
    return this.http.delete(`https://api.everrest.educata.dev/shop/products/all`)
  }
  getCategory(){
    return this.http.get(`https://api.everrest.educata.dev/shop/products/categories`)
  }
  getCategoryWithId(id:any, pageInd:any, pageSize:any){
    return this.http.get(`https://api.everrest.educata.dev/shop/products/category/${id}?page_index=${pageInd}&page_size=${pageSize}`)

  }
  getWithBrandName(brand:any, pageindex:any,pageSize:any){
    return this.http.get(`https://api.everrest.educata.dev/shop/products/brand/${brand}?page_index=${pageindex}&page_size=${pageSize}`)
  }
}
