import React from 'react';
import DayListItem from './DayListItem';

export default function DayList(props) {
  
  const dayListItems = props.days.map((d) => <DayListItem key={d.id} spots={d.spots} name={d.name} selected={d.name === props.day} setDay={props.setDay} />)
  
  return (
    <ul>
      {dayListItems}
    </ul>
  )
};