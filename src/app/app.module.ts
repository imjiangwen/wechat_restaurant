import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { BusinessInfo } from '../pages/business-info/business-info';
import { DiscountEvent } from '../pages/discount-event/discount-event';
import { FoodMenu } from '../pages/food-menu/food-menu';
import { MyOrder } from '../pages/my-order/my-order';
import { PlayGame } from '../pages/play-game/play-game';
import { UserCenter } from '../pages/user-center/user-center';
import { CartPage } from '../pages/food-menu/cart-page/cart-page';
import { ConfirmOrder } from '../pages/food-menu/confirm-order/confirm-order';


@NgModule({
  declarations: [
    MyApp,
    BusinessInfo,
    DiscountEvent,
    FoodMenu,
    MyOrder,
    PlayGame,
    UserCenter,
    CartPage,
    ConfirmOrder
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
     MyApp,
     BusinessInfo,
     DiscountEvent,
     FoodMenu,
     MyOrder,
     PlayGame,
     UserCenter,
     CartPage,
     ConfirmOrder
  ],
  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler}]
})
export class AppModule {}
