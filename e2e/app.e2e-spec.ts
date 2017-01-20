import { TestangiePage } from './app.po';

describe('testangie App', function() {
  let page: TestangiePage;

  beforeEach(() => {
    page = new TestangiePage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
