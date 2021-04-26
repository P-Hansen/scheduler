import { useState, useEffect } from "react";
import axios from "axios";

export default function useApplicationData() {
    const [state, setState] = useState({
        day: "Monday",
        days: [],
        appointments: {}
      });
      const baseURL = "http://localhost:8001";

      //load data from the server on mount
      useEffect(()=>{
        Promise.all([
          axios.get(baseURL + "/api/days"),
          axios.get(baseURL + "/api/appointments"),
          axios.get(baseURL + "/api/interviewers")
        ])
        .then((all)=>{
          setState((prev)=>({ ...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data }));
        })
      }, []);

      //updates the number of spots when state.appointments changes
      useEffect(()=>{
        if(state.days.length > 0) {
          state.days.map((day, arraySlot)=>{
            const newSpots = updateSpotsCount(day);
            state.days[arraySlot].spots =  newSpots;
          });
          setState({...state})
        }
      }, [state.appointments])

      //calculates the number of spots in a given day
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
    
      //updates state and adds an appointment to the server
      function bookInterview(id, interview) {
        const appointment = {
          ...state.appointments[id],
          interview: { ...interview }
        };
        
        const appointments = {
          ...state.appointments,
          [id]: appointment
        };
        return axios.put(baseURL + `/api/appointments/${id}`, appointment)
        .then((res)=>{
            setState({
                ...state,
                appointments: appointments,
            });
        });
      }
    
      //updates state and deletes an appointment from the server
      function deleteCall(id) {
        return axios.delete(baseURL + `/api/appointments/${id}`)
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
        })
      }
    
      //creates an interview for the book appointment function
      function save(name, interviewer) {
        const interview = {
          student: name,
          interviewer
        };
        return interview
      }

    return { state, setDay, bookInterview, save, deleteCall, bookInterview };
}