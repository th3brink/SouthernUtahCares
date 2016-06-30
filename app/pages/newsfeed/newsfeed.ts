import {Component} from '@angular/core';
import {Http} from '@angular/http';
import {Inject} from '@angular/core'
import {NavController, NavParams} from 'ionic-angular';
import {Post} from '../post/post';



@Component({
  templateUrl: 'build/pages/newsfeed/newsfeed.html',

})
export class NewsFeed {
  http: Http;
  posts: any;

  constructor(@Inject(Http) httpService, private nav: NavController, navParams: NavParams) {
    this.http = httpService;

    this.http.get("http://southernutahcares.com/wp-json/wp/v2/posts?filter[category_name]=newsfeed").subscribe(data => {
      console.log("got JSON data");
      this.posts = JSON.parse(data._body);
      console.log(this.posts);
    }, error => {
    console.log("Error retrieving data");
    });
  }

openPost(post) {
  console.log('hit');
    this.nav.push(Post, {
      post: post
    });
    }
  }

