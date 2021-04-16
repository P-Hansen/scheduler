import React from "react";
import "./Styles.scss";
import Empty from "components/Appointment/Empty";
import Show from "components/Appointment/Show";
import Form from "components/Appointment/Form";
import useVisualMode from "../../hooks/useVisualMode"

export default function Appointment (props) {
    const EMPTY = "EMPTY";
    const SHOW = "SHOW";
    const CREATE = "CREATE";

    const { mode, transition, back } = useVisualMode (props.interview ? SHOW : EMPTY);

    // function showMe() {
    //     if (props.interview) {
    //         // useVisualMode(SHOW);
    //         return <Show student={props.interview.student} interviewer={props.interview.interviewer}/>;
    //     } else {
    //         // useVisualMode(EMPTY);
    //         return <Empty />
    //     };
    // };

    return (
    <article className="appointment">
        <header>{props.time}</header>
        {mode === EMPTY && <Empty onAdd={()=>{transition(CREATE);}} />}
        {mode === SHOW && (
            <Show
                student={props.interview.student}
                interviewer={props.interview.interviewer}
            />
        )}
        {mode === CREATE && (
            <Form
                name={props.name}
                interviewers={props.interviewers}
                onCancel={back}
            />
        )}
        {/* {showMe()} */}
    </article>);
}