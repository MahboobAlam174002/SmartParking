// Initialize parking slots
const totalSlots = 50;
let availableSlots = totalSlots;
let bookedSlots = []; // Array to store booked slots and their passwords
const ratePerHour = 10; // Rate per hour for parking

// Function to generate parking slots
function generateSlots() {
    const slotGrid = document.getElementById('slot-grid');
    slotGrid.innerHTML = '';

    for (let i = 1; i <= totalSlots; i++) {
        const slot = document.createElement('div');
        slot.classList.add('slot');
        slot.textContent = i;

        const bookedSlot = bookedSlots.find(s => s.slotNumber === i);
        if (bookedSlot) {
            slot.classList.add('booked');
        } else {
            slot.classList.add('available');
        }

        slot.addEventListener('click', () => handleSlotClick(i));
        slotGrid.appendChild(slot);
    }

    updateSlotStatus();
}

// Function to handle slot click
function handleSlotClick(slotNumber) {
    const bookedSlot = bookedSlots.find(s => s.slotNumber === slotNumber);
    if (bookedSlot) {
        // Slot is booked, prompt for password to free it
        const password = prompt('Enter the password to free this slot:');
        if (password === bookedSlot.password) {
            // Remove the slot from bookedSlots
            bookedSlots = bookedSlots.filter(s => s.slotNumber !== slotNumber);
            availableSlots++;
            generateSlots();
            alert(`Slot ${slotNumber} has been freed!`);
        } else {
            alert('Incorrect password!');
        }
    } else {
        // Show booking form
        openBookingForm(slotNumber);
    }
}

// Function to open booking form
function openBookingForm(slotNumber) {
    const bookingForm = document.getElementById('booking-form');
    bookingForm.classList.remove('hidden');
    bookingForm.dataset.slotNumber = slotNumber;
}

// Function to close booking form
function closeBookingForm() {
    const bookingForm = document.getElementById('booking-form');
    bookingForm.classList.add('hidden');
}

// Function to handle booking form submission
document.getElementById('user-info-form').addEventListener('submit', (e) => {
    e.preventDefault();

    const slotNumber = document.getElementById('booking-form').dataset.slotNumber;
    const userName = document.getElementById('user-name').value;
    const vehicleNumber = document.getElementById('vehicle-number').value;
    const userContact = document.getElementById('user-contact').value;
    const password = document.getElementById('booking-password').value;
    const hours = parseInt(document.getElementById('booking-hours').value);
    const minutes = parseInt(document.getElementById('booking-minutes').value);

    if (userName && vehicleNumber && userContact && password && (hours || minutes)) {
        // Calculate total cost
        const totalMinutes = hours * 60 + minutes;
        const totalCost = (totalMinutes / 60) * ratePerHour;

        // Add the booked slot to the array
        bookedSlots.push({ slotNumber: Number(slotNumber), password, userName, vehicleNumber, userContact, totalCost });
        availableSlots--;
        generateSlots();
        closeBookingForm();

        // Show payment section with QR code
        showPaymentSection(totalCost.toFixed(2));
    } else {
        alert('Please fill all the fields!');
    }
});

// Function to show payment section with QR code
function showPaymentSection(totalCost) {
    const paymentSection = document.getElementById('payment-section');
    const qrcodeDiv = document.getElementById('qrcode');
    qrcodeDiv.innerHTML = ''; // Clear previous QR code

    // Generate payment link (replace with your payment gateway URL)
    
    const paymentLink = `upi://pay?pa=hnyicah77@okicici&pn=HAPPYMORE%20R%20JNR%20NYIKAVARANDA&aid=uGICAgKD83rKoQA=${totalCost}`;

    // Generate QR code
    new QRCode(qrcodeDiv, {
        text: paymentLink,
        width: 200,
        height: 200,
    });

    paymentSection.classList.remove('hidden');
}

// Function to close payment section
function closePaymentSection() {
    const paymentSection = document.getElementById('payment-section');
    paymentSection.classList.add('hidden');
}

// Function to update slot status
function updateSlotStatus() {
    const slotStatus = document.getElementById('slot-status');
    slotStatus.textContent = `Available Slots: ${availableSlots} / ${totalSlots}`;
}

// Initialize the page
generateSlots();

// Contact form submission
document.getElementById('contact-form').addEventListener('submit', (e) => {
    e.preventDefault();
    alert('Thank you for contacting us! We will get back to you soon.');
    e.target.reset();
});