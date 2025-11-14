// Data structure to hold house information and scores
const houses = {
    greenMonkeys: { name: "Green Monkeys", score: 0, title: "Acrobats" },
    yellowLions: { name: "Yellow Lions", score: 0, title: "Bravehearts" },
    blueOwls: { name: "Blue Owls", score: 0, title: "Druids" },
    redFoxes: { name: "Red Foxes", score: 0, title: "Quicksilver" }
};

const ADMIN_PASSWORD = "admin";

/**
 * Updates the score display on the main page for all houses.
 */
function updateScoresDisplay() {
    for (const id in houses) {
        const scoreElement = document.getElementById(`score-${id}`);
        if (scoreElement) {
            scoreElement.textContent = houses[id].score;
        }
    }
}

/**
 * Initializes the scores from local storage or uses the default.
 */
function initializeScores() {
    const storedScores = localStorage.getItem('houseScores');
    if (storedScores) {
        const parsedScores = JSON.parse(storedScores);
        for (const id in parsedScores) {
            if (houses[id]) {
                houses[id].score = parsedScores[id];
            }
        }
    }
    updateScoresDisplay();
    // Set up the event listeners for the admin button after the page loads
    document.getElementById('adminButton').addEventListener('click', openAdminLogin);
    generateAdminControls(); // Generate admin control UI
}

/**
 * Saves the current scores to local storage.
 */
function saveScores() {
    const scoresToStore = {};
    for (const id in houses) {
        scoresToStore[id] = houses[id].score;
    }
    localStorage.setItem('houseScores', JSON.stringify(scoresToStore));
    updateScoresDisplay();
}

// --- Admin Panel Functions ---

/**
 * Opens the Admin Login modal.
 */
function openAdminLogin() {
    document.getElementById('adminLogin').style.display = 'flex';
    document.getElementById('adminPassword').value = ''; // Clear previous input
    document.getElementById('loginMessage').textContent = ''; // Clear message
}

/**
 * Closes the Admin Login modal.
 */
function closeAdminLogin() {
    document.getElementById('adminLogin').style.display = 'none';
}

/**
 * Handles the login attempt.
 */
function loginAdmin() {
    const passwordInput = document.getElementById('adminPassword').value;
    const loginMessage = document.getElementById('loginMessage');

    if (passwordInput === ADMIN_PASSWORD) {
        closeAdminLogin();
        openAdminPanel();
    } else {
        loginMessage.textContent = "Incorrect Password. Please try again.";
    }
}

/**
 * Generates the point editing controls inside the Admin Panel.
 */
function generateAdminControls() {
    const adminControlsDiv = document.getElementById('adminControls');
    adminControlsDiv.innerHTML = ''; // Clear existing controls

    for (const id in houses) {
        const houseData = houses[id];
        const controlGroup = document.createElement('div');
        controlGroup.className = 'admin-control-group';

        controlGroup.innerHTML = `
            <label>${houseData.name} (${houseData.title})</label>
            <input type="number" id="pointsInput-${id}" placeholder="Points" value="1" min="1">
            <button class="add-btn" onclick="adjustPoints('${id}', true)">Add</button>
            <button class="subtract-btn" onclick="adjustPoints('${id}', false)">Subtract</button>
            <span class="admin-current-score" id="adminScore-${id}">${houseData.score}</span>
        `;
        adminControlsDiv.appendChild(controlGroup);
    }
}

/**
 * Opens the Admin Panel.
 */
function openAdminPanel() {
    // Show the Admin Panel and update its display scores
    document.getElementById('mainView').style.display = 'none';
    document.getElementById('adminPanel').style.display = 'block';
    document.getElementById('adminButton').style.display = 'none'; // Hide Admin button while in panel

    // Update the scores shown in the admin panel
    for (const id in houses) {
        const adminScoreElement = document.getElementById(`adminScore-${id}`);
        if (adminScoreElement) {
            adminScoreElement.textContent = houses[id].score;
        }
    }
}

/**
 * Adjusts the points for a specific house.
 * @param {string} houseId - The ID of the house (e.g., 'greenMonkeys').
 * @param {boolean} isAdd - True to add points, false to subtract.
 */
function adjustPoints(houseId, isAdd) {
    const inputId = `pointsInput-${houseId}`;
    const pointsInput = document.getElementById(inputId);
    let points = parseInt(pointsInput.value);

    // Basic validation and default to 1 point if input is invalid
    if (isNaN(points) || points < 1) {
        points = 1;
        pointsInput.value = 1;
    }

    if (houses[houseId]) {
        if (isAdd) {
            houses[houseId].score += points;
        } else {
            // Ensure score doesn't go below zero
            houses[houseId].score = Math.max(0, houses[houseId].score - points);
        }

        // Update the score displayed in the admin panel immediately
        const adminScoreElement = document.getElementById(`adminScore-${houseId}`);
        if (adminScoreElement) {
            adminScoreElement.textContent = houses[houseId].score;
        }
    }
}

/**
 * Saves the current scores and returns to the main view.
 */
function saveAndExitAdmin() {
    saveScores(); // Save to localStorage and update main view display
    
    // Hide Admin Panel and show Main View
    document.getElementById('adminPanel').style.display = 'none';
    document.getElementById('mainView').style.display = 'block';
    document.getElementById('adminButton').style.display = 'block'; // Show Admin button
}

// Start the application when the script loads
initializeScores();