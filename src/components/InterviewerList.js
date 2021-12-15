import React, { useState } from "react";
import "components/InterviewerList.scss";
import PropTypes from 'prop-types';

import InterviewerListItem from "components/InterviewerListItem";

InterviewerList.propTypes = {
    interviewers: PropTypes.array.isRequired
  };
  
export default function InterviewerList(props) {
    const {value, onChange} = props;
    const parsedInterviewers = props.interviewers.map(element => 
        <InterviewerListItem 
        key={element.id}
        name={element.name}
        avatar = {element.avatar}
        selected={element.id === value}
        setInterviewer={() => onChange(element.id)}
    />
    );

    return (
        <section className="interviewers">
            <h4 className="interviewers__header text--light">Interviewer</h4>
            <ul className="interviewers__list">
                {parsedInterviewers}
            </ul>
        </section>
    );
  }
  