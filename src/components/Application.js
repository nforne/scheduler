import React, { useState, useEffect } from "react";

import "components/Application.scss";
import DayList from "components/DayList.js";
import Appointment from "components/Appointment";
import { getAppointmentsForDay, getInterview, getInterviewersForDay } from "../helpers/selectors.js";
import useApplicationData from "../hooks/useApplicationData.js";


export default function Application(props) {
  const {setDay, bookInterview, cancelInterview, state } = useApplicationData(
    {
      day: "",
      days: [],
      appointments: {},
      interviewers: {}
    }
  );
 
  const dailyInterviewers = getInterviewersForDay(state, state.day);
  const dailyAppointments = getAppointmentsForDay(state, state.day);
  
  const parsedAppointments = dailyAppointments.map(elm => {
    return <Appointment 
    key={elm.id} {...elm } 
    {...getInterview(state, elm.interview)} 
    interviewers={dailyInterviewers}
    bookInterview={bookInterview}
    cancelInterview={cancelInterview}
    />
  });

  return (
    <main className="layout">
      <section className="sidebar">
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
