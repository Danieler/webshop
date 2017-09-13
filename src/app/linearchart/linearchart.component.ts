
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

  // Doughnut
  public doughnutChartLabels: Array<any> = [];
  public doughnutChartData: Array<any> = [];
  public doughnutChartType:string = 'doughnut';

  public doughnutChartColors: Array<any> = [
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
    }];

  constructor(public _cs: CouponsService){
    _cs.Coupons.subscribe(
      (data) => {

        //tiendas diferentes
        let shops: any = _(data['coupons'])
          .flatten()
          .uniqBy('webshop_id')
          .map(i => _.pick(i, 'webshop_id'))
          .value();

        shops = shops.map(function(shop) {
          return shop.webshop_id
        });

        //valores de cupon diferentes
        let couponsvalues: any = _(data['coupons'])
          .flatten()
          .uniqBy('value')
          .map(i => _.pick(i, 'value'))
          .value();

        couponsvalues = couponsvalues.map(function(value) {
          return value.value
        });


        //elimino nulls y ordeno
        couponsvalues = _.compact(_.sortBy(couponsvalues));

        this.lineChartLabels = couponsvalues;//labels del grafico lineal


        var doughnutArray = [];

        shops.forEach( element => {
          doughnutArray.push(_.filter(data['coupons'], { webshop_id: element}).length)
          this.doughnutChartLabels.push(element);
        });


        this.doughnutChartData = doughnutArray;


        //agrupo cupones por tienda y valor
        var couponsshorted = {};
        for(let i=0;i<shops.length; i++){
          couponsshorted[shops[i]] = {};
          for(let j=0;j<couponsvalues.length; j++) {
            couponsshorted[shops[i]][couponsvalues[j]] = _.filter(data['coupons'], {value: couponsvalues[j], webshop_id: shops[i]});
          }
        }


        //creo array como el grafico lo necesita
        var finalDataArray = [];

        for(var propts in couponsshorted) {
          finalDataArray.push({data: [], label: propts})
          for(var proptc in couponsshorted[propts]){
            _.find(finalDataArray, function(obj) {
              return obj.label === propts;
            }).data.push(couponsshorted[propts][proptc].length)
          }

        }

        finalDataArray.forEach((element) =>
          this.lineChartData.push(element));

      }
    );

  }

  // events
  public chartClicked(e:any):void {
    console.log(e);
  }

  public chartHovered(e:any):void {
    console.log(e);
  }
}
