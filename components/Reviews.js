import React, { Component } from 'react';

class Reviews extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { reviews, sentiment } = this.props;
    if (sentiment && reviews) {
      return (
        <div>
          {reviews.map((review, i) => (
            <div className="reviews">
              {review.author_name}: {review.text}
              <h4>
                Sentiment Score: {sentiment[i].score} | Positives:
                {sentiment[i].positive.join(', ')} | Negatives:
                {sentiment[i].negative.join(', ')}
              </h4>
            </div>
          ))}
        </div>
      );
    } else return null;
  }
}

export default Reviews;
