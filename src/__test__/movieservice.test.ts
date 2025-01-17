import { getData } from "../ts/services/movieservice";

const mockResponse = {
  data: {
    Search: [
      {
        Title: 'Die Hard',
        imdbID: '1',
        Poster: '',
        Type: 'Action',
        Year: '1988'
      }
    ]
  }
};

jest.mock("axios", () => ({
  get: async (url: string) => {
    return new Promise((resolve, reject) => {
      if (!url.endsWith('error')) {
        resolve(mockResponse);
      } else {
        reject([]);
      }
    });
  }
}));

describe('test function getData', () => {

  test('should fetch data correctly', async () => {
    const data = await getData('Die Hard');

    expect(data.length).toBe(1);
    expect(data[0].Title).toBe('Die Hard');
  });

  test('should fail fetching data', async () => {
    const data = await getData('error');

    expect(data.length).toBe(0);
  });

});
