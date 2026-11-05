
document.addEventListener('DOMContentLoaded', () => {
    const usernames = document.getElementsByClassName("username");
    const passwords = document.getElementsByClassName("password");

    const buttons = document.getElementsByTagName("button");
    buttons[0].addEventListener('click', (event) => {
        console.log(`${passwords[0].value} and ${passwords[1].value}`);
        if (passwords[0].value == passwords[1].value) {
            var xhr_signup = new XMLHttpRequest();
            xhr_signup.open("PUT", "http://localhost:3000/", true);
            xhr_signup.setRequestHeader("Content-Type", "application/json");
            xhr_signup.send(`{"data_type": "signup", "username": "${usernames[0].value}", "password": "${passwords[0].value}"}`);
        }
    });
});