// Firebase Configuration (Replace with your Firebase config)
const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_AUTH_DOMAIN",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_STORAGE_BUCKET",
    messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
    appId: "YOUR_APP_ID"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();

// Constants
const LOGIN_PANEL_ID = 'loginPanel';
const DASHBOARD_ID = 'dashboard';
const CALL_CENTER_MESSAGES_ID = 'callCenterMessages';
const CLINIC_STAFF_MESSAGES_ID = 'clinicStaffMessages';
const TEAM_LEADER_MESSAGES_ID = 'teamLeaderMessages';
const PERFORMANCE_METRICS_ID = 'performanceMetrics';
const NOTIFICATION_AREA_ID = 'notificationsContainer';

let currentUserRole = null;
let currentUserName = null;

// Login Function
function login() {
    const email = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value;

    auth.signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            fetchUserRole(user.uid); // Fetch user role from Firestore
        })
        .catch((error) => {
            alert('Login failed: ' + error.message);
        });
}

// Fetch User Role from Firestore
function fetchUserRole(uid) {
    db.collection('users').doc(uid).get()
        .then((doc) => {
            if (doc.exists) {
                currentUserRole = doc.data().role;
                currentUserName = doc.data().name;
                showDashboard();
            } else {
                alert('User role not found.');
            }
        })
        .catch((error) => {
            alert('Error fetching user role: ' + error.message);
        });
}

// Logout Function
function logout() {
    auth.signOut().then(() => {
        currentUserRole = null;
        currentUserName = null;
        document.getElementById(LOGIN_PANEL_ID).style.display = 'block';
        document.getElementById(DASHBOARD_ID).style.display = 'none';
    }).catch((error) => {
        alert('Logout failed: ' + error.message);
    });
}

// Show Dashboard
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

// Show Panel Based on Role
function showPanelBasedOnRole() {
    if (currentUserRole === 'callCenter') {
        showPanel('callCenterPanel');
    } else if (currentUserRole === 'clinicStaff') {
        showPanel('clinicStaffPanel');
    } else if (currentUserRole === 'teamLeader' || currentUserRole === 'admin') {
        showPanel('teamLeaderPanel');
    }
}

// Show Panel
function showPanel(panelId) {
    document.querySelectorAll('.panel').forEach(panel => panel.classList.remove('active'));
    document.getElementById(panelId).classList.add('active');
}

// Send Message from Call Center
function sendCallCenterMessage() {
    const message = {
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

    db.collection('messages').add(message)
        .then(() => {
            alert('Message sent successfully!');
            displayMessages();
            addNotification(`New message for ${message.selectedDoctor} from ${message.callerName}`);
        })
        .catch((error) => {
            alert('Error sending message: ' + error.message);
        });
}

// Display Messages
function displayMessages() {
    const callCenterMessages = document.getElementById(CALL_CENTER_MESSAGES_ID);
    const clinicStaffMessages = document.getElementById(CLINIC_STAFF_MESSAGES_ID);
    const teamLeaderMessages = document.getElementById(TEAM_LEADER_MESSAGES_ID);
    callCenterMessages.innerHTML = '';
    clinicStaffMessages.innerHTML = '';
    teamLeaderMessages.innerHTML = '';

    db.collection('messages').get()
        .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                const message = doc.data();
                const messageDiv = document.createElement('div');
                messageDiv.classList.add('message');
                messageDiv.innerHTML = `
                    <p><strong>Caller:</strong> ${message.callerName}</p>
                    <p><strong>Contact Info:</strong> ${message.contactInfo}</p>
                    <p><strong>MRN:</strong> ${message.mrn}</p>
                    <p><strong>Reason:</strong> ${message.inquiryReason}</p>
                    <p><strong>Doctor:</strong> ${message.selectedDoctor}</p>
                    <p><strong>Sender:</strong> ${message.sender}</p>
                    <p><strong>Timestamp:</strong> ${message.timestamp.toDate().toLocaleString()}</p>
                `;

                if ((currentUserRole === 'clinicStaff' && users[currentUserName].doctor === message.selectedDoctor) || currentUserRole === 'admin' || currentUserRole === 'teamLeader') {
                    clinicStaffMessages.appendChild(messageDiv);
                }

                if (currentUserRole === 'callCenter' || currentUserRole === 'admin' || currentUserRole === 'teamLeader') {
                    teamLeaderMessages.appendChild(messageDiv);
                }
            });
        })
        .catch((error) => {
            alert('Error fetching messages: ' + error.message);
        });
}

// Add Notification
function addNotification(message) {
    const notificationArea = document.getElementById(NOTIFICATION_AREA_ID);
    const div = document.createElement('div');
    div.textContent = message;
    notificationArea.appendChild(div);
}

// Clear Notifications
function clearNotifications() {
    document.getElementById(NOTIFICATION_AREA_ID).innerHTML = '';
}

// Update Performance Metrics (Placeholder)
function updatePerformanceMetrics() {
    document.getElementById(PERFORMANCE_METRICS_ID).innerText = 'Performance tracker coming soon...';
}
