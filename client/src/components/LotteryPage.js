import React from 'react';
import {FaRegPlusSquare, FaRegMinusSquare} from "react-icons/fa";

const LotteryPage = () => {
  const numbersArr = Array.from({length: 80}, (_, i) => i + 1);

  const getRows = array => {
    let result = [],
    i = 0;
    while (i < array.length) result.push(array.slice(i, i += 10));
    return result;
  };

  const rowNumbers = getRows(numbersArr);

  const displayNumbers = rowNumbers.map((row) => {
    return (
      <tbody>
        <tr style={{outline: '#202027 thin solid'}}>
          {row.map((num) => {
            return (
              <td><button className="number-btn">{num}</button></td>
            )
          })}
        </tr>
      </tbody>
    )
  })

  return(
    <section className="lottery-main-section">
      <div className="songs-container-main-section">
        <div className="table-container">
          <table className="table">
            <thead>
              <tr>
                <th colSpan="10">Select 12 numbers!</th>  
              </tr>
            </thead>
            {displayNumbers}
          </table>
        </div>
      </div>
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
          <input type="text" defaultValue="1.00"/>
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
          <input type="text" defaultValue="1"/>
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
