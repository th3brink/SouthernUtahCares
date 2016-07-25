import {Component, Input } from '@angular/core';
import {Http} from '@angular/http';
import {Inject} from '@angular/core'
import {NavController, NavParams, MenuController} from 'ionic-angular';
import {Subscription} from 'rxjs/Subscription';

// import {MyApp} from '../../app';
import {Event} from '../event/event';
import {CalendarService} from '../../providers/calendar-service/calendar-service';

@Component({
  templateUrl: 'build/pages/calendar/calendar.html',
  // directives: [MyApp],
  providers: [CalendarService],
})
export class CalendarPage {
  public posts: any;
  public currentevents: any;
  public today: any;
  public filtercharity: string = '';
  public fctoggle: any;
  public filtercommunity: any;
  public fcotoggle: any;
  public filterclasses: any;
  public fcltoggle: any;
  public filterarts: any;
  public fatoggle: any;
  public month: any;
  public day: any;
  public todaydate: any;
  

  constructor(public calendarService: CalendarService, private nav: NavController, navParams: NavParams) {

    calendarService.subscribe((data)=>{
      console.log('sub text ', data)
      this.filtercharity = data;
    });
console.log(this.filtercharity);
    this.today = new Date();
    this.todaydate = this.today.setHours(0,0,0,0);
    // this.filtercharity = "0";
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

// calendarService.filtercharity$.subscribe(filtercharity => this.filtercharity = filtercharity);
}
  // fctoggleswitch(data) {
  //   this.filtercharity = data;
  //   console.log(this.filtercharity);

    // if (this.fctoggle) {
    //   this.filtercharity = "71";
    // } else {
    //   this.filtercharity = null;
    // }
  // }

  fcotoggleswitch() {
    if (this.fcotoggle) {
      this.filtercommunity = "70";
    } else {
      this.filtercommunity = "null";
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
    this.nav.push(Event, {
      post: post
    });
  }

  public parseContent(content: string): string {
    return content.replace(/<\/?[^>]+(>|$)/g, "");
  }

  headerDate(arr, i) {
    var findCard = true;
    var x = 1;
    while (findCard == true) { 
      if (arr[i-x].term_taxonomy_id==this.filtercharity || 
      arr[i-x].term_taxonomy_id==this.filtercommunity || 
      arr[i-x].term_taxonomy_id==this.filterclasses ||
      arr[i-x].term_taxonomy_id==this.filterarts) {
        findCard = false;
      } else {
        x++;
      }
    }

    if ( 
      //  (arr[i].term_taxonomy_id==this.filtercharity || 
      //  arr[i].term_taxonomy_id==this.filtercommunity || 
      //  arr[i].term_taxonomy_id==this.filterclasses ||
      //  arr[i].term_taxonomy_id==this.filterarts) && 
       arr[i].start.getDate() !== arr[i-x].start.getDate() || 
       arr[i].start.getMonth() !== arr[i-x].start.getMonth()
       ) {
    return true;
    } else {
      return false;
    }
  }

}
