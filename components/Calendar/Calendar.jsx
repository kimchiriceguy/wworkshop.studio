import React, { useState, useEffect } from 'react';
import './Calendar.css';

const Calendar = ({
  onDateSelect,
  onMonthChange,
  appointments = [],
  selectedDate = null,
  minDate = null,
  maxDate = null
}) => {
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());

  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const formatDate = (date) => {
    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, '0');
    const d = String(date.getDate()).padStart(2, '0');
    return `${y}-${m}-${d}`;
  };

  const getDaysInMonth = (month, year) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (month, year) => {
    return new Date(year, month, 1).getDay();
  };

  const isPastDate = (date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return date < today;
  };

  const isToday = (date) => {
    const today = new Date();
    return (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    );
  };

  const hasAppointments = (dateStr) => {
    return appointments.some(app => app.date === dateStr);
  };

  const isSelected = (dateStr) => {
    return selectedDate === dateStr;
  };

  const handlePrevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
    if (onMonthChange) {
      onMonthChange(currentMonth === 0 ? 11 : currentMonth - 1, currentMonth === 0 ? currentYear - 1 : currentYear);
    }
  };

  const handleNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
    if (onMonthChange) {
      onMonthChange(currentMonth === 11 ? 0 : currentMonth + 1, currentMonth === 11 ? currentYear + 1 : currentYear);
    }
  };

  const handleDateClick = (date) => {
    if (!isPastDate(date) && onDateSelect) {
      const dateStr = formatDate(date);
      onDateSelect(dateStr);
    }
  };

  const renderCalendar = () => {
    const daysInMonth = getDaysInMonth(currentMonth, currentYear);
    const firstDay = getFirstDayOfMonth(currentMonth, currentYear);
    const days = [];
    const today = new Date();

    // Empty cells for days before the first day of the month
    for (let i = 0; i < firstDay; i++) {
      days.push(<td key={`empty-${i}`}></td>);
    }

    // Days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(currentYear, currentMonth, day);
      const dateStr = formatDate(date);
      const isPast = isPastDate(date);
      const isTodayDate = isToday(date);
      const hasAppts = hasAppointments(dateStr);
      const isSelectedDate = isSelected(dateStr);

      days.push(
        <td
          key={day}
          className={`calendar-day ${isPast ? 'past-date' : ''} ${isTodayDate ? 'current-day' : ''} ${hasAppts ? 'has-appointments' : ''} ${isSelectedDate ? 'selected-date' : ''}`}
          onClick={() => handleDateClick(date)}
        >
          <div className="date-container">
            <span className="date-number">{day}</span>
          </div>
        </td>
      );
    }

    // Create rows
    const rows = [];
    let cells = [];

    days.forEach((day, index) => {
      if (index % 7 === 0) {
        if (cells.length > 0) {
          rows.push(<tr key={`row-${rows.length}`}>{cells}</tr>);
        }
        cells = [];
      }
      cells.push(day);
    });

    if (cells.length > 0) {
      rows.push(<tr key={`row-${rows.length}`}>{cells}</tr>);
    }

    return rows;
  };

  return (
    <div className="calendar-container">
      <div className="calendar-header">
        <button
          id="prev-month"
          className="month-nav"
          onClick={handlePrevMonth}
        >
          &lt;
        </button>
        <h2 id="current-month">
          {monthNames[currentMonth]} {currentYear}
        </h2>
        <button
          id="next-month"
          className="month-nav"
          onClick={handleNextMonth}
        >
          &gt;
        </button>
      </div>
      <table id="calendar">
        <thead>
          <tr>
            {daysOfWeek.map(day => (
              <th key={day}>{day}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {renderCalendar()}
        </tbody>
      </table>
    </div>
  );
};

export default Calendar;

