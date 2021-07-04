import React, {useEffect, useState} from 'react';
import {FaRegPlusSquare, FaRegMinusSquare} from "react-icons/fa";
import {AMOUNT_TO_SELECT, MINUTES, NUMBERS, NUMBERS_PER_ROW, SECONDS} from '../common/constants';

const LotteryPage = () => {
  const [betAmount, setBetAmount] = useState("1.00");
  const [inputBetAmount, setInputBetAmount] = useState('1.00');
  const [lotteryDraws, setLotteryDraws] = useState(1);
  const [seconds, setSeconds] = useState(SECONDS);
  const [minutes, setMinutes] = useState(MINUTES);
  const [selectedNums, setSelectedNums] = useState([]);
  const [comment, setComment] = useState(null);
  const [url, setUrl] = useState('');
  const someRef = React.useRef(0);

  const updateTime = () => {
    if (minutes === 0 && seconds === 0) {
      setSeconds(SECONDS);
      setMinutes(MINUTES);
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

  const random = (min, max) => Math.floor(Math.random() * (max - min)) + min;

  const mockAPI = () => {
    return new Promise((resolve) => {
      someRef.current = someRef.current + 1;
      setTimeout(() => resolve(`https://jsonplaceholder.typicode.com/posts/${random(1, 10)}` + someRef.current), 1000);
    });
  }

  useEffect(() => {
    if (minutes === MINUTES && seconds === SECONDS) {
      mockAPI().then((data) => setUrl(data));
    }
  }, [minutes, seconds]);

  if (url && minutes === 2 && seconds === 59) {
    fetch(url)
    .then((response) => response.json())
    .then((data) => setComment(data.title));
  }

  const displayBetAmount = (parseFloat(betAmount) || 0).toFixed(2);
  const numbersArr = Array.from({length: NUMBERS}, (_, i) => i + 1);

  const getRows = array => {
    let result = [],
    i = 0;
    while (i < array.length) result.push(array.slice(i, i += NUMBERS_PER_ROW));
    return result;
  };

  const rowNumbers = getRows(numbersArr);

  const buttonClick = (num) => {
    if (selectedNums.includes(num)) {
      setSelectedNums(selectedNums.filter(el => el !== num));
    } else {
      setSelectedNums(selectedNums.concat(num));
    }
  }

  const displayNumbers = rowNumbers.map((row) => {
    return (
      <div className="flex-table row" role="rowgroup">
        {row.map((num) => {
          return (
            <div className="flex-row" role="cell">
              <button
              className="number-btn"
              style={selectedNums.includes(num) ? {backgroundColor: 'gold'} : {backgroundColor: 'white'}}
              disabled={selectedNums.length === AMOUNT_TO_SELECT && !selectedNums.includes(num) ? true : false}
              onClick={() => buttonClick(num)}
              >{num}</button>
            </div>
          )
        })}
      </div>
    )
  })

  const pad = (num, size) => {
    let s = num + ""; 
    while (s.length < size) s = "0" + s; 
    return s;
  }

  const price = (selectedNums.length * betAmount * lotteryDraws).toFixed(2);

  const setInput = (value) => {
    setInputBetAmount(value);
    setBetAmount(value);
  }

  const formatter = new Intl.NumberFormat('en-US', {
    minimumFractionDigits: 2,      
    maximumFractionDigits: 2,
  });

  return(
    <section className="lottery-main-section">
      <div className="container-main-section">
        <div className="table-container" role="table">
          {displayNumbers}
        </div>
      </div>
      <form className="lottery-form">
        <div className="input-group">
          <div className="plus-minus">
            <label>Bet amount:</label>
            <div>
              <button
              type="button"
              className="plus-button"
              tabIndex="-1"
              onClick={() => inputBetAmount !== '1.00' ? setInputBetAmount(formatter.format(+inputBetAmount + 0.20)) : setBetAmount(+betAmount + 0.20)}>
                <FaRegPlusSquare/>
              </button>
              <button
              type="button"
              className="minus-button"
              disabled={displayBetAmount === '0.20' ? true : false}
              tabIndex="-1"
              onClick={() => inputBetAmount !== '1.00' ? setInputBetAmount(formatter.format(+inputBetAmount - 0.20)) : setBetAmount(+betAmount - 0.20)}>
                <FaRegMinusSquare/>
              </button>
            </div>
          </div>
          <input
          type="text"
          value={inputBetAmount !== '1.00' ? inputBetAmount : displayBetAmount}
          onChange={e => setInput(e.target.value)}/>
          <p className ="reminderMsg" style={/^[0-9]+(\.[0-9]{2})$/.test(inputBetAmount) ? {color: 'white'} : {color: 'red'}}>
           * Only numbers with 2 decimal digits
          </p>
        </div>
        <div className="input-group">
          <div className="plus-minus">
            <label>Draws:</label>
            <div>
              <button
              type="button"
              className="plus-button"
              tabIndex="-1"
              onClick={() => setLotteryDraws(+lotteryDraws + 1)}>
                <FaRegPlusSquare/>
              </button>
              <button
              type="button"
              className="minus-button"
              disabled={lotteryDraws === 1 ? true : false}
              tabIndex="-1"
              onClick={() => setLotteryDraws(+lotteryDraws - 1)}>
                <FaRegMinusSquare/>
              </button>
            </div>
          </div>
          <input type="text" value={lotteryDraws} onChange={e => setLotteryDraws(e.target.value)}/>
          <p className ="reminderMsg" style={isNaN(lotteryDraws) ? {color: 'red'} : {color: 'white'}}>
           * Only whole numbers
          </p>
        </div>
        <div className="input-group">
          <p className ="price-msg">Price: {isNaN(price) ? "0.00" : price}</p>
          <p className ="timer">Timer: {pad(minutes, 2)}:{pad(seconds, 2)}</p>
          <p className="quote">Trending comment: <i>"{comment}"</i></p>
          <button disabled={true} className="btn">Try your luck!</button>
        </div>
      </form>
    </section>
  )
};

export default LotteryPage;
