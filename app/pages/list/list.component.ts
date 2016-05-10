import {Component, ElementRef, OnInit, ViewChild} from "angular2/core";
import {ListService} from "../../shared/grocery/grocery-list.service";
import {Grocery} from "../../shared/grocery/grocery";

@Component({
  selector: "list",
  templateUrl: "pages/list/list.html",
  providers: [ListService],
  styleUrls: ["pages/list/list-common.css", "pages/list/list.css"]
})
export class ListPage implements OnInit {

  groceryList: Array<Grocery> = [];
  errorMessage: Object;
  newItem: string = '';

  constructor(private _listService: ListService){

  }

  ngOnInit() {
    // this.groceryList.push({ name: "Apples" });
    // this.groceryList.push({ name: "Bananas" });
    // this.groceryList.push({ name: "Oranges" });
    this._listService.getList()
      .then(
            list => {
              //console.log(1);
              this.groceryList = list;
            },
            error => {
              //console.log(2);
              this.errorMessage = <any>error;
            }
           );
  }
  createNew() {
    if (this.newItem != '') {
      this._listService.createNew(this.newItem)
        .subscribe(
            item => { this.groceryList.push(item) },
            (error) => { console.log(error) }
          )
    }
    else alert("Empty Input");
  }
}