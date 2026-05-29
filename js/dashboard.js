/* ============================================================
   Nova Nest Retreats — Dashboard Management Service
   dashboard.js
   ============================================================ */

document.addEventListener("DOMContentLoaded", () => {
    // Dynamic username loading
    const savedUser = localStorage.getItem("username") || "Guest";

    // Greeting labels
    const userGreeting = document.getElementById("user-greeting");
    if (userGreeting) userGreeting.innerHTML = `Hello, ${savedUser} <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-warning animate-bounce inline-block" style="transform-origin: bottom right;"><path d="M18 11V6a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v5"/><path d="M14 10V4a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v6"/><path d="M10 10.5V6a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v8"/><path d="M6 14v0a5 5 0 0 0 5 5h3a6 6 0 0 0 6-6V11a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2"/></svg>`;

    const adminWelcome = document.getElementById("admin-welcome-title");
    if (adminWelcome) adminWelcome.innerHTML = `Hello, ${savedUser} <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-warning animate-bounce inline-block" style="transform-origin: bottom right;"><path d="M18 11V6a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v5"/><path d="M14 10V4a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v6"/><path d="M10 10.5V6a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v8"/><path d="M6 14v0a5 5 0 0 0 5 5h3a6 6 0 0 0 6-6V11a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2"/></svg>`;

    // Sidebar name indicators
    const sidebarUser = document.getElementById("sidebar-username");
    if (sidebarUser) sidebarUser.innerText = savedUser;

    const sidebarAdmin = document.getElementById("sidebar-admin-name");
    if (sidebarAdmin) sidebarAdmin.innerText = savedUser;

    // Profile card name
    const profileCardName = document.getElementById("profile-card-name");
    if (profileCardName) profileCardName.innerText = savedUser;

    // Initials avatars
    const initials = savedUser.substring(0, 2).toUpperCase();
    document.querySelectorAll(".user-initials, .admin-initials").forEach(el => {
        el.innerText = initials;
    });

    // Settings tab switching (for settings.html)
    initSettingsTabs();
});

/* ---- Settings Tab Switcher ---- */
function initSettingsTabs() {
    const tabBtns = document.querySelectorAll(".settings-tab-btn");
    if (!tabBtns.length) return;

    tabBtns.forEach(btn => {
        btn.addEventListener("click", () => {
            tabBtns.forEach(b => b.classList.remove("active"));
            btn.classList.add("active");

            const text = btn.innerText.toLowerCase();
            document.querySelectorAll(".settings-panel").forEach(p => p.classList.remove("active"));

            let panelId = "";
            if (text.includes("profile")) panelId = "profile-panel";
            else if (text.includes("security")) panelId = "security-panel";
            else if (text.includes("prefer")) panelId = "preferences-panel";

            const panel = document.getElementById(panelId);
            if (panel) panel.classList.add("active");
        });
    });
}

/* ---- Toast Notification Utility ---- */
function showToast(message, type = "success") {
    let toast = document.getElementById("toast");
    if (!toast) {
        toast = document.createElement("div");
        toast.id = "toast";
        toast.className = "toast";
        toast.innerHTML = `<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg><span id="toast-text"></span>`;
        document.body.appendChild(toast);
    }
    const text = document.getElementById("toast-text");
    if (text) text.innerText = message;

    toast.classList.add("show");
    setTimeout(() => toast.classList.remove("show"), 3200);
}

window.showToast = showToast;
