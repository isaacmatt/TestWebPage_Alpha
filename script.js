window.addEventListener('scroll', function() {
    let scrolled = window.pageYOffset;
    let parallaxElements = document.querySelectorAll('.parallax');
    parallaxElements.forEach(function(parallax) {
        // Ensure speed is a valid number and default to 0.5 if not provided
        let speed = parseFloat(parallax.getAttribute('data-speed')) || 0.5;
        parallax.style.transform = 'translateY(' + (scrolled * speed) + 'px)';
    });
});
