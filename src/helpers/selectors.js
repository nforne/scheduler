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