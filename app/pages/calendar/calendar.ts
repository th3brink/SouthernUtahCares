import {Component} from '@angular/core';
import {Http} from '@angular/http';
import {Inject} from '@angular/core'
import {NavController, NavParams} from 'ionic-angular';
import {Post} from '../post/post';
import {CalendarService} from '../../providers/calendar-service/calendar-service';


@Component({
  templateUrl: 'build/pages/calendar/calendar.html',
  providers: [CalendarService]
})
export class CalendarPage {
  public posts: any;
  public currentevents: any;
  public today: any;

  constructor(public calendarService: CalendarService, private nav: NavController, navParams: NavParams) {
   
   this.today = new Date();
   this.today = this.today.toLocaleString();
   this.loadPosts();
    
  }

loadPosts(){
  this.calendarService.load()
  .then(data => {
    this.organizePosts(data);
    this.posts = data;

  });
}

organizePosts(data){
  console.log(data);
  this.calendarService.organize(data)
    this.posts = data;
    console.log(this.posts)
  }


openPost(post) {
  console.log('hit');
    this.nav.push(Post, {
      post: post
    });
    }
  }
