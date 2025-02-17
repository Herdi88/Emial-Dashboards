function sendMessage() {
    var message = document.getElementById('messageInput').value;
    if (message.trim() !== '') {
        displayMessage('clinicStaff', message);
        displayMessage('teamLeader', message);
        document.getElementById('messageInput').value = ''; // Clear input after sending
    } else {
        alert('Please enter a message.');
    }
}

function displayMessage(panelId, message) {
    var panel = document.getElementById(panelId);
    var messageDiv = document.createElement('div');
    messageDiv.textContent = message;
    panel.appendChild(messageDiv);
}
