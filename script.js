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

function initializeHomeInteractions() {
    const heroWord = document.getElementById("hero-word");
    if (heroWord) {
        const words = ["Three.js", "Interactive", "Creative", "Experimental"];
        let index = 0;
        window.setInterval(function() {
            index = (index + 1) % words.length;
            heroWord.textContent = words[index];
        }, 1700);
    }

    const cards = document.querySelectorAll(".interactive-sections .section-card");
    const feedback = document.getElementById("section-feedback");
    if (!cards.length || !feedback) {
        return;
    }

    cards.forEach(function(card) {
        card.addEventListener("mouseenter", function() {
            feedback.textContent = card.dataset.message || "Explore this section.";
        });

        card.addEventListener("focus", function() {
            feedback.textContent = card.dataset.message || "Explore this section.";
        });

        card.addEventListener("click", function() {
            cards.forEach(function(otherCard) {
                otherCard.classList.remove("is-active");
            });
            card.classList.add("is-active");
            const frontTitle = card.querySelector(".card-front");
            const sectionName = frontTitle ? frontTitle.textContent.trim() : "section";
            feedback.textContent = "Opening " + sectionName + "...";
        });
    });
}

document.addEventListener("DOMContentLoaded", function() {
    setCalendarView("month");
    initializeCalendarControls();
    initializeParallax();
    initializeHomeInteractions();
});
