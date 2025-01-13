import got from "./data.js";
let buttons = document.querySelector(".buttons");
let searchBar = document.querySelector("#search-bar");

let gotData = got.houses;
buttons.addEventListener("click", (event) => {

  if (event.target.tagName === "BUTTON") {
    let houseName = event.target.id;
    buttonFunction(houseName);
  }
});

function buttonFunction(houseName) {
  let display = document.querySelector(".display");
  display.innerHTML = "";
  let family = gotData.find(
    (val) => val.name.toLowerCase() === houseName.toLowerCase()
  );
  if (family) {
    console.log(`${family} button clicked`);
    family.people.forEach((val) => {
      let cards = document.createElement("div");
      cards.classList = "card";

      cards.innerHTML = `<img src = "${val.image}"></img>
                      <h4>${val.name}</h4>
                        <p>${val.description}</p> 
                        <a href = ${val.wikiLink}>Know more</a>`;

      display.appendChild(cards);
    });
  }
}

searchBar.addEventListener("input", (event) => {
  let searchValue = event.target.value.toLowerCase();
  let display = document.querySelector(".display");
  display.innerHTML = "";

  let family = gotData.filter((val) => {
    return val.name.toLowerCase().includes(searchValue);
  });
  console.log(family);
  if (family.length > 0) {
    family.forEach((house) => {
      house.people.forEach((member) => {
        let cards = document.createElement("div");
        cards.classList = "card";
        cards.innerHTML = `<img src = "${member.image}"></img>
        <h4>${member.name}</h4>
        <p>${member.description}</p>
        <a href = " ${member.wikiLink} ">Know More</a>
        `;
        display.appendChild(cards);
      });
    });
  }
  else{
    let noResult  = document.createElement("p");
    noResult.textContent = "No result";
    display.appendChild(noResult);
  }
});
