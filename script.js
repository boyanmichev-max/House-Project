// Default points
let points = {
    acrobats: 0,
    bravehearts: 0,
    druids: 0,
    quicksilver: 0
};

// Update displayed points everywhere
function refreshPoints() {
    document.getElementById("acrobatsPoints").innerText = points.acrobats;
    document.getElementById("braveheartsPoints").innerText = points.bravehearts;
    document.getElementById("druidsPoints").innerText = points.druids;
    document.getElementById("quicksilverPoints").innerText = points.quicksilver;

    document.getElementById("acroAdminPoints").innerText = points.acrobats;
    document.getElementById("braveAdminPoints").innerText = points.bravehearts;
    document.getElementById("druidAdminPoints").innerText = points.druids;
    document.getElementById("quickAdminPoints").innerText = points.quicksilver;
}

refreshPoints();

// Admin Modal Controls
const adminModal = document.getElementById("adminModal");
const adminPanel = document.getElementById("adminPanel");

document.getElementById("adminBtn").onclick = () => {
    adminModal.style.display = "block";
};

function closeModal() {
    adminModal.style.display = "none";
}

function checkPassword() {
    const input = document.getElementById("adminPassword").value;
    if (input === "admin") {
        adminModal.style.display = "none";
        adminPanel.style.display = "block";
        document.getElementById("errorMessage").innerText = "";
    } else {
        document.getElementById("errorMessage").innerText = "Incorrect password.";
    }
}

function closeAdminPanel() {
    adminPanel.style.display = "none";
}

// Change Points
function changePoints(house, amount) {
    points[house] += amount;
    if (points[house] < 0) points[house] = 0;
    refreshPoints();
}
