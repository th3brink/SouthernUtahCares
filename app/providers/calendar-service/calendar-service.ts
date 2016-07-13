import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the CalendarService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class CalendarService {
  data: any;
  x: any;

  constructor(private http: Http) {
    this.data = null;
  }

  load() {
    if (this.data) {
      // already loaded data
      return Promise.resolve(this.data);
    }

    // don't have the data yet
    return new Promise(resolve => {
      // We're using Angular Http provider to request the data,
      // then on the response it'll map the JSON data to a parsed JS object.
      // Next we process the data and resolve the promise with the new data.
      this.http.get('http://southernutahcares.com/wp-json/wp/v2/events?per_page=100')
        .map(res => res.json())
        .subscribe(data => {
          // we've got back the raw data, now generate the core schedule data
          // and save the data for later reference
          this.data = data;
          resolve(this.data);
        });
    });
  }

  organize(data) {

    this.data.forEach(function (arrayItem) {
      arrayItem.start = new Date(arrayItem.start * 1000);
      // arrayItem.start = arrayItem.start.toLocaleString();
    });

    this.data.forEach(function (arrayItem) {
      if (arrayItem.recurrence_dates != null) {
        var x = arrayItem.recurrence_dates.split(",");
        console.log(x);
        x.forEach(function (icalStr) {
          console.log(icalStr);
          console.log(arrayItem.start)
          var time = arrayItem.start.toString()
          var strYear = icalStr.substr(0, 4);
          var strMonth = parseInt(icalStr.substr(4, 2), 10) - 1;
          var strDay = icalStr.substr(6, 2);
          var strHour = time.substr(16, 2);
          var strMin = time.substr(19, 2);
          var strSec = time.substr(22, 2);

          var oDate = new Date(strYear, strMonth, strDay, strHour, strMin, strSec)

          console.log(oDate);
          x = oDate.toLocaleString();
          console.log(x);
        });
        

      }

    });

this.data.forEach(function (arrayItem) {
          arrayItem.start = arrayItem.start.toLocaleString();
        });

    this.data.sort((a, b) => {
      if (a.start < b.start) {
        return -1;
      } else if (a.start > b.start) {
        return 1;
      } else {
        return 0;
      }
    });

    return this.data;
  }

  calenDate(icalStr) {
    console.log(icalStr);
    // icalStr = '20110914T184000Z'             
    var strYear = icalStr.substr(0, 4);
    var strMonth = parseInt(icalStr.substr(4, 2), 10) - 1;
    var strDay = icalStr.substr(6, 2);
    var strHour = icalStr.substr(9, 2);
    var strMin = icalStr.substr(11, 2);
    var strSec = icalStr.substr(13, 2);

    var oDate = new Date(strYear, strMonth, strDay, strHour, strMin, strSec)

    return oDate;
  }
}

