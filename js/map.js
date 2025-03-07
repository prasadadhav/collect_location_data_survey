// Initialize map centered on Esch-sur-Sûre lake
const map = L.map("map").setView([49.9115, 5.9331], 13);

// Load OpenStreetMap tiles
L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: "&copy; OpenStreetMap contributors"
}).addTo(map);

// Store markers
let markers = [];

// Function to add marker at clicked location
map.on("click", (e) => {
    const marker = L.marker(e.latlng, { draggable: true }).addTo(map);
    markers.push(marker);
});

// Button: Recenter map
document.getElementById("recenter").addEventListener("click", () => {
    map.setView([49.9115, 5.9331], 13);
});

// Button: Add marker manually at center
document.getElementById("add-marker").addEventListener("click", () => {
    const center = map.getCenter();
    const marker = L.marker(center, { draggable: true }).addTo(map);
    markers.push(marker);
});

// Button: Delete last marker
document.getElementById("delete-marker").addEventListener("click", () => {
    if (markers.length > 0) {
        const marker = markers.pop();
        map.removeLayer(marker);
    }
});

// Button: Save data and exit
document.getElementById("save").addEventListener("click", async () => {
    const markerData = markers.map(marker => marker.getLatLng());

    // Send data to backend
    const response = await fetch("http://localhost:3000/save", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ markers: markerData, timestamp: new Date() })
    });

    if (response.ok) {
        alert("Data saved successfully! Returning to survey.");
        window.location.href = "https://your-survey-page.com";  // Replace with actual survey URL
    } else {
        alert("Error saving data. Try again.");
    }
});
