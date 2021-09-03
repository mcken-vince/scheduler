import { useState } from 'react';

const useVisualMode = (initial) => {
  const [ mode, setMode ] = useState(initial);
  const [ history, setHistory ] = useState([initial]);

  const transition = (val, replace=false) => {
    const updatedHistory = [...history];
    if (replace) {
      updatedHistory.pop();
    } 
    updatedHistory.push(val);

    setHistory(updatedHistory);
    setMode(val)
  };

  const back = () => {
    // make copy of history minus last item 
    // then set history to value of copy
    // and set mode to the last item of history
    if (history.length > 1) {
      setHistory(history.slice(0, history.length - 1));
      setMode(history[history.length - 2]);
    }
  };

  return { mode, transition, back };
};

export default useVisualMode ;