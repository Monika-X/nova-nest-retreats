/* ============================================================
   Nova Nest Retreats — Booking Interactions
   booking.js
   ============================================================ */

document.addEventListener("DOMContentLoaded", () => {
    initDatePicker();
    initGuestCounter();
    initResortFilter();
    initBookingForm();
    initPriceCalculator();
    initWishlist();
});

/* ---- Date Picker Min Date Fix ---- */
function initDatePicker() {
    const today = new Date().toISOString().split("T")[0];
    document.querySelectorAll("input[type='date']").forEach(input => {
        input.setAttribute("min", today);
    });

    const checkIn = document.getElementById("check-in");
    const checkOut = document.getElementById("check-out");

    if (checkIn && checkOut) {
        checkIn.addEventListener("change", () => {
            checkOut.setAttribute("min", checkIn.value);
            if (checkOut.value && checkOut.value < checkIn.value) {
                checkOut.value = "";
            }
            calcPrice();
        });
        checkOut.addEventListener("change", calcPrice);
    }
}

/* ---- Guest Counter (+/-) ---- */
function initGuestCounter() {
    document.querySelectorAll(".guest-btn").forEach(btn => {
        btn.addEventListener("click", () => {
            const target = btn.dataset.target;
            const input = document.getElementById(target);
            if (!input) return;

            let val = parseInt(input.value) || 1;
            const min = parseInt(input.min) || 1;
            const max = parseInt(input.max) || 20;

            if (btn.classList.contains("plus")) val = Math.min(val + 1, max);
            if (btn.classList.contains("minus")) val = Math.max(val - 1, min);

            input.value = val;
            calcPrice();
        });
    });
}

/* ---- Price Calculator ---- */
function calcPrice() {
    const checkIn = document.getElementById("check-in");
    const checkOut = document.getElementById("check-out");
    const pricePerNight = parseFloat(
        document.querySelector("[data-price-per-night]")?.dataset.pricePerNight
    ) || 0;
    const priceDisplay = document.getElementById("calc-total-price");
    const nightsDisplay = document.getElementById("calc-nights");

    if (!checkIn || !checkOut || !priceDisplay) return;

    const d1 = new Date(checkIn.value);
    const d2 = new Date(checkOut.value);
    const nights = Math.max(0, Math.floor((d2 - d1) / 86400000));

    if (nightsDisplay) nightsDisplay.innerText = nights;
    priceDisplay.innerText = `$${(nights * pricePerNight).toLocaleString()}`;
}

window.calcPrice = calcPrice;

/* ---- Resort Filter ---- */
function initResortFilter() {
    const filterBtns = document.querySelectorAll(".filter-btn");
    const cards = document.querySelectorAll(".resort-card, .card-resort");

    if (!filterBtns.length || !cards.length) return;

    filterBtns.forEach(btn => {
        btn.addEventListener("click", () => {
            filterBtns.forEach(b => b.classList.remove("active"));
            btn.classList.add("active");

            const filter = btn.dataset.filter || "all";

            cards.forEach(card => {
                const category = card.dataset.category || "";
                const show = filter === "all" || category === filter;

                card.style.transition = "opacity 0.35s, transform 0.35s";
                if (show) {
                    card.style.opacity = "1";
                    card.style.transform = "scale(1)";
                    card.style.display = "";
                } else {
                    card.style.opacity = "0";
                    card.style.transform = "scale(0.95)";
                    setTimeout(() => {
                        if (btn.dataset.filter && !card.dataset.category?.includes(btn.dataset.filter))
                            card.style.display = "none";
                    }, 350);
                }
            });
        });
    });
}

/* ---- Booking Form Validation ---- */
function initBookingForm() {
    const form = document.getElementById("booking-form");
    if (!form) return;

    form.addEventListener("submit", e => {
        e.preventDefault();

        const checkIn = document.getElementById("check-in")?.value;
        const checkOut = document.getElementById("check-out")?.value;
        const guests = document.getElementById("guests")?.value;

        if (!checkIn || !checkOut) {
            showBookingMsg("Please select check-in and check-out dates.", "error");
            return;
        }
        if (new Date(checkOut) <= new Date(checkIn)) {
            showBookingMsg("Check-out must be after check-in.", "error");
            return;
        }
        if (!guests || guests < 1) {
            showBookingMsg("Please add at least 1 guest.", "error");
            return;
        }

        // Save booking to localStorage
        const booking = {
            id: "BK" + Date.now(),
            resort: document.querySelector("[data-resort-name]")?.dataset.resortName || "Nova Nest Resort",
            checkIn,
            checkOut,
            guests,
            status: "Confirmed",
            createdAt: new Date().toISOString()
        };

        const existing = JSON.parse(localStorage.getItem("bookings") || "[]");
        existing.unshift(booking);
        localStorage.setItem("bookings", JSON.stringify(existing));

        showBookingMsg("Booking confirmed! Redirecting to dashboard…", "success");

        setTimeout(() => {
            window.location.href = "user-dashboard.html";
        }, 2200);
    });
}

function showBookingMsg(msg, type) {
    let el = document.getElementById("booking-msg");
    if (!el) {
        el = document.createElement("p");
        el.id = "booking-msg";
        document.getElementById("booking-form")?.appendChild(el);
    }
    el.innerText = msg;
    el.style.color = type === "error" ? "#f87171" : "#34d399";
    el.style.marginTop = "0.75rem";
    el.style.fontWeight = "600";
}

/* ---- Wishlist Toggle ---- */
function initWishlist() {
    document.querySelectorAll(".wishlist-btn").forEach(btn => {
        const resortId = btn.dataset.resortId;
        const wishlist = JSON.parse(localStorage.getItem("wishlist") || "[]");
        if (wishlist.includes(resortId)) btn.classList.add("wishlisted");

        btn.addEventListener("click", () => {
            const list = JSON.parse(localStorage.getItem("wishlist") || "[]");
            const idx = list.indexOf(resortId);

            if (idx > -1) {
                list.splice(idx, 1);
                btn.classList.remove("wishlisted");
            } else {
                list.push(resortId);
                btn.classList.add("wishlisted");
            }

            localStorage.setItem("wishlist", JSON.stringify(list));

            if (typeof showToast === "function") {
                showToast(idx > -1 ? "Removed from wishlist" : "Added to wishlist");
            }
        });
    });
}
