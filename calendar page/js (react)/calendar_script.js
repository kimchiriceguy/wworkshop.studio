// Barber data
const barbers = [
    { id: 1, name: "Martin", portfolio: ["Haircut", "Beard Trim", "Shave"] },
    { id: 2, name: "Dorothy", portfolio: ["Haircut", "Beard Trim", "Shave"] },
    { id: 3, name: "Asterio", portfolio: ["Haircut", "Beard Trim", "Shave"] },
    { id: 4, name: "Gylliane", portfolio: ["Haircut", "Beard Trim", "Shave"] }
];

// Global state
let selectedBarber = null;
let selectedDate = null;
let selectedTime = null;
let selectedService = null;
let currentMonth = new Date().getMonth();
let currentYear = new Date().getFullYear();

// DOM Elements
const calendar = document.getElementById("calendar");
const currentMonthDisplay = document.getElementById("current-month");
const bookingModal = document.getElementById("booking-modal");
const prevMonthBtn = document.getElementById("prev-month");
const nextMonthBtn = document.getElementById("next-month");
const timeInput = document.getElementById('time-input');
const timeDisplay = document.getElementById('selected-time-display');
const confirmBtn = document.getElementById('confirm-booking');
const barberList = document.querySelector('.barber-list');

// Utility functions
function showError(message) {
    const errorModal = document.getElementById('error-modal');
    const errorMessage = document.getElementById('error-message');
    if (errorModal && errorMessage) {
        errorMessage.textContent = message;
        errorModal.classList.add('show');
    } else {
        alert(message); // Fallback if modal doesn't exist
    }
}

function showSuccess(message) {
    const successModal = document.getElementById('success-modal');
    if (successModal) {
        // Find or create success message element
        let successMessage = document.getElementById('success-message');
        if (!successMessage) {
            successMessage = successModal.querySelector('p');
        }
        if (successMessage) {
            successMessage.textContent = message;
        }
        successModal.classList.add('show');
    } else {
        alert(message); // Fallback if modal doesn't exist
    }
}

function formatTime(timeStr) {
    try {
        const [hours, minutes] = timeStr.split(':');
        const date = new Date();
        date.setHours(parseInt(hours), parseInt(minutes));

        return date.toLocaleTimeString('en-US', {
            hour: 'numeric',
            minute: '2-digit',
            hour12: true
        });
    } catch (error) {
        console.error('Error formatting time:', error);
        return timeStr;
    }
}

function formatDate(dateStr) {
    try {
        const date = new Date(dateStr + 'T00:00:00');
        return date.toLocaleDateString('en-US', {
            month: 'long',
            day: 'numeric',
            year: 'numeric'
        });
    } catch (error) {
        console.error('Error formatting date:', error);
        return dateStr;
    }
}

// Generate consistent time slots (matching get_day_schedule.php)
function generateTimeSlots() {
    const slots = [];
    const startTime = new Date();
    startTime.setHours(11, 0, 0, 0); // 11:00 AM
    const endTime = new Date();
    endTime.setHours(20, 0, 0, 0); // 8:00 PM

    let currentTime = new Date(startTime);
    while (currentTime < endTime) {
        const timeString = currentTime.toTimeString().slice(0, 5); // HH:MM format
        slots.push(timeString);
        currentTime.setTime(currentTime.getTime() + 35 * 60 * 1000); // Add 35 minutes
    }
    return slots;
}

// Calendar generation function
async function generateCalendar() {
    if (!calendar) return;

    const firstDay = new Date(currentYear, currentMonth, 1).getDay();
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
    const tbody = calendar.getElementsByTagName("tbody")[0];

    if (tbody) {
        tbody.innerHTML = "";
    }

    const monthNames = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"];
    if (currentMonthDisplay) {
        currentMonthDisplay.textContent = `${monthNames[currentMonth]} ${currentYear}`;
    }

    let monthlyAppointments = [];
    if (selectedBarber) {
        monthlyAppointments = await fetchMonthlyAppointments(selectedBarber.id, currentYear, currentMonth);
    }

    let date = 1;
    for (let i = 0; i < 6; i++) {
        const row = document.createElement("tr");
        for (let j = 0; j < 7; j++) {
            if (i === 0 && j < firstDay) {
                row.appendChild(document.createElement("td"));
                continue;
            }

            if (date > daysInMonth) break;

            const currentDate = new Date(currentYear, currentMonth, date);
            const dateStr = currentDate.toISOString().slice(0, 10);
            const today = new Date();
            today.setHours(0, 0, 0, 0);
            const isPast = currentDate < today;
            const isToday =
                currentDate.getDate() === today.getDate() &&
                currentDate.getMonth() === today.getMonth() &&
                currentDate.getFullYear() === today.getFullYear();

            const cell = document.createElement("td");
            cell.className = "calendar-day";
            cell.innerHTML = `
                <div class="date-container">
                    <span class="date-number">${date}</span>
                    ${!isPast ? `
                        <div class="booking-info">
                            <button class="show-bookings-btn" data-date="${dateStr}">
                                <span class="booking-count"></span>
                                <span class="dropdown-arrow">▼</span>
                            </button>
                            <div class="bookings-dropdown" id="dropdown-${dateStr}">
                                <div class="loading">Loading...</div>
                            </div>
                        </div>` : ''}
                </div>`;

            if (!isPast) {
                const btn = cell.querySelector('.show-bookings-btn');
                btn?.addEventListener('click', async (e) => {
                    e.stopPropagation();
                    await showBookingsForDate(dateStr);
                });
            }

            if (isPast) cell.classList.add("past-date");
            if (monthlyAppointments.some(app => app.date === dateStr)) cell.classList.add("has-appointments");
            if (isToday) cell.classList.add("current-day");

            if (!isPast) {
                cell.addEventListener("click", async function () {
                    if (!selectedBarber) {
                        showError("Please choose a barber first");
                        return;
                    }

                    document.querySelectorAll('.calendar-day').forEach(day => {
                        day.classList.remove('selected-date');
                    });
                    this.classList.add('selected-date');

                    selectedDate = dateStr;
                    const formattedDate = formatDate(dateStr);
                    const dateDisplay = document.getElementById('selected-date-display');
                    if (dateDisplay) dateDisplay.textContent = formattedDate;

                    selectedTime = null;
                    const timeDisplayEl = document.getElementById('selected-time-display');
                    if (timeDisplayEl) timeDisplayEl.textContent = 'Not selected';
                    if (timeInput) timeInput.value = '';

                    const availableSlots = await fetchBarberAvailability(selectedBarber.id, dateStr);
                    updateTimeDropdown(availableSlots);
                    await showDaySchedule(selectedBarber.id, dateStr);
                    validateBooking();
                });
            }
            row.appendChild(cell);
            date++;
        }
        tbody.appendChild(row);
    }

    // Enable click-outside-to-close for schedule modal
    const scheduleModal = document.getElementById('schedule-modal');
    if (scheduleModal) {
        scheduleModal.addEventListener('click', (e) => {
            if (e.target.id === 'schedule-modal') {
                scheduleModal.classList.remove('show');
            }
        });
    }
}


// Fetch functions
async function fetchMonthlyAppointments(barberId, year, month) {
    try {
        const response = await fetch('get_monthly_appointments.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                barber_id: barberId,
                year: year,
                month: month + 1
            })
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log("Monthly appointments received:", data);
        return data.appointments || [];
    } catch (error) {
        console.error('Error fetching monthly appointments:', error);
        return [];
    }
}

async function fetchBarberAvailability(barberId, date) {
    try {
        const response = await fetch('get_availability.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                barber_id: barberId,
                date: date
            })
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log("Availability data received:", data);
        return data.bookedSlots || []; // Return booked slots to filter out
    } catch (error) {
        console.error('Error fetching availability:', error);
        return [];
    }
}

async function showDaySchedule(barberId, date) {
    try {
        const response = await fetch('get_day_schedule.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                barber_id: barberId,
                date: date
            })
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        // Update the day schedule display
        const scheduleContainer = document.getElementById('day-schedule');
        if (scheduleContainer && data.schedule) {
            scheduleContainer.innerHTML = '';

            if (data.schedule.length > 0) {
                const scheduleTitle = document.createElement('h4');
                scheduleTitle.textContent = `Schedule for ${formatDate(date)}`;
                scheduleContainer.appendChild(scheduleTitle);

                data.schedule.forEach(slot => {
                    const slotDiv = document.createElement('div');
                    slotDiv.className = `schedule-slot ${slot.status}`;
                    slotDiv.innerHTML = `
                        <span class="time">${formatTime(slot.time)}</span>
                        <span class="status">${slot.status === 'booked' ? 'Booked' : 'Available'}</span>
                    `;
                    scheduleContainer.appendChild(slotDiv);
                });
            } else {
                scheduleContainer.innerHTML = '<p>No schedule available for this date.</p>';
            }
        }
    } catch (error) {
        console.error('Error fetching day schedule:', error);
    }
}

// Barber selection - Fixed to use the barber modal properly
function setupBarberSelection() {
    const barberItems = document.querySelectorAll('.barber-item');
    const barberModal = document.getElementById('barber-modal');
    const modalBackdrop = document.getElementById('modal-backdrop');

    barberItems.forEach(item => {
        const button = item.querySelector('.view-portfolio-btn');
        if (button) {
            button.addEventListener('click', async function () {
                const barberName = item.dataset.barber;
                const barber = barbers.find(b => b.name === barberName);

                if (barber) {
                    selectedBarber = barber;
                    selectedService = null; // Reset service selection

                    // Update barber display
                    const barberDisplay = document.getElementById('selected-barber-display');
                    if (barberDisplay) {
                        barberDisplay.textContent = selectedBarber.name;
                    }

                    // Generate service options
                    generateServiceOptions();

                    // Regenerate calendar with appointments
                    await generateCalendar();

                    // Clear previous selections
                    resetSelections();

                    // Close modal
                    barberModal.classList.remove('show');
                    if (modalBackdrop) modalBackdrop.style.display = 'none';

                    validateBooking();
                }
            });
        }
    });
}

// Service selection
function generateServiceOptions() {
    const serviceContainer = document.getElementById('service-options');
    if (!serviceContainer || !selectedBarber) return;

    serviceContainer.innerHTML = '';

    selectedBarber.portfolio.forEach(service => {
        const serviceBtn = document.createElement('button');
        serviceBtn.className = 'service-option';
        serviceBtn.textContent = service;
        serviceBtn.addEventListener('click', function () {
            selectedService = service;

            // Update UI
            document.querySelectorAll('.service-option').forEach(btn => {
                btn.classList.remove('selected');
            });
            this.classList.add('selected');

            // Update display
            const serviceDisplay = document.getElementById('selected-service-display');
            if (serviceDisplay) {
                serviceDisplay.textContent = selectedService;
            }

            validateBooking();
        });

        serviceContainer.appendChild(serviceBtn);
    });
}

// Update the updateTimeDropdown function
function updateTimeDropdown(bookedSlots) {
    if (!timeInput) return;

    timeInput.innerHTML = '<option value="">Select a time</option>';
    const timeSlots = generateTimeSlots();

    timeSlots.forEach(slot => {
        if (!bookedSlots.includes(slot)) {
            const option = document.createElement('option');
            option.value = slot;
            option.textContent = formatTime(slot);
            timeInput.appendChild(option);
        }
    });
}

// Validation
function validateBooking() {
    const isValid = selectedBarber && selectedDate && selectedTime && selectedService;
    if (confirmBtn) {
        confirmBtn.disabled = !isValid;
    }
    return isValid;
}

// Event handlers setup
function setupModalHandlers() {
    // Error modal close
    const closeErrorBtn = document.querySelector('.close-error-btn');
    if (closeErrorBtn) {
        closeErrorBtn.addEventListener('click', function () {
            const errorModal = document.getElementById('error-modal');
            if (errorModal) {
                errorModal.classList.remove('show');
            }
        });
    }

    // Success modal close
    const closeSuccessBtn = document.querySelector('.close-success-btn');
    if (closeSuccessBtn) {
        closeSuccessBtn.addEventListener('click', function () {
            const successModal = document.getElementById('success-modal');
            if (successModal) {
                successModal.classList.remove('show');
            }
        });
    }

    // Barber modal handlers
    const openBarberBtn = document.getElementById('open-barber-modal');
    const barberModal = document.getElementById('barber-modal');
    const closeBarberBtn = document.getElementById('close-barber-modal');
    const modalBackdrop = document.getElementById('modal-backdrop');

    if (openBarberBtn && barberModal) {
        openBarberBtn.addEventListener('click', function () {
            barberModal.classList.add('show');
            if (modalBackdrop) modalBackdrop.style.display = 'block';
        });
    }

    if (closeBarberBtn && barberModal) {
        closeBarberBtn.addEventListener('click', function () {
            barberModal.classList.remove('show');
            if (modalBackdrop) modalBackdrop.style.display = 'none';
        });
    }

    // Close modal when clicking backdrop
    if (modalBackdrop) {
        modalBackdrop.addEventListener('click', function () {
            if (barberModal) {
                barberModal.classList.remove('show');
            }
            this.style.display = 'none';
        });
    }
}

function setupTimeInputHandler() {
    if (timeInput) {
        timeInput.addEventListener('change', function () {
            if (!selectedDate) {
                showError("Please select a date first");
                this.value = '';
                return;
            }

            selectedTime = this.value;

            // Update display
            const timeDisplay = document.getElementById('selected-time-display');
            if (timeDisplay) {
                if (selectedTime) {
                    timeDisplay.textContent = formatTime(selectedTime);
                } else {
                    timeDisplay.textContent = 'Not selected';
                }
            }

            validateBooking();
        });
    }
}

function setupConfirmBookingHandler() {
    if (confirmBtn) {
        confirmBtn.addEventListener('click', async function () {
            if (!validateBooking()) {
                showError("Please fill in all required fields");
                return;
            }

            // Disable button to prevent double-clicking
            this.disabled = true;
            this.textContent = 'Booking...';

            try {
                const bookingData = {
                    barber_id: selectedBarber.id,
                    date: selectedDate,
                    time: selectedTime,
                    service: selectedService
                    // Remove user_id - let backend handle guest users
                };

                console.log('Sending booking data:', bookingData);

                const response = await fetch('calendar_backend.php', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(bookingData)
                });

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const result = await response.json();

                if (result.success) {
                    showSuccess("Booking confirmed successfully!");

                    // Refresh calendar to show new booking
                    await generateCalendar();

                    // Reset selections
                    resetSelections();
                } else {
                    showError(result.message || "Booking failed. Please try again.");
                }
            } catch (error) {
                console.error('Booking error:', error);
                showError("An error occurred while booking. Please try again.");
            } finally {
                // Re-enable button
                this.disabled = false;
                this.textContent = 'Confirm Booking';
                validateBooking();
            }
        });
    }
}

// Helper function to reset selections
function resetSelections() {
    selectedDate = null;
    selectedTime = null;
    selectedService = null;

    // Reset displays
    const dateDisplay = document.getElementById('selected-date-display');
    if (dateDisplay) dateDisplay.textContent = 'Not selected';

    const timeDisplay = document.getElementById('selected-time-display');
    if (timeDisplay) timeDisplay.textContent = 'Not selected';

    const serviceDisplay = document.getElementById('selected-service-display');
    if (serviceDisplay) serviceDisplay.textContent = 'Not selected';

    // Clear form inputs
    if (timeInput) timeInput.value = '';

    // Remove selected styling
    document.querySelectorAll('.calendar-day').forEach(day => {
        day.classList.remove('selected-date');
    });

    document.querySelectorAll('.service-option').forEach(btn => {
        btn.classList.remove('selected');
    });

    // Clear day schedule
    const scheduleContainer = document.getElementById('day-schedule');
    if (scheduleContainer) scheduleContainer.innerHTML = '';

    validateBooking();
}

// Navigation handlers
function setupNavigationHandlers() {
    if (prevMonthBtn) {
        prevMonthBtn.addEventListener("click", async () => {
            currentMonth--;
            if (currentMonth < 0) {
                currentMonth = 11;
                currentYear--;
            }
            await generateCalendar();
        });
    }

    if (nextMonthBtn) {
        nextMonthBtn.addEventListener("click", async () => {
            currentMonth++;
            if (currentMonth > 11) {
                currentMonth = 0;
                currentYear++;
            }
            await generateCalendar();
        });
    }
}

// Initialize the application
document.addEventListener("DOMContentLoaded", async function () {
    try {
        await generateCalendar();
        setupBarberSelection();
        setupModalHandlers();
        setupTimeInputHandler();
        setupConfirmBookingHandler();
        setupNavigationHandlers();

        console.log("Calendar system initialized successfully");
    } catch (error) {
        console.error("Error initializing calendar system:", error);
        showError("Failed to initialize calendar system. Please refresh the page.");
    }
});

// show bookings for a specific date as a modal
async function showBookingsForDate(date) {
    const modal = document.getElementById('schedule-modal');
    const modalContent = modal.querySelector('.schedule-modal-content');

    try {
        const response = await fetch('get_day_bookings.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ date })
        });

        const data = await response.json();

        if (data.success) {
            let html = `
                <button class="modal-close" onclick="document.getElementById('schedule-modal').classList.remove('show')">&times;</button>
                <h2>Schedule for ${formatDate(date)}</h2>
                <div class="bookings-summary">
            `;

            data.bookings.forEach(barber => {
                html += `
                    <div class="barber-summary">
                        <h4>${barber.name}</h4>
                        <p>Booked: ${barber.booked_slots.length} slots</p>
                        <p>Available: ${barber.available_slots.length} slots</p>
                        <div class="time-slots">
                            ${barber.booked_slots.map(slot => `
                                <span class="time-slot booked">${formatTime(slot)}</span>
                            `).join('')}
                            ${barber.available_slots.map(slot => `
                                <span class="time-slot available">${formatTime(slot)}</span>
                            `).join('')}
                        </div>
                    </div>
                `;
            });

            html += '</div>';
            modalContent.innerHTML = html;
            modal.classList.add('show');
        } else {
            modalContent.innerHTML = '<p class="error">Failed to load bookings</p>';
            modal.classList.add('show');
        }
    } catch (error) {
        console.error('Error fetching bookings:', error);
        modalContent.innerHTML = '<p class="error">An error occurred while loading bookings</p>';
        modal.classList.add('show');
    }
}