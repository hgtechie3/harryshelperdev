import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Http, Response, Headers, RequestOptions } from '@angular/http';

import { HttpHeaders } from '@angular/common/http';

import { environment } from '../../environments/environment';

console.log('rock ready');
console.log(environment);
@Injectable({
  providedIn: 'root'
})
export class TalkService {

  constructor(private http: HttpClient) { }

  	getHeaders() {
        let headers = new Headers;
        headers.append('authorization', 'token')
        let options = new RequestOptions({ headers: headers })
        return options
    }
  	wassup(body) {

  		// application/x-www-form-urlencoded
  		// application/json
  		
		const httpOptions = {
		  headers: new HttpHeaders({
		    'Content-Type':  'application/json',
		    'Authorization': 'my-auth-token'
		  })
		};
	  return this.http.post(environment.helperServer+'/forhelp', body, httpOptions)
	}

}
