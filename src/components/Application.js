import React, { useState, useEffect } from "react";

import "components/Application.scss";
import DayList from "components/DayList.js";
import Appointment from "components/Appointment";
import axios from 'axios';
import { getAppointmentsForDay, getInterview } from "../helpers/selectors";

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

  const dailyAppointments = getAppointmentsForDay(state, state.day);
  // console.log(dailyAppointments) //---------------------------------------x
  // console.log(state.interviewers) //---------------------------------------x

  const parsedAppointments = dailyAppointments.map(elm => {
    // const interview = getInterview(state, appointment.interview);
    // console.log(getInterview(elm, state.interviewers)) //---------------------------------x
    console.log('------------------------------------------------') //---------------------------------x
    console.log(elm) //---------------------------------x
    console.log('------------------------------------------------') //---------------------------------x
    console.log(getInterview(state, elm.interview)) //---------------------------------x

    return <Appointment key={elm.id} {...elm } {...getInterview(state, elm.interview)}/>
  });

  useEffect(() => {

    // axios.get('/api/days')
    //      .then((res) => {setDays(res.data);})
    //      .catch((err) => {console.log(err);})

    // axios.get('/api/appointments')
    //      .then((res) => {setAppointments(res.data);})
    //      .catch((err) => {console.log(err);})
    
    // axios.get('/api/interviewers')
    //      .then((res) => {setAppointments(res.data);})
    //      .catch((err) => {console.log(err);})

    Promise.all([
      axios.get('/api/days'),
      axios.get('/api/appointments'),
      axios.get('/api/interviewers')
    ]).then((all) => {

      // console.log(all[0].data); // first      
      // console.log(all[1].data); // second      
      // console.log(all[2].data); // third
      
      // setDays(all[0].data);
      // setAppointments(all[1].data);
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
        {parsedAppointments}
        <Appointment time='5pm' />
      </section>
    </main>
  );
}
