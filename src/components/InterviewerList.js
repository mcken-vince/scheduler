import React from 'react';
import './InterviewerList.scss';
import InterviewerListItem from './InterviewerListItem';

const InterviewerList = (props) => {


  const interviewerListItems = props.interviewers.map(i => {
    const selected = (props.interviewer === i.id ? true : false);
    return <InterviewerListItem {...i} onClick={props.setInterviewer} selected={selected}/>
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