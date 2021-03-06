import { Injectable, Output, EventEmitter } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import * as Rx from 'rxjs/Rx';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {Observable} from 'rxjs/Observable';



@Injectable()
export class CalendarService {
  data: any;
  test: any;
  public currentevents: any;
  public date: any;
  
  public fctoggle: any;
  public filtercommunity: any;
  public fcotoggle: any;
  public filterclasses: any;
  public fcltoggle: any;
  public filterarts: any;
  public fatoggle: any;
  public filtercharity: any;
  public subList: Array<any> = [];

  // public fctoggled = new BehaviorSubject<string>('71');
  // public filtercharity$ = this.fctoggled.asObservable();


  constructor(private http: Http) {

    this.data = null;
    this.test = "yea it worked";
    this.date = new Date();
    // this.filtercharity$ = this.fctoggled.asObservable();
    this.filtercommunity = "70";
    this.filterclasses = "90";
    this.filterarts = "66";
    this.fctoggle = "true";
    this.fcotoggle = "true";
    this.fcltoggle = "true";
    this.fatoggle = "true";
    this.filtercharity = '71';
    // this.fctoggled.next(this.filtercharity)
  }

  subscribe(cb: any) {
    console.log('searched ', cb);
    if (cb) this.subList.push(cb);
  }

  publish(data: any) {
          console.log('published ', data)
         this.subList.forEach((cb: any, i)=>{
             cb(data);
         });
  }
  
  fctoggleswitch() {
    if (this.fctoggle) {
      this.filtercharity = "71";
    } else {
      this.filtercharity = "0";
    }
    this.publish(this.filtercharity);
    // cb(this.filtercharity);
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

  load() {
    if (this.data) {
      return Promise.resolve(this.data);
    }

    return new Promise(resolve => {
      this.http.get('http://southernutahcares.com/wp-json/wp/v2/events?per_page=100')
        .map(res => res.json())
        .subscribe(data => {
          this.data = data;
          resolve(this.data);
        });
    });
  }


  organize(data) {
    
    var date = new Date();
    var date2 = date.setHours(0,0,0,0);
    // this.data.forEach(function (arrayItem) {
    //   arrayItem.start = new Date(arrayItem.start * 1000);
    // });

    this.data.forEach(function (arrayItem) {
      arrayItem.start = new Date(arrayItem.start * 1000);
      if (arrayItem.recurrence_dates != null) {
        var recurevents = arrayItem.recurrence_dates.split(",");
        recurevents.forEach(function (icalStr) {
          var time = arrayItem.start.toString()
          var strYear = icalStr.substr(0, 4);
          var strMonth = parseInt(icalStr.substr(4, 2), 10) - 1;
          var strDay = icalStr.substr(6, 2);
          var strHour = time.substr(16, 2);
          var strMin = time.substr(19, 2);
          var strSec = time.substr(22, 2);

          var oDate = new Date(strYear, strMonth, strDay, strHour, strMin, strSec)
          if (oDate.getTime() >= date2) {
          var newObject = Object.assign({}, arrayItem);
          newObject.start = oDate;
          data.push(newObject);
          }
        });
      }
    });

    this.data.sort((a, b) => {
      a = new Date(a.start);
      b = new Date(b.start);
      return b > a ? -1 : b < a ? 1 : 0;
    });

    return this.data;
  }

}

