<!DOCTYPE html>
        <html>
        <head>
        <title>Oops!</title>
document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('loginButton').addEventListener('click', login);
});

const users = {
    "Hardi": { password: "hardiPass123", role: "callCenter", floor: "3rd Floor", doctor: "Dr. Smith" },
    "Alice": { password: "alicePass123", role: "clinicStaff", floor: "2nd Floor", doctor: "Dr. Jones" },
    "Bob": { password: "bobPass123", role: "teamLeader", floor: "1st Floor", doctor: "Dr. Brown" }
};

function login() {
    var username = document.getElementById('username').value;
    var password = document.getElementById('password').value;
    var user = users[username];

    if (user && user.password === password) {
        document.getElementById('loginPanel').style.display = 'none';
        document.getElementById('dashboard').style.display = 'block';
        document.getElementById('userInfo').textContent = `Logged in as ${username}, assigned to ${user.doctor} on ${user.floor}.`;
        displayAppropriatePanel(user.role);
    } else {
        alert('Invalid credentials. Please try again.');
    }
}

function displayAppropriatePanel(role) {
    document.getElementById('callCenter').style.display = role === 'callCenter' ? 'block' : 'none';
    document.getElementById('clinicStaff').style.display = role === 'clinicStaff' ? 'block' : 'none';
    document.getElementById('teamLeader').style.display = role === 'teamLeader' ? 'block' : 'none';
}

function sendMessage() {
    var message = document.getElementById('callerName').value;
    var reason = document.getElementById('inquiryReason').value;
    var doctor = document.getElementById('doctorSelect').value;

    console.log(`Message sent: ${message}, Reason: ${reason}, Doctor: ${doctor}`);
    // Implement message sending logic here
}
