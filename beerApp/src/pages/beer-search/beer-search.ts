import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { DataService } from '../../providers/data-service';

/*
  Generated class for the BeerSearch page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-beer-search',
  templateUrl: 'beer-search.html'
})
export class BeerSearchPage {

  searchedList: any[];
  fullList: any[];
  currentSearch: string;
  testString: string = "C";

  constructor(public dataService: DataService, public navCtrl: NavController, public navParams: NavParams) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad BeerSearchPage');
    this.dataService.getBeerListing().subscribe(list => this.fullList = list, e => console.log(e));

  }

  searchList(){
    let query = this.currentSearch;
    console.log(query);
    this.searchedList = this.fullList.filter(function(el){
      return el.indexOf(query) > -1;
    });
    
    //this.searchedList = this.fullList.filter(this.containsSearchParams, this.testString);
    //console.log(this.currentSearch);
  }

  containsSearchParams(item: any, test: any): boolean{
    console.log(test);
    return item.title.toLowerCase().includes(test);
  }

}
