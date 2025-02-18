const users = {
    "Hardi": { password: "hardiPass123", role: "callCenter", floor: "3rd Floor", doctor: "Dr. Smith" },
    "Alice": { password: "alicePass123", role: "clinicStaff", floor: "2nd Floor", doctor: "Dr. Jones" },
    "Bob": { password: "bobPass123", role: "teamLeader", floor: "1st Floor", doctor: "Dr. Brown" }
};

document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('loginButton').addEventListener('click', function() {
        var username = document.getElementById('username').value;
        var password = document.getElementById('password').value;
        var user = users[username];

        if (user && user.password === password) {
            document.getElementById('loginPanel').style.display = 'none';
            document.getElementById('dashboard').style.display = 'block';
            setupUserDashboard(user);
        } else {
            alert('Invalid credentials. Please try again.');
        }
    });
});

function setupUserDashboard(user) {
    document.getElementById('userDetails').textContent = `Logged in as ${user.name}, assigned to ${user.doctor} on ${user.floor}.`;
    switch (user.role) {
        case 'callCenter':
            document.getElementById('callCenterPanel').style.display = 'block';
            break;
        case 'clinicStaff':
            document.getElementById('clinicStaffPanel').style.display = 'block';
            populateResponseOptions();
            break;
        case 'teamLeader':
            document.getElementById('teamLeaderPanel').style.display = 'block';
            break;
    }
}

function populateResponseOptions() {
    const responses = ["We called the patient.", "The number is no answer.", "Switched off or unreachable.", "Doctor refused to talk.", "Will transfer to the doctor later.", "Appointment has been booked."];
    const select = document.getElementById('responseSelect');
    responses.forEach(response => {
        let option = document.createElement('option');
        option.value = response;
        option.textContent = response;
        select.appendChild(option);
    });
}

function sendCallCenterMessage() {
    // Implement message sending logic here
}

function sendResponse() {
    var response = document.getElementById('responseSelect').value;
    if (response) {
        displayMessage('clinicMessages', response);
    } else {
        alert('Please select a response.');
    }
}

function displayMessage(panelId, message) {
    var panel = document.getElementById(panelId);
    var messageDiv = document.createElement('div');
    messageDiv.textContent = message;
    panel.appendChild(messageDiv);
}

