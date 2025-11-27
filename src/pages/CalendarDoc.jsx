import { useState } from 'react'
import DocPage from './DocPage'
import { Calendar } from '../../components'
import '../../components/Calendar/Calendar.css'

const CalendarDoc = ({ onBack }) => {
  const [selectedDate, setSelectedDate] = useState(null)
  const formatDate = (date) => {
    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, '0');
    const d = String(date.getDate()).padStart(2, '0');
    return `${y}-${m}-${d}`;
  };

  const appointments = [
    { date: formatDate(new Date()) },
    { date: formatDate(new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)) }
  ]

  return (
    <DocPage
      title="Calendar Component"
      onBack={onBack}
      overview="The Calendar component provides a date selection interface perfect for booking appointments, scheduling events, or selecting dates. It highlights today's date, shows appointments, and prevents selection of past dates."
      demo={
        <div>
          <Calendar
            onDateSelect={(date) => {
              setSelectedDate(date)
              alert(`Selected date: ${date}`)
            }}
            onMonthChange={(month, year) => console.log('Month changed:', month, year)}
            appointments={appointments}
            selectedDate={selectedDate}
          />
          {selectedDate && (
            <p style={{ marginTop: '1rem', textAlign: 'center', color: '#8400ff' }}>
              Selected: {selectedDate}
            </p>
          )}
        </div>
      }
      instructions={[
        {
          title: 'Step 1: Import the Component',
          code: `import { Calendar } from './components';
import './components/Calendar/Calendar.css';`
        },
        {
          title: 'Step 2: Use the Component',
          code: `function BookingPage() {
  const [selectedDate, setSelectedDate] = useState(null);
  const appointments = [
    { date: '2024-01-15' },
    { date: '2024-01-20' }
  ];

  return (
    <Calendar
      onDateSelect={(date) => setSelectedDate(date)}
      onMonthChange={(month, year) => console.log(month, year)}
      appointments={appointments}
      selectedDate={selectedDate}
    />
  );
}`
        }
      ]}
      props={[
        { name: 'onDateSelect', type: 'function', default: '-', description: 'Callback when date is selected: (dateString) => void' },
        { name: 'onMonthChange', type: 'function', default: '-', description: 'Callback when month changes: (month, year) => void' },
        { name: 'appointments', type: 'array', default: '[]', description: 'Array of appointments: [{date}]' },
        { name: 'selectedDate', type: 'string', default: 'null', description: 'Currently selected date (YYYY-MM-DD format)' },
        { name: 'minDate', type: 'Date', default: 'null', description: 'Minimum selectable date' },
        { name: 'maxDate', type: 'Date', default: 'null', description: 'Maximum selectable date' }
      ]}
      examples={[
        {
          code: `import React, { useState, useEffect } from 'react';
import { Calendar } from './components';

function AppointmentBooking() {
  const [selectedDate, setSelectedDate] = useState(null);
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    // Fetch appointments from API
    fetch('/api/appointments')
      .then(res => res.json())
      .then(data => setAppointments(data));
  }, []);

  const handleDateSelect = (dateString) => {
    setSelectedDate(dateString);
    console.log('Selected date:', dateString);
    // Show time slots for this date
  };

  const handleMonthChange = (month, year) => {
    console.log('Month changed:', month, year);
    // Fetch appointments for new month
    fetch(\`/api/appointments?month=\${month}&year=\${year}\`)
      .then(res => res.json())
      .then(data => setAppointments(data));
  };

  return (
    <div className="booking-container">
      <h2>Select a Date</h2>
      <Calendar
        onDateSelect={handleDateSelect}
        onMonthChange={handleMonthChange}
        appointments={appointments}
        selectedDate={selectedDate}
      />
      {selectedDate && (
        <div>
          <p>Selected: {selectedDate}</p>
          {/* Show time slots */}
        </div>
      )}
    </div>
  );
}

export default AppointmentBooking;`
        }
      ]}
      notes={[
        'Past dates are automatically disabled and grayed out',
        'Today\'s date is highlighted with a purple background',
        'Dates with appointments show a dot indicator',
        'Selected date is highlighted with the primary color',
        'Month navigation buttons allow browsing through months',
        'Date format is YYYY-MM-DD (ISO format) for consistency',
        'Calendar automatically adjusts for different month lengths'
      ]}
    />
  )
}

export default CalendarDoc

