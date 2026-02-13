function setCalendarView(view) {
    const calendar = document.getElementById("calendar");
    if (!calendar) {
        return;
    }

    const calendarSrc = calendar.dataset.calendarSrc;
    const timezone = calendar.dataset.calendarTimezone || "America/Winnipeg";
    if (!calendarSrc) {
        return;
    }

    const params = new URLSearchParams({
        src: calendarSrc,
        ctz: timezone,
        mode: view
    });
    calendar.src = "https://calendar.google.com/calendar/embed?" + params.toString();
}

function initializeCalendarControls() {
    const buttons = document.querySelectorAll("[data-calendar-view]");
    buttons.forEach(function(button) {
        button.addEventListener("click", function() {
            const view = button.getAttribute("data-calendar-view");
            if (view) {
                setCalendarView(view);
            }
        });
    });
}

function initializeParallax() {
    const parallaxElements = document.querySelectorAll(".parallax");
    if (!parallaxElements.length) {
        return;
    }

    window.addEventListener("scroll", function() {
        const scrolled = window.pageYOffset;
        parallaxElements.forEach(function(parallax) {
            const speed = parseFloat(parallax.getAttribute("data-speed")) || 0.5;
            parallax.style.transform = "translateY(" + scrolled * speed + "px)";
        });
    });
}

document.addEventListener("DOMContentLoaded", function() {
    setCalendarView("month");
    initializeCalendarControls();
    initializeParallax();
});
