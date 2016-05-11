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
  isLoading = false;
  listLoaded = false;

  constructor(private _listService: ListService){

  }

  ngOnInit() {
    this.isLoading = true;
    this._listService.getList()
      .then(
            list => {
              //console.log(1);
              this.groceryList = list;
              this.isLoading = false;
              this.listLoaded = true;
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
            item => { this.groceryList.push(item); this.newItem = ''; },
            (error) => { console.log(error) }
          )
    }
    else alert("Empty Input");
  }
  delete(item: Grocery) {
    this._listService.delete(item)
        .subscribe(
            result => { let index = this.groceryList.indexOf(item);
                        console.log(index);
                        this.groceryList.splice(index, 1);
                        alert(result.name + ' deleted');
                    },
            (error) => { console.log(error) }
          )
  }
}