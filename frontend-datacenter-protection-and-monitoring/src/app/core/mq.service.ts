import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MqService {
  path = 'mq';

  constructor(private http: HttpClient) {}
  // .get<Dht>(`${environment.apiUrl}/${this.path}/all`)

  getMq(): Observable<any> {
    return this.http
      .get<any>(`http://localhost:8080/api/mq/all`)
      .pipe(map(x => x));
  }
}
