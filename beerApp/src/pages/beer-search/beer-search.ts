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
  
  beerSelection = {
    featured: [],
    rest: []
  };

  constructor(public dataService: DataService, public navCtrl: NavController, public navParams: NavParams) {}

  ionViewDidLoad() {
    
    this.dataService.getBeerListing().subscribe(list => {this.fullList = list; this.buildBeerSelection();}, e => console.log(e));
    
  }

  buildBeerSelection(){
      // get the featured items out of the list
      this.beerSelection.featured = this.fullList.filter(beer =>  (beer.hasOwnProperty('featured') && beer.featured) );
      
      // get the rest of the items
       this.beerSelection.rest = this.fullList.filter(beer => 
    {
      // return that it is already in the featured catagory
      return !this.beerSelection.featured.find(featuredBeer => featuredBeer.title == beer.title);
      
    });
    
  }

  searchList(ev: any){
    let query = ev.target.value;

    if(query.length == 0)
      this.searchedList = [];
    else
      this.searchedList = this.fullList.filter(this.containsSearchParams, query);
  }

  containsSearchParams(item: any): boolean{
    let searchString = String(this);
    return item.title.toLowerCase().includes(searchString.toLowerCase());
  }

}
