import "./styles/app.css";
import React, { Component } from 'react';
import {getData} from "./api";
import { Rating } from '@mui/material';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      reviews: []
    }
  }

  componentDidMount() {
    getData().then(r => {
      console.log(r);
      this.setState({reviews: r})
    });
  }


  render() {
    const { reviews } = this.state;
    return (
        <div className="container">
          <div className="jumbotron">
            <h4>Stay up-to-date with</h4>
            <h1>News, updates, promos, and exclusives from Noted</h1>
          </div>
          <div className="row">
            {reviews.map((review) => (
                <div className="column">
                  <div className="card" key={review.id}>
                    <div className="card-body">
                      <div className="d-flex">
                        <div className="card-col">
                          <h5 className="card-title">{review.title}</h5>
                          <Rating name="read-only" value={review.rating} readOnly></Rating>
                        </div>
                        <div className="card-col text-right">
                          <p className="card-text">{review.date.toLocaleString()}</p>
                          <p className="card-text">{review.name}</p>
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

        </div>    );
  }
}

export default App;
