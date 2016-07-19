import {Component} from '@angular/core';
import {Http} from '@angular/http';
import {Inject} from '@angular/core'
import {NavController, NavParams, MenuController} from 'ionic-angular';
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
  public filtercharity: any;
  public fctoggle: any;
  public filtercommunity: any;
  public fcotoggle: any;
  public filterclasses: any;
  public fcltoggle: any;
  public filterarts: any;
  public fatoggle: any;
  public month: any;
  public day: any;

  constructor(public calendarService: CalendarService, private nav: NavController, navParams: NavParams) {

    this.today = new Date();
    this.filtercharity = "71";
    this.filtercommunity = "70";
    this.filterclasses = "90";
    this.filterarts = "66";
    this.fctoggle = "true";
    this.fcotoggle = "true";
    this.fcltoggle = "true";
    this.fatoggle = "true";
    this.loadPosts();
    this.month = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December' ]
    this.day = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']

  }

  fctoggleswitch() {
    if (this.fctoggle) {
      this.filtercharity = "71";
    } else {
      this.filtercharity = null;
    }
  }

  fcotoggleswitch() {
    if (this.fcotoggle) {
      this.filtercommunity = "70";
    } else {
      this.filtercommunity = null;
    }
  }

  fcltoggleswitch() {
    if (this.fcltoggle) {
      this.filterclasses = "90";
    } else {
      this.filterclasses = null;
    }
  }

  fatoggleswitch() {
    if (this.fatoggle) {
      this.filterarts = "66";
    } else {
      this.filterarts = null;
    }
  }

  loadPosts() {
    this.calendarService.load()
      .then(data => {
        this.organizePosts(data);
        this.posts = data;

      });
  }

  organizePosts(data) {
    this.calendarService.organize(data)
    this.posts = data;
    console.log(this.posts);
  }


  openPost(post) {
    console.log('hit');
    this.nav.push(Post, {
      post: post
    });
  }

  public parseContent(content: string): string {
    return content.replace(/<\/?[^>]+(>|$)/g, "");
  }

  headerDate(arr, i) {
    // console.log(i);
    // return true;
    if (arr[i].start.getDate() !== arr[i-1].start.getDate() || arr[i].start.getMonth() !== arr[i-1].start.getMonth()) {
    return true;
    } else {
      return false;
    }
  }

}
