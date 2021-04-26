//given the name of the day eg:"Friday" finds the correct appointments
function getAppointmentsForDay(state, day) {
    const filteredDays = [];
    const dayObject = state.days.find(record => record.name === day);
    if (dayObject) {
        for (const id of dayObject.appointments) {
            filteredDays.push(state.appointments[id]);
        };
    };
    return filteredDays;
};

//given an interview object that only contains the interviewer ID returns the correct interviewer
function getInterview(state, interview) {
    if(!interview || !state.interviewers) {
        return null;
    } else {
        const number = interview.interviewer;
        return {
            "student": interview.student,
            "interviewer": {...state.interviewers[number]}
        };
    };
};

//given the name of the day eg:"Friday" finds the correct Interviewers
function getInterviewersForDay(state, day) {
    const filteredDays = [];
    const dayObject = state.days.find(record => record.name === day);
    if (dayObject) {
        for (const id of dayObject.interviewers) {
            filteredDays.push(state.interviewers[id]);
        };
    };
    return filteredDays;
};


export { getAppointmentsForDay, getInterview, getInterviewersForDay };