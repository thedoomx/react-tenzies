import './App.css';
import Box from './components/Box';
import React from 'react'

function App() {

  const defaultNumberVal = 0;

  const [isSuccess, setIsSuccess] = React.useState(() =>
    false
  );

  const [numbers, setNumbers] = React.useState(() =>
    [
      { number: 1, isLocked: false },
      { number: 2, isLocked: false },
      { number: 3, isLocked: false },
      { number: 4, isLocked: false },
      { number: 5, isLocked: false },
      { number: 6, isLocked: false },
      { number: 7, isLocked: false },
      { number: 8, isLocked: false }
    ]
  );

  function randomizeNumbers() {
    setNumbers(prevNumbers => prevNumbers.map((item, index) => {
      if (item.isLocked == true) {
        return item;
      }
      else {
        return {
          ...item,
          number: Math.floor(Math.random() * 9) + 1
        }
      }
    }));
  }

  const [lockedNumber, setLockedNumber] = React.useState(() => defaultNumberVal);

  function handleClick(event, number, index) {

    if (numbers[index].isLocked == true) {
      toggleNumberAtIndex(index, false);

      return;
    }

    if (number !== lockedNumber && lockedNumber !== defaultNumberVal) {
      return;
    }
    else if (number !== lockedNumber && lockedNumber === defaultNumberVal) {
      setLockedNumber(number);

      toggleNumberAtIndex(index, true);
    }
    else {
      toggleNumberAtIndex(index, true);
    }
  }

  function toggleNumberAtIndex(index, isLocked) {
    setNumbers(prevNumbers => {
      let tempArr = [...prevNumbers];
      tempArr[index].isLocked = isLocked;

      return tempArr
    })
  }

  React.useEffect(() => {
    if (checkArray(false)) {
      setLockedNumber(defaultNumberVal);
    }
    else if(checkArray(true)) {
      setIsSuccess(true);
    }
  }, [numbers])

  function checkArray(isLocked) {
    for (let i = 0; i < numbers.length; i++) {
      if (numbers[i].isLocked != isLocked) {
        return false;
      }
    }

    return true;
  }

  return (
    <div className="App">
      {isSuccess == false && numbers.map((item, index) => <Box key={index} handleClick={handleClick} item={item} index={index} />)}
      
      <button type='button' disabled={isSuccess && "disabled"} onClick={randomizeNumbers}>{isSuccess == true ? "Success" : "Randomize Numbers"}</button>
    </div>
  );
}

export default App;
