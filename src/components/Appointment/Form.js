import React, { useState } from "react";
import Button from "components/Button";
import InterviewerList from "components/InterviewerList";


export default function Form (props) {
    const [name, setName] = useState(props.name || "");
    const [interviewer, setInterviewer] = useState(props.interviewer.id);
    console.log("this is the empty interviewer", interviewer);

    function reset() {
        setName("");
        setInterviewer(null);
        props.onCancel();
    };

    function save() {
        if (interviewer) {
            const interview = props.onSave(name, interviewer);
            props.transition("SAVING");
            props.bookInterview(props.id, interview)
            .then(()=>{
                props.transition("SHOW");
            })
        }
    }

    return (
    <main className="appointment__card appointment__card--create">
    <section className="appointment__card-left">
        <form onSubmit={event => event.preventDefault()} autoComplete="off">
        <input
            onChange={(event) => {setName(event.target.value)}}
            className="appointment__create-input text--semi-bold"
            name={name}
            type="text"
            value={name}
            placeholder="Enter Student Name"
            /*
            This must be a controlled component
            */
        />
        </form>
        <InterviewerList interviewers={props.interviewers} interviewer={interviewer} setInterviewer={(id)=>{setInterviewer(id)}} />
    </section>
    <section className="appointment__card-right">
        <section className="appointment__actions">
            <Button onClick={reset} danger>Cancel</Button>
            <Button onClick={save} confirm>Save</Button>
        </section>
    </section>
    </main>
    );
};