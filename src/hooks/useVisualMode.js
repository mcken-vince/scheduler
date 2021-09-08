import { useState } from 'react';

/**
 * Controls the state given to each Appointment component, determines what the component will display
 * @param {string} initial mode to initialize component with (SHOW, EMPTY)
 * @returns {object} containing mode value, and functions with which to move back and forth between modes
 */
const useVisualMode = (initial) => {
  const [ mode, setMode ] = useState(initial);
  const [ history, setHistory ] = useState([initial]);

  /**
   * Used by Appointment components to change mode, updates both history and mode state
   * @param {string} val new mode being assigned
   * @param {boolean} replace whether to replace last item of history or not
   */
  const transition = (val, replace=false) => {
    const updatedHistory = [...history];
    if (replace) {
      updatedHistory.pop();
    } 
    updatedHistory.push(val);

    setHistory(updatedHistory);
    setMode(val)
  };

  /**
   * Used by Appointment components to move back one mode in history, updates both history and mode state
   */
  const back = () => {

    if (history.length > 1) {
      setHistory(history.slice(0, history.length - 1));
      setMode(history[history.length - 2]);
    }
  };

  return { mode, transition, back };
};

export default useVisualMode ;