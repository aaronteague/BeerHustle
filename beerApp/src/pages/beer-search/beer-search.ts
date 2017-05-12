import { Component } from '@angular/core';
import { NavController, NavParams, Content, LoadingController } from 'ionic-angular';

import {trigger,state,style,animate,transition} from '@angular/animations';

import {ProductPage} from '../../pages/product/product';
import * as Collections from 'typescript-collections';

import { DataService } from '../../providers/data-service';


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
       state('collapsed, void', style({width: '10px', opacity: 1})),
       state('expanded', style({width: '100%', opacity: 1})),
       transition('collapsed <=> expanded', animate('.5s'))
     ])
   ]
 
})



export class BeerSearchPage {

  dropList = new Collections.Queue();
  okToDrop: boolean = true;
  dropDelay: number = 50;
  searchExpand: string = 'expanded';

  searchedList: any[];
  fullList: any[] = [];
  
  beerSelection = {
    featured: [],

    rest: [

    ]
  };


  

  constructor(public loadingCtrl: LoadingController, public dataService: DataService, public navCtrl: NavController, public navParams: NavParams) 
  {
  }

  

  ionViewDidLoad() {

    // let loader = this.loadingCtrl.create({
    //   content: "Retrieving items..."
    // });
    // loader.present();

    
    
    this.dataService.getBeerListing(
      // add func
      (data) => { 
        // if(loader)
        //   {loader.dismiss(); loader=null}; 
          this.fullList.push(data);
         if(data.featured)
           this.beerSelection.featured.push(data); 
           else
            this.beerSelection.rest.push(data); 
        },
      // change func
      (data) => { 
         if(data.featured){
            let index = this.beerSelection.featured.findIndex((value, index, obj) => value.title === data.title);
           this.beerSelection.featured[index] = data;
         }else{
           let index = this.beerSelection.rest.findIndex((value, index, obj) => value.title === data.title);
           this.beerSelection.rest[index] = data;
         }
       },
      // remove func
      (data) => {
         if(data.featured){
           let index = this.beerSelection.featured.findIndex((value, index, obj) => value.title === data.title);
           this.beerSelection.featured.splice(index, 1);
         }else{
           let index = this.beerSelection.rest.findIndex((value, index, obj) => value.title === data.title);
           this.beerSelection.rest.splice(index, 1)
         }
      }
    ); 


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


    
  }

  productClicked(e: any, product: any){
    console.log(e);

    if(!e.ctrlKey && !e.metaKey)
      this.navCtrl.push(ProductPage, {
        'product': product
      });
    else
      this.dataService.sendToEdit(product);
  }



  move(amount: number): string {
    return amount + "px"
  }


  searchList(ev: any){
    let query = ev.target.value;

    if(query.length == 0)
      this.searchedList = null;
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
