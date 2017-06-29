import { BuymovieticketPage } from './app.po';

describe('buymovieticket App', () => {
  let page: BuymovieticketPage;

  beforeEach(() => {
    page = new BuymovieticketPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
