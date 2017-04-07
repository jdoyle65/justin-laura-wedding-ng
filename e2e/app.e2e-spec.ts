import { JustinLauraWeddingNgPage } from './app.po';

describe('justin-laura-wedding-ng App', () => {
  let page: JustinLauraWeddingNgPage;

  beforeEach(() => {
    page = new JustinLauraWeddingNgPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('jl works!');
  });
});
