import React from "react";
import "./Styles.scss";
import Empty from "components/Appointment/Empty";
import Show from "components/Appointment/Show";
import Form from "components/Appointment/Form";
import Status from "components/Appointment/Status";
import useVisualMode from "../../hooks/useVisualMode"
import Confirm from "components/Appointment/Confirm";
import Error from "components/Appointment/Error";

export default function Appointment (props) {
    const EMPTY = "EMPTY";
    const SHOW = "SHOW";
    const CREATE = "CREATE";
    const SAVING = "SAVING";
    const DELETING = "DELETING";
    const CONFIRM = "CONFIRM";
    const EDIT = "EDIT";
    const ERROR_SAVE = "ERROR_SAVE";
    const ERROR_DELETE = "ERROR_DELETE";

    const { mode, transition, back } = useVisualMode (props.interview ? SHOW : EMPTY);

    function onDelete(id) {
        transition(DELETING, true);
        props.deleteCall(id)
        .then(()=>{
            transition(EMPTY);
        })
        .catch((err)=>{
            console.log("Delete error", err);
            transition(ERROR_DELETE, true);
        })
    }

    function book(name, interviewer) {
        transition(SAVING);
        const interview = props.onSave(name, interviewer);
        props.bookInterview(props.id, interview)
            .then(()=>{
                transition(SHOW);
            })
            .catch((err)=>{
                console.log("Save error", err);
                transition(ERROR_SAVE, true);
            })
    }
        
    return (
    <article data-testid="appointment" className="appointment">
        <header>{props.time}</header>
        {mode === EMPTY && <Empty onAdd={()=>{transition(CREATE);}} />}
        {mode === SHOW && (
            <Show
                student={props.interview.student}
                interviewer={props.interview.interviewer}
                transition={transition}
                id={props.id}
            />
        )}
        {mode === CREATE && (
            <Form
                name={props.name}
                interviewers={props.interviewers}
                onCancel={back}
                onSave={book}
                // onSave={props.onSave}
                // bookInterview={book}
                // transition={transition}
                // id={props.id}
                interviewer={{}}
            />
        )}
        {mode === EDIT && (
            <Form
                name={props.interview.student}
                interviewers={props.interviewers}
                onCancel={back}
                onSave={book}
                // onSave={props.onSave}
                // bookInterview={book}
                // transition={transition}
                // id={props.id}
                interviewer={props.interview.interviewer}
            />
        )}
        {mode === SAVING && (
            <Status
            message={"Saving"}/>
        )}
        {mode === DELETING && (
            <Status
            message={"deleting"}/>
        )}
        {mode === CONFIRM && (
            <Confirm
                message={"Are you sure you want to delete?"}
                onCancel={back}
                onConfirm={onDelete}
                id={props.id}
            />
        )}
        {mode === ERROR_DELETE && (
            <Error
            message={"There was an error during delete"}
            onClose={back}/>
        )}
        {mode === ERROR_SAVE && (
            <Error
            message={"Error could not save booking to the server"}
            onClose={back}/>
        )}
    </article>);
}