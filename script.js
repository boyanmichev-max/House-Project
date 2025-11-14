// Wait for the entire document to load
document.addEventListener('DOMContentLoaded', function() {
    // Get the button element by its ID
    const ctaButton = document.getElementById('cta-button');

    // Add a click event listener to the button
    ctaButton.addEventListener('click', function() {
        // Display a simple alert box when the button is clicked
        alert('Thanks for your interest! Email me at your.email@example.com');
    });

    console.log('Portfolio scripts loaded!');
});
