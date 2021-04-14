import React, { useState } from "react";
import "./Styles.scss";
import Header from "components/Appointment/Header";
import Empty from "components/Appointment/Empty";
import Show from "components/Appointment/Show";


export default function Appointment (props) {

    function showMe() {
        if (props.interview) return <Show name={props.interview.student} interviewer={props.interview.interviewer} />
        else return <Empty />
    }
    
    return (
    <article className="appointment">
        <header>{props.time}</header>
        {showMe()}
    </article>);
}