const displayContainer = document.querySelector(".countries-container");
const inputSearch = document.querySelector("#inputSearch");
let countries = [];
let inputValue = "";
let range = 2000;
let sortCroissant = false;
let sortDecroissant = false;
let sortAlpha = true;
console.log();

let fetchCountries = async () => {
  await fetch(`https://restcountries.com/v3.1/all`)
    .then((res) => res.json())
    .then((data) => (countries = data));
  console.log(countries.slice(0, range));
};

let displayCountries = () => {
  let sortInc = countries.filter((e) => e.name.common.toLowerCase().startsWith(inputValue)).slice(0, range);

  if (sortCroissant) {
    sortInc = sortInc.sort((a, b) => {
      return a.population - b.population;
    });
  } else if (sortAlpha) {
    sortInc = sortInc.sort((a, b) => {
      return a.name.common < b.name.common ? -1 : a.name.common > b.name.common ? 1 : 0;
    });
  } else {
    sortInc = sortInc.sort((a, b) => {
      return b.population - a.population;
    });
  }
  //   sortInc = sortInc.filter((e) => e.length);
  console.log(sortInc + "lol");

  if (sortInc.length) {
    displayContainer.innerHTML = sortInc
      .map((countrie) => {
        return `<li>
            <img src="${countrie.flags.png}" alt="${countrie.flag.alt}">
            <h3>${countrie.name.common}</h3>
            <p>Population : ${countrie.population.toLocaleString("fr-FR")}</p>
            </li>`;
      })
      .join("");
  } else {
    displayContainer.innerHTML = `<h2>Aucun pays n'a ete trouve</h2>`;
  }
};

inputSearch.addEventListener("input", (e) => {
  inputValue = e.target.value.toLowerCase();
  fetchCountries().then(() => displayCountries());
});

inputRange.addEventListener("input", (e) => {
  rangeValue.innerHTML = e.target.value;
  range = e.target.value;
  fetchCountries().then(() => displayCountries());
});

minToMax.addEventListener("click", () => {
  sortCroissant = true;
  sortDecroissant = false;
  sortAlpha = false;
  fetchCountries().then(() => displayCountries());
});

alpha.addEventListener("click", () => {
  sortCroissant = false;
  sortDecroissant = false;
  sortAlpha = true;
  fetchCountries().then(() => displayCountries());
});

maxToMin.addEventListener("click", () => {
  sortCroissant = false;
  sortDecroissant = true;
  sortAlpha = false;
  fetchCountries().then(() => displayCountries());
});

addEventListener("load", () => {
  fetchCountries().then(() => displayCountries());
});
