import React from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCheck, faExclamation} from "@fortawesome/free-solid-svg-icons";

export const Loader = () => {
  return (
    <div className="progress-circle">
      <div className="loading-spinner"></div>
    </div>
  )

}

export const MessageHandler = ({valid}) => {
  return (
    <div className="message-handler">
      {valid ? <div className="w-100"><FontAwesomeIcon icon={faCheck} className="check"/> Email Submitted!</div> :
        <div className="w-100"><FontAwesomeIcon icon={faExclamation} className="error"/> Please enter a valid email</div>}
    </div>
  )
}