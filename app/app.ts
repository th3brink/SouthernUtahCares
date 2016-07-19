import {Component, ViewChild} from '@angular/core';
import {HTTP_PROVIDERS} from '@angular/http';
import {ionicBootstrap, Platform, MenuController, Nav} from 'ionic-angular';
import {StatusBar} from 'ionic-native';

import {HomePage} from './pages/home/home';
import {NewsFeed} from './pages/newsfeed/newsfeed';
import {CalendarPage} from './pages/calendar/calendar';
import {DirectoryPage} from './pages/directory/directory';
import {PhoneBookPage} from './pages/phonebook/phonebook';
import {CalendarService} from './providers/calendar-service/calendar-service';


@Component({
  templateUrl: 'build/app.html',
  providers: [HTTP_PROVIDERS]
})
class MyApp {
  @ViewChild(Nav) nav: Nav;

  // make HelloIonicPage the root (or first) page
  rootPage: any = HomePage;
  pages: Array<{title: string, component: any}>;

  constructor(
    private platform: Platform,
    private menu: MenuController,
    public calendarService: CalendarService
  ) {
    this.initializeApp();

    // set our app's pages
    this.pages = [
      { title: 'Home', component: HomePage },
      { title: 'News Feed', component: NewsFeed },
      { title: 'Calendar', component: CalendarPage },
      { title: 'Directory', component: DirectoryPage },
      { title: 'Phone Book', component: PhoneBookPage }
    ];
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
    });
  }

  openPage(page) {
    console.log(this.calendarService.fctoggle);
    // close the menu when clicking a link from the menu
    this.menu.close();
    // navigate to the new page if it is not the current page
    this.nav.setRoot(page.component);
  }
}

ionicBootstrap(MyApp, [
  CalendarService
  ]);
