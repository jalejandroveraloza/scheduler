import React from "react";
import classNames from "classnames"

import "components/InterviewerList.scss"
import InterviewerListItem from "./InterviewerListItem";
import PropTypes from 'prop-types';

export default function InterviewerList(props) {

  const {interviewers, value, onChange} = props;

  const interviewerListData = interviewers.map(interviewer => {
    return <InterviewerListItem 
    key={interviewer.id}
    name={interviewer.name}
    avatar={interviewer.avatar}
    selected={interviewer.id === value}
    setInterviewer={() => onChange(interviewer.id)}
    />
    
  })

  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list">{interviewerListData}</ul>
    </section>
  )
}

interviewerList.propTypes = {
  interviewers: PropTypes.array.isRequired
};

