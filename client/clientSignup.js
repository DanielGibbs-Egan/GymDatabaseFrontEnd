
document.addEventListener('DOMContentLoaded', () => {
    const usernames = document.getElementsByClassName("username");
    const passwords = document.getElementsByClassName("password");

    const buttons = document.getElementsByTagName("button");
    buttons[0].addEventListener('click', async (event) => {
        if (passwords[0].value != passwords[1].value) {
            console.log("Passwords do not match!");
            return;
        }
        const response = await fetch("http://localhost:3000/", {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: `{"req_type": "signup", "username": "${usernames[0].value}", "password": "${passwords[0].value}"}`
        });
        const result = await response.json();
        switch (result.code) {
            case 2:
                console.log("User already exists!");
                break;
            default:
                console.log("Success!");
                window.location.href = "Homescreen.html";
                break;
        }
    });
});