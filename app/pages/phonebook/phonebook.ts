import {Component} from '@angular/core';
import {Http} from '@angular/http';
import {Inject} from '@angular/core'
import {NavController, NavParams} from 'ionic-angular';
import {Post} from '../post/post';
import {PhoneBookService} from '../../providers/phone-book-service/phone-book-service';


@Component({
  templateUrl: 'build/pages/newsfeed/newsfeed.html',
  providers: [PhoneBookService]
})
export class PhoneBookPage {
  public posts: any;

  constructor(public phoneBookService: PhoneBookService, private nav: NavController, navParams: NavParams) {
   
   this.loadPosts();
  }

loadPosts(){
  this.phoneBookService.load()
  .then(data => {
    this.posts = data;
  });
}

openPost(post) {
  console.log('hit');
    this.nav.push(Post, {
      post: post
    });
    }
  }
