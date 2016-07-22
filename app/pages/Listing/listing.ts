import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';


@Component({
  templateUrl: 'build/pages/listing/listing.html',
})
export class Listing {
 post: any;

  constructor(private nav: NavController, navParams: NavParams) {
    // If we navigated to this page, we will have an item available as a nav param
    this.post = navParams.get('post');
    

}
}
