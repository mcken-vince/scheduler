import React from 'react';
import DayListItem from './DayListItem';

export default function DayList(props) {
  
  const dayListItems = props.days.map((day) => <DayListItem key={day.id} spots={day.spots} name={day.name} selected={day.name === props.day} setDay={props.setDay} />)
  
  return (
    <ul>
      {dayListItems}
    </ul>
  )
};