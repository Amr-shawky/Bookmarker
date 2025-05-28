function logError(message) {
  console.error(message);
}

document.addEventListener('DOMContentLoaded', function() {
  // Toggle Mode Functionality
  const toggleBtn = document.getElementById('toggleModeBtn');
  if (toggleBtn) {
    toggleBtn.addEventListener('click', function() {
      // Toggle button clicked logic handled here
      document.body.classList.toggle('dark-mode');
      toggleBtn.textContent = document.body.classList.contains('dark-mode') ? '🌙' : '☀️';
    });
  } else {
    logError('Toggle button not found'); // Centralized error logging
  }
});
