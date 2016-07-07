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

  constructor(public calendarService: CalendarService, private nav: NavController, navParams: NavParams) {
   
   this.loadPosts();
  }

loadPosts(){
  this.calendarService.load()
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
