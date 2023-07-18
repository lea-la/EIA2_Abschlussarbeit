var IceCreamShop;
(function (IceCreamShop) {
    IceCreamShop.speechBubble = null;
    let background;
    let moveables = [];
    IceCreamShop.customers = [];
    let url = "https://webuser.hs-furtwangen.de/~langelea/database/";
    let collection = "IceCream";
    let form;
    let dataIceCreams = [];
    let Flavors;
    (function (Flavors) {
        Flavors[Flavors["Chocolate"] = 0] = "Chocolate";
        Flavors[Flavors["Vanilla"] = 1] = "Vanilla";
        Flavors[Flavors["Strawberry"] = 2] = "Strawberry";
        Flavors[Flavors["Mint"] = 3] = "Mint";
    })(Flavors = IceCreamShop.Flavors || (IceCreamShop.Flavors = {}));
    let Sizes;
    (function (Sizes) {
        Sizes[Sizes["Small"] = 0] = "Small";
        Sizes[Sizes["Medium"] = 1] = "Medium";
        Sizes[Sizes["Large"] = 2] = "Large";
    })(Sizes = IceCreamShop.Sizes || (IceCreamShop.Sizes = {}));
    let Coats;
    (function (Coats) {
        Coats[Coats["MilkChocolate"] = 0] = "MilkChocolate";
        Coats[Coats["DarkChocolate"] = 1] = "DarkChocolate";
        Coats[Coats["WhiteChocolate"] = 2] = "WhiteChocolate";
    })(Coats = IceCreamShop.Coats || (IceCreamShop.Coats = {}));
    let Toppings;
    (function (Toppings) {
        Toppings[Toppings["None"] = 0] = "None";
        Toppings[Toppings["Almond"] = 1] = "Almond";
        Toppings[Toppings["RoseBlossoms"] = 2] = "RoseBlossoms";
        Toppings[Toppings["Gold"] = 3] = "Gold";
    })(Toppings = IceCreamShop.Toppings || (IceCreamShop.Toppings = {}));
    let Mood;
    (function (Mood) {
        Mood[Mood["Happy"] = 0] = "Happy";
        Mood[Mood["Unhappy"] = 1] = "Unhappy";
        Mood[Mood["Angry"] = 2] = "Angry";
    })(Mood = IceCreamShop.Mood || (IceCreamShop.Mood = {}));
    let Behaviour;
    (function (Behaviour) {
        Behaviour[Behaviour["Arriving"] = 0] = "Arriving";
        Behaviour[Behaviour["Waiting"] = 1] = "Waiting";
        Behaviour[Behaviour["Ordering"] = 2] = "Ordering";
        Behaviour[Behaviour["Eating"] = 3] = "Eating";
        Behaviour[Behaviour["Paying"] = 4] = "Paying";
        Behaviour[Behaviour["Leaving"] = 5] = "Leaving";
    })(Behaviour = IceCreamShop.Behaviour || (IceCreamShop.Behaviour = {}));
    IceCreamShop.sitPositions = [
        new IceCreamShop.Vector(100, 100),
        new IceCreamShop.Vector(200, 200),
        new IceCreamShop.Vector(300, 300), // Dritte Tischposition (x3, y3)
    ];
    window.addEventListener("load", handleLoad);
    async function handleLoad(_event) {
        let submitButton = document.querySelector("input[type=submit]");
        submitButton.addEventListener("click", sendEntry);
        let form = document.querySelector("form");
        form.addEventListener("change", handleChange);
        let showButton = document.querySelector("button");
        showButton.addEventListener("click", updateEntries);
        drawShop(_event);
        await updateEntries();
        displayPrice();
        setInterval(update, 20);
    }
    function update() {
        IceCreamShop.crc2.putImageData(background, 0, 0);
        for (const customer of IceCreamShop.customers) {
            customer.draw();
        }
        for (const iceCream of dataIceCreams) { // Draw the IceCream objects from the dataIceCreams array
            iceCream.draw();
        }
    }
    async function displayData(_offer) {
        let data = JSON.parse(_offer);
        let creations = data["data"];
        for (var index in creations) {
            showCreations(creations[index], index);
            const iceCream = await drawData(creations[index]); // Draw the ice cream and get the created IceCream object
            dataIceCreams.push(iceCream); // Add the IceCream object to the array
        }
        console.log(creations);
    }
    async function drawData(creation) {
        let { name, prize, size, flavor, coat, topping } = creation;
        let icePositionX = 550;
        let icePositionY = 180;
        let iceCream = new IceCreamShop.IceCream(icePositionX, icePositionY, name, size, flavor, coat, topping, prize, iceCreamSize(Sizes[size]));
        iceCream.draw();
        return iceCream; // Return the created IceCream object
    }
    IceCreamShop.drawData = drawData;
    /*function createIceCreamFromCreation(creation: Creation): IceCream {
      // Extrahiere die Daten aus dem Creation-Objekt
      const { name, prize, size, flavor, coat, topping } = creation;
    
      // Berechne die Position, an der das Eis gezeichnet werden soll
      const canvasCenterX = crc2.canvas.width / 2;
      const canvasCenterY = crc2.canvas.height / 2;
    
      // Erzeuge eine neue IceCream-Instanz mit den übergebenen Daten
      const iceCream = new IceCream(canvasCenterX, canvasCenterY, name, size, flavor, coat, topping, prize, iceCreamSize(Sizes[size]));
    
      // Rufe die draw()-Methode auf, um das Eis auf dem Canvas zu zeichnen
      iceCream.draw();
    
      // Gib die erstellte IceCream-Instanz zurück (optional)
      return iceCream;
    }*/
    function showCreations(_creation, _index) {
        let div = document.createElement("div");
        div.classList.add("entry");
        div.id = _index;
        div.appendChild(createSpan(_creation.name, "name"));
        let button = document.createElement("button");
        button.innerText = "Delete";
        button.addEventListener("click", deleteEntry);
        div.appendChild(button);
        let display = document.querySelector("#savedCreations");
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
        let entryData = {
            name: formData.get("name"),
            prize: getTotalPrice(formData),
            size: formData.get("size"),
            flavor: formData.get("flavor"),
            coat: formData.get("coat"),
            topping: formData.get("topping"),
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
        let responseObject = JSON.parse(responseText);
        console.log(responseObject);
        console.log(responseText); //Hier wird die Collection angezeigt
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
    function drawShop(_event) {
        let canvas = document.querySelector("canvas");
        if (!canvas)
            return;
        IceCreamShop.crc2 = canvas.getContext("2d");
        drawBackground();
        drawOutside();
        drawTable({ x: 1000, y: 500 });
        drawTable({ x: 700, y: 500 });
        drawTable({ x: 400, y: 500 });
        drawCounter();
        drawInnerCounter();
        drawContainer({ x: 585, y: 65 });
        //drawIce();
        //drawSpeechBubble();
        background = IceCreamShop.crc2.getImageData(0, 0, IceCreamShop.crc2.canvas.width, IceCreamShop.crc2.canvas.height);
    }
    function drawBackground() {
        let rectWidth = 70;
        let rectHeight = 50;
        let rows = IceCreamShop.crc2.canvas.height / rectHeight;
        let cols = IceCreamShop.crc2.canvas.width / rectWidth;
        for (let row = 0; row < rows; row++) {
            for (let col = 0; col < cols; col++) {
                let x = col * rectWidth - 40;
                let y = row * rectHeight;
                if (row % 2 !== 0) {
                    x += rectWidth / 2;
                }
                let gradient = IceCreamShop.crc2.createLinearGradient(x, y, x + rectWidth, y + rectHeight);
                gradient.addColorStop(0, "hsl(229, 21%, 77%)");
                gradient.addColorStop(1, "hsl(277, 77%, 88%)");
                IceCreamShop.crc2.fillStyle = gradient;
                IceCreamShop.crc2.fillRect(x, y, rectWidth, rectHeight);
                IceCreamShop.crc2.strokeStyle = "hsl(229, 8%, 42%)";
                IceCreamShop.crc2.lineWidth = 2;
                IceCreamShop.crc2.strokeRect(x, y, rectWidth, rectHeight);
            }
        }
    }
    function drawOutside() {
        IceCreamShop.crc2.lineWidth = 5;
        IceCreamShop.crc2.fillStyle = "hsl(229, 8%, 67%)";
        IceCreamShop.crc2.strokeStyle = "hsl(0, 0%, 0%)";
        IceCreamShop.crc2.strokeRect(0, 550, 220, 150);
        IceCreamShop.crc2.fillRect(0, 550, 220, 150);
        IceCreamShop.crc2.save();
    }
    function drawTable(_position) {
        let r = 80;
        IceCreamShop.crc2.save();
        IceCreamShop.crc2.translate(_position.x, _position.y);
        IceCreamShop.crc2.fillStyle = "hsl(35, 44%, 89%)";
        IceCreamShop.crc2.strokeStyle = "hsl(27, 30%, 77%)";
        IceCreamShop.crc2.lineWidth = 8;
        IceCreamShop.crc2.beginPath();
        IceCreamShop.crc2.arc(0, 0, r, 0, 2 * Math.PI);
        IceCreamShop.crc2.stroke();
        IceCreamShop.crc2.fill();
        IceCreamShop.crc2.closePath();
        IceCreamShop.crc2.restore();
    }
    function drawCounter() {
        IceCreamShop.crc2.fillStyle = "hsl(33, 43%, 92%)";
        IceCreamShop.crc2.fillRect(540, 50, 315, 220);
        IceCreamShop.crc2.save();
    }
    function drawInnerCounter() {
        IceCreamShop.crc2.fillStyle = "hsl(237, 0%, 40%)";
        IceCreamShop.crc2.fillRect(577, 60, 240, 140);
        IceCreamShop.crc2.save();
    }
    function drawContainer(_position) {
        IceCreamShop.crc2.save();
        IceCreamShop.crc2.translate(_position.x, _position.y);
        let rectWidth = 45;
        let rectHeight = 65;
        let rows = 2;
        let cols = 5;
        let colors = [
            "hsl(27, 70%, 19%)",
            "hsl(48, 70%, 84%)",
            "hsl(31, 70%, 8%)",
            "hsl(43, 74%, 49%)",
            "hsl(36, 43%, 65%)",
            "hsl(8, 73%, 68%)",
            "hsl(95, 73%, 80%)",
            "hsl(32, 61%, 24%)",
            "hsl(39, 70%, 70%)",
            "hsl(312, 74%, 69%)"
        ];
        for (let row = 0; row < rows; row++) {
            for (let col = 0; col < cols; col++) {
                let x = col * rectWidth;
                let y = row * rectHeight;
                let colorIndex = (row * cols + col) % colors.length; // Index für die Farbe im Array
                let fillColor = colors[colorIndex];
                IceCreamShop.crc2.fillStyle = fillColor;
                IceCreamShop.crc2.fillRect(x, y, rectWidth, rectHeight);
                IceCreamShop.crc2.strokeStyle = "hsl(237, 0%, 18%)";
                IceCreamShop.crc2.lineWidth = 2;
                IceCreamShop.crc2.strokeRect(x, y, rectWidth, rectHeight);
            }
        }
        IceCreamShop.crc2.restore();
    }
    //function drawMoney()
    function iceCreamSize(_size) {
        let sizeValue;
        switch (_size) {
            case Sizes.Small:
                sizeValue = 1;
                break;
            case Sizes.Medium:
                sizeValue = 2;
                break;
            case Sizes.Large:
                sizeValue = 3;
                break;
        }
        return sizeValue;
    }
    IceCreamShop.iceCreamSize = iceCreamSize;
    function flavorColor(_flavor) {
        let color1 = "";
        switch (_flavor) {
            case Flavors.Chocolate:
                color1 = "hsl(27, 70%, 19%)";
                break;
            case Flavors.Vanilla:
                color1 = "hsl(48, 70%, 84%)";
                break;
            case Flavors.Strawberry:
                color1 = "hsl(8, 73%, 68%)";
                break;
            case Flavors.Mint:
                color1 = "hsl(95, 73%, 80%)";
                break;
        }
        return color1;
    }
    IceCreamShop.flavorColor = flavorColor;
    function coatColor(_coat) {
        let color = "";
        switch (_coat) {
            case Coats.MilkChocolate:
                color = "hsl(32, 61%, 24%)";
                break;
            case Coats.DarkChocolate:
                color = "hsl(31, 70%, 8%)";
                break;
            case Coats.WhiteChocolate:
                color = "hsl(39, 70%, 70%)";
                break;
        }
        return color;
    }
    IceCreamShop.coatColor = coatColor;
    function toppingsColor(_topping) {
        let color = "";
        switch (_topping) {
            case Toppings.Almond:
                color = "hsl(36, 43%, 65%)";
                break;
            case Toppings.RoseBlossoms:
                color = "hsl(312, 74%, 69%)";
                break;
            case Toppings.Gold:
                color = "hsl(43, 74%, 49%)";
                break;
        }
        return color;
    }
    IceCreamShop.toppingsColor = toppingsColor;
    /* export function checkCustomerMood (_position: Vector, _size: number){
     if (mood === Mood.Happy {
       drawGreenCustomer(_position,_size);
     } else if (mood === Mood.Unhappy) {
       drawYelCustomer(_position, _size);
     } else if (mood === Mood.Angry) {
       drawRedCustomer(_position, _size);
     }
   }*/
})(IceCreamShop || (IceCreamShop = {}));
//# sourceMappingURL=main.js.map