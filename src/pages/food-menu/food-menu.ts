import { Component } from '@angular/core';
import { ModalController , NavController, NavParams} from 'ionic-angular';
import { CartPage } from './cart-page/cart-page';
import { ConfirmOrder } from './confirm-order/confirm-order';
import { AlertController,ToastController } from 'ionic-angular';
import * as $ from "jquery";

@Component({
  selector: 'food-menu',
  templateUrl: 'food-menu.html'
})
export class FoodMenu {
  imgUrl : any;
  imgName :any;
  isAllFood : boolean = true;
  bigImg : boolean;
  foodType : Array<{typeId:string,typeName:string,foods:any,isActive:boolean}>;
  orderInfo : {orderId:any,eachFood:any,orderState:any,orderTime:any,tSum:any,tPrice:any};
  food : {foodInfo:any,sum:any,tPrice:any};
  type_1 : any;
  type_2 : any;
  type_3 : any;
  type_4 : any;
  type_5 : any;


  constructor(public cartPage : ModalController,public nav: NavController,public alertCtrl: AlertController,public toastCtrl: ToastController) {
    this.imgUrl = "";
    this.imgName = "";
    this.bigImg = false;
    this.initAllFood();
    this.initOrder();
    this.initFly();
  }

  initOrder(){
    this.initAllFood();
    let arr = [];
    for (let i=0;i<this.foodType.length;i++) {
      for(let j=0;j<this.foodType[i].foods.length;j++){
       this.food = {foodInfo:this.foodType[i].foods[j],sum:0,tPrice:0.00};
       arr.push(this.food );
      }
    }
    this.orderInfo = {orderId:"000000",orderState:"open",orderTime:"2017-03-01 08:12:23",eachFood:arr,tSum:0,tPrice:0.00};
  }


  initAllFood(){
    this.type_1 = [
      {foodId:"food_1",foodName:"鸡米饭",foodPrice:12.25,foodSV:100},
      {foodId:"food_2",foodName:"鸭米饭",foodPrice:12.2,foodSV:99},
      {foodId:"food_3",foodName:"狗米饭",foodPrice:12.5,foodSV:1010},
      {foodId:"food_4",foodName:"猪米饭",foodPrice:17.25,foodSV:120},
      {foodId:"food_5",foodName:"牛米饭",foodPrice:19.25,foodSV:103},
      {foodId:"food_6",foodName:"鼠米饭",foodPrice:19.25,foodSV:11},
      {foodId:"food_7",foodName:"羊米饭",foodPrice:12.25,foodSV:10},
      {foodId:"food_8",foodName:"鱼米饭",foodPrice:16.25,foodSV:15}
    ];
    this.type_2 = [
      {foodId:"food_9",foodName:"鸡酒水",foodPrice:12.25,foodSV:100},
      {foodId:"food_10",foodName:"鸭酒水",foodPrice:12.2,foodSV:99},
      {foodId:"food_11",foodName:"狗酒水",foodPrice:12.5,foodSV:1010},
      {foodId:"food_12",foodName:"猪酒水",foodPrice:17.25,foodSV:120},
      {foodId:"food_30",foodName:"牛酒水",foodPrice:17.25,foodSV:120},
      {foodId:"food_31",foodName:"鼠酒水",foodPrice:17.25,foodSV:120},
      {foodId:"food_32",foodName:"羊酒水",foodPrice:17.25,foodSV:120},
      {foodId:"food_33",foodName:"鱼酒水",foodPrice:17.25,foodSV:120}
    ];
    this.type_3 = [
      {foodId:"food_13",foodName:"鸡荤菜",foodPrice:12.25,foodSV:100},
      {foodId:"food_14",foodName:"鸭荤菜",foodPrice:12.2,foodSV:99},
      {foodId:"food_15",foodName:"狗荤菜",foodPrice:12.5,foodSV:1010},
      {foodId:"food_16",foodName:"猪荤菜",foodPrice:17.25,foodSV:120}
    ];
    this.type_4 = [
      {foodId:"food_17",foodName:"鸡素菜",foodPrice:12.25,foodSV:100},
      {foodId:"food_18",foodName:"鸭素菜",foodPrice:12.2,foodSV:99},
      {foodId:"food_19",foodName:"狗素菜",foodPrice:12.5,foodSV:1010},
      {foodId:"food_28",foodName:"鱼素菜",foodPrice:12.5,foodSV:1010},
      {foodId:"food_29",foodName:"样素菜",foodPrice:12.5,foodSV:1010},
      {foodId:"food_20",foodName:"牛素菜",foodPrice:17.25,foodSV:120}
    ];
    this.type_5 = [
      {foodId:"food_21",foodName:"鸡汤类",foodPrice:12.25,foodSV:100},
      {foodId:"food_22",foodName:"鸭汤类",foodPrice:12.2,foodSV:99},
      {foodId:"food_23",foodName:"狗汤类",foodPrice:12.5,foodSV:1010},
      {foodId:"food_24",foodName:"猪汤类",foodPrice:17.25,foodSV:120},
      {foodId:"food_25",foodName:"样汤类",foodPrice:17.25,foodSV:120},
      {foodId:"food_26",foodName:"牛汤类",foodPrice:17.25,foodSV:120},
      {foodId:"food_27",foodName:"马汤类",foodPrice:17.25,foodSV:120}
    ];
    this.foodType = [
      { typeId: "type_1", typeName: "米饭" ,foods:this.type_1,isActive:false},
      { typeId: "type_2", typeName: "酒水" ,foods:this.type_2,isActive:false},
      { typeId: "type_3", typeName: "荤菜" ,foods:this.type_3,isActive:false},
      { typeId: "type_4", typeName: "素菜" ,foods:this.type_4,isActive:false},
      { typeId: "type_5", typeName: "汤类" ,foods:this.type_5,isActive:false}
    ];
  }

  clickType(typeId){
    this.initAllFood();
    this.isAllFood = false;
    if(typeId=="all"){
      this.isAllFood = true;
      $("#search-food").fadeIn("slow");
    }else{
      $("#search-food").fadeOut("slow");
    }

    this.foodType = this.foodType.filter((i)=>{
          i.isActive = false;
          if(i.typeId==typeId){
            i.isActive = true;
          }else if(typeId!="all"){
            i.foods = null;
          }
          return true;
        });

  }

  scrollType($event){
    $event.target.scrollTop;
    
  }

  showBigImg(imgUrl,imgName){
    this.bigImg = true;
    this.imgUrl = imgUrl;
    this.imgName = imgName;
  }
  hideBigImg() {
      this.bigImg = false;
  }

  searchFood(ev: any) {
      this.initAllFood();
      // set val to the value of the searchbar
      let val = ev.target.value;
      this.fiterFood(val);
    }

  fiterFood(val){
    if (val && val.trim() != '') {
      for (let i=0;i<this.foodType.length;i++) {
        this.foodType[i].foods = this.foodType[i].foods.filter((i)=>{
          return (i.foodName.toLowerCase().indexOf(val.toLowerCase()) > -1);
        });
      }

    }else{
      this.initAllFood();
    }
  }

  presentCartPage() {

    if(this.orderInfo.tSum==0){
      let toast = this.toastCtrl.create({
            message: '购物车为空',
            duration: 1000,
            position: "middle"
          });
      toast.present(toast);
    }else{
       let modal = this.cartPage.create(CartPage,this.orderInfo);
       modal.present();
    }


   }

  openConfirmOrder() {
    if(this.orderInfo.tSum==0){
      let toast = this.toastCtrl.create({
            message: '购物车为空',
            duration: 1000,
            position: "middle"
          });
      toast.present(toast);
    }else{
       this.nav.push(ConfirmOrder,this.orderInfo);
     }
   }


 cartRemove(foodId){
    this.changeOrder(foodId,"remove");
 }

 cartAdd(e,foodId){
    //飞入购物车
    this.fly($(e.target));
    setTimeout(this.changeOrder(foodId,"add"),500);
 }
 initFly(){
  //预设5个抛物点
  let $pointDiv = $('<div id="pointDivs">').appendTo('body');
  for(let i = 0;i<5;i++){
      $('<div class="point-outer point-pre"><div class="point-inner"/></div>').appendTo($pointDiv);
  }
 }
 fly(e){
  //获取开始点坐标
  let startOffset = $(e).offset();
  //获取结束点坐标
  let endTop = window.innerHeight - 30, endLeft = 20,left = startOffset.left+10,top = startOffset.top+10;
  let outer = $('#pointDivs .point-pre').first().removeClass("point-pre").css({left:left+'px',top:top+'px'});
  let inner = outer.find(".point-inner");
  setTimeout(function(){
    outer[0].style.webkitTransform = 'translate3d(0,'+(endTop - top)+'px,0)';
    inner[0].style.webkitTransform = 'translate3d('+(endLeft - left)+'px,0,0)';
    setTimeout(function(){
      outer.removeAttr("style").addClass("point-pre");
      inner.removeAttr("style");
      $(".allnum").addClass("animation");
      setTimeout(function(){
        $(".allnum").removeClass("animation");
      },400);
    },350);
  },0);
 }


 changeOrder(foodId,method){
    let tSum = 0;
    let tPrice = 0.00;
    for(let i=0;i<this.orderInfo.eachFood.length;i++){
      if(this.orderInfo.eachFood[i].foodInfo.foodId==foodId){
        if(method=="add"){
          this.orderInfo.eachFood[i].sum = this.orderInfo.eachFood[i].sum + 1;
        }
        if(method=="remove" && this.orderInfo.eachFood[i].sum>0){
          this.orderInfo.eachFood[i].sum = this.orderInfo.eachFood[i].sum - 1;
        }
        this.orderInfo.eachFood[i].tPrice = this.orderInfo.eachFood[i].sum * this.orderInfo.eachFood[i].foodInfo.foodPrice;
        this.orderInfo.eachFood[i].tPrice = parseFloat(this.orderInfo.eachFood[i].tPrice.toFixed(2));
      }
      tSum = tSum + this.orderInfo.eachFood[i].sum;
      tPrice = tPrice + this.orderInfo.eachFood[i].tPrice;
    }
    this.orderInfo.tSum = tSum;
    this.orderInfo.tPrice = parseFloat(tPrice.toFixed(2));
}



}
