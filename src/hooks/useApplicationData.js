import React, { useState, useEffect } from "react";
import axios from 'axios';

export default function useApplicationData(initial) {

    const [state, setState] = useState(initial);

  const setDay = (day) => setState({ ...state, day });
  // const setDays = (days) => setState(prev => ({ ...prev, days }));
  // const setAppointments = (appointments) => setState(prev => ({ ...prev, appointments }));
  
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
        .then(() => {setState(prev => ({...prev, appointments})); vcgfn(vObj.SHOW);})
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
        .then(() => {setState(prev => ({...prev, appointments})); vcgfn(vObj.EMPTY); })
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
         
  }, []);
  
 return {setDay, bookInterview, cancelInterview, state };
};

