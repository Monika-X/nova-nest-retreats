/* ========================================
   Nova Nest Retreats — Dynamic Countdown Timer
   ======================================== */

document.addEventListener('DOMContentLoaded', () => {
    const daysEl = document.getElementById('cd-days');
    const hoursEl = document.getElementById('cd-hours');
    const minsEl = document.getElementById('cd-mins');

    if (!daysEl || !hoursEl || !minsEl) return;

    // A smart flash sale countdown: 48 hours from first visit, stored in localStorage
    const STORAGE_KEY = 'nova_nest_countdown_target';
    let targetTime = localStorage.getItem(STORAGE_KEY);

    if (!targetTime) {
        // Set target to 48 hours from now
        const now = new Date().getTime();
        targetTime = now + (2 * 24 * 60 * 60 * 1000); // 48 hours in milliseconds
        localStorage.setItem(STORAGE_KEY, targetTime.toString());
    } else {
        targetTime = parseInt(targetTime, 10);
        // If the sale has already expired, reset it to another 48 hours so the site never looks broken/empty
        const now = new Date().getTime();
        if (targetTime < now) {
            targetTime = now + (2 * 24 * 60 * 60 * 1000);
            localStorage.setItem(STORAGE_KEY, targetTime.toString());
        }
    }

    const updateCountdown = () => {
        const now = new Date().getTime();
        const difference = targetTime - now;

        if (difference <= 0) {
            daysEl.textContent = "00";
            hoursEl.textContent = "00";
            minsEl.textContent = "00";
            return;
        }

        // Calculations for days, hours, and minutes
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));

        // Display results with leading zero formatting
        daysEl.textContent = String(days).padStart(2, '0');
        hoursEl.textContent = String(hours).padStart(2, '0');
        minsEl.textContent = String(minutes).padStart(2, '0');
    };

    // Run once immediately, then tick every minute
    updateCountdown();
    setInterval(updateCountdown, 60000);
});
