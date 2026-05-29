/* ============================================================
   Nova Nest Retreats — Authentication Utility Service
   ============================================================ */

const Auth = {
    // Validates email address syntax
    validateEmail: function (email) {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    },

    // Evaluates password strength (returns score 0-4 and level name)
    assessPasswordStrength: function (password) {
        let score = 0;
        if (password.length >= 8) score++;
        if (/[A-Z]/.test(password)) score++;
        if (/[0-9]/.test(password)) score++;
        if (/[^A-Za-z0-9]/.test(password)) score++;

        const labels = ['Weak', 'Fair', 'Good', 'Strong'];
        const colors = ['#ef4444', '#f97316', '#eab308', '#10b981'];

        return {
            score: score,
            label: labels[score - 1] || 'Too Short',
            color: colors[score - 1] || '#475569',
            percent: (score / 4) * 100
        };
    },

    // Sets username in local storage
    storeUsername: function (emailOrName) {
        let username = emailOrName;
        if (emailOrName.includes('@')) {
            username = emailOrName.split('@')[0];
        }
        localStorage.setItem("username", username);
        return username;
    },

    // Gets username from local storage
    getUsername: function (fallback = "Guest") {
        return localStorage.getItem("username") || fallback;
    },

    // Clear session details
    logout: function () {
        localStorage.removeItem("username");
    }
};

// Export to window object for global availability
window.Auth = Auth;
