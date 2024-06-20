document.addEventListener('DOMContentLoaded', function() {
    // Sign In form submit event listener
    document.getElementById('signInForm').addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent form submission

        // Get form values
        const username = document.getElementById('signInUsername').value;
        const password = document.getElementById('signInPassword').value;
        const email = document.getElementById('signInEmail').value;

        // Do something with the collected data (e.g., send it to a server)
        console.log('Sign In - Username:', username);
        console.log('Sign In - Password:', password);
        console.log('Sign In - Email:', email);

        document.getElementById('signInModal').style.display = 'none';
        // Clear form fields
        document.getElementById('signInForm').reset();
    });

    // Login form submit event listener
    document.getElementById('loginForm').addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent form submission

        // Get form values
        const username = document.getElementById('loginUsername').value;
        const password = document.getElementById('loginPassword').value;

        // Do something with the collected data (e.g., send it to a server)
        console.log('Login - Username:', username);
        console.log('Login - Password:', password);

        // Close the modal
        
        document.getElementById('loginModal').style.display = 'none';

        // Clear form fields
        document.getElementById('loginForm').reset();
    });
});

function signmodalToggle() {
    document.getElementById('signInModal').style.display = 'block';
    document.getElementById('signInModal').style.opacity = '1';

}

function signmodalClose() {
    document.getElementById('signInModal').style.display = 'none';
    document.getElementById('signInModal').style.opacity = '0';
}

function logmodalToggle() {
    document.getElementById('loginModal').style.display = 'block';
    document.getElementById('loginModal').style.opacity = '1';

}

function logmodalClose() {
    document.getElementById('loginModal').style.display = 'none';
    document.getElementById('loginModal').style.opacity = '0';
}
