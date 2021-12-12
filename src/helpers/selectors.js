export const getAppointmentsForDay = (state, day) => {
    let selectedDay = {};
    for (const j of state.days) {
       if (j.name === day) {
           selectedDay = j;
           break;
        } 
    }
    const daysAppointments = [];
    if (selectedDay.appointments) {
        for (const i of selectedDay.appointments) {
            if (state.appointments[i]) {
                daysAppointments.push(state.appointments[i])
            }
        }
    }
    return daysAppointments;
};


export const getInterviewersForDay = (state, day) => {
    let selectedDay = {};
    for (const j of state.days) {
       if (j.name === day) {
           selectedDay = j;
           break;
        } 
    }
    const daysInterviewers = [];
    if (selectedDay.interviewers) {
        for (const i of selectedDay.interviewers) {
            if (state.interviewers[i]) {
                daysInterviewers.push(state.interviewers[i])
            }
        }
    }
    return daysInterviewers;
};



export const getInterview = (state, interview) => {
 if (interview !== null) {
    const interviewerID = interview.interviewer;
    if (state.interviewers[interviewerID]) {
        interview['interviewer'] = state.interviewers[interviewerID];
    }
 }
 return interview;
};


// export const getInterview = (elm, interviews) => {
//  if (elm.interview !== null) {
//     const interviewerID = elm.interview['interviewer'];
//     if (interviews[interviewerID]) {
//         elm.interview['interviewer'] = interviews[interviewerID];
//     }
//  }
//  return elm;
// };