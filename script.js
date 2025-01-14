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
    family.people.forEach((val) => {
      createCard(val, display);
    });
  }
}

function createCard(member, display) {
  let cards = document.createElement("div");
  cards.classList = "card";
  cards.innerHTML = `
    <img src="${member.image}" alt="${member.name}">
    <h4>${member.name}</h4>
    <p>${member.description}</p>
    <a href="${member.wikiLink}" target="_blank">Know More</a>
  `;
  display.appendChild(cards);
}

function displayAllPeople() {
  let display = document.querySelector(".display");
  display.innerHTML = "";
  gotData.forEach((house) => {
    house.people.forEach((member) => {
      createCard(member, display);
    });
  });
}

searchBar.addEventListener("input", (event) => {
  let searchValue = event.target.value.toLowerCase();
  let display = document.querySelector(".display");
  display.innerHTML = "";

  if (searchValue === "") {
    displayAllPeople(); 
    return;
  }

  let filteredMembers = [];
  gotData.forEach((house) => {
    house.people.forEach((member) => {
      if (
        member.name.toLowerCase().includes(searchValue) ||
        house.name.toLowerCase().includes(searchValue)
      ) {
        filteredMembers.push(member);
      }
    });
  });

  if (filteredMembers.length > 0) {
    filteredMembers.forEach((member) => {
      createCard(member, display);
    });
  } else {
    let noResult = document.createElement("p");
    noResult.textContent = "No result";
    display.appendChild(noResult);
  }
});

displayAllPeople();
