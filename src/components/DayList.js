import React, { useState } from "react";

import DayListItem from "components/DayListItem";

export default function DayList(props) {
    const parseddays = props.days.map(element => 
        <DayListItem 
        key={element.id} 
        name={element.name}  
        spots={element.spots} 
        selected={element.name === props.value} 
        setDay={props.onChange}   
    />
    );

    return (
        <ul>
          {parseddays}  
        </ul>
    );
  }
  