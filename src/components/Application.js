import React, { useState, useEffect } from "react";

import "components/Application.scss";
import DayList from "components/DayList.js";
import Appointment from "components/Appointment";
import axios from 'axios';
import { getAppointmentsForDay, getInterview, getInterviewersForDay } from "../helpers/selectors";



export default function Application(props) {
  const [state, setState] = useState({
    day: "",
    days: [],
    appointments: {},
    interviewers: {}
  });

  const setDay = (day) => setState({ ...state, day });
  // const setDays = (days) => setState(prev => ({ ...prev, days }));
  // const setAppointments = (appointments) => setState(prev => ({ ...prev, appointments }));

  const dailyInterviewers = getInterviewersForDay(state, state.day);
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
    setState(prev => ({...prev, appointments}))
    axios.put(`/api/appointments/${id}`, {'interview':interview})
        .then((res) => {vcgfn(vObj.SHOW); console.log(res.data)})
        .catch((err) => {vcgfn(vObj.ERROR); console.log(err)})
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
    setState(prev => ({...prev, appointments}))
    axios.delete(`/api/appointments/${id}`, {'interview': interview })
        .then((res) => {vcgfn(vObj.EMPTY); console.log(res.data)})
        .catch((err) => {vcgfn(vObj.ERROR); console.log(err)})
  };

  
  
  const parsedAppointments = dailyAppointments.map(elm => {
    return <Appointment 
    key={elm.id} {...elm } 
    {...getInterview(state, elm.interview)} 
    interviewers={dailyInterviewers}
    bookInterview={bookInterview}
    cancelInterview={cancelInterview}
    />
  });

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

  return (
    <main className="layout">
      <section className="sidebar">
        {/* Replace this with the sidebar elements during the "Project Setup & Familiarity" activity. */}
        <img
        className="sidebar--centered"
        src="images/logo.png"
        alt="Interview Scheduler"
      />
      <hr className="sidebar__separator sidebar--centered" />
      <nav className="sidebar__menu">
      <DayList
        days={state.days}
        value={state.day}
        onChange={setDay}
      />
      </nav>
      <img
        className="sidebar__lhl sidebar--centered"
        src="images/lhl.png"
        alt="Lighthouse Labs"
      />
      </section>
      <section className="schedule">
        {[...parsedAppointments, <Appointment key={"endOfDay"} time='5pm' />]} 
      </section>
    </main>
  );
}
