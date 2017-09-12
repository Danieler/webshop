
import { Component } from '@angular/core';
import { CouponsService } from '../coupons.service';
import * as _ from "lodash";

@Component({
  selector: 'app-linearchart',
  templateUrl: './linearchart.component.html',
  styleUrls: ['./linearchart.component.css']
})
export class LinearchartComponent {

  // lineChart
  public lineChartData:Array<any> = [];

  public lineChartLabels: Array<any> = [];

  public lineChartOptions:any = {
    responsive: true
  };
  public lineChartColors:Array<any> = [
    { // grey
      backgroundColor: 'rgba(148,159,177,0.2)',
      borderColor: 'rgba(148,159,177,1)',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    },
    { // dark grey
      backgroundColor: 'rgba(77,83,96,0.2)',
      borderColor: 'rgba(77,83,96,1)',
      pointBackgroundColor: 'rgba(77,83,96,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(77,83,96,1)'
    },
    { // grey
      backgroundColor: 'rgba(148,159,177,0.2)',
      borderColor: 'rgba(148,159,177,1)',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    }
  ];
  public lineChartLegend: boolean = true;
  public lineChartType: string = 'line';

  constructor(public _cs: CouponsService){
    _cs.Coupons.subscribe(
      (data) => {
        const mydata: any = data['coupons'];

        var shops: any = _(data['coupons'])
          .flatten()
          .uniqBy('webshop_id')
          .map(i => _.pick(i, 'webshop_id'))
          .value();

        shops = shops.map(function(shop) {
          return shop.webshop_id
        });

        var couponsvalue: any = _(data['coupons'])
          .flatten()
          .uniqBy('value')
          .map(i => _.pick(i, 'value'))
          .value();

        couponsvalue = couponsvalue.map(function(value) {
          return value.value
        });

        this.lineChartLabels = _.sortBy(couponsvalue);

        this.lineChartData.push({data: [65, 59, 80, 81, 56, 55, 40, 11, 60, 70, 33, 5, 40, 90, 60], label: shops[0]});
        this.lineChartData.push({data: [28, 48, 40, 19, 86, 27, 90, 18, 48, 77, 9, 100, 27, 40, 70], label: shops[1]});
        this.lineChartData.push({data: [18, 48, 77, 9, 100, 27, 40, 65, 59, 80, 81, 56, 55, 40, 11], label: shops[2]});


        console.log(_.filter(mydata, {webshop_id: 'macys'}));

      }
    );

  }

  public randomize():void {
    let _lineChartData:Array<any> = new Array(this.lineChartData.length);
    for (let i = 0; i < this.lineChartData.length; i++) {
      _lineChartData[i] = {data: new Array(this.lineChartData[i].data.length), label: this.lineChartData[i].label};
      for (let j = 0; j < this.lineChartData[i].data.length; j++) {
        _lineChartData[i].data[j] = Math.floor((Math.random() * 100) + 1);
      }
    }
    this.lineChartData = _lineChartData;
  }

  // events
  public chartClicked(e:any):void {
    console.log(e);
  }

  public chartHovered(e:any):void {
    console.log(e);
  }
}
