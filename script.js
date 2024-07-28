window.addEventListener('scroll', function() {
    let scrolled = window.pageYOffset;
    let parallaxElements = document.querySelectorAll('.parallax');
    parallaxElements.forEach(function(parallax) {
        let speed = parallax.getAttribute('data-speed');
        parallax.style.transform = 'translateY(' + (scrolled * speed) + 'px)';
    });
});
