import { GenericAbortSignal } from "axios";
import { AxiosHttpClient } from "../../../utils/Http/AxiosHttpClient";


// {
//   "status": "OK",
//   "copyright": "Copyright (c) 2019 The New York Times Company.  All Rights Reserved.",
//   "num_results": 2,
//   "results": [
//     {
//       "url": "http://www.nytimes.com/2011/11/10/books/1q84-by-haruki-murakami-review.html",
//       "publication_dt": "2011-11-10",
//       "byline": "JANET MASLIN",
//       "book_title": "1Q84",
//       "book_author": "Haruki Murakami",
//       "summary": "In “1Q84,” the Japanese novelist Haruki Murakami writes about characters in a Tokyo with two moons.",
//       "isbn13": [
//         "9780307476463"
//       ]
//     }
//   ]
// }

interface BookResponse {
  status: string;
  num_results: number;
  copyright: string;
}

export interface BookReview {
  url: string;
  publication_dt: string;
  byline: string;
  book_title: string;
  book_author: string;
  summary: string;
  isbn13: string[];
}

export interface BookReviewResponse extends BookResponse {
  results: BookReview[];
}

export class BookService {
  private httpClient: AxiosHttpClient;

  constructor(signal?: GenericAbortSignal) {
    this.httpClient = new AxiosHttpClient({
      baseURL: "https://api.nytimes.com/svc/books/v3",
      signal,
    });
  }

  public async getBookReviews(): Promise<BookReviewResponse> {
    return await this.httpClient.get<BookReviewResponse>(
      "/reviews.json?isbn=9780307476463"
    );
  }
}