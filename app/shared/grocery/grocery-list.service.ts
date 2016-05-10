import {Injectable} from "angular2/core";
import {Http, Headers, Response, RequestOptions} from "angular2/http";
import {Config} from "../config";
import {Observable} from "rxjs/Rx";
import "rxjs/add/operator/map";
import {Grocery} from "./grocery";

let headers = new Headers({ 'Content-Type': 'application/json' });
let options = new RequestOptions({ headers: headers });

@Injectable()
export class ListService {

   constructor(private _http: Http) {

   }
   getList(): Promise<Grocery[]> {

     return this._http.get(
       "http://10.22.73.117:3000/list",
       headers
     )
       .toPromise()
       .then(this.extractData)
       .catch(this.handleError);
   }
   createNew(name: string) {
      let body = JSON.stringify({ name });
      return this._http.post(
        "http://10.22.73.117:3000/list",
         body,
         options
        )
        .toPromise()
        .then(this.extractData)
        .catch(this.handleError);
   }
   private extractData(res: Response) {
     if (res.status < 200 || res.status >= 300) {
       throw new Error('Bad response status: ' + res.status);
     }

     var body = res.json();
     var arr: Array<Grocery> = [];
     body.forEach((el) => {
       var g = new Grocery();
       g.name = el.name;
       arr.push(g);
     })
     return arr || [];
   }
   private handleError(error: any) {
     // In a real world app, we might send the error to remote logging infrastructure
     let errMsg = error.message || 'Server error';
     console.error(errMsg); // log to console instead
     return Promise.reject(errMsg);
   }
}