import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { FullProduct } from '../full-product';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(public http: HttpClient) {}
  public gadamzidi: Subject<any> = new Subject()
  public bSubject:BehaviorSubject<any> = new BehaviorSubject('')
  public bSubject2:BehaviorSubject<any> = new BehaviorSubject('')
  public loading: BehaviorSubject<any> = new BehaviorSubject(false);
  startLoader() {
    this.loading.next(true);
  }
  stopLoader(){
    this.loading.next(false)
  }
interfaceProd(){
  return this.http.get<FullProduct>('https://api.everrest.educata.dev/shop/products/all')
}
  getProdWithId(id: any) {
    return this.http.get(
      `https://api.everrest.educata.dev/shop/products/id/${id}`
    );
  }
  updateProdWithId(id: any, body: any) {
    return this.http.patch(
      `https://api.everrest.educata.dev/shop/products/id/${id}`,
      body
    );
  }
  productRate(body: any) {
    return this.http.post(
      `https://api.everrest.educata.dev/shop/products/rate`,
      body
    );
  }
  addProd(body: any) {
    return this.http.post(
      `https://api.everrest.educata.dev/shop/products`,
      body
    );
  }
  getProd(pgIndex: any, pgSize: any) {
    return this.http.get(
      `https://api.everrest.educata.dev/shop/products/all?page_index=${pgIndex}&page_size=${pgSize}`
    );
  }
  getProdId(id:any){
    return this.http.get(`https://api.everrest.educata.dev/shop/products/id/${id}`)
  }
  deleteProd() {
    return this.http.delete(
      `https://api.everrest.educata.dev/shop/products/all`
    );
  }
  getCategory() {
    return this.http.get(
      `https://api.everrest.educata.dev/shop/products/categories`
    );
  }
  getCategoryWithId(id: any, pageInd: any, pageSize: any) {
    return this.http.get<FullProduct>(
      `https://api.everrest.educata.dev/shop/products/category/${id}?page_index=${pageInd}&page_size=${pageSize}`
    );
  }
  getWithBrandName(brand: any, pageindex: any, pageSize: any) {
    return this.http.get(
      `https://api.everrest.educata.dev/shop/products/brand/${brand}?page_index=${pageindex}&page_size=${pageSize}`
    );
  }
  getOnlyBrand(brand: any) {
    return this.http.get(
      `https://api.everrest.educata.dev/shop/products/brand/${brand}`
    );
  }
  brands() {
    return this.http.get(
      `https://api.everrest.educata.dev/shop/products/brands`
    );
  }
  signIn(header:any){
    return this.http.post(`https://api.everrest.educata.dev/auth/sign_in`, header)
  }
  signUp(header:any){
    return this.http.post(`https://api.everrest.educata.dev/auth/sign_up`, header)
  }
  /* cart API */

  getCart(header:any){
    return this.http.get(`https://api.everrest.educata.dev/shop/cart`, {headers: header})
  }
  createCart(body:any, header:any){
    return this.http.post(`https://api.everrest.educata.dev/shop/cart/product`, body, {headers: header})
  }
  addCart(body:any, header:any){
    return this.http.patch(`https://api.everrest.educata.dev/shop/cart/product`, body, {headers: header})
  }
  delteitemFromCart(userData:any, body:any){
   return this.http.delete(`https://api.everrest.educata.dev/shop/cart/product`,
    {
      headers: userData,
      body: body
    })
  }
  checkoutCart(body:any,header:any){
    return this.http.post(`https://api.everrest.educata.dev/shop/cart/checkout`, body,{headers:header})
  }
  /* authorization */
  auth(header:any){
    return this.http.get(`https://api.everrest.educata.dev/auth`, {headers: header})
  }

  userLeave(body:any){
    this.http.post('https://api.everrest.educata.dev/auth/sign_out',body)
  }
  searchWithKeyword(keyword:any){
    return this.http.get(`https://api.everrest.educata.dev/shop/products/search?keywords=${keyword}`)
  }
  /* searchAPI */
  filterWithPrice(minPrice:any, maxPrice:any,page:any){
    return this.http.get(`https://api.everrest.educata.dev/shop/products/search?page_index=${page}&page_size=12&price_min=${minPrice}&price_max=${maxPrice}`)
  }
}
