import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

interface TimeResponse {
  time: number;
}

@Injectable({
  providedIn: 'root',
})
export class TapDataService {
  constructor(private http: HttpClient) {}

  getTime() {
    return this.http.get<TimeResponse>(
      'https://ss.taptapdurov.fun/api/get_time'
    );
  }

  updateTime(updateTime: number) {
    return this.http.post<TimeResponse>(
      'https://ss.taptapdurov.fun/api/update_time',
      { time: updateTime }
    );
  }
}
