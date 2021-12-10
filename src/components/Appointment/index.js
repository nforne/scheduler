import React, { Fragment } from 'react';
import "components/Appointment/styles.scss";
import Header from "components/Appointment/Header.js";
import Show from "components/Appointment/Show.js";
import Empty from "components/Appointment/Empty.js";


export default function Appointment(props) {
    const appointment = props.time ? `Appointment at ${props.time}` :'No Appointments';
    return (
        <article className="appointment">{appointment}
            <Header time = '' />
            {props.interview ? <Show 
                interviewer = {props.interview.interviewer} 
                student = {props.interview.student} 
                onEdit={() => 'onEdit'} 
                onDelete={() => 'onDelete'} /> : <Empty onAdd ={() => 'onAdd'}/>}
        </article>
    )
};