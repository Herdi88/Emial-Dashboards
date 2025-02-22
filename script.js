// Import the functions you need from the Firebase SDK
import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { getFirestore, collection, addDoc, getDocs } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD2LhI9Jkqx2uVs_T8XVug2MuVV8OseN9w",
  authDomain: "clinic-dashboard-v2.firebaseapp.com",
  projectId: "clinic-dashboard-v2",
  storageBucket: "clinic-dashboard-v2.firebasestorage.app",
  messagingSenderId: "690684576272",
  appId: "1:690684576272:web:08e4b807fd6be50cb8c095",
  measurementId: "G-C4CV32VTNE"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app); // Initialize auth
const db = getFirestore(app); // Initialize Firestore

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
async function login() {
    const email = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value;

    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        await fetchUserRole(user.uid); // Fetch user role from Firestore
    } catch (error) {
        alert('Login failed: ' + error.message);
    }
}

// Fetch User Role from Firestore
async function fetchUserRole(uid) {
    try {
        const userDoc = await getDoc(doc(db, 'users', uid));
        if (userDoc.exists()) {
            currentUserRole = userDoc.data().role;
            currentUserName = userDoc.data().name;
            showDashboard();
        } else {
            alert('User role not found.');
        }
    } catch (error) {
        alert('Error fetching user role: ' + error.message);
    }
}

// Logout Function
async function logout() {
    try {
        await signOut(auth);
        currentUserRole = null;
        currentUserName = null;
        document.getElementById(LOGIN_PANEL_ID).style.display = 'block';
        document.getElementById(DASHBOARD_ID).style.display = 'none';
    } catch (error) {
        alert('Logout failed: ' + error.message);
    }
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
async function sendCallCenterMessage() {
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

    try {
        await addDoc(collection(db, 'messages'), message);
        alert('Message sent successfully!');
        displayMessages();
        addNotification(`New message for ${message.selectedDoctor} from ${message.callerName}`);
    } catch (error) {
        alert('Error sending message: ' + error.message);
    }
}

// Display Messages
async function displayMessages() {
    const callCenterMessages = document.getElementById(CALL_CENTER_MESSAGES_ID);
    const clinicStaffMessages = document.getElementById(CLINIC_STAFF_MESSAGES_ID);
    const teamLeaderMessages = document.getElementById(TEAM_LEADER_MESSAGES_ID);
    callCenterMessages.innerHTML = '';
    clinicStaffMessages.innerHTML = '';
    teamLeaderMessages.innerHTML = '';

    try {
        const querySnapshot = await getDocs(collection(db, 'messages'));
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
    } catch (error) {
        alert('Error fetching messages: ' + error.message);
    }
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
