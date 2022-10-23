import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faStar} from "@fortawesome/free-solid-svg-icons";
import React from "react";
import {Loader} from "./loader";

const ReviewViewer = ({reviews, isLoading}) => {
  return isLoading ? (
    <Loader></Loader>
  ) : (
    <div className="review-row">
      {reviews.map((review) => (
        <div className="column" key={review.id}>
          <div className="card-ex">
            <div className="card-body-ex">
              <div className="card-row">
                <div className="card-col-title">
                  <h5 className="card-title">{review.title}</h5>
                  <div className="rating">
                    {[...Array(review.rating)].map((e, i) => (
                        <FontAwesomeIcon key={i} icon={faStar} className="font-medium"/>
                      )
                    )}
                  </div>

                </div>
                <div className="card-col-detail">
                  <p className="card-text card-text-info">{review.date.toLocaleDateString()}</p>
                  <p className="card-text card-text-info">{review.name}</p>
                </div>
              </div>
              <div>
                <p className="card-text">{review.body}</p>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )

}

export default ReviewViewer;