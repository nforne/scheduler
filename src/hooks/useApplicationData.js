import React, { useState, useEffect } from "react";
import axios from 'axios';

import { getAppointmentsForDay, getInterview, getInterviewersForDay } from "../helpers/selectors.js";


export default function useApplicationData(initial) {

  const [state, setState] = useState(initial);

  const setDay = (day) => setState({ ...state, day });
  // const setDays = (days) => setState(prev => ({ ...prev, days }));
  // const setAppointments = (appointments) => setState(prev => ({ ...prev, appointments })); // for reference

  const spotsLeft = (state, dailyAppointments) => {
    
        let selectedDay = [{}, 'i'];
        for (let j = 0; j < state.days.length; j++) {
            if (state.days[j].name === state.day) {
                selectedDay = [state.days[j], j];
                break;
                } 
            }
        let onpenSpots = 0;
        for (const appointment of dailyAppointments) {
            if (appointment.interview === null) {
                onpenSpots += 1;
            }
        }

        const newDays = (state, day) => {
            const days = [...state.days];
            if (days[selectedDay[1]].id === day.id) {
                days[selectedDay[1]] = day;
            }
            return days;
        }
        
        const dayCreate = {...selectedDay[0], spots: onpenSpots - 1}
        const daysCreate = newDays(state, dayCreate)

        const dayDelete = {...selectedDay[0], spots: onpenSpots + 1}
        const daysDelete = newDays(state, dayDelete)
        
        return [daysCreate, daysDelete];
    };

  const dailyAppointments = getAppointmentsForDay(state, state.day);
  
  
  const bookInterview = (id, interview, vcgfn, vObj) => { // vcgfn = view change function, vObj = view Object
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    const stateDays = state.appointments[id].interview ? // spots should not be updated if user is editing an existing appointment.
        [...state.days] : spotsLeft(state, dailyAppointments)[0]; 
    
    axios.put(`/api/appointments/${id}`, {'interview':interview})
        .then(() => {
            setState(prev => ({...prev, appointments, days: stateDays}));
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
            const stateDays = spotsLeft(state, dailyAppointments)[1];
            setState(prev => ({...prev, appointments, days: stateDays})); 
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
          
  }, []);
  
 return {setDay, bookInterview, cancelInterview, state };
};

