import { useEffect, useState } from "react";

import { BookReview, BookService } from "../service/books.service";


const BookReviewsPage = () => {
  const [reviews, setReviews] = useState<BookReview[]>([]);

  useEffect(() => {
    // const abortController = new AbortController();
    // const signal = abortController.signal;

    const booksService = new BookService();

    const fetchReviews = async () => {
      try {
        const response = await booksService.getBookReviews();

        setReviews(response.results);
      } catch (error) {
        console.error("Failed to fetch reviews", error);
      }
    };

    // return () => {
    //   // abortController.abort();
    // }

    fetchReviews();
  }, []);

  return (
    <div>
      <h2>Book Reviews</h2>
      <ul>
        {reviews.map((review) => (
          <li key={review.url}>
            <h3>{review.book_title}</h3>
            <p>{review.summary}</p>
            <p>By: {review.byline}</p>
            <p>Publication Date: {review.publication_dt}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BookReviewsPage;