
document.querySelector('startButton').addEventListener('click', function() {
    // Change the background color to white
    document.body.style.backgroundColor = 'white';

    // Start the SVG animation
    var logo = document.getElementById('logo');
    var animation = logo.querySelector('animate');
    logo.style.visibility = 'visible';
    animation.beginElement();

    var startButton = document.querySelector('.startButton');
    var rect = startButton.getBoundingClientRect();
    var originX = rect.left + rect.width / 2;
    var originY = rect.top + rect.height / 2;

    // Get the duration of the SVG animation
    var animationDuration = parseFloat(animation.getAttribute('dur')) * 1000; // Convert to milliseconds

    // Delay the rest of the actions until after the SVG animation has completed
    setTimeout(function() {
        document.body.style.transformOrigin = `${originX}px ${originY}px`;
        document.body.classList.add('zoom');
        setTimeout(function() {
            document.querySelector('.mainMenu').classList.add('show'); // Shows the main menu
        }, animationDuration);
        history.pushState({page: 1}, "", "#page1"); // Add a new entry to the browser's history
    }, animationDuration); // Adjust this delay to match the duration of your SVG animation
});

window.addEventListener('popstate', function(event) {
    // If the back button is clicked, remove the 'zoom' and 'show' classes
    document.body.classList.remove('zoom');
    document.querySelector('.mainMenu').classList.remove('show');
});