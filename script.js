document.addEventListener('DOMContentLoaded', function() {
    var loginButton = document.getElementById('loginButton');
    loginButton.addEventListener('click', login);
});

function login() {
    var username = document.getElementById('username').value;
    var user = users[username];
    if (user && user.password === document.getElementById('password').value) {
        document.getElementById('loginPanel').style.display = 'none';
        document.getElementById('dashboard').style.display = 'block';
        setupUserDashboard(user);
    } else {
        alert('Invalid credentials. Please try again.');
    }
}

function setupUserDashboard(user) {
    if (user.role === 'clinicStaff') {
        document.getElementById('callCenterPanel').style.display = 'none';
        document.getElementById('clinicResponsePanel').style.display = 'block';
        populateResponseOptions();
    } else {
        document.getElementById('callCenterPanel').style.display = 'block';
        document.getElementById('clinicResponsePanel').style.display = 'none';
    }
    document.getElementById('userDetails').textContent = `Logged in as ${user.name}, assigned to ${user.doctor} on ${user.floor}.`;
}

function populateResponseOptions() {
    var responses = [
        "We called the patient.",
        "The number is no answer.",
        "The number is switched off or unreachable.",
        "Doctor refused to talk.",
        "We will transfer to the doctor later.",
        "Appointment has been booked."
    ];
    var select = document.getElementById('responseSelect');
    responses.forEach(response => {
        var option = document.createElement('option');
        option.value = response;
        option.textContent = response;
        select.appendChild(option);
    });
}

function sendResponse() {
    var response = document.getElementById('responseSelect').value;
    if (response) {
        displayMessage('clinicMessages', response);
    } else {
        alert('Please select a response.');
    }
}
