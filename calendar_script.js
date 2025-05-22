// Barber data
const barbers = [
    { name: "John Doe", portfolio: ["Cut 1", "Cut 2", "Cut 3"] },
    { name: "Jane Smith", portfolio: ["Style A", "Style B", "Style C"] },
    { name: "Max Blade", portfolio: ["Fade X", "Buzz Y", "Trim Z"] }
];

// Global state
let selectedBarber = null;
let selectedDate = null;
let selectedTime = null;
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

function showError(message) {
    const errorModal = document.getElementById('error-modal');
    const errorMessage = document.getElementById('error-message');
    errorMessage.textContent = message;
    errorModal.classList.add('show');
}

// Update the calendar generation function
function generateCalendar() {
    const firstDay = new Date(currentYear, currentMonth, 1).getDay();
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
    const tbody = calendar.getElementsByTagName("tbody")[0];

    // Clear existing calendar
    tbody.innerHTML = "";

    // Update month/year display
    const monthNames = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];
    currentMonthDisplay.textContent = `${monthNames[currentMonth]} ${currentYear}`;

    // Generate calendar grid
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
                cell.textContent = date;
                cell.className = "calendar-day";
                cell.dataset.date = currentDate.toLocaleDateString('en-CA'); // YYYY-MM-DD format, local time


                // Highlight current day
                const today = new Date();
                if (date === today.getDate() &&
                    currentMonth === today.getMonth() &&
                    currentYear === today.getFullYear()) {
                    cell.classList.add("current-day");
                }

                // Add click handler for date selection
                cell.addEventListener("click", function () {
                    if (!selectedBarber) {
                        showError("Please choose a barber first");
                        return;
                    }

                    // Remove selected class from all dates
                    document.querySelectorAll('.calendar-day').forEach(day => {
                        day.classList.remove('selected-date');
                    });

                    // Add selected class to clicked date
                    this.classList.add('selected-date');

                    // Get the selected date from data attribute
                    const clickedDate = new Date(this.dataset.date);
                    selectedDate = clickedDate;

                    // Format date as "Month Day, Year"
                    const formattedDate = clickedDate.toLocaleDateString('en-US', {
                        month: 'long',
                        day: 'numeric',
                        year: 'numeric'
                    });

                    // Update the display
                    document.getElementById('selected-date-display').textContent = formattedDate;

                    // Example: when a date is selected
                    document.getElementById('date-input').value = selectedDate;

                    // Reset time selection
                    document.getElementById('selected-time-display').textContent = 'Not selected';
                    selectedTime = null;
                    document.querySelectorAll('.time-slot').forEach(slot => {
                        slot.classList.remove('selected');
                    });

                    // Reset time input
                    timeInput.value = '';
                    timeDisplay.textContent = 'Not selected';
                    validateBooking(); // Validate booking fields
                });

                date++;
            }
            row.appendChild(cell);
        }
        tbody.appendChild(row);
        if (date > daysInMonth) break;
    }
}

function generateBarberList() {
    barbers.forEach((barber) => {
        const card = document.createElement("div");
        card.className = "barber-card";
        card.innerHTML = `
            <div class="barber-name">${barber.name}</div>
            <button class="view-portfolio-btn">View Portfolio</button>
        `;

        card.addEventListener("click", () => {
            selectedBarber = barber;
            document.querySelectorAll(".barber-card")
                .forEach(c => c.classList.remove("selected"));
            card.classList.add("selected");
            generateCalendar(); // Refresh calendar for new barber

            // Example: when a barber is selected
            document.getElementById('barber-input').value = selectedBarber.name;
        });

        barberList.appendChild(card);
    });
}

function showBookingModal(date) {
    document.getElementById("booking-date").textContent =
        date.toLocaleDateString();
    document.getElementById("booking-barber").textContent =
        selectedBarber.name;
    bookingModal.classList.add("show");
}

// Initialize time slots
function initializeTimeSlots() {
    const timeSlots = document.querySelectorAll('.time-slot');

    timeSlots.forEach(slot => {
        slot.addEventListener('click', function () {
            if (!selectedDate) {
                showError("Please select a date first");
                return;
            }

            // Remove selected class from all time slots
            timeSlots.forEach(s => s.classList.remove('selected'));

            // Add selected class to clicked time slot
            this.classList.add('selected');

            // Update selected time
            selectedTime = this.dataset.time; // This should be a string like "14:30"

            // Format time for display (convert 24h to 12h format)
            const timeDisplay = new Date(`2000-01-01T${selectedTime}`).toLocaleTimeString('en-US', {
                hour: 'numeric',
                minute: 'numeric',
                hour12: true
            });

            // Update display
            document.getElementById('selected-time-display').textContent = timeDisplay;
            validateBooking(); // Validate booking fields
        });
    });
    console.log(selectedTime);
    console.log("passed");
}

// Check if all required fields are filled
function validateBooking() {
    // Only require barber and date
    const isValid = selectedBarber && selectedDate;
    confirmBtn.disabled = !isValid;
    return isValid;
}

// Event Listeners
document.addEventListener("DOMContentLoaded", () => {
    generateCalendar();
    generateBarberList();
    initializeTimeSlots();
});

prevMonthBtn.addEventListener("click", () => {
    currentMonth--;
    if (currentMonth < 0) {
        currentMonth = 11;
        currentYear--;
    }
    generateCalendar();
});

nextMonthBtn.addEventListener("click", () => {
    currentMonth++;
    if (currentMonth > 11) {
        currentMonth = 0;
        currentYear++;
    }
    generateCalendar();
});

// Modal controls
document.getElementById("close-booking-modal")
    .addEventListener("click", () => {
        bookingModal.classList.remove("show");
    });

document.getElementById("booking-form")
    .addEventListener("submit", (e) => {
        e.preventDefault();
        // Add your booking submission logic here
        bookingModal.classList.remove("show");
        alert("Booking confirmed!");
    });

document.addEventListener('DOMContentLoaded', function () {
    const openBarberBtn = document.getElementById('open-barber-modal');
    const barberModal = document.getElementById('barber-modal');
    const closeBarberBtn = document.getElementById('close-barber-modal');
    const modalBackdrop = document.getElementById('modal-backdrop');

    // Open barber modal
    openBarberBtn.addEventListener('click', function () {
        barberModal.classList.add('show');
        modalBackdrop.style.display = 'block';
    });

    // Close barber modal
    closeBarberBtn.addEventListener('click', function () {
        barberModal.classList.remove('show');
        modalBackdrop.style.display = 'none';
    });

    // Handle barber selection
    document.querySelectorAll('.view-portfolio-btn').forEach(btn => {
        btn.addEventListener('click', function () {
            const barberItem = this.closest('.barber-item');
            const barberName = barberItem.querySelector('strong').textContent;

            // Update the display
            document.getElementById('selected-barber-display').textContent = barberName;

            // Close the modal
            barberModal.classList.remove('show');
            modalBackdrop.style.display = 'none';
        });
    });
});

// Add error modal close handler
document.querySelector('.close-error-btn').addEventListener('click', function () {
    document.getElementById('error-modal').classList.remove('show');
});

// Update the barber selection handler
function selectBarber(barber) {
    selectedBarber = barber;
    document.getElementById('selected-barber-display').textContent = barber.name;

    // Close the barber modal
    document.getElementById('barber-modal').classList.remove('show');
    document.getElementById('modal-backdrop').style.display = 'none';

    // Regenerate calendar to enable date selection
    generateCalendar();
    validateBooking(); // Validate booking fields
}

document.querySelectorAll('.view-portfolio-btn').forEach(btn => {
    btn.addEventListener('click', function () {
        const barberItem = this.closest('.barber-item');
        const barberName = barberItem.querySelector('strong').textContent;

        selectBarber({
            name: barberName,
            // Add other barber details as needed
        });
    });
});

timeInput.addEventListener('change', function () {
    if (!selectedDate) {
        showError("Please select a date first");
        this.value = '';
        document.getElementById('selected-time-display').textContent = 'Not selected';
        selectedTime = null;
        return;
    }

    selectedTime = this.value; // "14:30" string

    // Format and display the selected time
    if (selectedTime) {
        const formatted = new Date(`2000-01-01T${selectedTime}`).toLocaleTimeString('en-US', {
            hour: 'numeric',
            minute: 'numeric',
            hour12: true
        });
        document.getElementById('selected-time-display').textContent = formatted;
    } else {
        document.getElementById('selected-time-display').textContent = 'Not selected';
    }
    validateBooking();
});

confirmBtn.addEventListener('click', async function () {
    if (!validateBooking()) {
        showError("Please fill in all required fields");
        return;
    }

    // Ensure date and time are strings
    let dateString = selectedDate;
    if (selectedDate instanceof Date) {
        dateString = selectedDate.toISOString().slice(0, 10);
    }

    let timeString = selectedTime;
    if (selectedTime instanceof Date) {
        timeString = selectedTime.toTimeString().slice(0, 5);
    }

    const bookingData = {
        barber: selectedBarber.name,
        date: dateString, // "YYYY-MM-DD"
        time: timeString  // "HH:MM"
    };

    console.log("Booking data to send:", bookingData);

    const response = await fetch('connect.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(bookingData)
    });

    const result = await response.json();

    if (result.success) {
        document.getElementById('success-modal').classList.add('show');
    } else {
        showError(result.message || "Booking failed.");
    }
});

document.querySelector('.close-success-btn').addEventListener('click', function () {
    document.getElementById('success-modal').classList.remove('show');
});
