import "components/Application.scss";
import DayList from "components/DayList";
import React, { useState, useEffect } from "react";
import Appointment from "components/Appointment/index";
import {getAppointmentsForDay, getInterview, getInterviewersForDay} from "./helpers/selectors";
// import {getInterview} from "./helpers/selectors";
import axios from "axios";

export default function Application(props) {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {}
  });

  const interviewers = getInterviewersForDay(state, state.day);
  const dailyAppointments = getAppointmentsForDay(state, state.day);

  const appointmentList = dailyAppointments.map((appointment)=>{
    const interview = getInterview(state, appointment.interview);
    return (
      <Appointment
        {...appointment}
        key={appointment.id}
        id={appointment.id}
        time={appointment.time}
        interview={interview}
        interviewers={interviewers}
      />
    );
  })

  useEffect(()=>{
    Promise.all([
      axios.get("http://localhost:8001/api/days"),
      axios.get("http://localhost:8001/api/appointments"),
      axios.get("http://localhost:8001/api/interviewers")
    ])
    .then((all)=>{
      console.log(all[2].data);
      setState((prev)=>({ ...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data }));
    })
  }, []);
    
  function setDay(newday) {
    setState({ ...state, day: newday });
  }

  return (
    <main className="layout">
      <section className="sidebar">
      <img
  className="sidebar--centered"
  src="images/logo.png"
  alt="Interview Scheduler"
/>
<hr className="sidebar__separator sidebar--centered" />
<nav className="sidebar__menu"><DayList
    days={state.days}
    day={state.day}
    setDay={setDay}/>
</nav>
<img
  className="sidebar__lhl sidebar--centered"
  src="images/lhl.png"
  alt="Lighthouse Labs"
/>
      </section>
      <section className="schedule">
        {appointmentList}
        <Appointment key="last" time="5pm" />
      </section>
    </main>
  );
}
