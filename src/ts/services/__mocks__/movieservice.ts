import { IMovie } from "./../../models/Movie";

export const getData = async (searchText: string): Promise<IMovie[]> => {
  return new Promise((resolve, reject) => {
    if (searchText !== '' && searchText !== 'error') {
      resolve([{ Title: searchText, imdbID: '1', Poster: '', Type: 'Horror', Year: '1987' }]);
    } else if (searchText === 'error') {
      reject('error');
    } else if (searchText === '') {
      resolve([]);
    }
    else {
      reject([]);
    }
  });
};
