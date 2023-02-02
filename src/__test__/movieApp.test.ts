/**
 * @jest-environment jsdom
 */

import { IMovie } from '../ts/models/Movie';
import * as movieApp from '../ts/movieApp'

jest.mock('../ts/services/movieservice.ts');

beforeEach(() => {
  document.body.innerHTML = '';
})

describe('test function handleSubmit', () => {
  test('should call function createHtml', async () => {
    const searchText = 'Harry Potter'
    document.body.innerHTML = /*html*/`
    <form id="searchForm">
      <input type="text" id="searchText" placeholder="Skriv titel här" value="${searchText}" />
      <button type="submit" id="search">Sök</button>
    </form>
    <div id="movie-container"></div>
    `;
    const spy = jest.spyOn(movieApp, 'createHtml').mockReturnValue();

    await movieApp.handleSubmit();

    expect(spy).toHaveBeenCalledTimes(1);
    spy.mockRestore();
  });

  test('should call function displayNoResult because of empty string', async () => {
    const searchText = '';
    document.body.innerHTML = /*html*/`
    <form id="searchForm">
      <input type="text" id="searchText" placeholder="Skriv titel här" value="${searchText}" />
      <button type="submit" id="search">Sök</button>
    </form>
    <div id="movie-container"></div>
    `;

    const spy = jest.spyOn(movieApp, 'displayNoResult').mockReturnValue();

    await movieApp.handleSubmit();

    expect(spy).toHaveBeenCalledTimes(1);
    spy.mockRestore();
  });

  test('should call function displayNoResult because of catch in handleSubmit', async () => {
    const searchText = 'error';
    document.body.innerHTML = /*html*/`
    <form id="searchForm">
      <input type="text" id="searchText" placeholder="Skriv titel här" value="${searchText}" />
      <button type="submit" id="search">Sök</button>
    </form>
    <div id="movie-container"></div>
    `;

    const spy = jest.spyOn(movieApp, 'displayNoResult').mockReturnValue();

    await movieApp.handleSubmit();

    expect(spy).toHaveBeenCalledTimes(1);
    spy.mockRestore();
  })

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
    spy.mockRestore();
  });
});

describe('test function createHtml', () => {

  test('should print HTML correctly', () => {
    document.body.innerHTML = /*html*/`
    <div id="movie-container"></div>
    `;
    const movies: IMovie[] = [{
      Title: 'Die Hard',
      imdbID: '1',
      Poster: '',
      Type: 'Action',
      Year: '1988'
    }];
    const moviesContainer = document.getElementById('movie-container') as HTMLDivElement;

    movieApp.createHtml(movies, moviesContainer);

    const heading = document.getElementById('movie-container')?.children[0].children[0];
    expect(heading?.innerHTML).toBe(movies[0].Title);
  });

  test('should not add HTML', () => {
    document.body.innerHTML = /*html*/`
    <div id="movie-container"></div>
    `;
    const movies: IMovie[] = [];
    const moviesContainer = document.getElementById('movie-container') as HTMLDivElement;

    movieApp.createHtml(movies, moviesContainer);

    expect(moviesContainer.children.length).toBe(0);
  });
});

describe('test function displayNoResult', () => {
  test('should display message for no results', () => {
    document.body.innerHTML = /*html*/`
    <div id="movie-container"></div>
    `;
    const moviesContainer = document.getElementById('movie-container') as HTMLDivElement;

    movieApp.displayNoResult(moviesContainer);

    const messageContainer = document.querySelector('#movie-container > p') as HTMLParagraphElement;
    expect(messageContainer?.innerHTML).toBe('Inga sökresultat att visa');
  });
});
