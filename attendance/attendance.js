// ==============================
// Attendance Page Logic
// ==============================
document.addEventListener('DOMContentLoaded', () => {
  initCalendarPicker();
  initAttendanceSearch();
  handleStatusButtonClick();
});


// ==============================
// Calendar Feature
// ==============================
function initCalendarPicker() {
  const calendarBtn = document.querySelector('.calendar-btn');
  const calendarInput = document.getElementById('calendarInput');
  const dateDisplay = document.querySelector('.date-display');

  if (!calendarBtn || !calendarInput || !dateDisplay) return;

  calendarBtn.addEventListener('click', () => {
    if (calendarInput.showPicker) {
      calendarInput.showPicker();
    } else {
      calendarInput.click();
    }
  });

  calendarInput.addEventListener('change', () => {
    const date = new Date(calendarInput.value);
    if (isNaN(date)) return;

    dateDisplay.textContent = date.toLocaleDateString('en-US', {
      weekday: 'short',
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  });
}


function initAttendanceSearch() {
  const searchInput = document.getElementById('searchInput');
  const staffItems = document.querySelectorAll('.attendance-list li');

  if (!searchInput) return;

  searchInput.addEventListener('input', () => {
    const query = searchInput.value.toLowerCase();

    staffItems.forEach(item => {
      const text = item.textContent.toLowerCase();
      item.style.display = text.includes(query) ? '' : 'none';
    });
  });
}

function handleStatusButtonClick(){
  document.querySelectorAll('.status-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.status-btn')
        .forEach(b => b.classList.remove('active'));
          btn.classList.add('active');
    });
  });

}


// Get session ID from URL
function getSessionId() {
  const params = new URLSearchParams(window.location.search);
  return params.get("session");
}

const currentSession = getSessionId();

if (!currentSession) {
  alert("Invalid attendance session.");
  // optionally redirect back to dashboard
  window.location.href = "../AdminDashboard/index.html";
}


const timeInSpan = document.getElementById("timeIn");
const attendanceForm = document.getElementById("attendanceForm");

// Auto-fill time in
timeInSpan.textContent = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

// Handle submit
attendanceForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const name = document.getElementById("staffName").value.trim();
  const role = document.getElementById("staffRole").value;

  if (!name || !role) return alert("Please fill all fields.");

  // Store attendance locally for now
  const attendanceData = {
    session: currentSession,
    name,
    role,
    timeIn: timeInSpan.textContent
  };

  // Use localStorage to simulate saving
  const saved = JSON.parse(localStorage.getItem("attendanceRecords")) || [];
  
  // Prevent duplicate submission
  const alreadySubmitted = saved.find(r => r.session === currentSession && r.name === name);
  if (alreadySubmitted) return alert("Attendance already recorded for this session.");

  saved.push(attendanceData);
  localStorage.setItem("attendanceRecords", JSON.stringify(saved));

  alert("Attendance recorded successfully!");
  attendanceForm.reset();
});
