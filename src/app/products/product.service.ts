import { Injectable } from "@angular/core";
import { IProduct } from "./product";
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
@Injectable()
export class ProductService {

    productUrl: string = './api/products/products.json';

    constructor(private _http: HttpClient) {

    }
    getProducts(): Observable<IProduct[]> {
        return this._http.get<IProduct[]>(this.productUrl)
            .do(data => console.log('All: ' + JSON.stringify(data)))
            .catch(this.handleError);
    }

    getProduct(id: number): Observable<IProduct> {
        return this.getProducts()
        .map((products: IProduct[]) => products.find(p => p.productId === id));
        
    }

    private handleError(err: HttpErrorResponse) {
        console.log('Error : ' + err.message);
        return Observable.throw(err.message);
    }
}