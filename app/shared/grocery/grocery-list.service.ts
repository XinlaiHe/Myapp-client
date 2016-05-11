import {Injectable} from "angular2/core";
import {Http, Headers, Response, RequestOptions} from "angular2/http";
import {Config} from "../config";
import {Observable} from "rxjs/Rx";
import "rxjs/add/operator/map";
import {Grocery} from "./grocery";

let url = "http://10.22.72.57:3000/list";
let headers = new Headers({ "Content-Type": "application/json" });
let options = new RequestOptions({ headers: headers });

@Injectable()
export class ListService {

   constructor(private _http: Http) {

   }
   getList(): Promise<Grocery[]> {

     return this._http.get(
       url,
       headers
     )
       .toPromise()
       .then(this.extractData)
       .catch(this.handleError);
   }
   createNew(name: string) {

      return this._http.post(
        url,
        JSON.stringify({ name: name }),
        options
        )
        .map(res => res.json())
        .map(data => {
          let item = new Grocery();
          item.name = data.name;
          return item;
        })
        .catch(this.handleErrors);
   }
   delete(item: Grocery) {
     return this._http.delete(url + '/' +  item.name, options)
       .map(res => res.json())
       .map(data => {
         return data;
       })
       .catch(this.handleErrors);
   }
   private extractData(res: Response) {
     if (res.status < 200 || res.status >= 300) {
       throw new Error('Bad response status: ' + res.status);
     }

     let body = res.json();
     let arr: Array<Grocery> = [];
     body.forEach((el) => {
       let g = new Grocery();
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

   handleErrors(error: Response) {
     console.log(JSON.stringify(error.json()));
     return Observable.throw(error);
   }
}