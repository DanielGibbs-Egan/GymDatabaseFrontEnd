

class WeightLogo extends HTMLElement {
    static observedAttributes = ["position", "size"];
    constructor() {
        super();
        const shadow = this.attachShadow({ mode: "open" });
        shadow.innerHTML = `
        <style>
            :host {
                    display: flex;
                    justify-content: center;
                    margin: auto;
            }
        </style>
        // contents
        `;
    }

}
customElements.define("weight-logo", WeightLogo);


// check if the html is loaded
document.addEventListener('DOMContentLoaded', () => {

    const buttons = document.querySelectorAll("button");

    buttons.forEach(button => {

        // Add href listener if button is a link
        if (button.hasAttribute("href"))
            button.addEventListener('click', (event) => {
                    window.location = button.getAttribute("href");
            });

        // Press Effects
        button.addEventListener('mousedown', (event) => {
            event.target.classList.add('press');
        });
        button.addEventListener('mouseup', (event) => {
            event.target.classList.remove('press');
        });
        button.addEventListener('mouseenter', (event) => {
            if (event.buttons === 1)
                event.target.classList.add('press');
            else
                event.target.classList.remove('press');
        });
    });
});