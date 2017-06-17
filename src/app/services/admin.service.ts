import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class AdminService {

  public adminData: BehaviorSubject<any>;

  constructor(
    private http: Http
  ) {
        this.adminData = new BehaviorSubject({});
  }

  getAdminData() {
    const password = prompt('Password', this.getPassword());
    return this.http.get(`/api/admin?p=${password}`)
      .subscribe(res => {
        this.setPassword(password);
        const json = res.json();

        if (json.error) {
          alert('Invalid password');
        }

        this.adminData.next(json.adminData);
      }, error => {
        alert('Invalid password');
        this.getAdminData();
      });
  }

  setPassword(password: string) {
    window.localStorage.setItem('p', password);
  }

  getPassword(): string {
    return window.localStorage.getItem('p');
  }


}
