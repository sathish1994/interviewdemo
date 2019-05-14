import { ProconnectmiddlewarePage } from './app.po';

describe('proconnectmiddleware App', function() {
  let page: ProconnectmiddlewarePage;

  beforeEach(() => {
    page = new ProconnectmiddlewarePage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
