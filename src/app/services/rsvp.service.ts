import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class RsvpService {

  public user: BehaviorSubject<any>;
  public token: BehaviorSubject<string>;
  public saveStatus: BehaviorSubject<string>;

  constructor(
    private http: Http
  ) {
    this.user = new BehaviorSubject(undefined);
    this.saveStatus = new BehaviorSubject('done');
    this.token = new BehaviorSubject(this.checkForSavedToken());
  }

  setSavingDone() {
    this.saveStatus.next('done');
  }

  setIsSaving() {
    this.saveStatus.next('saving');
  }

  setSavingError() {
    this.saveStatus.next('error');
  }

  setUser(user) {
    const u = this.assignGuestIds(user);
    const encodedToken = encodeURIComponent(this.token.getValue());

    return new Promise((resolve, reject) => {
      this.setIsSaving();
      this.http.post(`/api/user/${encodedToken}`, {user: u}).subscribe(res => {
        const json = res.json();

        if (json.error) {
          this.setSavingError();
          reject(json);
        }

        this.user.next(u);
        this.setSavingDone();
        resolve(json);
      });
    });
  }

  setToken(token): Promise<any> {
    const encodedToken = encodeURIComponent(token);

    return new Promise((resolve, reject) => {
      this.setIsSaving();
      this.http.get(`/api/user/${encodedToken}`).subscribe(res => {
        const json = res.json();

        if (json.error) {
          alert(json.message);
          this.setSavingError();
          this.token.next('');
          return reject(json);
        }

        window.localStorage.setItem('token', token);
        this.token.next(token);
        this.user.next(this.assignGuestIds(json.user));
        this.setSavingDone();
        return resolve(json);
      });
    });
  }

  clearToken() {
    window.localStorage.setItem('token', '');
    this.token.next('');
  }

  private checkForSavedToken(): string {
    const token = window.localStorage.getItem('token');
    if ('undefined' === typeof token || null === token) {
      return '';
    }

    this.setToken(token)
      .then(json => {
        return token;
      })
      .catch(json => {
        this.clearToken();
        return '';
      });
  }

  private assignGuestIds(user) {
    user.guests = user.guests.map((g, i) => {
      g.id = i;
      return g;
    });
    return user;
  }

}
