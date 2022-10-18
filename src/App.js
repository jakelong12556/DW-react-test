import "./styles/app.css";
import React, { Component } from 'react';
import {getData, pushData} from "./api";
import {Alert, Button, Rating, TextField} from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar } from '@fortawesome/free-solid-svg-icons'
import { CircularProgress } from '@mui/material';



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
    <div className="d-flex justify-content-center pt-4" >
      <CircularProgress className="text-white" />
    </div>
  )

  renderReviews = (reviews) => (
    <div className="row w-75">
      {reviews.map((review) => (
        <div className="column" key={review.id}>
          <div className="card">
            <div className="card-body">
              <div className="d-flex row">
                <div className="card-col-title">
                  <h5 className="card-title">{review.title}</h5>
                  <div className="rating">
                    <Rating icon={<FontAwesomeIcon icon={faStar} />}
                            className="text-white"
                            name="read-only"
                            value={review.rating}
                            readOnly></Rating>
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
        <TextField InputProps={{style: {color:'#ffffff', backgroundColor: '#FFFFFF1A'}}}
                   InputLabelProps={{style: { color: '#ffffff'}}}
                   id="outlined-basic"
                   label="Enter your email"
                   variant="outlined"
                   fullWidth
                   onChange={(e) => this.onTextChange(e)}
        />
      </div>
      <div className="email-button">
        <Button style={{backgroundColor:'#FFFFFF1A', textTransform: 'none', fontSize:'1.3rem', border: '2px solid rgba(255, 255, 255, 1)'}}
                variant="outlined"
                fullWidth
                onClick={(e) => this.onSubmit(e)}
        >Subscribe</Button>
      </div>
    </div>
  )

  messageHandler = (valid) => (
    <div className="mt-2 d-flex w-50 justify-content-center">
      {valid ? <Alert className="w-100" severity="success">Email Submitted!</Alert> : <Alert className="w-100" severity="error">Please enter a valid email</Alert>}
    </div>
  )

  render() {
    const { reviews } = this.state;
    return (
        <div>
          <div className="jumbotron">
            <h4 className="text-center">Stay up-to-date with</h4>
            <h2 className="text-center mb-4 noted-title">News, updates, promos, and exclusives from <span className="text-white">Noted</span></h2>
            {!this.state.isSubmitted && !this.state.isValid ? this.renderEmailForm : null}
            {this.state.isSubmitted ? this.messageHandler(this.state.isValid) : null}
            {this.state.isLoadingEmail ? this.spinner : null}

          </div>
          {this.state.isLoading ? this.spinner : this.renderReviews(reviews)}
        </div>
    );
  }
}

export default App;
