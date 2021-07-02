import React, {useEffect, useState} from 'react';
import {FaRegPlusSquare, FaRegMinusSquare} from "react-icons/fa";

const LotteryPage = () => {
  const [betAmount, setBetAmount] = useState(1.00);
  const [lotteryDraws, setLotteryDraws] = useState(1);
  const [seconds, setSeconds] = useState(0)
  const [minutes, setMinutes] = useState(3)

  const updateTime = () => {
    if (minutes === 0 && seconds === 0) {
      setSeconds(0);
      setMinutes(3);
    } else {
      if (seconds === 0) {
        setMinutes(minutes => minutes - 1);
        setSeconds(59);
      } else {
        setSeconds(seconds => seconds - 1);
      }
    }
  }

  useEffect(() => {
    const token = setTimeout(updateTime, 1000)

    return function cleanUp() {
      clearTimeout(token);
    }
  })

  const displayBetAmount = betAmount.toFixed(2);
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

  const pad = (num, size) => {
    let s = num + ""; 
    while (s.length < size) s = "0" + s; 
    return s;
  }

  return(
    <section className="lottery-main-section">
      <div className="container-main-section">
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
            <div>
              <button type="button" className="plus-button" tabIndex="-1" onClick={() => setBetAmount(+betAmount + 0.20)}>
                <FaRegPlusSquare/>
              </button>
              {displayBetAmount === "0.20" ?
              <button type="button" className="minus-button" disabled={true} tabIndex="-1">
                <FaRegMinusSquare/>
              </button>
              :
              <button type="button" className="minus-button" tabIndex="-1" onClick={() => setBetAmount(+betAmount - 0.20)}>
                <FaRegMinusSquare/>
              </button>
              }
            </div>
          </div>
          <input type="text" defaultValue="1.00" value={displayBetAmount} onChange={e => setBetAmount(e.target.value)}/>
          <p className ="reminderMsg">
           * Only numbers with 2 decimal digits
          </p>
        </div>
        <div className="input-group">
          <div className="plus-minus">
            <label>Lottery draws:</label>
            <div>
              <button type="button" className="plus-button" tabIndex="-1" onClick={() => setLotteryDraws(+lotteryDraws + 1)}>
                <FaRegPlusSquare/>
              </button>
              {lotteryDraws === 1 ?
              <button type="button" className="minus-button" disabled={true} tabIndex="-1">
                <FaRegMinusSquare/>
              </button>
              :
              <button type="button" className="minus-button" tabIndex="-1" onClick={() => setLotteryDraws(+lotteryDraws - 1)}>
                <FaRegMinusSquare/>
              </button>
              }
            </div>
          </div>
          <input type="text" defaultValue="1" value={lotteryDraws} onChange={e => setLotteryDraws(e.target.value)}/>
          <p className ="reminderMsg">
           * Only whole numbers
          </p>
        </div>
        <div className="input-group">
          <p className ="price-msg">Final cost: 15</p>
          <p className ="timer">Timer: {pad(minutes, 2)}:{pad(seconds, 2)}</p>
          <button disabled={true} className="btn">Try your luck!</button>
        </div>
      </form>
    </section>
  )
};

export default LotteryPage;
