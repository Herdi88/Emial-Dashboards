const users = {
    "Hardi": { password: "hardiPass123", floor: "3rd Floor", doctor: "Dr. Smith" },
    "Alice": { password: "alicePass123", floor: "2nd Floor", doctor: "Dr. Jones" },
    "Bob": { password: "bobPass123", floor: "1st Floor", doctor: "Dr. Brown" },
const users = {
    "Hardi": { password: "hardiPass123" },
    "Alice": { password: "alicePass123" },
    "Bob": { password: "bobPass123" },
};

function login() {
    var username = document.getElementById('username').value;
    var password = document.getElementById('password').value;
    if (users[username] && users[username].password === password) {
        document.getElementById('loginPanel').style.display = 'none';
        document.getElementById('dashboard').style.display = 'block';
    } else {
        alert('Invalid credentials. Please try again.');
    }
}

function sendCallCenterMessage() {
    var message = document.getElementById('callerName').value + ' ' +
                  document.getElementById('contactInfo').value + ' ' +
                  document.getElementById('mrn').value + ' - ' +
                  document.getElementById('inquiryReason').value + ' - ' +
                  document.getElementById('doctorSelect').value;
    if (message.trim() === '') {
        alert('Please fill out all fields.');
        return;
    }
    displayMessage('clinicMessages', message);
    displayMessage('leaderMessages', message);
}

function displayMessage(panelId, message) {
    var panel = document.getElementById(panelId);
    var messageDiv = document.createElement('div');
    messageDiv.textContent = message;
    panel.appendChild(messageDiv);
}
