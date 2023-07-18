namespace IceCreamShop {

  interface IceCreamVector {
    x: number;
    y: number;
  }
  export let speechBubble: HTMLElement | null = null;

  let background: ImageData;
  let moveables: Moveable[] = [];
  export let customers: Customer[] = [];


  let url: string = "https://webuser.hs-furtwangen.de/~langelea/database/";
  let collection: string = "IceCream";
  let form: HTMLFormElement;
  export let crc2: CanvasRenderingContext2D;

  interface Creation {
    name: string;
    prize: number;
    size: string;
    flavor: string;
    coat: string;
    topping: string;
  }

  interface Data {
    [data: string]: Creation[];
  }
  
  let dataIceCreams: IceCream[] = [];
  
  export enum Flavors {
    Chocolate,
    Vanilla,
    Strawberry,
    Mint
  }
  export enum Sizes {
    Small,
    Medium,
    Large
  }
  export enum Coats {
    MilkChocolate,
    DarkChocolate,
    WhiteChocolate
  }

  export enum Toppings {
    None,
    Almond,
    RoseBlossoms,
    Gold
  }

  export enum Mood {
    Happy,
    Unhappy,
    Angry,
  }

  export enum Behaviour {
    Arriving,
    Waiting,
    Ordering,
    Eating,
    Paying,
    Leaving
  }

 export let sitPositions: Vector[] = [
    new Vector(100, 100), // Erste Tischposition (x1, y1)
    new Vector(200, 200), // Zweite Tischposition (x2, y2)
    new Vector(300, 300), // Dritte Tischposition (x3, y3)
];
  window.addEventListener("load", handleLoad);
  async function handleLoad(_event: Event): Promise<void> {

    let submitButton: HTMLInputElement = <HTMLInputElement>document.querySelector("input[type=submit]");
    submitButton.addEventListener("click", sendEntry);

    let form: HTMLFormElement = <HTMLFormElement>document.querySelector("form");
    form.addEventListener("change", handleChange);

    let showButton: HTMLButtonElement = <HTMLButtonElement>document.querySelector("button");
    showButton.addEventListener("click", updateEntries);
    
    drawShop(_event)
    await updateEntries()
    displayPrice();
    
    setInterval(update, 20);
  }


  function update(): void {
    crc2.putImageData(background, 0, 0);

    for (const customer of customers) {
        customer.draw();
    }
    for (const iceCream of dataIceCreams) { // Draw the IceCream objects from the dataIceCreams array
      iceCream.draw();
    }
  }
  

  async function displayData(_offer: string): Promise<void> {
    let data: Data = JSON.parse(_offer);
    let creations: Creation[] = data["data"];
  
    for (var index in creations) {
      showCreations(creations[index], index);
      const iceCream = await drawData(creations[index]); // Draw the ice cream and get the created IceCream object
      dataIceCreams.push(iceCream); // Add the IceCream object to the array
    }
    console.log(creations);
  }

  export async function drawData(creation: Creation): Promise<IceCream> {
    let { name, prize, size, flavor, coat, topping } = creation;
  
    let icePositionX = 550;
    let icePositionY = 180;
  
    let iceCream = new IceCream(
      icePositionX,
      icePositionY,
      name,
      size,
      flavor,
      coat,
      topping,
      prize,
      iceCreamSize(Sizes[size])
    );
  
    iceCream.draw();
    return iceCream; // Return the created IceCream object
  }
 

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

  function showCreations(_creation: Creation, _index: string): void {
    let div: HTMLDivElement = document.createElement("div");
    div.classList.add("entry");
    div.id = _index;
    div.appendChild(createSpan(_creation.name, "name"));

    let button: HTMLButtonElement = document.createElement("button");
    button.innerText = "Delete";
    button.addEventListener("click", deleteEntry);
    div.appendChild(button);

    let display: HTMLElement | null = document.querySelector("#savedCreations");
    display.appendChild(div);
  }

  function createSpan(_content: string | number, _className: string): HTMLSpanElement {
    let span: HTMLSpanElement = document.createElement("span");
    span.innerText = _content.toString() + " ";
    span.classList.add(_className);
    return span;
  }

  async function sendEntry(): Promise<void> {
    let form: HTMLFormElement = <HTMLFormElement>document.querySelector("form");
    let formData: FormData = new FormData(form);

    let entryData: Creation = {
      name: formData.get("name") as string,
      prize: getTotalPrice(formData),
      size: formData.get("size") as string,
      flavor: formData.get("flavor") as string,
      coat: formData.get("coat") as string,
      topping: formData.get("topping") as string,
    };

    let query: URLSearchParams = new URLSearchParams();
    query.set("command", "insert");
    query.set("collection", collection);
    query.set("data", JSON.stringify(entryData)); // Wandeln Sie das separate Objekt in JSON um

    let response: Response = await fetch(url + "?" + query.toString());
    let responseText: string = await response.text();
    console.log(responseText);

    updateEntries();
  }

  function handleChange(_event: Event): void {
    displayPrice();

  }

  function getTotalPrice(formData: FormData): number {
    let totalPrice: number = 0;

    for (let entry of formData) {
      let selector: string = "[value='" + entry[1] + "']";
      let ingredient: HTMLInputElement = <HTMLInputElement>document.querySelector(selector);

      if (ingredient !== null) {
        let inPrice: number = Number(ingredient.getAttribute("price"));
        totalPrice += inPrice;
      }
    }
    return totalPrice;
  }

  function displayPrice(): void {
    let showPrice: HTMLDivElement = <HTMLDivElement>document.querySelector("div#price");
    showPrice.innerHTML = "";

    let form: HTMLFormElement = <HTMLFormElement>document.querySelector("form");
    let formData: FormData = new FormData(form);

    let totalPrice: number = 0; // Variable für den Gesamtpreis

    for (let entry of formData) {

      let selector: string = "[value='" + entry[1] + "']";
      let ingredient: HTMLInputElement = <HTMLInputElement>document.querySelector(selector);

      if (ingredient !== null) {
        let inPrice: number = Number(ingredient.getAttribute("price"));
        totalPrice += inPrice;
      }
    }
    showPrice.innerHTML += "<p><strong>Total: €" + totalPrice.toFixed(2) + "</strong></p>";
  }

  async function updateEntries(): Promise<void> {
    let display: HTMLElement = <HTMLElement>document.querySelector("#savedCreations");
    display.innerText = "";

    let query: URLSearchParams = new URLSearchParams();
    query.set("command", "find");
    query.set("collection", collection);
    let response: Response = await fetch(url + "?" + query);

    let responseText: string = await response.text();
    displayData(responseText);
    let responseObject: { status: string; data: { [key: string]: Creation } } = JSON.parse(responseText);

    console.log(responseObject);
    console.log(responseText); //Hier wird die Collection angezeigt
  }

  async function deleteEntry(_event: Event): Promise<void> {
    let button: HTMLButtonElement = <HTMLButtonElement>_event.target;
    let parent: HTMLElement = <HTMLElement>button.parentElement;
    let parentID: string = parent.id;

    let query: URLSearchParams = new URLSearchParams();
    query.set("command", "delete");
    query.set("collection", collection);
    query.set("id", parentID);
    let response: Response = await fetch(url + "?" + query);

    let responseText: string = await response.text();
    console.log(responseText);
    updateEntries();
  }

  function drawShop(_event: Event): void {
    let canvas: HTMLCanvasElement | null = document.querySelector("canvas");
    if (!canvas)
      return;
    crc2 = <CanvasRenderingContext2D>canvas.getContext("2d");

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
    background = crc2.getImageData(0, 0, crc2.canvas.width, crc2.canvas.height);
  }
 
  function drawBackground(): void {
    let rectWidth = 70;
    let rectHeight = 50;
    let rows = crc2.canvas.height / rectHeight;
    let cols = crc2.canvas.width / rectWidth;

    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        let x = col * rectWidth - 40;
        let y = row * rectHeight;

        if (row % 2 !== 0) {
          x += rectWidth / 2;
        }

        let gradient = crc2.createLinearGradient(x, y, x + rectWidth, y + rectHeight);
        gradient.addColorStop(0, "hsl(229, 21%, 77%)");
        gradient.addColorStop(1, "hsl(277, 77%, 88%)");

        crc2.fillStyle = gradient;
        crc2.fillRect(x, y, rectWidth, rectHeight);

        crc2.strokeStyle = "hsl(229, 8%, 42%)";
        crc2.lineWidth = 2;
        crc2.strokeRect(x, y, rectWidth, rectHeight);
      }
    }
  }

  function drawOutside(): void {
    crc2.lineWidth = 5;
    crc2.fillStyle = "hsl(229, 8%, 67%)";
    crc2.strokeStyle = "hsl(0, 0%, 0%)";
    crc2.strokeRect(0, 550, 220, 150);
    crc2.fillRect(0, 550, 220, 150);

    crc2.save();
  }

  function drawTable(_position: IceCreamVector): void {
    let r: number = 80;

    crc2.save();
    crc2.translate(_position.x, _position.y);
    crc2.fillStyle = "hsl(35, 44%, 89%)";
    crc2.strokeStyle = "hsl(27, 30%, 77%)";
    crc2.lineWidth = 8;
    crc2.beginPath();
    crc2.arc(0, 0, r, 0, 2 * Math.PI);
    crc2.stroke();
    crc2.fill();
    crc2.closePath();
    crc2.restore();
  }

  function drawCounter(): void {
    crc2.fillStyle = "hsl(33, 43%, 92%)";
    crc2.fillRect(540, 50, 315, 220);
    crc2.save();
  }

  function drawInnerCounter(): void {
    crc2.fillStyle = "hsl(237, 0%, 40%)";
    crc2.fillRect(577, 60, 240, 140);
    crc2.save();
  }

  function drawContainer(_position: IceCreamVector): void {
    crc2.save();
    crc2.translate(_position.x, _position.y);
    let rectWidth = 45;
    let rectHeight = 65;
    let rows = 2;
    let cols = 5;

    let colors: string[] = [
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
        crc2.fillStyle = fillColor;
        crc2.fillRect(x, y, rectWidth, rectHeight);
        crc2.strokeStyle = "hsl(237, 0%, 18%)";
        crc2.lineWidth = 2;
        crc2.strokeRect(x, y, rectWidth, rectHeight);
      }
    }
    crc2.restore();
  }


  //function drawMoney()

  export function iceCreamSize(_size: Sizes): number {
    let sizeValue: number

    switch (_size) {
      case Sizes.Small:
        sizeValue = 1
        break;
      case Sizes.Medium:
        sizeValue = 2
        break;
      case Sizes.Large:
        sizeValue = 3
        break;
    }
    return sizeValue;
  }

  export function flavorColor(_flavor: Flavors): string {
    let color1: string = "";

    switch (_flavor) {
      case Flavors.Chocolate:
        color1 = "hsl(27, 70%, 19%)"
        break;
      case Flavors.Vanilla:
        color1 = "hsl(48, 70%, 84%)"
        break;
      case Flavors.Strawberry:
        color1 = "hsl(8, 73%, 68%)"
        break;
      case Flavors.Mint:
        color1 = "hsl(95, 73%, 80%)"
        break;
    }
    return color1;
  }

  export function coatColor(_coat: Coats): string {
    let color: string = "";

    switch (_coat) {
      case Coats.MilkChocolate:
        color = "hsl(32, 61%, 24%)"
        break;
      case Coats.DarkChocolate:
        color = "hsl(31, 70%, 8%)"
        break;
      case Coats.WhiteChocolate:
        color = "hsl(39, 70%, 70%)"
        break;
    }
    return color;
  }

  export function toppingsColor(_topping: Toppings): string {
    let color: string = "";
    
    switch (_topping) {
      case Toppings.Almond:
        color = "hsl(36, 43%, 65%)"
        break;
      case Toppings.RoseBlossoms:
        color = "hsl(312, 74%, 69%)"
        break;
      case Toppings.Gold:
        color = "hsl(43, 74%, 49%)"
        break;

    }
    return color;
  }
  
  
  
   /* export function checkCustomerMood (_position: Vector, _size: number){
    if (mood === Mood.Happy {
      drawGreenCustomer(_position,_size);
    } else if (mood === Mood.Unhappy) {
      drawYelCustomer(_position, _size);
    } else if (mood === Mood.Angry) {
      drawRedCustomer(_position, _size);
    }
  }*/

}







