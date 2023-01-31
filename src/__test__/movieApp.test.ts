/**
 * @jest-environment jsdom
 */

import { handleSubmit } from "../ts/movieApp";

jest.mock('../ts/services/movieservice.ts');

describe('test function handleSubmit', () => {
  test('should print HTML correctly', async () => {
    document.body.innerHTML = /*html*/`
    <form id="searchForm">
      <input type="text" id="searchText" placeholder="Skriv titel här" value="" />
      <button type="submit" id="search">Sök</button>
    </form>
    <div id="movie-container"></div>
    `;

    await handleSubmit();

    const heading = document.getElementById('movie-container')?.children[0].children[0];
    console.log(heading?.innerHTML);

    expect(heading?.innerHTML).toBe('Bamse');
  })

})
