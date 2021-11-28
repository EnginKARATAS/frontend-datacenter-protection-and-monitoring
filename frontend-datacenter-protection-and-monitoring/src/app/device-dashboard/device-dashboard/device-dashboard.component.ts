import { Component, NgModule, OnInit } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { Dht11Service } from 'src/app/core/dht11.service';

@Component({
  selector: 'app-device-dashboard',
  templateUrl: './device-dashboard.component.html',
  styleUrls: ['./device-dashboard.component.css'],
})
export class DeviceDashboardComponent implements OnInit {
  multi: any[] = [];
  view: any[] = [700, 300];

  // options
  legend: boolean = true;
  showLabels: boolean = true;
  animations: boolean = true;
  xAxis: boolean = true;
  yAxis: boolean = true;
  showYAxisLabel: boolean = true;
  showXAxisLabel: boolean = true;
  xAxisLabel: string = 'Time';
  yAxisLabel: string = 'Heat';
  timeline: boolean = true;

  colorScheme = {
    domain: ['#5AA454', '#E44D25', '#CFC0BB', '#7aa3e5', '#a8385d', '#aae3f5'],
  };

  constructor(private dhtService: Dht11Service) {
    this.getDht();
  }
  ngOnInit(): void {
    this.getDht();
  }

  getDht() {
    let data = [
      {
        name: 'Heat',
        series: [
          { name: '', value: 12 },
        ],
      },
      {
        name: 'Humidity',
        series: [
          { name: '', value: 12 },
        ],
      }
    ];

    this.dhtService.getDht().subscribe((x) => {
      console.log("🚀 ~ file: device-dashboard.component.ts ~ line 51 ~ DeviceDashboardComponent ~ this.dhtService.getDht ~ x", x)
      for (let i = 0; i < x.length; i++) {
        console.log(i)
        data[0].series.push({ name: `${new Date(x[i].date).getMinutes()}`, value: Number(x[i].heat) });
        data[1].series.push({ name: `${new Date(x[i].date).getMinutes()}`, value: Number(x[i].humidity) });
      }
      this.multi = data 
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
