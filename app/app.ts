import {Component, ViewChild} from '@angular/core';
import {HTTP_PROVIDERS} from '@angular/http';
import {ionicBootstrap, Platform, MenuController, Nav} from 'ionic-angular';
import {StatusBar} from 'ionic-native';

import {HomePage} from './pages/home/home';
import {NewsFeed} from './pages/newsfeed/newsfeed';
import {CalendarPage} from './pages/calendar/calendar';
import {DirectoryPage} from './pages/directory/directory';


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
    private menu: MenuController
  ) {
    this.initializeApp();

    // set our app's pages
    this.pages = [
      { title: 'Home', component: HomePage },
      { title: 'News Feed', component: NewsFeed },
      { title: 'Calendar', component: CalendarPage },
      { title: 'Directory', component: DirectoryPage }
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
    // close the menu when clicking a link from the menu
    this.menu.close();
    // navigate to the new page if it is not the current page
    this.nav.setRoot(page.component);
  }
}

ionicBootstrap(MyApp);
