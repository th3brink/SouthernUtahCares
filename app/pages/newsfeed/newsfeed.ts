import {Component} from '@angular/core';
import {Http} from '@angular/http';
import {Inject} from '@angular/core'
import {NavController, NavParams} from 'ionic-angular';
import {Post} from '../post/post';
import {PostService} from '../../providers/post-service/post-service';


@Component({
  templateUrl: 'build/pages/newsfeed/newsfeed.html',
  providers: [PostService]
})
export class NewsFeed {
  public posts: any;

  constructor(public postService: PostService, private nav: NavController, navParams: NavParams) {

    this.loadPosts();
  }

  loadPosts() {
    this.postService.load()
      .then(data => {
        this.posts = data;
      });
  }

  openPost(post) {
    this.nav.push(Post, {
      post: post
    });
  }

  doRefresh(refresher) {
    this.postService.reload()
      .then(data => {
        this.posts = data;
      });
    refresher.complete();
  }

  doInfinite(infinitescroll) {
    this.postService.load()
      .then(data => {
        // this.posts = data;
        this.posts = this.posts.concat(data);
      });
    infinitescroll.complete();

  }

}

