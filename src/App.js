import "./styles/app.scss";
import React, { Component } from 'react';
import {getData, pushData} from "./api";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faCheck, faExclamation, faStar} from '@fortawesome/free-solid-svg-icons'



class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      reviews: [],
      textFieldInput:'',
      isSubmitted: false,
      isValid: false,
      isLoading: false,
      isLoadingEmail: false,
    }
  }

  componentDidMount() {
    this.setState({isLoading: true}, ()=>{
      getData().then(r => {
        this.setState({reviews: r, isLoading: false})
      });
    });
  }

  onTextChange(event){
    event.preventDefault();
    this.setState({
      textFieldInput:event.target.value,
    });
  }

  onSubmit(event){
    event.preventDefault();
    const {
      textFieldInput,
    } = this.state;


    if(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(textFieldInput)){
      this.setState({isLoadingEmail: true}, ()=>{
          pushData({email: textFieldInput}).then(r => {
            this.setState({isSubmitted: true, isValid:true, isLoadingEmail: false})
          })
        }
      )

    } else {
      this.setState({isSubmitted: true, isValid:false})
    }
  }

  spinner = (
    <div className="progress-circle" >
      <div className="loading-spinner"></div>
    </div>
  )

  renderReviews = (reviews) => (
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
                      <FontAwesomeIcon key={i} icon={faStar} className="font-medium" />
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

  renderEmailForm = (
    <div className="email-form">
      <div className="email-input">
        <input type="text"
               className="email-field"
               placeholder="Enter your email"
               onChange={(e) => this.onTextChange(e)}
        />
      </div>
      <div className="email-button">
        <button className="submit-button" onClick={(e) => this.onSubmit(e)}>Subscribe</button>
      </div>
    </div>
  )

  messageHandler = (valid) => (
    <div className="message-handler">
      {valid?  <div className="w-100"> <FontAwesomeIcon icon={faCheck} className="check"/> Email Submitted!</div> :       <div className="w-100"> <FontAwesomeIcon icon={faExclamation} className="error"/> Please enter a valid email</div>}
    </div>
  )

  render() {
    const { reviews } = this.state;
    return (
        <div>
          <div className="jumbotron">
            <h4 className="text-center">Stay up-to-date with</h4>
            <h2 className="noted-title">News, updates, promos, and exclusives from <span className="white">Noted</span></h2>
            {(!this.state.isSubmitted || !this.state.isValid) ? this.renderEmailForm : null}
            {this.state.isSubmitted ? this.messageHandler(this.state.isValid) : null}
            {this.state.isLoadingEmail ? this.spinner : null}
          </div>
          {this.state.isLoading ? this.spinner : this.renderReviews(reviews)}
        </div>
    );
  }
}

export default App;
