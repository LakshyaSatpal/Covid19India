const form = document.querySelector(".search form");
const locationInput = document.querySelector(".search form input");
const preloader = document.querySelector(".preloader");
const place = document.querySelector(".place");
const confirmed = document.querySelector(".info-item.confirmed .value");
const deaths = document.querySelector(".info-item.deaths .value");
const recovered = document.querySelector(".info-item.recovered .value");
const matches = document.querySelector(".matches");

const formSubmitHandler = (e) => {
  e.preventDefault();
  const enteredLocation = locationInput.value.trim();
  const requiredIndex = finaldata.findIndex(
    (el) => el.province === enteredLocation
  );
  if (requiredIndex < 0) {
    place.innerHTML = "No such state in India";
    document.querySelector(".info").classList.add("info-hide");
    return;
  } else {
    document.querySelector(".info").classList.remove("info-hide");
    const requiredObj = finaldata[requiredIndex];
    place.innerHTML = requiredObj.keyId;
    confirmed.innerHTML = requiredObj.confirmed;
    deaths.innerHTML = requiredObj.deaths;
    recovered.innerHTML = requiredObj.recovered;
  }
  form.reset();
};

const findMatches = (word) => {
  const regex = new RegExp(word, "gi");
  const filteredStates = finaldata.filter((state) => {
    return state.province.match(regex);
  });
  return filteredStates;
};

let finaldata;
const getData = async () => {
  preloader.style.display = "block";
  const response = await fetch(
    "https://covid-19-coronavirus-statistics.p.rapidapi.com/v1/stats",
    {
      method: "GET",
      headers: {
        "x-rapidapi-key": "1670ac6ee7msh7d57d5715c0e2efp1c01e3jsn5f644c664792",
        "x-rapidapi-host": "covid-19-coronavirus-statistics.p.rapidapi.com",
      },
    }
  );
  finaldata = await response.json();
  finaldata = finaldata.data.covid19Stats.filter(
    (element) => element.country === "India"
  );
  console.log(finaldata);
  preloader.style.display = "none";
  place.innerHTML = "Enter your State in search box above";
};

function selectMatch(e) {
  if (!e.target.matches("li")) {
    return;
  }
  const finalvalue = e.target.innerText;
  locationInput.value = finalvalue;
  matches.style.display = "none";
}

function displayMatches() {
  const matchArray = findMatches(this.value);
  matches.style.display = "block";
  let html;
  if (matchArray.length === 1) {
    html = matchArray
      .map((state) => {
        return `
      <li class="only-match">
        ${state.province}
      </li>
      `;
      })
      .join("");
  } else {
    // const regex = new RegExp(this.value, "gi");
    html = matchArray
      .map((state) => {
        // const stateName = state.province.replace(
        //   regex,
        //   `<span class="highlight">${this.value}</span>`
        // );
        return `
        <li>
          ${state.province}
        </li>
      `;
      })
      .join("");
  }
  matches.innerHTML = html;
}

window.addEventListener("DOMContentLoaded", () => {
  getData();
});

form.addEventListener("submit", formSubmitHandler);
locationInput.addEventListener("keyup", displayMatches);
matches.addEventListener("click", selectMatch);
