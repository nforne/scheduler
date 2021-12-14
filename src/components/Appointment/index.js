import React, { Fragment } from 'react';
import "components/Appointment/styles.scss";
import Header from "components/Appointment/Header.js";
import Show from "components/Appointment/Show.js";
import Empty from "components/Appointment/Empty.js";
import Status from "components/Appointment/Status.js";
import Confirm from "components/Appointment/Confirm.js";
import useVisualMode from "../../hooks/useVisualMode";
import Form from './Form';

export default function Appointment(props) {
    const EMPTY = "EMPTY";
    const SHOW = "SHOW";
    const CREATE = "CREATE";
    const PENDING = 'PENDING';
    const CONFIRM = 'CONFIRM';
    const ERROR = 'ERROR'
    
    const viewObj = {EMPTY, SHOW, CREATE, PENDING, CONFIRM, ERROR} // Experimental
    const { mode, transition, back } = useVisualMode(
        props.interview ? SHOW : EMPTY
      );
    
    const save = (name, interviewer) => {
        const interview = {
            student: name,
            interviewer
        };
        // transition(PENDING);
        props.bookInterview(props.id, interview, transition, viewObj)
    };

    const cancel = (name, interviewer) => {
        const interview = {
            student: name,
            interviewer
        };
        // transition(PENDING);
        props.cancelInterview(props.id, interview, transition, viewObj)
    };
    
    return (
        <article className="appointment">
            
            {props.time ? <Header time ={props.time} /> :'No Appointment(s)'}
           
            {mode === EMPTY && <Empty 
                onAdd={() => transition(CREATE)} 
                />}
            {mode === SHOW && (<Show
                student={props.interview.student}
                interviewer={props.interview.interviewer}
                onEdit={() => 'onEdit'} 
                onDelete={() => transition(CONFIRM)}
                />)}
            {mode === CREATE && <Form
                interviewers={props.interviewers}
                onCancel={back}
                onSave={(name, interviewer) => {save(name, interviewer); transition(PENDING)}} 
                />}
            {mode === PENDING && (<Status 
                message={'Pending ...'}
                />)}
            {mode === CONFIRM && (<Confirm 
                message={'Are you sure you would like to delete?'}
                onCancel={back}
                onConfirm={(name, interviewer) => {transition(PENDING); cancel(name, interviewer)}}
                />)}
            

        </article>
    )
};

// Saving interview appointment ...