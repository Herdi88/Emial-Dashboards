const users = {
    "Hardi": { password: "hardiPass123", floor: "3rd Floor", doctor: "Dr. Smith", clinicStaff: "Alice" },
    "Alice": { password: "alicePass123", floor: "2nd Floor", doctor: "Dr. Jones", clinicStaff: "Bob" },
    "Bob": { password: "bobPass123", floor: "1st Floor", doctor: "Dr. Brown", clinicStaff: "Charlie" },
};

function login() {
    var username = document.getElementById('username').value;
    var password = document.getElementById('password').value;
    if (users[username] && users[username].password === password) {
        document.getElementById('loginPanel').style.display = 'none';
        document.getElementById('dashboard').style.display = 'block';
        document.getElementById('userDetails').innerText = `Logged in as ${username}, assigned to ${users[username].doctor} on ${users[username].floor}.`;
    } else {
        alert('Invalid credentials. Please try again.');
    }
}

function selectStaffBasedOnDoctor() {
    var selectedDoctor = document.getElementById('doctorSelect').value;
    var staffName = Object.keys(users).find(key => users[key].doctor === selectedDoctor);
    alert('Messages will be handled by ' + users[staffName].clinicStaff);
}

function sendCallCenterMessage() {
    var message = document.getElementById('callerName').value + ' - ' +
                  document.getElementById('contactInfo').value + ' - ' +
                  document.getElementById('mrn').value + ' - ' +
                  document.getElementById('inquiryReason').value + ' - ' +
                  document.getElementById('doctorSelect').value;
    displayMessage('clinicMessages', message);
    displayMessage('leaderMessages', message);
}

function displayMessage(panelId, message) {
    var panel = document.getElementById(panelId);
    var messageDiv = document.createElement('div');
    messageDiv.textContent = message;
    panel.appendChild(messageDiv);
}
