// Add Staff page scripts
// In addStaff.js
const form = document.querySelector('.staff-form');
form.addEventListener('submit', (e) => {
  e.preventDefault();
  const userName = form.querySelector('input[type="text"]').value;
  const staffID = form.querySelector('.staff-id-input').value;
  const role = form.querySelector('.staff-role').value;

  console.log({ userName, staffID, role });
  // You can now send this data to Firebase
});


