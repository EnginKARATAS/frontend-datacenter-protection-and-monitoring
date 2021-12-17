import { Component, NgModule, OnInit, ViewChild } from '@angular/core';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { BrowserModule } from '@angular/platform-browser';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { Dht11Service } from 'src/app/core/services/dht11.service';
import { MqService } from 'src/app/core/services/mq.service';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  { position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H' },
  { position: 2, name: 'Helium', weight: 4.0026, symbol: 'He' },
  { position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li' },
  { position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be' },
  { position: 5, name: 'Boron', weight: 10.811, symbol: 'B' },
  { position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C' },
  { position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N' },
  { position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O' },
  { position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F' },
  { position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne' },
];

@Component({
  selector: 'app-device-dashboard',
  templateUrl: './device-dashboard.component.html',
  styleUrls: ['./device-dashboard.component.css'],
})
export class DeviceDashboardComponent implements OnInit {
  events: string[] = [];

  addEvent(type: string, event: any) {
    var date = new Date(event.value);

    var selectedDate =
      date.getFullYear()+ "-" + 
      ("00" + (date.getMonth() + 1)).slice(-2) + "-" +
      ("00" + date.getDate()).slice(-2) + " " +
      ("00" + date.getHours()).slice(-2) + ":" +
      ("00" + date.getMinutes()).slice(-2) + ":" +
      ("00" + date.getSeconds()).slice(-2);
    var selectedDateTomorrow =
      date.getFullYear()+ "-" + 
      ("00" + (date.getMonth() + 1)).slice(-2) + "-" +
      ("00" + (date.getDate()+1)).slice(-2) + " " +
      ("00" + date.getHours()).slice(-2) + ":" +
      ("00" + date.getMinutes()).slice(-2) + ":" +
      ("00" + date.getSeconds()).slice(-2);

    this.getDhtWithTimeInterval(selectedDate, selectedDateTomorrow);
    console.log("🚀 ~ file: device-dashboard.component.ts ~ line 61 ~ DeviceDashboardComponent ~ .padStart ~ selectedDateTomorrow", selectedDateTomorrow)
    console.log("🚀 ~ file: device-dashboard.component.ts ~ line 62 ~ DeviceDashboardComponent ~ .padSend ~ selectedDate", selectedDate)
  }

  onChangeEvent(event: any) {
    console.log(event);
    console.log(event.value);
  }

  @ViewChild('picker') picker: any;
  open() {
    this.picker.open();
  }

  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  dataSource = ELEMENT_DATA;

  dht11List: any[] = [];
  airQualityList: any[] = [];
  view: any[] = [750, 0];

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
        this.airQualityList = data2;
      });
    });
  }

  getDhtWithTimeInterval(selectedDate: String, selectedDateTomorrow: String) {
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
    this.dhtService
      .getDhtWithTimeInterval(selectedDate, selectedDateTomorrow)
      .subscribe((dht11s) => {
        for (let i = 0; i < dht11s.length; i++) {
          console.log(i);
          data[0].series.push({
            name: `${new Date(dht11s[i].date)}`,
            value: Number(dht11s[i].heat),
          });
          data[1].series.push({
            name: `${new Date(dht11s[i].date)}`,
            value: Number(dht11s[i].humidity),
          });
        }
        this.dht11List = data;
        console.log(
          '🚀 ~ file: device-dashboard.component.ts ~ line 94 ~ DeviceDashboardComponent ~ this.dhtService.getDhtWithTimeInterval ~ dht11s',
          dht11s
        );
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
      this.dht11List = data;
      console.log(
        '🚀 ~ file: device-dashboard.component.ts ~ line 56 ~ DeviceDashboardComponent ~ this.dhtService.getDht ~ this.dht11List',
        this.dht11List
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
