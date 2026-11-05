document.addEventListener('DOMContentLoaded', () => {
    const usernames = document.getElementsByClassName("username");
    const passwords = document.getElementsByClassName("password");

    const buttons = document.getElementsByTagName("button");
    buttons[0].addEventListener('click', async (event) => {
        const response = await fetch("http://localhost:3000/", {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: `{"req_type": "login", "username": "${usernames[0].value}", "password": "${passwords[0].value}"}`
        });
        const result = await response.json();
        switch (result.code) {
            case 2:
                console.log("User does not exist!");
                break;
            case 3:
                console.log("Password is incorrect!");
                break;
            default:
                console.log("Success!");
                window.location.href = "Homescreen.html";
                break;
        }
    });
});