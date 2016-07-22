import {Component} from '@angular/core';
import {Http} from '@angular/http';
import {Inject} from '@angular/core'
import {NavController, NavParams} from 'ionic-angular';
import {Listing} from '../listing/listing';
import {DirectoryService} from '../../providers/directory-service/directory-service';


@Component({
  templateUrl: 'build/pages/directory/directory.html',
  providers: [DirectoryService]
})
export class DirectoryPage {
  public posts: any;

  constructor(public directoryService: DirectoryService, private nav: NavController, navParams: NavParams) {
   
   this.loadPosts();
  }

loadPosts(){
  this.directoryService.load()
  .then(data => {
    this.posts = data;
  });
}

openPost(post) {
  console.log('hit');
    this.nav.push(Listing, {
      post: post
    });
    }
  }
