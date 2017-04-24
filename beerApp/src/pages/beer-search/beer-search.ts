import { Component } from '@angular/core';
import { NavController, NavParams, ModalController, Content } from 'ionic-angular';

import {trigger,state,style,animate,transition} from '@angular/animations';

import {ProductPage} from '../../pages/product/product';

//import {Queue} from '../../queue';
import * as Collections from 'typescript-collections';







import { DataService } from '../../providers/data-service';


// export class BeerItem {
//   index: number;
//   name: string;
//   description: string;
//   filePath: string;
//   design = {
//     imgOffsetX: 0,
//     imgOffset: 0,
//     textColor: "#fff"
//   };
//   itemLoaded: string = 'invisable';
// }

@Component({
  selector: 'page-beer-search',
  templateUrl: 'beer-search.html',
  animations: [
     trigger('slideIn', [
      state('away', style({opacity: 0,top: 1000})),
       state('placed', style({opacity: 1,top: 0})),
       transition('* => placed', animate('.5s ease-out'))
     ]),
     trigger('openClose', [
       state('collapsed, void', style({width: '10px', opacity: 0})),
       state('expanded', style({width: '100%', opacity: 1})),
       transition('collapsed <=> expanded', animate('.5s'))
     ])
   ]
 
})



export class BeerSearchPage {

  // dropList: Queue<any>;
  // dropList2: any[];
  dropList = new Collections.Queue();
  okToDrop: boolean = true;
  dropDelay: number = 50;
  searchExpand: string = 'collapsed';

  searchedList: any[];
  fullList: any[];
  
  beerSelection = {
    featured: [],

    rest: [

    ]
  };


  

  constructor(public modalCtrl: ModalController, public dataService: DataService, public navCtrl: NavController, public navParams: NavParams) 
  {
    // this.dropList = new Queue();
    // this.dropList2 = [];
  }

  ionViewDidLoad() {
    this.dataService.getBeerListing(beerList => {
      this.fullList = beerList;
       this.buildBeerSelection();

       });

  }

  loadedImg(){
    // https://blog.thecodecampus.de/angular-2-animate-creating-sliding-side-navigation/
    //console.log("loaded image");
  }

  buildBeerSelection(){
      this.beerSelection = {
        featured: [],
        rest: []
      }
      // get the featured items out of the list
      this.beerSelection.featured = this.fullList.filter(beer =>  (beer.hasOwnProperty('featured') && beer.featured) );
      
      // get the rest of the items
       this.beerSelection.rest = this.fullList.filter(beer => 
    {
      // return that it is already in the featured catagory
      return !this.beerSelection.featured.find(featuredBeer => featuredBeer.title == beer.title);
      
    });

    // this.beerSelection.rest.map(ji => {
    //   let bi: BeerItem = new BeerItem();
    //   bi.name = ji.name;
    //   bi.index = ji.index;
    //   bi.description = ji.description;
    //   bi.design = ji.design;
    //   bi.filePath = ji.filePath;
    //   return bi;
    // });

    
  }

  openProduct(product: any){
    //console.log(product);
    this.navCtrl.push(ProductPage, {
      'product': product
    });
  }

  move(amount: number): string {
    return amount + "px"
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

  dropNext() {
    
    if(this.dropList.size() > 0){
      this.okToDrop = false;
      //let item = this.dropList.dequeue();
      let item = this.dropList.dequeue() as any;
      // console.log(item);
      item.itemLoaded = 'placed';
      //setTimeout(this.dropNext(), 5000)
      setTimeout(()=>{
        this.dropNext();
      }, this.dropDelay);
    }else
      this.okToDrop = true;
  }

  itemLoaded(item: any){
    //this.dropList.enqueue(item);
    //this.dropList2.push(item);
    this.dropList.enqueue(item);
    if(this.okToDrop)
      this.dropNext();
    
      
    
    
  }

  expandSearch() {

  }

  dismissSearch() {
    this.searchExpand = "expanded"
  }

}
