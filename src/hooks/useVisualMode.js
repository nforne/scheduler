import {useState} from 'react';

export default function useVisualMode(initial) {
    const [mode, setMode] = useState(initial);
    const [history, setHistory] = useState([initial]); // This line is new!
   function transition(newMode, replace = false){
        if (replace) {
            history[history.length -1] = newMode;
            setMode(history[history.length - 1]);
        } else {
            setMode(newMode);
            history.push(newMode);
        }   
    };
   function back(replace = false){
       if (replace) {}
       if (history.length > 1) {
           history.length >= 3 &&  replace ? history.splice(history.length - 2, 2) : history.pop(); 
           setMode(history[history.length - 1]);
        } else {
           setMode(history[0]);
        }
    };
 return {mode, transition, back};
};