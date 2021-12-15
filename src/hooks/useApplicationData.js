import React, { useState, useEffect } from "react";
import axios from 'axios';
import { getAppointmentsForDay, getInterview, getInterviewersForDay } from "../helpers/selectors.js";

export default function useApplicationData(initial) {

  const [state, setState] = useState(initial);
  const [changeTracker, setChangeTracker] = useState(0);

  const setDay = (day) => setState({ ...state, day });
  // const setDays = (days) => setState(prev => ({ ...prev, days }));
  // const setAppointments = (appointments) => setState(prev => ({ ...prev, appointments }));
//--------------------------------------------------------------------------------------------------x 
//   const dailyAppointments = getAppointmentsForDay(state, state.day);

//   const spotsLeft = (state, dailyAppointments) => {
    
//         let selectedDay = [{}, 'i'];
//         for (let j = 0; j < state.days.length; j++) {
//             if (state.days[j].name === state.day) {
//                 selectedDay = [state.days[j], j];
//                 break;
//                 } 
//             }
//         let onpenSpots = 0
//         for (const appointment of dailyAppointments) {
//             if (appointment.interview === null) {
//                 onpenSpots += 1;
//             }
//         }

//         const newDays = (state, day) => {
//             const days = [...state.days];
//             if (days[selectedDay[1]].id === day.id) {
//                 days[selectedDay[1]] = day;
//             }
//             return days;
//         }
        
//         const day = {...selectedDay[0], spots: onpenSpots}
//         const days = newDays(state, day)

//         return [days, day, onpenSpots];
//     };

//   const updates = () => spotsLeft(state, dailyAppointments);
  
  const bookInterview = (id, interview, vcgfn, vObj) => { // vcgfn = view change function, vObj = view Object
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    axios.put(`/api/appointments/${id}`, {'interview':interview})
        .then(() => {
            setChangeTracker(prev => prev + 1);
            setState(prev => ({...prev, appointments /*, days: updates()[0]*/}));
            vcgfn(vObj.SHOW); 
            })
        .catch((error) => {vcgfn(vObj.ERROR_SAVE, true); console.log(error)})
   };
  
  const cancelInterview = (id, interview, vcgfn, vObj) => { // vcgfn = view change function, vObj = view Object
    const appointment = {
      ...state.appointments[id],
      interview: null
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    axios.delete(`/api/appointments/${id}`, {'interview': interview })
        .then(() => {
            setChangeTracker(prev => prev + 1);
            setState(prev => ({...prev, appointments /*, days: updates()[0]*/})); 
            vcgfn(vObj.EMPTY); 
           })
        .catch((error) => {vcgfn(vObj.ERROR_DELETE, true); console.log(error)})
   };

   useEffect(() => {
    Promise.all([
      axios.get('/api/days'),
      axios.get('/api/appointments'),
      axios.get('/api/interviewers')
    ]).then((all) => {
      setState(prev => ({...prev, 
        days: all[0].data, 
        appointments : all[1].data, 
        interviewers: all[2].data
      }))
    }); 
          
  }, [changeTracker]);
  
 return {setDay, bookInterview, cancelInterview, state };
};

