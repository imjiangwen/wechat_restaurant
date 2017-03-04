import { Component } from '@angular/core';
import { ViewController } from 'ionic-angular';
import { AlertController , NavParams} from 'ionic-angular';


@Component({
  selector: 'cart-page',
  templateUrl: 'cart-page.html'
})
export class CartPage {
  
  orderInfoCart;

  constructor(public viewCtrl: ViewController,public alertCtrl: AlertController,public params: NavParams,) {
  	this.filterOrderInfo(this.params.data);
  }

  filterOrderInfo(data){
      this.orderInfoCart = data.eachFood.filter((item)=>{
        return (item.sum > 0);
      });
  }
  
  dismiss() {
      this.viewCtrl.dismiss();
  }

  markFood(foodId,foodName){
    let alert = this.alertCtrl.create();
       alert.setTitle(foodName + ':请选择您爱好的口味?');
       alert.addInput({
         type: 'checkbox',
         label: '不辣',
         value: 'nohot',
         checked: true
       });
       alert.addInput({
         type: 'checkbox',
         label: '微辣',
         value: 'littlehot'
       });
       alert.addInput({
         type: 'checkbox',
         label: '特辣',
         value: 'verryhot'
       });
       alert.addInput({
         type: 'checkbox',
         label: '少盐',
         value: 'littlesalt'
       });
       alert.addInput({
         type: 'checkbox',
         label: '多盐',
         value: 'manysalt'
       });
       alert.addInput({
         type: 'checkbox',
         label: '不要味精',
         value: 'noaginomoto'
       });
       alert.addInput({
         type: 'checkbox',
         label: '不要蒜',
         value: 'nogarlic'
       });
       alert.addInput({
         type: 'checkbox',
         label: '其他',
         value: 'other'
       });
       

       alert.addButton('取消');
       alert.addButton({
         text: '确认',
         handler: data => {
          if(data.indexOf("other")!=-1){
            this.other();
          }
        }
       });
       alert.present();
    
  }
  other(){
    let prompt = this.alertCtrl.create({
      title: '其他口味',
      message: "请输入其他口味",
      inputs: [
        {
          name: 'other',
          placeholder: '其他口味'
        },
      ],
      buttons: [
        {
          text: '取消',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: '确认',
          handler: data => {
            console.log('Saved clicked');
          }
        }
      ]
    });
    prompt.present();
  }


  deleteFood(foodId){
    this.changeOrder(foodId,"delete");
  }

   cartRemove(foodId){
      this.changeOrder(foodId,"remove");
   }

   cartAdd(foodId){
      this.changeOrder(foodId,"add");
   }

   changeOrder(foodId,method){
      let tSum = 0;
      let tPrice = 0.00;
      for(let i=0;i<this.params.data.eachFood.length;i++){
        if(method=="clear"){
          this.params.data.eachFood[i].sum = 0;
          this.params.data.eachFood[i].tPrice = 0.00;
        }
        if(this.params.data.eachFood[i].foodInfo.foodId==foodId){
          if(method=="add"){
            this.params.data.eachFood[i].sum = this.params.data.eachFood[i].sum + 1;
          }
          if(method=="remove" && this.params.data.eachFood[i].sum>0){
            this.params.data.eachFood[i].sum = this.params.data.eachFood[i].sum - 1;
          }
          if(method=="delete"){
            this.params.data.eachFood[i].sum = 0;
          }
          this.params.data.eachFood[i].tPrice = this.params.data.eachFood[i].sum * this.params.data.eachFood[i].foodInfo.foodPrice;
          this.params.data.eachFood[i].tPrice = parseFloat(this.params.data.eachFood[i].tPrice.toFixed(2));
        }
        tSum = tSum + this.params.data.eachFood[i].sum;
        tPrice = tPrice + this.params.data.eachFood[i].tPrice;
      }
      this.params.data.tSum = tSum;
      this.params.data.tPrice = parseFloat(tPrice.toFixed(2));

      this.filterOrderInfo(this.params.data);
  }

  clearCart() {
      let confirm = this.alertCtrl.create({
        title: '购物车提示',
        message: '确认清空购物车吗?',
        buttons: [
          {
            text: '取消',
            handler: () => {
              
            }
          },
          {
            text: '确认',
            handler: () => {
              this.changeOrder(null,"clear");
              this.dismiss();
            }
          }
        ]
      });
      confirm.present();
    }

}
