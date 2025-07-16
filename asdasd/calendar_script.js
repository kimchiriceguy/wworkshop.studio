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
    const successMessage = document.getElementById('success-message');
    if (successModal && successMessage) {
        successMessage.textContent = message;
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

// Calendar generation function
async function generateCalendar() {
    if (!calendar) return;

    const firstDay = new Date(currentYear, currentMonth, 1).getDay();
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
    const tbody = calendar.getElementsByTagName("tbody")[0];

    // Clear existing calendar
    if (tbody) {
        tbody.innerHTML = "";
    }

    // Update month/year display
    const monthNames = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];
    if (currentMonthDisplay) {
        currentMonthDisplay.textContent = `${monthNames[currentMonth]} ${currentYear}`;
    }

    let date = 1;
    for (let i = 0; i < 6; i++) {
        const row = document.createElement("tr");

        for (let j = 0; j < 7; j++) {
            const cell = document.createElement("td");

            if (i === 0 && j < firstDay) {
                cell.textContent = "";
                cell.className = "empty-day";
            } else if (date > daysInMonth) {
                cell.textContent = "";
                cell.className = "empty-day";
            } else {
                const currentDate = new Date(currentYear, currentMonth, date);
                const dateStr = currentDate.toISOString().slice(0, 10);
                const today = new Date();
                const isToday = date === today.getDate() &&
                    currentMonth === today.getMonth() &&
                    currentYear === today.getFullYear();
                const isPast = currentDate < today.setHours(0, 0, 0, 0);

                cell.textContent = date;
                cell.className = "calendar-day";
                cell.dataset.date = dateStr;

                // Add past date styling
                if (isPast) {
                    cell.classList.add("past-date");
                }

                // Fetch available time slots for this date
                const availableSlots = await fetchBarberAvailability(selectedBarber.id, dateStr);

                // Check if there are any available time slots
                if (availableSlots.length > 0) {
                    cell.classList.add("has-available-slots");
                }

                // Highlight current day
                if (isToday) {
                    cell.classList.add("current-day");
                }

                // Add click handler for date selection (only for future dates)
                if (!isPast) {
                    cell.addEventListener("click", async function () {
                        if (!selectedBarber) {
                            showError("Please choose a barber first");
                            return;
                        }

                        // Remove previous selection
                        document.querySelectorAll('.calendar-day').forEach(day => {
                            day.classList.remove('selected-date');
                        });
                        this.classList.add('selected-date');

                        selectedDate = dateStr;
                        const formattedDate = formatDate(dateStr);

                        // Update date display
                        const dateDisplay = document.getElementById('selected-date-display');
                        if (dateDisplay) {
                            dateDisplay.textContent = formattedDate;
                        }

                        // Reset time selection
                        selectedTime = null;
                        if (timeDisplay) {
                            timeDisplay.textContent = 'Not selected';
                        }

                        console.log('Fetching availability for date:', dateStr); // Debug log

                        // Fetch and update available times
                        const availableSlots = await fetchBarberAvailability(selectedBarber.id, dateStr);
                        console.log('Available slots:', availableSlots); // Debug log

                        if (availableSlots.length === 0) {
                            showError("No available time slots for this date");
                        } else {
                            updateTimeDropdown(availableSlots);
                        }

                        // Show detailed schedule
                        await showDaySchedule(selectedBarber.id, dateStr);

                        validateBooking();
                    });
                }

                date++;
            }
            row.appendChild(cell);
        }
        if (tbody) {
            tbody.appendChild(row);
        }
        if (date > daysInMonth) break;
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
                barber_id: barberId, // FIXED: was using barber_id which doesn't exist
                year: year,
                month: month + 1
            })
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log("Monthly appointments received:", data); // Debug log
        return data.appointments || [];
    } catch (error) {
        console.error('Error fetching monthly appointments:', error);
        return [];
    }
}

async function fetchBarberAvailability(barberId, date) {
    try {
        console.log('Fetching availability for:', { barberId, date }); // Debug log

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
        console.log("Availability data received:", data); // Debug log

        if (!data.success) {
            throw new Error(data.error || 'Failed to fetch availability');
        }

        return data.availableSlots || [];
    } catch (error) {
        console.error('Error fetching availability:', error);
        showError(`Failed to fetch available times: ${error.message}`);
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
                barber_id: barberId, // Changed from barberId
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

// Barber selection
function generateBarberList() {
    if (!barberList) return;

    barberList.innerHTML = '';
    barbers.forEach((barber) => {
        const card = document.createElement("div");
        card.className = "barber-card";
        card.innerHTML = `
            <div class="barber-name">${barber.name}</div>
            <div class="barber-portfolio">
                <small>Services: ${barber.portfolio.join(', ')}</small>
            </div>
            <button class="select-barber-btn">Select Barber</button>
        `;

        card.addEventListener("click", async () => {
            selectedBarber = barber;
            selectedService = null; // Reset service selection

            // Update UI
            document.querySelectorAll(".barber-card")
                .forEach(c => c.classList.remove("selected"));
            card.classList.add("selected");

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
            selectedDate = null;
            selectedTime = null;

            // Reset displays
            const dateDisplay = document.getElementById('selected-date-display');
            if (dateDisplay) dateDisplay.textContent = 'Not selected';

            const timeDisplay = document.getElementById('selected-time-display');
            if (timeDisplay) timeDisplay.textContent = 'Not selected';

            const serviceDisplay = document.getElementById('selected-service-display');
            if (serviceDisplay) serviceDisplay.textContent = 'Not selected';

            // Clear day schedule
            const scheduleContainer = document.getElementById('day-schedule');
            if (scheduleContainer) scheduleContainer.innerHTML = '';

            validateBooking();
        });

        barberList.appendChild(card);
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

// Add this function to generate time slots in 35-minute intervals
function generateTimeSlots() {
    const slots = [];
    const startHour = 11; // 11 AM
    const endHour = 20;   // 8 PM
    const interval = 35;   // 35 minutes

    for (let hour = startHour; hour <= endHour; hour++) {
        for (let minute = 0; minute < 60; minute += interval) {
            if (hour === endHour && minute > 0) break;
            const timeString = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
            //something here isnt working
            slots.push(timeString);
        }
    }
    return slots;
}

// Update the updateTimeDropdown function
function updateTimeDropdown(availableSlots) {
    if (!timeInput) return;

    timeInput.innerHTML = '<option value="">Select a time</option>';

    // Add available slots to dropdown
    availableSlots.forEach(slot => {
        const option = document.createElement('option');
        option.value = slot;
        option.textContent = formatTime(slot);
        timeInput.appendChild(option);
    });

    // Add event listener to handle time selection
    timeInput.addEventListener('change', function () {
        selectedTime = this.value;
        const formattedTime = selectedTime ? formatTime(selectedTime) : 'Not selected';

        if (timeDisplay) {
            timeDisplay.textContent = formattedTime;
        }

        validateBooking();
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
                    barber_id: selectedBarber.id,  // Make sure this exists
                    date: selectedDate,            // Format: YYYY-MM-DD
                    time: selectedTime,            // Format: HH:MM
                    service: selectedService       // Make sure this is selected
                };

                console.log('Sending booking data:', bookingData); // Add this for debugging

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
                validateBooking(); // This will disable it again if validation fails
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
        generateBarberList();
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

//so the issue is that i have to get availableSlots (from fetchBarberAvailability) just show them as objects in the frontend, the problem is i have no idea how to transfer this over without absolutely conking the current calendar!

//proposed solution:
// essentially create a new calendar on top of the current one (SO INEFFICIENT)
//the weird thing is, it's supposed to already work! the function above me should initialize this calendar to show only available dates but for some reason this goddamn get_monthly_appointments.php isnt working!
//if its already being seen as payload then i shouldnt have too much a problem integrating this to the front, i just don't know how with this current mess of 700 fucking lines of code!