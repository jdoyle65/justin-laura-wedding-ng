import { browser, element, by } from 'protractor';

export class JustinLauraWeddingNgPage {
  navigateTo() {
    return browser.get('/');
  }

  getParagraphText() {
    return element(by.css('jl-root h1')).getText();
  }
}
