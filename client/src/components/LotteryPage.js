import React from 'react';
import {FaRegPlusSquare, FaRegMinusSquare} from "react-icons/fa";

const LotteryPage = () => {

  return(
    <section className="lottery-main-section">
      <h1 className="lottery-text">
        Choose your
        <span className="accent-text"> numbers!</span>
      </h1>
      <form className="lottery-form">
        <div className="input-group">
          <div className="plus-minus">
            <label>Bet amount:</label>
            <button type="button" className="plus-button" tabIndex="-1">
              <FaRegPlusSquare/>
            </button>
            <button type="button" className="minus-button" tabIndex="-1">
              <FaRegMinusSquare/>
            </button>
          </div>
          <input type="text"/>
          <p className ="reminderMsg">
           * Only numbers with 2 decimal digits
          </p>
        </div>
        <div className="input-group">
          <div className="plus-minus">
            <label>Number of lottery draws:</label>
            <button type="button" className="plus-button" tabIndex="-1">
              <FaRegPlusSquare/>
            </button>
            <button type="button" className="minus-button" tabIndex="-1">
              <FaRegMinusSquare/>
            </button>
          </div>
          <input type="text"/>
          <p className ="reminderMsg">
           * Only whole numbers
          </p>
        </div>
        <div className="input-group">
          <p className ="price-msg">Final cost: 15</p>
          <p className ="timer">Timer: 02:59</p>
          <button disabled={true} className="btn">Try your luck!</button>
        </div>
      </form>
    </section>
  )
};

export default LotteryPage;
