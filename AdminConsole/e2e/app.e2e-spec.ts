import { AdminConsolePage } from './app.po';

describe('admin-console App', () => {
  let page: AdminConsolePage;

  beforeEach(() => {
    page = new AdminConsolePage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
