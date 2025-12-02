import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getActiveBarbers } from '../firebase/services/barberService';
import { getActiveServices } from '../firebase/services/serviceService';
import { getAppointmentsByDate, createAppointment } from '../firebase/services/appointmentService';
import Calendar from '../components/Calendar/Calendar';
import Dropdown from '../components/Dropdown/Dropdown';
import Button from '../components/Button/Button';
import FormInput from '../components/FormInput/FormInput';
import Modal from '../components/Modal/Modal';
import Marquee from '../components/Marquee/Marquee';
import TopHeader from '../components/TopHeader/TopHeader';
import Sidebar from '../components/Sidebar/Sidebar';
import '../components/Calendar/Calendar.css';
import '../components/Dropdown/Dropdown.css';
import '../components/Button/Button.css';
import '../components/FormInput/FormInput.css';
import '../components/Modal/Modal.css';
import '../components/Marquee/Marquee.css';
import '../components/TopHeader/TopHeader.css';
import '../components/Sidebar/Sidebar.css';
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
    const [barbers, setBarbers] = useState([]);
    const [services, setServices] = useState([]);
    const [existingAppointments, setExistingAppointments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showBarberModal, setShowBarberModal] = useState(false);

    const timeSlots = [
        '9:00 AM', '9:30 AM', '10:00 AM', '10:30 AM',
        '11:00 AM', '11:30 AM', '12:00 PM', '12:30 PM',
        '1:00 PM', '1:30 PM', '2:00 PM', '2:30 PM',
        '3:00 PM', '3:30 PM', '4:00 PM', '4:30 PM',
        '5:00 PM', '5:30 PM', '6:00 PM', '6:30 PM'
    ];

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            // Fetch barbers
            const { data: barbersData, error: barbersError } = await getActiveBarbers();
            if (!barbersError && barbersData) {
                setBarbers(barbersData.map(barber => ({
                    value: barber.id,
                    label: barber.name
                })));
            } else {
                // Fallback to default barbers if Firebase fails
                setBarbers([
                    { value: 'asterio', label: 'Asterio' },
                    { value: 'dorothy', label: 'Dorothy' },
                    { value: 'gylliane', label: 'Gylliane' },
                    { value: 'martin', label: 'Martin' }
                ]);

                // Try to seed barbers if collection is empty (only in development)
                if (process.env.NODE_ENV === 'development') {
                    import('../firebase/services/seedBarbers').then(({ seedPlaceholderBarbers }) => {
                        seedPlaceholderBarbers().catch(console.error);
                    });
                }
            }

            // Fetch services
            const { data: servicesData, error: servicesError } = await getActiveServices();
            if (!servicesError && servicesData) {
                setServices(servicesData.map(service => ({
                    value: service.id,
                    label: `${service.name} - $${service.price || 0}`
                })));
            } else {
                // Fallback to default services if Firebase fails
                setServices([
                    { value: 'haircut', label: 'Haircut - $30' },
                    { value: 'beard-trim', label: 'Beard Trim - $20' },
                    { value: 'hot-towel', label: 'Hot Towel Shave - $35' },
                    { value: 'full-service', label: 'Full Service - $50' }
                ]);
            }
            setLoading(false);
        };

        fetchData();
    }, []);

    useEffect(() => {
        const fetchAppointments = async () => {
            if (selectedDate) {
                const { data } = await getAppointmentsByDate(selectedDate);
                if (data) {
                    setExistingAppointments(data);
                }
            }
        };
        fetchAppointments();
    }, [selectedDate]);

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

    const handleConfirm = async () => {
        const selectedBarberData = barbers.find(b => b.value === selectedBarber);
        const selectedServiceData = services.find(s => s.value === selectedService);

        // Convert date string to Date object
        const appointmentDate = new Date(selectedDate);
        appointmentDate.setHours(0, 0, 0, 0);

        const appointmentData = {
            barberId: selectedBarber,
            barberName: selectedBarberData?.label || 'Unknown',
            serviceId: selectedService,
            serviceName: selectedServiceData?.label || 'Unknown',
            customerName,
            customerEmail,
            customerPhone,
            date: appointmentDate,
            time: selectedTime
        };

        const { id, error } = await createAppointment(appointmentData);
        if (error) {
            alert('Error booking appointment: ' + error);
            return;
        }

        alert('Appointment booked successfully!');
        navigate('/');
    };

    return (
        <div className="booking-page">
            <Marquee
                text="barbershop / school / consultancy /"
                speed={300}
            />
            <TopHeader
                logoSrc="./assets/logos/barberboy_alpha.png"
                logoAlt="wworkshop.studio Logo"
            />
            <Sidebar isOpen={true} onClose={() => { }} />

            <div className="container">
                <h1 className="page-title">LOREM IPSUM</h1>

                <div className="booking-layout">
                    {/* Left side - Compact controls */}
                    <div className="booking-controls">
                        <div className="control-group">
                            <label className="control-label">BARBER</label>
                            <Button
                                variant="outline"
                                onClick={() => setShowBarberModal(true)}
                                className="barber-select-btn"
                            >
                                {selectedBarber ? barbers.find(b => b.value === selectedBarber)?.label : 'Select Barber'}
                            </Button>
                        </div>

                        <div className="control-group">
                            <label className="control-label">SERVICE</label>
                            <Dropdown
                                options={services}
                                value={selectedService}
                                onChange={setSelectedService}
                                placeholder="Choose service..."
                                className="compact-dropdown"
                            />
                        </div>

                        {selectedDate && (
                            <div className="control-group">
                                <label className="control-label">TIME</label>
                                <div className="time-slots-compact">
                                    {timeSlots.map((time) => (
                                        <button
                                            key={time}
                                            type="button"
                                            className={`time-slot-compact ${selectedTime === time ? 'selected' : ''}`}
                                            onClick={() => setSelectedTime(time)}
                                        >
                                            {time}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}

                        {selectedDate && selectedTime && (
                            <div className="control-group">
                                <label className="control-label">CUSTOMER INFO</label>
                                <FormInput
                                    placeholder="Name"
                                    value={customerName}
                                    onChange={(e) => setCustomerName(e.target.value)}
                                    className="compact-input"
                                />
                                <FormInput
                                    placeholder="Email"
                                    type="email"
                                    value={customerEmail}
                                    onChange={(e) => setCustomerEmail(e.target.value)}
                                    className="compact-input"
                                />
                                <FormInput
                                    placeholder="Phone"
                                    type="tel"
                                    value={customerPhone}
                                    onChange={(e) => setCustomerPhone(e.target.value)}
                                    className="compact-input"
                                />
                            </div>
                        )}

                        {selectedBarber && selectedService && selectedDate && selectedTime && customerName && customerEmail && customerPhone && (
                            <div className="control-group">
                                <Button
                                    type="button"
                                    variant="primary"
                                    onClick={handleSubmit}
                                    className="book-btn-large"
                                >
                                    BOOK APPOINTMENT
                                </Button>
                            </div>
                        )}
                    </div>

                    {/* Right side - Calendar (centered) */}
                    <div className="booking-calendar-wrapper">
                        <Calendar
                            onDateSelect={handleDateSelect}
                            selectedDate={selectedDate}
                            appointments={existingAppointments}
                        />
                    </div>
                </div>
            </div>

            {/* Barber Selection Modal */}
            {showBarberModal && (
                <Modal
                    isOpen={showBarberModal}
                    onClose={() => setShowBarberModal(false)}
                    title="Select Barber"
                >
                    <div className="barber-selection">
                        {barbers.map((barber) => (
                            <button
                                key={barber.value}
                                type="button"
                                className={`barber-option ${selectedBarber === barber.value ? 'selected' : ''}`}
                                onClick={() => {
                                    setSelectedBarber(barber.value);
                                    setShowBarberModal(false);
                                }}
                            >
                                {barber.label}
                            </button>
                        ))}
                    </div>
                </Modal>
            )}

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
