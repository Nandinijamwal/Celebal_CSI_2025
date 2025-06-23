import React, { useState } from 'react';
import './Calendar.css';

const Calendar = () => {
  const [selectedDate, setSelectedDate] = useState(null);

  const handleChange = (e) => {
    setSelectedDate(e.target.value);
  };

  return (
    <div className="card calendar">
      <h2>Calendar</h2>
      <input type="date" onChange={handleChange} />
      {selectedDate && <p>Selected: {selectedDate}</p>}
    </div>
  );
};

export default Calendar;
