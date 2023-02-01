/**
 * @jest-environment jsdom
 */

import { AxiosResponse } from "axios";
import { IOmdbResponse } from "../ts/models/IOmdbResponse";
import { IMovie } from "../ts/models/Movie";
import { getData } from "../ts/services/movieservice";

const response = { data: { Search: [{ Title: 'Die Hard', imdbID: '1', Poster: '', Type: 'Action', Year: '1988' }] } };

jest.mock("axios", () => ({
  get: async (url: string) => {
    return new Promise((resolve, reject) => {
      resolve(response);
    });
  }
}));

test('should fetch data correctly', async () => {
  let data: IMovie[] = await getData('Die Hard');

  console.log(data);

  expect(data.length).toBe(1);
});
