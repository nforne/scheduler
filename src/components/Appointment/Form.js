import React, { useState } from 'react';
import Button from 'components/Button'
import InterviewerList from 'components/InterviewerList'


export default function Form(props) {
    
    const [student, setStudent] = useState(props.student || "");
    const [interviewer, setInterviewer] = useState(props.interviewer || null);
    const [error, setError] = useState(["", "",""]);

    const validate = () => {
        if (student && interviewer) {
            setError(["", "",""]);
            props.onSave(student, interviewer);
        } else if (!student && !interviewer){
            setError(["","Please, enter a student name and select an Interviewer to save a spot!"]);
        } else if (!student){
            setError(["Student name cannot be blank!",""]);
        } else if (!interviewer){
            setError(["","Please, select an Interviewer!"]);
        }
    };

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
                */
                data-testid="student-name-input"
                value = {student}
                onChange={(e) => setStudent(e.target.value)}
            />
            <section className="appointment__validation">{error[0]}</section>
            </form>
            <section className="appointment__validation">{error[1]}</section>
            <InterviewerList 
            interviewers = {props.interviewers}
            value = {interviewer}
            onChange = {setInterviewer}
            />
        </section>
        <section className="appointment__card-right">
            <section className="appointment__actions">
            <Button danger onClick={() => {cancel(); props.onCancel();}}>Cancel</Button>
            <Button confirm onClick={validate}>Save</Button>
            </section>
        </section>
        </main>
    )
};