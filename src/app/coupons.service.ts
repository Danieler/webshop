import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import 'rxjs/Rx'; // Map


@Injectable()
export class CouponsService {

  constructor(public http:HttpClient) { }

  get Coupons(){
    // ...using get request
    return this.http.get('assets/data/coupons.json');
  }

}
