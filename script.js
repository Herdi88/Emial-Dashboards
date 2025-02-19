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
    "hardi": { password: "hardiPass123", role: "teamLeader" },
    "alice": { password: "alicePass123", role: "clinicStaff", assignedClinic: "alice" },
    "bob": { password: "bobPass123", role: "clinicStaff", assignedClinic: "bob" },
    "charlie": { password: "charliePass123", role: "callCenter" },
    "admin": { password: "adminPass123", role: "admin" }
};

const doctorToClinicStaff = {
    "Dr. Smith": "alice",
    "Dr. Jones": "bob",
    "Dr. Brown": "bob"
};

let messages = [];
let currentUserRole = null;
let currentUserName = null;

// Functions

function login() {
    const username = document.getElementById('username').value.trim().toLowerCase();
    const password = document.getElementById('password').value;
    const user = users[username];

    if (user && user.password === password) {
        currentUserRole = user.role;
        currentUserName = username;

        localStorage.setItem('userRole', currentUserRole);
        localStorage.setItem('userName', currentUserName);

        showDashboard();
    } else {
        alert('Invalid credentials. Please try again.');
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

    const assignedClinicStaff = doctorToClinicStaff[selectedDoctor];

    const newMessage = {
        id: Date.now(),
        callerName,
        contactInfo,
        mrn,
        inquiryReason,
        selectedDoctor,
        clinicStaff: assignedClinicStaff,
        timestamp: new Date(),
        replies: [],
        repliedAt: null,
        sender: currentUserName,
        isUrgent: false,
        isDelayed: false
    };

    messages.push(newMessage);
    displayMessages();
}

function displayMessages() {
    const callCenterMessages = document.getElementById(CALL_CENTER_MESSAGES_ID);
    const clinicStaffMessages = document.getElementById(CLINIC_STAFF_MESSAGES_ID);
    const teamLeaderMessages = document.getElementById(TEAM_LEADER_MESSAGES_ID);

    callCenterMessages.innerHTML = '';
    clinicStaffMessages.innerHTML = '';
    teamLeaderMessages.innerHTML = '';

    const now = new Date();

    messages.forEach(message => {
        const messageElement = createMessageElement(message);

        // Auto flag as urgent if more than 1 hour without reply
        if (!message.repliedAt && now - new Date(message.timestamp) > 3600000) {
            message.isUrgent = true;
        }

        if (currentUserRole === 'callCenter' || currentUserRole === 'admin') {
            callCenterMessages.appendChild(messageElement);
        }

        if (currentUserRole === 'clinicStaff' && message.clinicStaff === currentUserName) {
            clinicStaffMessages.appendChild(messageElement);
        }

        if (currentUserRole === 'teamLeader' || currentUserRole === 'admin') {
            teamLeaderMessages.appendChild(messageElement);
        }
    });

    updatePerformanceMetrics();
}

function createMessageElement(message) {
    const messageDiv = document.createElement('div');
    messageDiv.classList.add('message');

    if (message.isUrgent) messageDiv.classList.add('urgent');
    if (message.isDelayed) messageDiv.classList.add('delayed');

    messageDiv.innerHTML = `
        <p><strong>Caller:</strong> ${message.callerName}</p>
        <p><strong>Doctor:</strong> ${message.selectedDoctor}</p>
        <p><strong>Sent by (Call Center):</strong> ${message.sender}</p>
        <p><strong>Assigned Clinic Staff:</strong> ${message.clinicStaff}</p>
        <p><strong>Time Sent:</strong> ${new Date(message.timestamp).toLocaleString()}</p>
    `;

    if (message.repliedAt) {
        messageDiv.innerHTML += `<p><strong>Replied At:</strong> ${new Date(message.repliedAt).toLocaleString()}</p>`;
    }

    if (currentUserRole === 'clinicStaff' && message.clinicStaff === currentUserName && message.replies.length === 0) {
        ['Call completed', 'Unreachable', 'Appointment booked'].forEach(replyText => {
            const button = document.createElement('button');
            button.textContent = replyText;
            button.onclick = () => replyToMessage(message.id, replyText);
            messageDiv.appendChild(button);
        });
    }

    return messageDiv;
}

function replyToMessage(id, reply) {
    const message = messages.find(msg => msg.id === id);
    if (message) {
        message.replies.push(reply);
        message.repliedAt = new Date();
        displayMessages();
    }
}

function updatePerformanceMetrics() {
    const metricsDiv = document.getElementById(PERFORMANCE_METRICS_ID);
    const times = messages.filter(m => m.repliedAt).map(m => (new Date(m.repliedAt) - new Date(m.timestamp)) / 60000);
    const avgTime = times.length ? (times.reduce((a, b) => a + b) / times.length).toFixed(2) : 'N/A';
    metricsDiv.innerHTML = `<p>Average Reply Time: ${avgTime} min</p>`;
}

window.onload = function () {
    currentUserRole = localStorage.getItem('userRole');
    currentUserName = localStorage.getItem('userName');
    if (currentUserRole) showDashboard();
};
