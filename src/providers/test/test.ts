import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the TestProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class TestProvider {

  constructor(public http: Http) {
    console.log('Hello TestProvider Provider');
  }

  getUsers(){
    return this.http.get('').subscribe(result => {
      console.log(result);
    });
  }

}
