import { CouponsPage } from './app.po';

describe('coupons App', () => {
  let page: CouponsPage;

  beforeEach(() => {
    page = new CouponsPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
