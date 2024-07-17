// console.log("hello")
let eyeIcon = document.getElementById("password_hide");
let selectState = document.getElementById("inputState");
let selectCity = document.getElementById("city");
console.log("selectCity:", selectCity);
let selectCountry = document.getElementById("multipleCountries");
let overlay = document.getElementById("overlayFooter");
// let (code in countryList);{
//   console.log(code);
// }
let country_code;
// let city_code="https://api.countrystatecity.in/v1/countries/IN/cities"
let state;
let city;
console.log("city:", city);
let country;
let showIcon = document.getElementById("pass_icon");

showIcon.onclick = function () {
  if (eyeIcon.type == "password") {
    eyeIcon.type = "text";
    showIcon.src = "pass_show.png";
  } else {
    eyeIcon.type = "password";
    showIcon.src = "pass_hide.png";
  }
};

let second_showIcon = document.getElementById("overlayPass_icon");
let second_eyeIcon = document.getElementById("password");

second_showIcon.onclick = function () {
  if (second_eyeIcon.type == "password") {
    second_eyeIcon.type = "text";
    second_showIcon.src = "pass_show.png";
  } else {
    second_eyeIcon.type = "password";
    second_showIcon.src = "pass_hide.png";
  }
};

let getState = async (country_code) => {
  state = await fetch(
    `https://api.countrystatecity.in/v1/countries/${country_code}/states`,
    {
      headers: {
        "X-CSCAPI-KEY":
          "TXlkV2x4cnRaVnJPd3MyZ2NjYjFzdFcyck5DMzdsczFxSVJJb3NpRQ==",
      },
    }
  );
  state = await state.json();
  appendState(state);
};

// getState();

let appendState = (state = []) => {
  console.log("state:", state);
  selectState.innerHTML = null;
  state.length > 0 &&
    state.forEach((element) => {
      let option = document.createElement("option");
      option.innerText = element.name;
      option.value = element.iso2;

      selectState.append(option);
    });
};
let handelChangeState = () => {
  let selectedState = selectState.value;
  // console.log("selectedState:", selectedState);
  getCity(selectedState);
};

let getCity = async (selectedState) => {
  // console.log("selectedState:", selectedState);
  // console.log("country_code:", country_code);

  city = await fetch(
    `https://api.countrystatecity.in/v1/countries/${country_code}/states/${selectedState}/cities`,
    {
      headers: {
        "X-CSCAPI-KEY":
          "TXlkV2x4cnRaVnJPd3MyZ2NjYjFzdFcyck5DMzdsczFxSVJJb3NpRQ==",
      },
    }
  );
  city = await city.json();
  appendCity(city);
};

let appendCity = (city = []) => {
  selectCity.innerHTML = null;
  city.length > 0 &&
    city.forEach((element) => {
      console.log("element:", element);
      let option = document.createElement("option");
      option.innerText = element.name;
      option.value = element.name;

      selectCity.append(option);
    });
};
let handelChangeCity = () => {
  city = selectCity.value;
  console.log("city:", city);
};

let getCountry = async () => {
  country = await fetch(`https://api.countrystatecity.in/v1/countries`, {
    headers: {
      "X-CSCAPI-KEY":
        "TXlkV2x4cnRaVnJPd3MyZ2NjYjFzdFcyck5DMzdsczFxSVJJb3NpRQ==",
    },
  });
  country = await country.json();
  appendCountry(country);
};

let appendCountry = (country) => {
  country.forEach((element) => {
    let option = document.createElement("option");
    option.innerText = element.name;
    option.value = element.iso2;
    selectCountry.append(option);
  });
};

let handelChangeCountry = () => {
  // console.log(selectCountry)
  country_code = selectCountry.value;
  // console.log(selectedCountry);
  getState(country_code);
  // let countryCode = countryList[selectedCountry];
  // console.log(countryCode)
  // let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
  // let img = selectCountry.parentElement.querySelector("img");
  // img.src = newSrc;
};
let submitSignUpForm = () => {
  // console.log("signUp");
  let payload = {};

  let first_name = document.getElementById("first");
  let last_name = document.getElementById("last");
  let email_add = document.getElementById("email");
  let overlay_password = document.getElementById("password");
  let overlay_date = document.getElementById("date");

  // let overlay_gender = document.getElementById("genderForm");
  payload.first_name = first_name.value;
  payload.last_name = last_name.value;
  payload.email_add = email_add.value;
  payload.overlay_password = overlay_password.value;
  payload.overlay_date = overlay_date.value;

  payload.selectState = selectState.value;
  // payload.selectCity=selectCity.value
  payload.input_city = city;
  payload.country_code = country_code;
  // payload.overlay_gender = overlay_gender.value;
  console.log(payload);
};
let closeSignupForm=()=>{
  let signUp=document.getElementById("signupForm")
  signUp.style.display="none"
}
let createForm=()=>{
  let openForm=document.getElementById("signupForm")
  openForm.style.display="block"
}
getCountry();

