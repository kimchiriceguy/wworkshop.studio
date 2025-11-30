import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import InfiniteMarquee from '../components/InfiniteMarquee/InfiniteMarquee';
import '../components/InfiniteMarquee/InfiniteMarquee.css';
import Calendar from '../components/Calendar/Calendar';
import Dropdown from '../components/Dropdown/Dropdown';
import Button from '../components/Button/Button';
import FormInput from '../components/FormInput/FormInput';
import Modal from '../components/Modal/Modal';
import '../components/Calendar/Calendar.css';
import '../components/Dropdown/Dropdown.css';
import '../components/Button/Button.css';
import '../components/FormInput/FormInput.css';
import '../components/Modal/Modal.css';
import './Booking.css';

function Booking() {
    const navigate = useNavigate();
    const [selectedBarber, setSelectedBarber] = useState(null);
    const [selectedService, setSelectedService] = useState(null);
    const [selectedDate, setSelectedDate] = useState(null);
    const [selectedTime, setSelectedTime] = useState(null);
    const [customerName, setCustomerName] = useState('');
    const [customerEmail, setCustomerEmail] = useState('');
    const [customerPhone, setCustomerPhone] = useState('');
    const [showConfirmModal, setShowConfirmModal] = useState(false);

    // TODO: Replace with Firebase data
    const barbers = [
        { value: 'asterio', label: 'Asterio' },
        { value: 'dorothy', label: 'Dorothy' },
        { value: 'gylliane', label: 'Gylliane' },
        { value: 'martin', label: 'Martin' }
    ];

    const services = [
        { value: 'haircut', label: 'Haircut - $30' },
        { value: 'beard-trim', label: 'Beard Trim - $20' },
        { value: 'hot-towel', label: 'Hot Towel Shave - $35' },
        { value: 'full-service', label: 'Full Service - $50' }
    ];

    const timeSlots = [
        '9:00 AM', '9:30 AM', '10:00 AM', '10:30 AM',
        '11:00 AM', '11:30 AM', '12:00 PM', '12:30 PM',
        '1:00 PM', '1:30 PM', '2:00 PM', '2:30 PM',
        '3:00 PM', '3:30 PM', '4:00 PM', '4:30 PM',
        '5:00 PM', '5:30 PM', '6:00 PM', '6:30 PM'
    ];

    // TODO: Replace with Firebase fetch
    const existingAppointments = [];

    const handleDateSelect = (date) => {
        setSelectedDate(date);
        setSelectedTime(null);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!selectedBarber || !selectedService || !selectedDate || !selectedTime) {
            alert('Please fill in all required fields');
            return;
        }
        setShowConfirmModal(true);
    };

    const handleConfirm = () => {
        // TODO: Replace with Firebase save
        const appointment = {
            id: Date.now(),
            barber: selectedBarber,
            service: selectedService,
            date: selectedDate,
            time: selectedTime,
            customerName,
            customerEmail,
            customerPhone,
            createdAt: new Date().toISOString()
        };

        const appointments = JSON.parse(localStorage.getItem('appointments') || '[]');
        appointments.push(appointment);
        localStorage.setItem('appointments', JSON.stringify(appointments));

        alert('Appointment booked successfully!');
        navigate('/');
    };

    return (
        <div className="booking-page">
            <div className="marquee-banner">
                <InfiniteMarquee
                    speed={25000}
                    direction="right"
                    gap="15px"
                >
                    <span className="marquee-text">BARBERSHOP / SCHOOL / CONSULTANCY / </span>
                    <span className="marquee-text">BARBERSHOP / SCHOOL / CONSULTANCY / </span>
                </InfiniteMarquee>
            </div>

            <div className="container">
                <h1 className="page-title">BOOK APPOINTMENT</h1>

                <form onSubmit={handleSubmit} className="booking-form">
                    <div className="form-section">
                        <h2 className="section-title">SELECT BARBER</h2>
                        <Dropdown
                            options={barbers}
                            value={selectedBarber}
                            onChange={setSelectedBarber}
                            placeholder="Choose a barber..."
                            label="Barber"
                        />
                    </div>

                    <div className="form-section">
                        <h2 className="section-title">SELECT SERVICE</h2>
                        <Dropdown
                            options={services}
                            value={selectedService}
                            onChange={setSelectedService}
                            placeholder="Choose a service..."
                            label="Service"
                        />
                    </div>

                    <div className="form-section">
                        <h2 className="section-title">SELECT DATE</h2>
                        <Calendar
                            onDateSelect={handleDateSelect}
                            selectedDate={selectedDate}
                            appointments={existingAppointments}
                        />
                    </div>

                    {selectedDate && (
                        <div className="form-section">
                            <h2 className="section-title">SELECT TIME</h2>
                            <div className="time-slots">
                                {timeSlots.map((time) => (
                                    <button
                                        key={time}
                                        type="button"
                                        className={`time-slot ${selectedTime === time ? 'selected' : ''}`}
                                        onClick={() => setSelectedTime(time)}
                                    >
                                        {time}
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}

                    <div className="form-section">
                        <h2 className="section-title">CUSTOMER INFORMATION</h2>
                        <FormInput
                            label="Name"
                            name="customerName"
                            value={customerName}
                            onChange={(e) => setCustomerName(e.target.value)}
                            required
                        />
                        <FormInput
                            label="Email"
                            name="customerEmail"
                            type="email"
                            value={customerEmail}
                            onChange={(e) => setCustomerEmail(e.target.value)}
                            required
                        />
                        <FormInput
                            label="Phone"
                            name="customerPhone"
                            type="tel"
                            value={customerPhone}
                            onChange={(e) => setCustomerPhone(e.target.value)}
                            required
                        />
                    </div>

                    <div className="form-actions">
                        <Button type="submit" variant="primary">
                            BOOK APPOINTMENT
                        </Button>
                    </div>
                </form>
            </div>

            {showConfirmModal && (
                <Modal
                    isOpen={showConfirmModal}
                    onClose={() => setShowConfirmModal(false)}
                    title="Confirm Appointment"
                >
                    <div className="confirm-details">
                        <p><strong>Barber:</strong> {barbers.find(b => b.value === selectedBarber)?.label}</p>
                        <p><strong>Service:</strong> {services.find(s => s.value === selectedService)?.label}</p>
                        <p><strong>Date:</strong> {selectedDate}</p>
                        <p><strong>Time:</strong> {selectedTime}</p>
                        <p><strong>Name:</strong> {customerName}</p>
                        <p><strong>Email:</strong> {customerEmail}</p>
                        <p><strong>Phone:</strong> {customerPhone}</p>
                    </div>
                    <div className="modal-buttons">
                        <Button variant="primary" onClick={handleConfirm}>
                            CONFIRM
                        </Button>
                        <Button variant="outline" onClick={() => setShowConfirmModal(false)}>
                            CANCEL
                        </Button>
                    </div>
                </Modal>
            )}
        </div>
    );
}

export default Booking;
