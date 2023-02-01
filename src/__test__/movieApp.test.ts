/**
 * @jest-environment jsdom
 */

import * as movieApp from '../ts/movieApp'

jest.mock('../ts/services/movieservice.ts');

describe('test function handleSubmit', () => {
  test('should print HTML correctly', async () => {
    const searchText = 'Harry Potter'
    document.body.innerHTML = /*html*/`
    <form id="searchForm">
      <input type="text" id="searchText" placeholder="Skriv titel här" value="${searchText}" />
      <button type="submit" id="search">Sök</button>
    </form>
    <div id="movie-container"></div>
    `;

    await movieApp.handleSubmit();  

    const heading = document.getElementById('movie-container')?.children[0].children[0];
    expect(heading?.innerHTML).toBe(searchText);
  });  
});

describe('test function init', () => {
  test('should call handleSubmit once', async () => {
    document.body.innerHTML = /*html*/`
    <form id="searchForm">
      <input type="text" id="searchText" placeholder="Skriv titel här" />
      <button type="submit" id="search">Sök</button>
    </form>
    <div id="movie-container"></div>
    `;
    const form = document.getElementById("searchForm") as HTMLFormElement;
    const spy = jest.spyOn(movieApp, 'handleSubmit');
    movieApp.init();
    form.submit();

    expect(spy).toHaveBeenCalledTimes(1);
  })
  
})
