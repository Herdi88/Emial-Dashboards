// This code ensures that your script only runs after the entire HTML document has loaded
document.addEventListener('DOMContentLoaded', function() {
    // This line adds an event listener to the 'Send Message' button, triggering the sendMessage function when clicked
    var sendButton = document.getElementById('sendMessageButton');
    if (sendButton) {
        sendButton.addEventListener('click', sendMessage);
    } else {
        console.error('Send Message button not found.');
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

    // Reset fields after sending
    document.getElementById('messageInput').value = '';
    document.getElementById('inquiryReason').selectedIndex = 0;
    document.getElementById('doctorSelect').selectedIndex = 0;
}

// Define the displayMessage function if not already defined
function displayMessage(panelId, message) {
    var panel = document.getElementById(panelId);
    var messageDiv = document.createElement('div');
    messageDiv.textContent = message;
    panel.appendChild(messageDiv);
}

