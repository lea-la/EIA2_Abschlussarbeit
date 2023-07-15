var IceCreamShop;
(function (IceCreamShop) {
    window.addEventListener("load", handleLoad);
    let url = "https://webuser.hs-furtwangen.de/~langelea/database/";
    let collection = "IceCream";
    let form;
    async function handleLoad(_event) {
        updateEntries();
        let submitButton = document.querySelector("input[type=submit]");
        submitButton.addEventListener("click", sendEntry);
        form = document.querySelector("form");
        let showButton = document.querySelector("button");
        showButton.addEventListener("click", updateEntries);
        form.addEventListener("change", handleChange);
        displayPrice();
    }
    async function displayData(_offer) {
        let data = JSON.parse(_offer);
        let creations = data["data"];
        for (var index in creations) {
            showCreations(creations[index], index);
        }
    }
    function showCreations(_creation, _index) {
        let div = document.createElement("div");
        div.classList.add("entry");
        div.id = _index;
        let display = document.querySelector("#savedCreations");
        div.appendChild(createSpan(_creation.name, "name"));
        let button = document.createElement("button");
        button.innerText = "Delete";
        button.addEventListener("click", deleteEntry);
        div.appendChild(button);
        display.appendChild(div);
    }
    function createSpan(_content, _className) {
        let span = document.createElement("span");
        span.innerText = _content.toString() + " ";
        span.classList.add(_className);
        return span;
    }
    async function sendEntry() {
        let form = document.querySelector("form");
        let formData = new FormData(form);
        // Erstellen Sie ein separates JavaScript-Objekt, das die gewünschten Felder enthält
        let entryData = {
            name: formData.get("name"),
            prize: getTotalPrice(formData),
            size: formData.get("size"),
            flavor: formData.get("flavor"),
            coat: formData.get("coat"),
            topping: getToppings(formData), // Holen Sie sich alle ausgewählten Toppings
        };
        let query = new URLSearchParams();
        query.set("command", "insert");
        query.set("collection", collection);
        query.set("data", JSON.stringify(entryData)); // Wandeln Sie das separate Objekt in JSON um
        let response = await fetch(url + "?" + query.toString());
        let responseText = await response.text();
        console.log(responseText);
        updateEntries();
    }
    function getToppings(formData) {
        let toppings = [];
        formData.getAll("toppings").forEach((value) => {
            toppings.push(value);
        });
        return toppings.join(", ");
    }
    function handleChange(_event) {
        displayPrice();
    }
    function getTotalPrice(formData) {
        let totalPrice = 0;
        for (let entry of formData) {
            let selector = "[value='" + entry[1] + "']";
            let ingredient = document.querySelector(selector);
            if (ingredient !== null) {
                let inPrice = Number(ingredient.getAttribute("price"));
                totalPrice += inPrice;
            }
        }
        return totalPrice;
    }
    function displayPrice() {
        let showPrice = document.querySelector("div#price");
        showPrice.innerHTML = "";
        let form = document.querySelector("form");
        let formData = new FormData(form);
        let totalPrice = 0; // Variable für den Gesamtpreis
        for (let entry of formData) {
            let selector = "[value='" + entry[1] + "']";
            let ingredient = document.querySelector(selector);
            if (ingredient !== null) {
                let inPrice = Number(ingredient.getAttribute("price"));
                totalPrice += inPrice;
            }
        }
        showPrice.innerHTML += "<p><strong>Total: €" + totalPrice.toFixed(2) + "</strong></p>";
    }
    async function updateEntries() {
        let display = document.querySelector("#savedCreations");
        display.innerText = "";
        let query = new URLSearchParams();
        query.set("command", "find");
        query.set("collection", collection);
        let response = await fetch(url + "?" + query);
        let responseText = await response.text();
        displayData(responseText);
        console.log(responseText);
    }
    async function deleteEntry(_event) {
        let button = _event.target;
        let parent = button.parentElement;
        let parentID = parent.id;
        let query = new URLSearchParams();
        query.set("command", "delete");
        query.set("collection", collection);
        query.set("id", parentID);
        let response = await fetch(url + "?" + query);
        let responseText = await response.text();
        console.log(responseText);
        updateEntries();
    }
})(IceCreamShop || (IceCreamShop = {}));
//# sourceMappingURL=main.js.map