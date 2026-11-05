
document.addEventListener('DOMContentLoaded', () => {
    const usernames = document.getElementsByClassName("username");
    const passwords = document.getElementsByClassName("password");

    const buttons = document.getElementsByTagName("button");
    buttons[0].addEventListener('click', (event) => {
        var xhr_login = new XMLHttpRequest();
        xhr_login.open("PUT", "http://localhost:3000/", true);
        xhr_login.setRequestHeader("Content-Type", "application/json");
        xhr_login.send(`{"data_type": "login", "username": "${usernames[0].value}", "password": "${passwords[0].value}"}`);
    });
});