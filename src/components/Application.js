import React, { useState, useEffect } from "react";

import "components/Application.scss";
import DayList from "components/DayList.js";
import Appointment from "components/Appointment";
import axios from 'axios';
import { getAppointmentsForDay } from "../helpers/selectors";


const appointments = [
  {
    id: 1,
    time: "12pm",
  },
  {
    id: 2,
    time: "1pm",
    interview: {
      student: "Lydia Miller-Jones",
      interviewer:{
        id: 3,
        name: "Sylvia Palmer",
        avatar: "https://i.imgur.com/LpaY82x.png",
      }
    }
  },
  {
    id: 3,
    time: "2pm",
  },
  {
    id: 4,
    time: "3pm",
    interview: {
      student: "Archie Andrews",
      interviewer:{
        id: 4,
        name: "Cohana Roy",
        avatar: "https://i.imgur.com/FK8V841.jpg",
      }
    }
  },
  {
    id: 5,
    time: "4pm",
  }
];

export default function Application(props) {
  // const [days, setDays] = useState([]);
  // const [day, setDay] = useState("Monday");
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {...appointments}
  });

  const setDay = (day) => setState({ ...state, day });
  // const setDays = (days) => setState(prev => ({ ...prev, days }));
  // const setAppointments = (appointments) => setState(prev => ({ ...prev, appointments }));

  let dailyAppointments = getAppointmentsForDay(state, state.day)/*[...appointments]*/
  // for (const i in state.appointments) {
  //   dailyAppointments.push(state.appointments[i]);
  // }
  console.log({...state.appointments}, dailyAppointments); //-----------------------------------x
  const parsedAppointments = dailyAppointments.map(elm => <Appointment key={elm.id} {...elm}/>)

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
      setState(prev => ({...prev, days: all[0].data, appointments : all[1].data }));
      
      // const [first, second] = all;    
      // console.log(first, second);
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
