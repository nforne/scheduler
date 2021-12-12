import React, { Fragment } from 'react';
import "components/Appointment/styles.scss";
import Header from "components/Appointment/Header.js";
import Show from "components/Appointment/Show.js";
import Empty from "components/Appointment/Empty.js";
import useVisualMode from "../../hooks/useVisualMode";
import Form from './Form';

export default function Appointment(props) {
    const EMPTY = "EMPTY";
    const SHOW = "SHOW";
    const CREATE = "CREATE";
    const { mode, transition, back } = useVisualMode(
        props.interview ? SHOW : EMPTY
      );

    const appointment = props.time ? `Appointment at ${props.time}` :'No Appointments';
    return (
        <article className="appointment">{appointment}
            {/* {props.interview ?  <Show 
                interviewer = {props.interview.interviewer} 
                student = {props.interview.student} 
                onEdit={() => 'onEdit'} 
                onDelete={() => 'onDelete'} /> : <Empty onAdd ={() => 'onAdd'}/>}
                <Header time = '' /> */}
            {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
            {mode === SHOW && (
                <Show
                student={props.interview.student}
                interviewer={props.interview.interviewer}
                />)}
            {mode === CREATE && <Form
            interviewers={props.interviewers}
            onCancel={back}
            onSave={console.log('onSave')} />}

        </article>
    )
};