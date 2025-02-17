function sendMessage() {
    var message = document.getElementById('messageInput').value;
    if (message.trim() === '') {
        alert('Please enter a message.');
        return;
    }

    // Display the message in both Clinic Staff and Team Leader panels
    displayMessage('clinicMessages', message);
    displayMessage('leaderMessages', message);

    // Clear input after sending
    document.getElementById('messageInput').value = '';
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
