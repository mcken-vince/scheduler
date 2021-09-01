import React from 'react';
import './InterviewerList.scss';
import InterviewerListItem from './InterviewerListItem';

const InterviewerList = (props) => {
  const interviewerListItems = props.interviewers.map(i => {
    return (
      <InterviewerListItem key={i.id} {...i} setInterviewer={event => props.setInterviewer(i.id)} selected={i.id === props.interviewer}/>
      );
  });
  
  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list">
        {interviewerListItems}
      </ul>
    </section>
  );
};

export default InterviewerList;