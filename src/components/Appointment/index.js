import React, { Fragment } from 'react';
import "components/Appointment/styles.scss";
import Header from "components/Appointment/Header.js";
import Show from "components/Appointment/Show.js";
import Empty from "components/Appointment/Empty.js";
import Status from "components/Appointment/Status.js";
import Confirm from "components/Appointment/Confirm.js";
import Error from "components/Appointment/Error.js";
import useVisualMode from "../../hooks/useVisualMode";
import Form from './Form';

export default function Appointment(props) {
    const EMPTY = "EMPTY";
    const SHOW = "SHOW";
    const CREATE = "CREATE";
    const PENDING = 'PENDING';
    const CONFIRM = 'CONFIRM';
    const ERROR = 'ERROR';
    const ERROR_SAVE = 'ERROR_SAVE';
    const ERROR_DELETE = 'ERROR_DELETE';
    
    const viewObj = {EMPTY, SHOW, CREATE, PENDING, CONFIRM, ERROR, ERROR_SAVE, ERROR_DELETE } // to be upgraded
    const { mode, transition, back } = useVisualMode(
        props.interview ? SHOW : EMPTY
      );
    
    const save = (name, interviewer) => {
        const interview = {
            student: name,
            interviewer
        };
        // transition(PENDING); /* check CREATE mode below for currently runing alternative.*/
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
                onEdit={() => transition(CREATE) }
                onDelete={() => transition(CONFIRM)} // could also take true here for proper Error redirect
                />)}
            {mode === CREATE && <Form
                student={props.interview ? props.student : ""}
                interviewer = {props.interview ? props.interviewer.id : ""}
                interviewers={props.interviewers}
                onCancel={back}
                onSave={(name, interviewer) => {save(name, interviewer); transition(PENDING)}} 
                />}
            {mode === PENDING && (<Status 
                message={'Pending ...'}
                />)}
            {mode === ERROR &&(<Error // for future use
                message={ props.interview ? 'Oops! THIS went wrong.' : 'Oops! THAT went wrong.'}
                onClose={() => props.interview ? transition(SHOW) : transition(EMPTY)}
                />)}
            {mode === ERROR_SAVE &&(<Error 
                message={ 'Oops! Could not save your booking. Something went wrong. Consider trying again shortly. Thank you!'}
                onClose={() => { back();}}
                />)}
            {mode === ERROR_DELETE &&(<Error 
                message={ 'Oops! Could not delete as requested. Something went wrong. Consider trying again shortly. Thank you!'}
                onClose={() => { back(true);}}
                />)}
            {mode === CONFIRM && (<Confirm 
                message={'Are you sure you would like to delete?'}
                onCancel={back}
                onConfirm={(name, interviewer) => {transition(PENDING); cancel(name, interviewer)}}
                />)}

        </article>
    )
};