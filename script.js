function sendMessage() {
    var message = document.getElementById('messageInput').value;
    var inquiryReason = document.getElementById('inquiryReason').value;
    var doctor = document.getElementById('doctorSelect').value;
    if (message.trim() === '') {
        alert('Please enter a message.');
        return;
    }

    // Construct a detailed message
    var fullMessage = `Message: ${message}\nReason: ${inquiryReason}\nDoctor: ${doctor}`;

    // Display the message in both Clinic Staff and Team Leader panels
    displayMessage('clinicMessages', fullMessage);
    displayMessage('leaderMessages', fullMessage);

    // Clear input after sending
    document.getElementById('messageInput').value = '';
    document.getElementById('inquiryReason').selectedIndex = 0;
    document.getElementById('doctorSelect').selectedIndex = 0;
}

function displayMessage(panelId, message) {
    var panel = document.getElementById(panelId);
    if (!panel) {
        console.error('Panel not found: ', panelId);
        return;
    }
    var messageDiv = document.createElement('div');
    messageDiv.textContent = message;
    panel.appendChild(messageDiv);
}
