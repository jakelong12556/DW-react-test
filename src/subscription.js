import {pushData} from "./api";
import React, {useState} from 'react';
import {Loader, MessageHandler} from "./loader";

export function SubscriptionService(){

  const [textFieldInput, setTextFieldInput] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isValid, setIsValid] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const onTextChange = e => {
    e.preventDefault();
    setTextFieldInput(e.target.value);
  }

  const onSubmit = e => {
    e.preventDefault();
    const email = textFieldInput;
    if(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(textFieldInput)){
      setIsLoading(true);
      pushData({email: email}).then((r) => {
        setIsLoading(false);
        setIsValid(true);
        setIsSubmitted(true);
      })
    } else {
      setIsValid(false);
      setIsSubmitted(true);
    }
  }

  const renderEmailForm = (
    <div className="email-form">
      <div className="email-input">
        <input type="text"
               className="email-field"
               placeholder="Enter your email"
               onChange={(e) => onTextChange(e)}
        />
      </div>
      <div className="email-button">
        <button disabled={isLoading} className="submit-button" onClick={(e) => onSubmit(e)}>Subscribe</button>
      </div>
    </div>
  )

  return (
    <div className="subscriber">
      {!isSubmitted || !isValid ? renderEmailForm: null}
      {isSubmitted ? <MessageHandler valid={isValid}></MessageHandler> : null}
      {isLoading ? <Loader></Loader> : null}
    </div>
  )
}
