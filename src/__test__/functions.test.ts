import { movieSort } from "../ts/functions"
import { IMovie } from "../ts/models/Movie"

const defaultMovies: IMovie[] = [
  {
    Title: 'Aliens',
    imdbID: '4',
    Poster: '',
    Type: 'Sci-Fi',
    Year: '1979'
  },
  {
    Title: 'Die Hard',
    imdbID: '2',
    Poster: '',
    Type: 'Action',
    Year: '1988'
  },
  {
    Title: 'Harry Potter',
    imdbID: '1',
    Poster: '',
    Type: 'Fantasy',
    Year: '2001'
  },
  {
    Title: 'Die Hard',
    imdbID: '3',
    Poster: '',
    Type: 'Action',
    Year: '1995'
  },
  
  {
    Title: 'Cliffhanger',
    imdbID: '5',
    Poster: '',
    Type: 'Action',
    Year: '1993'
  },
  {
    Title: 'Critical mass',
    imdbID: '6',
    Poster: '',
    Type: 'Action',
    Year: '2001'
  },
]

describe('test function moviesSort', () => {
  test('should sort array in descending order', () => {
    const movies = [...defaultMovies];
    const firstLetters: string[] = [];
    movieSort(movies);

    for (let index = 0; index < movies.length; index++) {
      const movie = movies[index];
      const firstLetter = movie.Title.slice(0, 1);
      firstLetters.push(firstLetter);
    };

    expect(movies[0].Title).toBe('Aliens');
    expect(movies[3].imdbID).toBe('2');
    expect(firstLetters).toEqual(['A', 'C', 'C', 'D', 'D', 'H']);
  });
  test('should sort array in ascending order', () => {
    const movies = [...defaultMovies];
    const firstLetters: string[] = [];
    movieSort(movies, false);

    for (let index = 0; index < movies.length; index++) {
      const movie = movies[index];
      const firstLetter = movie.Title.slice(0, 1);
      firstLetters.push(firstLetter);
    };

    expect(movies[0].Title).toBe('Harry Potter');
    expect(movies[1].imdbID).toBe('2');
    expect(firstLetters).toEqual(['H', 'D', 'D', 'C', 'C', 'A']);
  });
  
});
