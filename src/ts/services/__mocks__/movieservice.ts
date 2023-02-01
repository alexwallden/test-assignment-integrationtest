import { IOmdbResponse } from "./../../models/IOmdbResponse";
import { IMovie } from "./../../models/Movie";
import axios from "axios";

export const getData = async (searchText: string): Promise<IMovie[]> => {
  return new Promise((resolve, reject) => {
    if (searchText !== '') {
      resolve([{ Title: searchText, imdbID: '1', Poster: '', Type: 'Horror', Year: '1987' }]);
    } else {
      reject([]);
    }
  });
};
