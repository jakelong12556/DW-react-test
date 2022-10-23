import "./styles/app.scss";
import React, {useEffect, useState} from 'react';
import {getData} from "./api";
import ReviewViewer from "./reviews";
import {SubscriptionService} from "./subscription";

function App(){
  const [reviews, setReviews] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getData().then((r) => {
      setReviews(r);
      setIsLoading(false);
    })
  }, [])

  return (
    <div>
      <div className="jumbotron">
        <h4 className="text-center">Stay up-to-date with</h4>
        <h2 className="noted-title">News, updates, promos, and exclusives from <span className="white">Noted</span></h2>
        <SubscriptionService></SubscriptionService>
      </div>
      <ReviewViewer isLoading={isLoading} reviews={reviews}></ReviewViewer>
    </div>
  )

}
export default App;
