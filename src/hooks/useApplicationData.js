import DayList from "components/DayList";
import React, { useState, useEffect } from "react";
import Appointment from "components/Appointment/index";
import {getAppointmentsForDay, getInterview, getInterviewersForDay} from "../components/helpers/selectors";
import axios from "axios";
import DayListItem from "components/DayListItem";

export default function useApplicationData() {
    const [state, setState] = useState({
        day: "Monday",
        days: [],
        appointments: {}
      });
    
      //const interviewers = getInterviewersForDay(state, state.day);
      //const dailyAppointments = getAppointmentsForDay(state, state.day);

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

      useEffect(()=>{
        if(state.days.length > 0) {
          state.days.map((day, arraySlot)=>{
            const newSpots = updateSpotsCount(day);
            state.days[arraySlot].spots =  newSpots;
          });
          setState({...state})
        }
      }, [state.appointments])

      function updateSpotsCount(dayObject) {
        let count = 5;
        dayObject.appointments.map((appointmentNumber)=>{
          if (state.appointments[appointmentNumber].interview) {
            count -= 1;
          };
        });
        return count
      }
      
      function setDay(newday) {
        setState({ ...state, day: newday });
      }
    
      function bookInterview(id, interview) {
        console.log("book update", id, interview);
        const appointment = {
          ...state.appointments[id],
          interview: { ...interview }
        };
        
        const appointments = {
          ...state.appointments,
          [id]: appointment
        };
        console.log("appointment", appointment);
        return axios.put(`http://localhost:8001/api/appointments/${id}`, appointment)
        .then((res)=>{
            // for(const daysOfTheWeek of state.days) {
            //   for(const appointmentNumber of daysOfTheWeek.appointments) {
            //     console.log(daysOfTheWeek)
            //     if (appointmentNumber === id) {
            //       console.log(daysOfTheWeek);
            //       daysOfTheWeek.spots -= 1;
            //     }
            //   };
            // };
            setState({
                ...state,
                appointments: appointments,
            });
        });
      }
    
      function deleteCall(id) {
        return axios.delete(`http://localhost:8001/api/appointments/${id}`)
        .then((res)=>{
          console.log("delete response", res);
          const appointment = {
            ...state.appointments[id],
            interview: null
          };
          const appointments = {
            ...state.appointments,
            [id]: appointment
          };
          setState({
            ...state,
            appointments: appointments,
        });
          // for(const daysOfTheWeek of state.days) {
          //   for(const appointmentNumber of daysOfTheWeek.appointments) {
          //     if (appointmentNumber === id) {
          //       daysOfTheWeek.spots += 1;
          //     }
          //   };
          // };
          // setState({...state});
        })
      }
    
      function save(name, interviewer) {
        const interview = {
          student: name,
          interviewer
        };
        return interview
      }

    return { state, setDay, bookInterview, save, deleteCall, bookInterview };
}