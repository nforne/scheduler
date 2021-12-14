import React, { useState } from 'react';
import Button from 'components/Button'
import InterviewerList from 'components/InterviewerList'


export default function Form(props) {
    
    const [student, setStudent] = useState(props.student || "");
    const [interviewer, setInterviewer] = useState(props.interviewer || null);

    // const reset = () => {
    //     setInterviewer('');
    //     setStudent('');
    // };

    const cancel = () => {
        setInterviewer('');
        setStudent('');
    };
    
    return (
        <main className="appointment__card appointment__card--create">
        <section className="appointment__card-left">
            <form autoComplete="off" onSubmit={event => {event.preventDefault(); }}>
            <input 
                className="appointment__create-input text--semi-bold"
                name="name"
                type="text"
                placeholder="Enter Student Name"
                /*
                This must be a controlled component
                your code goes here
                */
                value = {student}
                onChange={(e) => setStudent(e.target.value)}
            />
            </form>
            <InterviewerList 
            /* your code goes here */
            interviewers = {props.interviewers}
            value = {interviewer}
            onChange = {setInterviewer}
            />
        </section>
        <section className="appointment__card-right">
            <section className="appointment__actions">
            <Button danger onClick={() => {cancel(); props.onCancel();}}>Cancel</Button>
            <Button confirm onClick={() => student && interviewer ? props.onSave(student, interviewer) : ""}>Save</Button>
            </section>
        </section>
        </main>
    )
};