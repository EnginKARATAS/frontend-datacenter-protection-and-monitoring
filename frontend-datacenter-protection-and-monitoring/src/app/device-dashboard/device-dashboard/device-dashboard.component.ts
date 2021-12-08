import { Component, NgModule, OnInit } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { Dht11Service } from 'src/app/core/dht11.service';
import { MqService } from 'src/app/core/mq.service';

@Component({
  selector: 'app-device-dashboard',
  templateUrl: './device-dashboard.component.html',
  styleUrls: ['./device-dashboard.component.css'],
})
export class DeviceDashboardComponent implements OnInit {

  
  

  multi: any[] = [];
  multi2: any[] = [];
  view: any[] = [1024, 300];

  // options
  legend: boolean = true;
  showLabels: boolean = true;
  animations: boolean = true;
  xAxis: boolean = true;
  yAxis: boolean = true;
  showYAxisLabel: boolean = true;
  showXAxisLabel: boolean = true;
  showYAxisLabel2: boolean = true;
  showXAxisLabel2: boolean = true;
  xAxisLabel: string = 'Time';
  yAxisLabel: string = 'Heat';
  xAxisLabel2: string = 'Air';
  yAxisLabel2: string = 'Level Of Critical';
  timeline: boolean = true;

  colorScheme = {
    domain: ['#5AA454', '#E44D25', '#CFC0BB', '#7aa3e5', '#a8385d', '#aae3f5'],
  };

  constructor(private dhtService: Dht11Service, private mqService: MqService) {}
  ngOnInit(): void {
    this.getDht();
    this.getMq();
  }
  getMq() {
    
    this.mqService.getMq().subscribe((x) => {
      let data2 = [
        {
          name: 'AirQuality',
          series: [{ name: '', value: 0 }],
        },
        
      ];

      this.mqService.getMq().subscribe((a) => {
        for (let i = 0; i < a.length; i++) {
          data2[0].series.push({
            name: `${new Date(x[i].date).getHours()}`,
            value: Number(x[i].airQualityValue),
          });
        }
        this.multi2 = data2;
      });
    });
  }

  getDht() {

    let data = [
      {
        name: 'Heat',
        series: [{ name: '', value: 0 }],
      },
      {
        name: 'Humidity',
        series: [{ name: '', value: 0 }],
      },
    ];

    this.dhtService.getDht().subscribe((x) => {
      console.log(
        '🚀 ~ file: device-dashboard.component.ts ~ line 51 ~ DeviceDashboardComponent ~ this.dhtService.getDht ~ x',
        x
      );
      for (let i = 0; i < x.length; i++) {
        console.log(i);
        data[0].series.push({
          name: `${new Date(x[i].date).getHours()}`,
          value: Number(x[i].heat),
        });
        data[1].series.push({
          name: `${new Date(x[i].date).getHours()}`,
          value: Number(x[i].humidity),
        });
      }
      this.multi = data;
      console.log(
        '🚀 ~ file: device-dashboard.component.ts ~ line 56 ~ DeviceDashboardComponent ~ this.dhtService.getDht ~ this.multi',
        this.multi
      );
    });
  }

  // onSelect(data): void {
  //   console.log('Item clicked', JSON.parse(JSON.stringify(data)));
  // }

  // onActivate(data): void {
  //   console.log('Activate', JSON.parse(JSON.stringify(data)));
  // }

  // onDeactivate(data): void {
  //   console.log('Deactivate', JSON.parse(JSON.stringify(data)));
  // }
}
