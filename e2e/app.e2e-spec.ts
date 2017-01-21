import { A2websitePage } from './app.po';

describe('a2website App', function() {
  let page: A2websitePage;

  beforeEach(() => {
    page = new A2websitePage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
