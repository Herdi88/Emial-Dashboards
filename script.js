// Constants
const LOGIN_PANEL_ID = 'loginPanel';
const DASHBOARD_ID = 'dashboard';
const CALL_CENTER_MESSAGES_ID = 'callCenterMessages';
const CLINIC_STAFF_MESSAGES_ID = 'clinicStaffMessages';
const TEAM_LEADER_MESSAGES_ID = 'teamLeaderMessages';
const PERFORMANCE_METRICS_ID = 'performanceMetrics';
const NOTIFICATION_AREA_ID = 'notificationsContainer';

const users = {
    "hardi": { password: "hardiPass123", role: "teamLeader" },
    "alice": { password: "alicePass123", role: "clinicStaff", doctor: "Dr. Jones" },
    "bob": { password: "bobPass123", role: "clinicStaff", doctor: "Dr. Brown" },
    "charlie": { password: "charliePass123", role: "callCenter" },
    "admin": { password: "adminPass123", role: "admin" }
};

let messages = [];
let currentUserRole = null;
let currentUserName = null;

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

    document.getElementById('callCenterNav').style.display = (currentUserRole === 'callCenter' || currentUserRole === 'admin' || currentUserRole === 'teamLeader') ? 'inline-block' : 'none';
    document.getElementById('clinicStaffNav').style.display = (currentUserRole === 'clinicStaff' || currentUserRole === 'admin' || currentUserRole === 'teamLeader') ? 'inline-block' : 'none';
    document.getElementById('teamLeaderNav').style.display = (currentUserRole === 'teamLeader' || currentUserRole === 'admin') ? 'inline-block' : 'none';
    document.getElementById('performanceNav').style.display = (currentUserRole === 'teamLeader' || currentUserRole === 'admin') ? 'inline-block' : 'none';

    showPanelBasedOnRole();
    displayMessages();
    updatePerformanceMetrics();
}

function showPanelBasedOnRole() {
    if (currentUserRole === 'callCenter') {
        showPanel('callCenterPanel');
    } else if (currentUserRole === 'clinicStaff') {
        showPanel('clinicStaffPanel');
    } else if (currentUserRole === 'teamLeader' || currentUserRole === 'admin') {
        showPanel('teamLeaderPanel');
    }
}

function showPanel(panelId) {
    document.querySelectorAll('.panel').forEach(panel => panel.classList.remove('active'));
    document.getElementById(panelId).classList.add('active');
}

function sendCallCenterMessage() {
    const message = {
        id: Date.now(),
        callerName: document.getElementById('callerName').value,
        contactInfo: document.getElementById('contactInfo').value,
        mrn: document.getElementById('mrn').value,
        inquiryReason: document.getElementById('inquiryReason').value,
        selectedDoctor: document.getElementById('doctorSelect').value,
        sender: currentUserName,
        timestamp: new Date(),
        replies: [],
        repliedAt: null,
        repliedBy: null
    };

    messages.push(message);
    displayMessages();
    addNotification(`New message for ${message.selectedDoctor} from ${message.callerName}`);
}

function replyToMessage(messageId, reply) {
    const message = messages.find(msg => msg.id === messageId);
    if (message) {
        message.replies.push(reply);
        message.repliedAt = new Date();
        message.repliedBy = currentUserName;
        displayMessages();
        addNotification(`Reply to ${message.callerName}: ${reply}`);
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
        const messageDiv = document.createElement('div');
        messageDiv.innerHTML = `<p><strong>Caller:</strong> ${message.callerName}</p>
                                <p><strong>Doctor:</strong> ${message.selectedDoctor}</p>
                                <p><strong>Sender (Call Center):</strong> ${message.sender}</p>`;

        if ((currentUserRole === 'clinicStaff' && users[currentUserName].doctor === message.selectedDoctor) || currentUserRole === 'admin' || currentUserRole === 'teamLeader') {
            clinicStaffMessages.appendChild(messageDiv);
        }

        if (currentUserRole === 'callCenter' || currentUserRole === 'admin' || currentUserRole === 'teamLeader') {
            teamLeaderMessages.appendChild(messageDiv);
        }
    });
}

function updatePerformanceMetrics() {
    // Placeholder for detailed performance tracking
    document.getElementById(PERFORMANCE_METRICS_ID).innerText = 'Performance tracker coming soon...';
}

function addNotification(message) {
    const notificationArea = document.getElementById(NOTIFICATION_AREA_ID);
    const div = document.createElement('div');
    div.textContent = message;
    notificationArea.appendChild(div);
}

