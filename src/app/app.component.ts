import { Component, ViewChild } from '@angular/core';

import { Platform, MenuController, Nav } from 'ionic-angular';

import { StatusBar, Splashscreen } from 'ionic-native';

import { BusinessInfo } from '../pages/business-info/business-info';
import { DiscountEvent } from '../pages/discount-event/discount-event';
import { FoodMenu } from '../pages/food-menu/food-menu';
import { MyOrder } from '../pages/my-order/my-order';
import { PlayGame } from '../pages/play-game/play-game';
import { UserCenter } from '../pages/user-center/user-center';

declare var Wechat: any;


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  // make HelloIonicPage the root (or first) page
  rootPage: any = FoodMenu;
  pages: Array<{title: string, component: any}>;
  isTheme1 :boolean = false;
  isTheme2 :boolean = true;

  constructor(
    public platform: Platform,
    public menu: MenuController
  ) {
    this.initializeApp();

    // set our app's pages
    this.pages = [
      { title: '菜单点餐', component: FoodMenu },
      { title: '商家信息', component: BusinessInfo},
      { title: '个人中心', component: UserCenter},
      { title: '我的订单', component: MyOrder},
      { title: '优惠活动', component: DiscountEvent},
      { title: '玩玩游戏', component: PlayGame}
    ];


    

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
      Splashscreen.hide();
    });

  

  }

  openPage(page) {
    // close the menu when clicking a link from the menu
    this.menu.close();
    // navigate to the new page if it is not the current page
    this.nav.setRoot(page.component);
  }
  changeTheme(){
    if(this.isTheme1){
      this.isTheme2 = false;
    }else{
      this.isTheme2 = true;
    }
  }


}
