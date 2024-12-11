document.addEventListener("DOMContentLoaded", function() {
  const hamburger = document.querySelector(".hamburger");
  const menuModal = document.getElementById("menu-modal");
    document.getElementById("gender-select").addEventListener("change", filterTrainers); 
    document.getElementById("class-select").addEventListener("change", filterTrainers); 
  
  

  window.toggleNavbar = function() {
    if (menuModal.style.display === "block") {
      menuModal.style.display = "none"; // Hide modal
    } else {
      menuModal.style.display = "block"; // Show modal
    }
  };

  // Close modal if user clicks outside the content
  window.onclick = function(event) {
    if (event.target === menuModal) {
      menuModal.style.display = "none";
    }
  };
});

function filterTrainers() {
  var selectedGender = document.getElementById("gender-select").value;
  var selectedClass = document.getElementById("class-select").value;

  var trainerItems = document.querySelectorAll(".trainer-item");
  var noResultMessage = document.getElementById("no-result-message");

  let visibleCount = 0; // Counter to track visible trainers

  trainerItems.forEach(function(item) {
    var itemGender = item.getAttribute("data-gender");
    var itemClass = item.getAttribute("data-class");

    if ((selectedGender === "all" || selectedGender === itemGender) &&
        (selectedClass === "all" || selectedClass === itemClass)) {
        item.style.display = "block";
        visibleCount++;
    } else {
        item.style.display = "none";
    }
  });

  // Display "No result" message if no trainers are visible
  if (visibleCount === 0) {
    noResultMessage.style.display = "block";
  } else {
    noResultMessage.style.display = "none";
  }
}


// Get modal and close button elements
const trainerModal = document.getElementById("trainer-detail-modal");
const closeTrainerModalBtn = document.getElementById("close-trainer-modal");

// Function to open the trainer detail modal
function openTrainerModal(trainer) {
  // Set the trainer details in the modal
  document.getElementById("trainer-detail-name").textContent = trainer.name;
  document.getElementById("trainer-detail-specialty").textContent = `Specialty: ${trainer.specialty}`;
  document.getElementById("trainer-detail-bio").textContent = trainer.bio;
  document.getElementById("trainer-detail-image").src = trainer.image;

  // Show the modal
  trainerModal.style.display = "block";
}

// Function to close the modal
closeTrainerModalBtn.onclick = function () {
  trainerModal.style.display = "none";
}

// Close modal if clicked outside the modal content
window.onclick = function (event) {
  if (event.target === trainerModal) {
    trainerModal.style.display = "none";
  }
}

// Sample trainer data
const trainers = [
  {
    name: "John Davis",
    specialty: "Boxing",
    bio: "John is a professional boxer with over 10 years of experience in the ring. He loves helping others build strength and confidence.",
    image: "images/trainers1.jpg"
  },
  {
    name: "Gabriel Gomes",
    specialty: "Zumba",
    bio: "Gabriel is a certified Zumba instructor who combines high-energy dance with fitness. He loves making classes fun and engaging.",
    image: "images/trainers3.jpg"
  },
  {
    name: "Michael Anderson",
    specialty: "Boxing",
    bio: "Michael is a seasoned boxer and fitness trainer. He has helped many individuals achieve their fitness goals.",
    image: "images/trainers4.jpg"
  },
  {
    name: "David Johnson",
    specialty: "Yoga",
    bio: "David specializes in Hatha Yoga. His classes focus on improving flexibility, strength, and mental clarity.",
    image: "images/trainers5.jpg"
  },
  {
    name: "Emma Miller",
    specialty: "Pilates",
    bio: "Emma is a certified Pilates instructor who focuses on core strength, flexibility, and rehabilitation.",
    image: "images/trainers6.jpeg"
  },
  {
    name: "Bella Cooper",
    specialty: "Yoga",
    bio: "Bella teaches Vinyasa flow and gentle yoga. She loves helping people de-stress and improve their flexibility.",
    image: "images/trainers7.jpg"
  }
];

// Add event listeners to trainer items
const trainerItems = document.querySelectorAll('.trainer-item');
trainerItems.forEach((item, index) => {
  item.addEventListener("click", function () {
    const trainer = trainers[index];
    openTrainerModal(trainer);
  });
});


// script.js

const prevMonthBtn = document.getElementById("prev-month");
const nextMonthBtn = document.getElementById("next-month");
const prevWeekBtn = document.getElementById("prev-week");
const nextWeekBtn = document.getElementById("next-week");

const selectedMonthElement = document.getElementById("selected-month");
const selectedWeekElement = document.getElementById("selected-week");
const scheduleDays = document.getElementById("schedule-days");
const scheduleWeek = document.getElementById("schedule-week");
const timesDiv = document.getElementById("times");
const timeSlotsDiv = document.getElementById("time-slots");

let currentYear = new Date().getFullYear();
let selectedMonth = new Date().getMonth(); // Default to current month
let selectedWeek = 0; // Default to current week (calculated dynamically)

// List of month names for display purposes
const months = [
  "January", "February", "March", "April", "May", "June", 
  "July", "August", "September", "October", "November", "December"
];

// Fixed time slots for training sessions
const trainingSessions = {
  "Yoga": ["9:00 AM - 10:00 AM", "10:30 AM - 11:30 AM"],
  "Pilates": ["1:00 PM - 2:00 PM", "2:30 PM - 3:30 PM"],
  "CrossFit": ["6:00 AM - 7:00 AM", "7:30 AM - 8:30 AM"]
};

// Define available training types for each day
const availableTrainings = {
  "2024-11-25": ["Yoga", "Pilates"],
  "2024-11-27": ["CrossFit"],
  "2024-11-29": ["Yoga"],
  // Add more days as needed
};

// Function to calculate the start and end of a week
function getWeekRange(date, weekIndex) {
  const startOfWeek = new Date(date);
  const day = startOfWeek.getDay();
  const diff = day === 0 ? -6 : 1 - day; // Adjust if it's Sunday (get Sunday as the start of the week)
  startOfWeek.setDate(date.getDate() + diff + weekIndex * 7);
  startOfWeek.setHours(0, 0, 0, 0); // Set time to midnight for consistency

  const endOfWeek = new Date(startOfWeek);
  endOfWeek.setDate(startOfWeek.getDate() + 6); // Get the end of the week

  return { startOfWeek, endOfWeek };
}

// Function to update the week display in "From Date to Date" format
function updateWeekDisplay() {
  const { startOfWeek, endOfWeek } = getWeekRange(new Date(currentYear, selectedMonth, 1), selectedWeek);
  
  const options = { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' };
  
  const startDateStr = startOfWeek.toLocaleDateString('en-US', options);
  const endDateStr = endOfWeek.toLocaleDateString('en-US', options);
  
  selectedWeekElement.textContent = `Week: ${startDateStr} - ${endDateStr}`;
}

// Function to update month and week display
function updateDisplay() {
  selectedMonthElement.textContent = `${months[selectedMonth]} ${currentYear}`;
  updateWeekDisplay();
  renderSchedule();
}

// Function to render the schedule for the selected week
function renderSchedule() {
  const { startOfWeek } = getWeekRange(new Date(currentYear, selectedMonth, 1), selectedWeek);

  scheduleDays.innerHTML = ''; // Clear previous content
  for (let i = 0; i < 7; i++) {
    const day = new Date(startOfWeek);
    day.setDate(startOfWeek.getDate() + i);
    const dayName = day.toLocaleString('default', { weekday: 'short' });
    day.setHours(day.getHours() + 1);

    // Format the updated Date back to an ISO string
    const dateStr = day.toISOString().split('T')[0]; // Date format: YYYY-MM-DD

    const dayDiv = document.createElement("div");
    dayDiv.classList.add("schedule-day");
    dayDiv.innerHTML = `
      <h3>${dayName} ${day.getDate()}</h3>
      <button onclick="showTimeSlots('${dateStr}', this)">View Slots</button>
    `;

    // Highlight the current day
    const currentDate = new Date();
    if (day.toDateString() === currentDate.toDateString()) {
      dayDiv.classList.add("current-day");
    }

    scheduleDays.appendChild(dayDiv);
  }
}


  
 // Modal elements
const bookingModal = document.getElementById("booking-modal");
const closeModalBtn = document.getElementById("close-modal");
const modalTitle = document.getElementById("modal-title");
const modalDescription = document.getElementById("modal-description");
const bookClassBtn = document.getElementById("book-class-btn");
// Modal elements for confirmation
const confirmationModal = document.getElementById("confirmation-modal");
const closeConfirmationModalBtn = document.getElementById("close-confirmation-modal");
const okBtn = document.getElementById("ok-btn");

// Function to open the confirmation modal
function openConfirmationModal() {
  confirmationModal.style.display = "block"; // Show the confirmation modal
}

// Function to close the confirmation modal
closeConfirmationModalBtn.onclick = function () {
  confirmationModal.style.display = "none"; // Close the confirmation modal
}

// Close the confirmation modal when the user clicks "OK"
okBtn.onclick = function () {
  confirmationModal.style.display = "none"; // Close the confirmation modal
}

// Function to handle class booking
function handleClassBooking(training, timeSlot) {
  // Close the booking modal when class is booked
  bookingModal.style.display = "none"; 
  
  // Open the confirmation modal with the booking message
  const message = `You have successfully booked the ${training} class at ${timeSlot}.`;
  document.getElementById("confirmation-message").textContent = message;

  openConfirmationModal(); // Show the confirmation modal
}

// Function to open the booking modal with class details
function openBookingModal(training, timeSlot) {
  modalTitle.textContent = `${training} - ${timeSlot}`;
  modalDescription.textContent = `You have selected the ${timeSlot} time slot for ${training} training. Are you ready to book your class?`;

  bookingModal.style.display = "block"; // Show the booking modal
  bookClassBtn.onclick = () => handleClassBooking(training, timeSlot); // Handle booking when button is clicked
}

// Function to close the modal
closeModalBtn.onclick = function () {
  bookingModal.style.display = "none"; // Hide the modal
}

// When the user clicks anywhere outside the modal, close it
window.onclick = function (event) {
  if (event.target === bookingModal) {
    bookingModal.style.display = "none"; // Hide the modal
  }
}

// Function to show available time slots for a selected day
function showTimeSlots(dateStr, button) {
  const date = new Date(dateStr);
  date.setHours(0, 0, 0, 0); // Set time to midnight to avoid time zone shifts

  // Get the available trainings for the selected day
  const trainings = availableTrainings[dateStr] || [];
  
  // Add 'active-day' class to the clicked day
  const allDays = document.querySelectorAll('.schedule-day');
  allDays.forEach(dayDiv => dayDiv.classList.remove('active-day')); // Remove active-day from other days
  button.closest('.schedule-day').classList.add('active-day'); // Add active-day to the clicked day
  
  if (trainings.length === 0) {
    timesDiv.innerHTML = `<strong>No training available for ${date.toLocaleDateString()}.</strong>`;
    timeSlotsDiv.style.display = "block";
    return;
  }

  timesDiv.innerHTML = `<strong>Available slots for ${date.toLocaleDateString()}:</strong>`;

  trainings.forEach(training => {
    const timeSlots = trainingSessions[training];

    const trainingDiv = document.createElement("div");
    trainingDiv.classList.add("training-session");
    trainingDiv.innerHTML = `<h4>${training}</h4>`;

    timeSlots.forEach(timeSlot => {
      const timeDiv = document.createElement("div");
      timeDiv.classList.add("time-slot");
      timeDiv.textContent = timeSlot;
      timeDiv.onclick = () => openBookingModal(training, timeSlot); // Open modal on time slot click
      trainingDiv.appendChild(timeDiv);
    });

    timesDiv.appendChild(trainingDiv);
  });

  timeSlotsDiv.style.display = "block";
}

  

// Function to get the current week
function getCurrentWeek() {
  const currentDate = new Date();
  selectedMonth = currentDate.getMonth(); // Set current month
  const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
  
  // Calculate the current week based on the current date
  const startOfWeek = getWeekRange(firstDayOfMonth, 0).startOfWeek;
  const currentWeek = Math.floor((currentDate - startOfWeek) / (7 * 24 * 60 * 60 * 1000));

  return currentWeek;
}

// Event listeners for month navigation
prevMonthBtn.addEventListener("click", () => {
  selectedMonth = selectedMonth === 0 ? 11 : selectedMonth - 1; // Wrap around to December
  updateDisplay();
});

nextMonthBtn.addEventListener("click", () => {
  selectedMonth = selectedMonth === 11 ? 0 : selectedMonth + 1; // Wrap around to January
  updateDisplay();
});

// Event listeners for week navigation
prevWeekBtn.addEventListener("click", () => {
  selectedWeek = selectedWeek === 0 ? 0 : selectedWeek - 1; // Stay at week 0 if already at the first week
  updateWeekDisplay();
  renderSchedule();
});

nextWeekBtn.addEventListener("click", () => {
  selectedWeek++;
  updateWeekDisplay();
  renderSchedule();
});

// Initial render on load
selectedWeek = getCurrentWeek(); // Set the default to the current week
updateDisplay();





// Get the modal elements
let modal = document.getElementById("membershipModal");
let closeModal = document.getElementsByClassName("close_membership")[0];

// Get the email confirmation modal and the close button
let emailConfirmationModal = document.getElementById("emailConfirmationModal");
let closeEmailConfirmationModal = document.getElementsByClassName("close_confirmation")[0];

// Get all Buy buttons
let buyButtons = document.querySelectorAll(".membership-section .card button");

// Define the memberships data
const memberships = {
    "Next.Level Flexible": {
        title: "Next.Level Flexible",
        description: "Exercise without any obligations. With unlimited membership, it's up to you how you plan your training program.",
        details: [
            "Entry to clubs in Holešovice, Vinohrady, Karlin, and Smíchov",
            "No obligations",
            "Fitness, cardio, and functional zones"
        ],
        price: "2 490,-"
    },
    "Next.Level 6 months": {
        title: "Next.Level 6 months",
        description: "Membership with fixation for 6 months motivates you to exercise regularly.",
        details: [
            "Entry to clubs in Holešovice, Vinohrady, Karlin, and Smíchov",
            "20% discount compared to flexible"
        ],
        price: "1 990,-"
    },
    "Next.Level Start": {
        title: "Next.Level Start",
        description: "The perfect choice for beginners starting their journey to a healthy lifestyle.",
        details: [
            "2 personal training sessions with a trainer",
            "Entry to clubs in Holešovice"
        ],
        price: "4 550,-"
    }
};

// Add event listeners to each Buy button
buyButtons.forEach(button => {
    button.addEventListener("click", function () {
        // Get the title of the clicked membership (from the card's title)
        let membershipTitle = this.closest('.card').querySelector('.membership-title').textContent;

        // Get the membership data for the clicked title
        let membershipData = memberships[membershipTitle];

        // Update the modal content
        document.getElementById("modalTitle").textContent = membershipData.title;
        document.getElementById("modalDescription").textContent = membershipData.description;

        // Update the list of membership details
        let modalList = document.getElementById("modalList");
        modalList.innerHTML = ''; // Clear previous list items
        membershipData.details.forEach(detail => {
            let listItem = document.createElement("li");
            listItem.textContent = detail;
            modalList.appendChild(listItem);
        });

        // Update the price
        document.getElementById("modalPrice").textContent = `Price: ${membershipData.price}`;

        // Show the modal
        modal.style.display = "block";
    });
});

// Close the membership modal when the user clicks on the close button
closeModal.addEventListener("click", function () {
    modal.style.display = "none";
});

// Close the membership modal when the user clicks anywhere outside the modal content
window.addEventListener("click", function (event) {
    if (event.target === modal) {
        modal.style.display = "none";
    }
});

// Handle the "Confirm Purchase via E-mail" button
let buyButton = document.getElementById("buyButton");
buyButton.addEventListener("click", function () {
    // Hide the membership modal
    modal.style.display = "none";

    // Show the email confirmation modal
    emailConfirmationModal.style.display = "block";
});

// Close the email confirmation modal when the user clicks on the close button
closeEmailConfirmationModal.addEventListener("click", function () {
    emailConfirmationModal.style.display = "none";
});

// Close the email confirmation modal when the user clicks anywhere outside the modal content
window.addEventListener("click", function (event) {
    if (event.target === emailConfirmationModal) {
        emailConfirmationModal.style.display = "none";
    }
});


// Get Video and Buttons
const video = document.getElementById('myVideo');
const playPauseBtn = document.getElementById('playPauseBtn');
const fullscreenBtn = document.getElementById('fullscreenBtn');

// Play/Pause Functionality
playPauseBtn.addEventListener('click', () => {
  if (video.paused) {
    video.play();
    playPauseBtn.textContent = 'Pause';
  } else {
    video.pause();
    playPauseBtn.textContent = 'Play';
  }
});

// Fullscreen Functionality
fullscreenBtn.addEventListener('click', () => {
  if (video.requestFullscreen) {
    video.requestFullscreen();
  } else if (video.mozRequestFullScreen) { // Firefox
    video.mozRequestFullScreen();
  } else if (video.webkitRequestFullscreen) { // Chrome, Safari, and Opera
    video.webkitRequestFullscreen();
  } else if (video.msRequestFullscreen) { // IE/Edge
    video.msRequestFullscreen();
  }
});

  