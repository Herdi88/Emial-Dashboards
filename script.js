document.addEventListener('DOMContentLoaded', function() {
    var sendMessageButton = document.getElementById('sendMessageButton');
    if (sendMessageButton) {
        sendMessageButton.addEventListener('click', sendMessage);
    }
});

function sendMessage() {
    var message = document.getElementById('messageInput').value.trim();
    var inquiryReason = document.getElementById('inquiryReason').value;
    var doctor = document.getElementById('doctorSelect').value;

    if (!message) {
        alert('Please enter a message.');
        return;
    }

    var fullMessage = `Message: ${message}\nReason: ${inquiryReason}\nDoctor: ${doctor}`;
    displayMessage('clinicMessages', fullMessage);
    displayMessage('leaderMessages', fullMessage);

    document.getElementById('messageInput').value = '';
    document.getElementById('inquiryReason').selectedIndex = 0;
    document.getElementById('doctorSelect').selectedIndex = 0;
}

function displayMessage(panelId, message) {
    var panel = document.getElementById(panelId);
    var messageDiv = document.createElement('div');
    messageDiv.textContent = message;
    panel.appendChild(messageDiv);
}

function login() {
    var username = document.getElementById('username').value;
    var password = document.getElementById('password').value;
    
    if (username === "admin" && password === "admin") {
        document.getElementById('loginPanel').style.display = 'none';
        document.getElementById('dashboard').style.display = 'block';
        alert('Login successful!');
    } else {
        alert('Invalid credentials. Please try again.');
    }
}
function forgotPassword() {
    alert('If this were a real app, you would get an email to reset your password!');
}

