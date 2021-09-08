import React from 'react';
import './InterviewerList.scss';
import InterviewerListItem from './InterviewerListItem';
import PropTypes from 'prop-types';

const InterviewerList = (props) => {
  const interviewerListItems = props.interviewers.map(i => {
    return (
      <InterviewerListItem key={i.id} {...i} setInterviewer={event => props.onChange(i.id)} selected={i.id === props.interviewer}/>
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

InterviewerList.propTypes = {
  interviewers: PropTypes.array.isRequired
};

export default InterviewerList;