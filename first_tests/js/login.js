document.addEventListener('DOMContentLoaded', function() {
    // Sign In form submit event listener
    console.log("Trying to find signInForm");
    const signInForm = document.getElementById('signInForm');
    console.log(signInForm); // Check if signInForm is null or the element itself
    signInForm.addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent form submission

        // Get form values
        const username = document.getElementById('signInUsername').value;
        const password = document.getElementById('signInPassword').value;
        const email = document.getElementById('signInEmail').value;

        // Do something with the collected data (e.g., send it to a server)
        console.log('Sign In - Username:', username);
        console.log('Sign In - Password:', password);
        console.log('Sign In - Email:', email);

        // Close the modal
        $('#signInModal').modal('hide');

        // Clear form fields
        signInForm.reset();
    });

    // Login form submit event listener
    console.log("Trying to find loginForm");
    const loginForm = document.getElementById('loginForm');
    console.log(loginForm); // Check if loginForm is null or the element itself
    loginForm.addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent form submission

        // Get form values
        const username = document.getElementById('loginUsername').value;
        const password = document.getElementById('loginPassword').value;

        // Do something with the collected data (e.g., send it to a server)
        console.log('Login - Username:', username);
        console.log('Login - Password:', password);

        // Close the modal
        $('#loginModal').modal('hide');

        // Clear form fields
        loginForm.reset();
    });
});
