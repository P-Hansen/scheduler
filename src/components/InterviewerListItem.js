import React, { useState } from "react";
import "components/InterviewerListItem.scss";
var classnames = require('classnames');

export default function InterviewerListItem (props) {
    let name = "";
    const interviewerClass = classnames("interviewers__item", {
        "interviewers__item--selected": props.selected,
      });

    if(props.selected) name = props.name;

    return (
        <li className={interviewerClass} onClick={props.setInterviewer}>
          <img
            className="interviewers__item-image"
            src={props.avatar}
            alt={props.name}
          />
          {props.selected && props.name}
        </li>
      );
};