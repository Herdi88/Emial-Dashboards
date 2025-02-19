// Constants
const LOGIN_PANEL_ID = 'loginPanel';
const DASHBOARD_ID = 'dashboard';
const CALL_CENTER_MESSAGES_ID = 'callCenterMessages';
const CLINIC_STAFF_MESSAGES_ID = 'clinicStaffMessages';
const TEAM_LEADER_MESSAGES_ID = 'teamLeaderMessages';
const PERFORMANCE_METRICS_ID = 'performanceMetrics';
const NOTIFICATION_AREA_ID = 'notificationsContainer';

// User Data (expanded for roles)
const users = {
    "hardi": { password: "hardiPass123", role: "teamLeader", doctor: "Dr. Smith" },
    "alice": { password: "alicePass123", role: "clinicStaff", doctor: "Dr. Jones" },
    "bob": { password: "bobPass123", role: "clinicStaff", doctor: "Dr. Brown" },
    "charlie": { password: "charliePass123", role: "callCenter" },
    "admin": { password: "adminPass123", role: "admin" }
};

let messages = [];
let currentUserRole = null;
let currentUserName = null;
// Functions

function login() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const user = users[username];

    if (user && user.password === password) {
        currentUserRole = user.role;
        currentUserName = username;
        localStorage.setItem('userRole', currentUserRole);
        localStorage.setItem('userName', currentUserName);
        showDashboard();
    } else {
        alert('Invalid credentials');
    }
}
function logout() {
    localStorage.clear();
    currentUserRole = null;
    currentUserName = null;
    document.getElementById(LOGIN_PANEL_ID).style.display = 'block';
    document.getElementById(DASHBOARD_ID).style.display = 'none';
}

function showDashboard() {
    document.getElementById(LOGIN_PANEL_ID).style.display = 'none';
    document.getElementById(DASHBOARD_ID).style.display = 'block';
    displayMessages();
}
   function showPanel(panelId) {
    document.querySelectorAll('.panel').forEach(panel => panel.classList.remove('active'));
    document.getElementById(panelId).classList.add('active');
}

function sendCallCenterMessage() {
    const callerName = document.getElementById('callerName').value;
    const contactInfo = document.getElementById('contactInfo').value;
    const mrn = document.getElementById('mrn').value;
    const inquiryReason = document.getElementById('inquiryReason').value;
    const selectedDoctor = document.getElementById('doctorSelect').value;

    if (!callerName || !contactInfo || !mrn || !inquiryReason || !selectedDoctor) {
        alert("Please fill in all fields.");
        return;
    }

    const newMessage = {
        callerName,
        contactInfo,
        mrn,
        inquiryReason,
        selectedDoctor,
        timestamp: new Date(),
        isUrgent: false,
        isDelayed: false,
        replies: [],
        repliedAt: null, // NEW FIELD TO TRACK REPLY TIME
        sender: currentUserName,
        id: Date.now()
    };

    messages.push(newMessage);
    displayMessages();
    addNotification(`New Message from ${callerName} for ${selectedDoctor}`);
}

}

    function displayMessages() {
    const callCenterMessages = document.getElementById(CALL_CENTER_MESSAGES_ID);
    const clinicStaffMessages = document.getElementById(CLINIC_STAFF_MESSAGES_ID);
    const teamLeaderMessages = document.getElementById(TEAM_LEADER_MESSAGES_ID);

    callCenterMessages.innerHTML = '';
    clinicStaffMessages.innerHTML = '';
    teamLeaderMessages.innerHTML = '';

    messages.forEach(message => {
        const messageElement = createMessageElement(message);

        if (currentUserRole === 'callCenter' || currentUserRole === 'admin') {
            callCenterMessages.appendChild(messageElement);
        }

        if (currentUserRole === 'clinicStaff' || currentUserRole === 'admin') {
            if (message.selectedDoctor === users[currentUserName].doctor) {
                clinicStaffMessages.appendChild(messageElement);
            }
        }

        if (currentUserRole === 'teamLeader' || currentUserRole === 'admin') {
            teamLeaderMessages.appendChild(messageElement);
        }
    });

    // Always Update Performance Metrics after messages are displayed
    updatePerformanceMetrics();
}
function updatePerformanceMetrics() {
    const performanceMetricsDiv = document.getElementById(PERFORMANCE_METRICS_ID);

    const staffResponseTimes = {};

    messages.forEach(msg => {
        if (msg.repliedAt) {
            const responseTime = (new Date(msg.repliedAt) - new Date(msg.timestamp)) / (60 * 1000);
            if (!staffResponseTimes[msg.selectedDoctor]) {
                staffResponseTimes[msg.selectedDoctor] = [];
            }
            staffResponseTimes[msg.selectedDoctor].push(responseTime);
        }
    });

    let performanceSummary = '';
    Object.keys(staffResponseTimes).forEach(doctor => {
        const times = staffResponseTimes[doctor];
        const averageTime = (times.reduce((a, b) => a + b, 0) / times.length).toFixed(2);
        performanceSummary += `<p><strong>${doctor} - Avg Response Time:</strong> ${averageTime} min (${times.length} replies)</p>`;
    });

    if (performanceSummary === '') {
        performanceSummary = '<p>No replies yet to calculate performance.</p>';
    }

    performanceMetricsDiv.innerHTML = performanceSummary;
}

function clearNotifications() {
    document.getElementById(NOTIFICATION_AREA_ID).innerHTML = '';
}

window.onload = function () {
    const savedRole = localStorage.getItem('userRole');
    const savedUserName = localStorage.getItem('userName');
    if (savedRole && savedUserName) {
        currentUserRole = savedRole;
        currentUserName = savedUserName;
        showDashboard();
    }
};

function sendCallCenterMessage() {
    const callerName = document.getElementById('callerName').value;
    const contactInfo = document.getElementById('contactInfo').value;
    const mrn = document.getElementById('mrn').value;
    const inquiryReason = document.getElementById('inquiryReason').value;
    const selectedDoctor = document.getElementById('doctorSelect').value;

    if (!callerName || !contactInfo || !mrn || !inquiryReason || !selectedDoctor) {
        alert("Please fill in all fields.");
        return;
    }
    const newMessage = {
        callerName,
        contactInfo,
        mrn,
        inquiryReason,
        selectedDoctor,
        timestamp: new Date(),
        isUrgent: false,
        isDelayed: false,
        replies: [],
        sender: currentUserName,
        id: Date.now() // Unique ID for the message
    };

    messages.push(newMessage);
    displayMessages();
    addNotification(`New Message from ${callerName} for ${selectedDoctor}`);

}
function displayMessages() {
    // Clear existing messages
    const callCenterMessages = document.getElementById(CALL_CENTER_MESSAGES_ID);
    const clinicStaffMessages = document.getElementById(CLINIC_STAFF_MESSAGES_ID);
    const teamLeaderMessages = document.getElementById(TEAM_LEADER_MESSAGES_ID);
    callCenterMessages.innerHTML = '';
    clinicStaffMessages.innerHTML = '';
    teamLeaderMessages.innerHTML = '';

    // Display messages based on role
    messages.forEach(message => {
        const messageElement = createMessageElement(message);

        if (currentUserRole === 'callCenter' || currentUserRole === 'admin') {
            callCenterMessages.appendChild(messageElement);
        }

        if (currentUserRole === 'clinicStaff' || currentUserRole === 'admin') {
            if (message.selectedDoctor === users[currentUserName].doctor) {
                clinicStaffMessages.appendChild(messageElement);
            }
        }

        if (currentUserRole === 'teamLeader' || currentUserRole === 'admin') {
            teamLeaderMessages.appendChild(messageElement);
        }
    });
}

function createMessageElement(message) {
    const messageDiv = document.createElement('div');
    messageDiv.classList.add('message');
    messageDiv.id = `message-${message.id}`;

    const now = new Date();
    const oneHour = 60 * 60 * 1000; // 1 hour in milliseconds

    // Automatic Urgent flag if no reply after 1 hour
    if (!message.repliedAt && (now - new Date(message.timestamp)) > oneHour) {
        message.isUrgent = true;
    }

    // Apply styles based on message state
    if (message.isUrgent) {
        messageDiv.classList.add('urgent');
    }
    if (message.isDelayed) {
        messageDiv.classList.add('delayed');
    }

    // Basic message details
    messageDiv.innerHTML = `
        <p><strong>Caller:</strong> ${message.callerName}</p>
        <p><strong>Contact:</strong> ${message.contactInfo}</p>
        <p><strong>MRN:</strong> ${message.mrn}</p>
        <p><strong>Inquiry:</strong> ${message.inquiryReason}</p>
        <p><strong>Doctor:</strong> ${message.selectedDoctor}</p>
        <p><strong>Sent by:</strong> ${message.sender}</p>
        <p><strong>Sent at:</strong> ${new Date(message.timestamp).toLocaleTimeString()}</p>
    `;

    // Show reply status
    if (message.repliedAt) {
        messageDiv.innerHTML += `<p><strong>Replied At:</strong> ${new Date(message.repliedAt).toLocaleTimeString()}</p>`;
    } else {
        messageDiv.innerHTML += `<p style="color: red;"><strong>Pending Reply</strong></p>`;
    }

    // Display replies (if any)
    if (message.replies.length > 0) {
        const repliesDiv = document.createElement('div');
        repliesDiv.classList.add('replies');
        message.replies.forEach(reply => {
            const replyP = document.createElement('p');
            replyP.textContent = `Reply: ${reply}`;
            repliesDiv.appendChild(replyP);
        });
        messageDiv.appendChild(repliesDiv);
    }

    // Clinic Staff Reply buttons
    if (currentUserRole === 'clinicStaff' && message.replies.length === 0 && message.selectedDoctor === users[currentUserName].doctor) {
        const replyButton = document.createElement('button');
        replyButton.textContent = 'Call completed';
        replyButton.onclick = () => replyToMessage(message.id, 'Call completed');
        messageDiv.appendChild(replyButton);

        const replyButton2 = document.createElement('button');
        replyButton2.textContent = 'Unreachable';
        replyButton2.onclick = () => replyToMessage(message.id, 'Unreachable');
        messageDiv.appendChild(replyButton2);

        const replyButton3 = document.createElement('button');
        replyButton3.textContent = 'Appointment booked';
        replyButton3.onclick = () => replyToMessage(message.id, 'Appointment booked');
        messageDiv.appendChild(replyButton3);
    }

    // Team Leader/ Admin - Urgent and Delayed Flags
    if (currentUserRole === 'teamLeader' || currentUserRole === 'admin') {
        if (!message.isUrgent) {
            const urgentButton = document.createElement('button');
            urgentButton.textContent = 'Flag Urgent';
            urgentButton.onclick = () => flagMessage(message.id);
            messageDiv.appendChild(urgentButton);
        }
        if (!message.isDelayed) {
            const delayButton = document.createElement('button');
            delayButton.textContent = 'Mark Delayed';
            delayButton.onclick = () => markDelay(message.id);
            messageDiv.appendChild(delayButton);
        }
    }

    return messageDiv;
}

}

function replyToMessage(messageId, reply) {
    const message = messages.find(msg => msg.id === messageId);
    if (message) {
        message.replies.push(reply);
        message.repliedAt = new Date();
        displayMessages();
        addNotification(`Message for ${message.selectedDoctor} has been replied with: ${reply}`);
    }
}

function flagMessage(messageId) {
    const message = messages.find(msg => msg.id === messageId);
    if (message) {
        message.isUrgent = true;
        const messageElement = document.getElementById(`message-${messageId}`);
        messageElement.classList.add("urgent")
        displayMessages();
        addNotification(`Message for ${message.selectedDoctor} marked as urgent!`);
    }
}

function markDelay(messageId) {
    const message = messages.find(msg => msg.id === messageId);
    if (message) {
        message.isDelayed = true;
        const messageElement = document.getElementById(`message-${messageId}`);
        messageElement.classList.add("delayed")
        displayMessages();
        addNotification(`Message for ${message.selectedDoctor} marked as delayed!`);
    }
}
function filterMessages() {
    const selectedDoctor = document.getElementById('filterDoctor').value;
    const filteredMessages = selectedDoctor === 'all' ? messages : messages.filter(msg => msg.selectedDoctor === selectedDoctor);
    // Clear and display messages
    document.getElementById(TEAM_LEADER_MESSAGES_ID).innerHTML = '';
    filteredMessages.forEach(message => {
        const messageElement = createMessageElement(message);
        document.getElementById(TEAM_LEADER_MESSAGES_ID).appendChild(messageElement);
    });
}
function addNotification(message) {
    const notificationArea = document.getElementById(NOTIFICATION_AREA_ID);
    const notificationDiv = document.createElement('div');
    notificationDiv.classList.add('notification-item');
    const timestamp = new Date().toLocaleTimeString();

    notificationDiv.innerHTML = `<strong>${timestamp}</strong> - ${message}`;
    notificationArea.appendChild(notificationDiv);
}

// Check LocalStorage for saved login role
window.onload = function () {
    const savedRole = localStorage.getItem('userRole');
    const savedUserName = localStorage.getItem('userName');
    if (savedRole && savedUserName) {
        currentUserRole = savedRole;
        currentUserName = savedUserName;
        showDashboard();
    }
};
