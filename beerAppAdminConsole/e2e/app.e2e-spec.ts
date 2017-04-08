import { BeerAppAdminConsolePage } from './app.po';

describe('beer-app-admin-console App', function() {
  let page: BeerAppAdminConsolePage;

  beforeEach(() => {
    page = new BeerAppAdminConsolePage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
