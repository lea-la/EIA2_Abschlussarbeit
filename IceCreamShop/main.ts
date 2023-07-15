namespace IceCreamShop {

  window.addEventListener("load", handleLoad);
  let url: string = "https://webuser.hs-furtwangen.de/~langelea/database/";
  let collection: string = "IceCream";
  let form: HTMLFormElement;

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

  async function handleLoad(_event: Event): Promise<void> {

    updateEntries();

    let submitButton: HTMLInputElement = <HTMLInputElement>document.querySelector("input[type=submit]");
    submitButton.addEventListener("click", sendEntry);
    form = <HTMLFormElement>document.querySelector("form");
    let showButton: HTMLButtonElement = <HTMLButtonElement>document.querySelector("button");
    showButton.addEventListener("click", updateEntries);
    form.addEventListener("change", handleChange);
    displayPrice();
  }

  async function displayData(_offer: string): Promise<void> {
    let data: Data = JSON.parse(_offer);
    let creations: Creation[] = data["data"];

    for (var index in creations) {
      showCreations(creations[index], index);
    }
  }


  function showCreations(_creation: Creation, _index: string): void {
    let div: HTMLDivElement = document.createElement("div");
    div.classList.add("entry");
    div.id = _index;
    let display: HTMLElement | null = document.querySelector("#savedCreations");

    div.appendChild(createSpan(_creation.name, "name"));

    let button: HTMLButtonElement = document.createElement("button");
    button.innerText = "Delete";
    button.addEventListener("click", deleteEntry);
    div.appendChild(button);
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

    // Erstellen Sie ein separates JavaScript-Objekt, das die gewünschten Felder enthält
    let entryData: Creation = {
      name: formData.get("name") as string,
      prize: getTotalPrice(formData), // Fügen Sie den totalPrice hinzu
      size: formData.get("size") as string,
      flavor: formData.get("flavor") as string,
      coat: formData.get("coat") as string,
      topping: getToppings(formData), // Holen Sie sich alle ausgewählten Toppings
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

  function getToppings(formData: FormData): string {
    let toppings: string[] = [];
    formData.getAll("toppings").forEach((value: string) => {
      toppings.push(value);
    });
    return toppings.join(", ");
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
    console.log(responseText);
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
}