function RegisteredUser() {
    this.registeredUsers = {};
    this.accountId = 0;
}
RegisteredUser.prototype.addUser = function(newUser) {
    newUser.id = this.accountId;
    this.registeredUsers[newUser.id] = newUser;
    this.accountId++;
}
RegisteredUser.prototype.getAccount = function(id) {
    if (this.registeredUsers[id] !== undefined) {
        return this.registeredUsers[id];
    }
    return false;
}

function Registration(firstName, lastName, email, password) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.password = password;
}

//UI Logic
let registeredUser = new RegisteredUser();
document.addEventListener("DOMContentLoaded", (e) => {
    e.preventDefault();
    const registrationForm = document.querySelector("form#registrationForm");
    const registrationMessage = document.querySelector("p#registrationMessage");
    const logInForm = document.querySelector("form#logInForm");
    const logInMessage = document.querySelector("p#welcomeBackMessage");
    const logInLink = document.querySelector("a#logInLink");
    const createAccLink = document.querySelector("a#createAccLink");

    logInLink.addEventListener("click", logIn);
    createAccLink.addEventListener("click", createAcc)
    registrationForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const firstName = document.querySelector("input#firstNameInput").value;
        const lastName = document.querySelector("input#lastNameInput").value;
        const email = document.querySelector("input#emailInput").value;
        const password = document.querySelector("input#pwdInput").value;
        let newUser = new Registration(firstName, lastName, email, password);

        // Resets form fields after submission
        document.querySelector("input#firstNameInput").value = null;
        document.querySelector("input#lastNameInput").value = null;
        document.querySelector("input#emailInput").value = null;
        document.querySelector("input#pwdInput").value = null;

        if (!validEmail(email)) {
            registrationMessage.innerText = "Please enter a valid email address."
            return;
        }

        registeredUser.addUser(newUser);
        registrationMessage.innerText = "Registration successful for " + newUser.firstName + " " + newUser.lastName + " using " + newUser.email;
    });

    logInForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const registeredEmail = document.querySelector("input#registeredEmail").value;
        const registeredPass = document.querySelector("input#registeredPass").value;
        

        if(registered(registeredEmail, registeredPass)) {
            logInMessage.innerText = "Welcome Back"
        } else {
            logInMessage.innerText = "User not found. Please register first.";
        }
    });

    function validEmail(email) {
        const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        return emailRegex.test(email);
    }

    function logIn(e) {
        e.preventDefault();
        document.querySelector("form#registrationForm").classList.add("hidden");
        document.querySelector("form#logInForm").classList.remove("hidden");
    }

    function createAcc() {
        document.querySelector("form#registrationForm").classList.remove("hidden");
        document.querySelector("form#logInForm").classList.add("hidden");
    }

    function registered(email, password) {
        for (let userId in registeredUser.registeredUsers) {
            const user = registeredUser.getAccount(userId);
            if (user.email === email && user.password === password) {
                return true;
            }
        }
        return false;
    }
});