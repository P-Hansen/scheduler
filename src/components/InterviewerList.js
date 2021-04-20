import React, { useState } from "react";
import "components/InterviewerList.scss";
import InterviewerListItem from "components/InterviewerListItem.js"
import PropTypes from "prop-types";

export default function InterviewerList (props) {
    const [interviewer, setInterviewer] = useState(props.interviewer);

    InterviewerList.propTypes = {
      interviewers: PropTypes.array.isRequired
    };

    // if (!props.interviewers) return
    const interviewers = props.interviewers.map(interviewer => {
        return (
          <InterviewerListItem
            key={interviewer.id}
            name={interviewer.name}
            avatar={interviewer.avatar}
            selected={interviewer.id === props.interviewer}
            setInterviewer={event => props.setInterviewer(interviewer.id)}
          />
        );
      });

    return (
    <section className="interviewers">
        <h4 className="interviewers__header text--light">Interviewer</h4>
        <ul className="interviewers__list">{interviewers}</ul>
    </section>
    );
}