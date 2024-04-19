// function to create elements
function element(tag, classname, id, text) {
  let tags = document.createElement(tag);
  tags.classList = classname;
  tags.id = id;
  tags.innerHTML = text;
  return tags;
}

let header = element("h1", "text-center", "title", "Rest-Countries");
let container = element("div", "container", "", "");
let row = element("div", "row", "", "");

let fdata = [];

const response = fetch("https://restcountries.com/v3.1/all");
response
  .then((data) => data.json())
  .then((ele) => {
    fdata = ele;
    for (let i = 0; i < ele.length; i++) {
      const col = document.createElement("div");
      col.classList = "col-sm-6 col-md-4 col-lg-4 col-xl-4 mt-2 mb-2";
      let capital = "";
      if (ele[i].capital == undefined) {
        capital = "Not know";
      } else {
        capital = ele[i].capital[0];
      }
      col.innerHTML = `
          <div class="card text-center h-100">
            <div class= "card-body">
              <div class= "card-text ">
                <div class="card-header"><h5 class= "text-center" id="cardTitle">${ele[i].name.common}</h5></div>
                <img src="${ele[i].flags.png}" class="card-img-top" alt="${ele[i].flags.alt}">
                <p class = "mt-3 ">Captial : ${capital}</p>
                <p>Region :${ele[i].region}</p>
                <p>Country Code : ${ele[i].cca3}</p>
                <button type="submit" class="btn btn-outline-light" onclick='weather(${i})'>Check Wether</button>      
              </div>   
            </div>
          </div>
          `;
      row.append(col);
    }
  })

container.append(row);
document.body.append(header, container);

function weather (id) {
  let lat = fdata[id].latlng[0];
  let lon = fdata[id].latlng[1];
  let weatherData = fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=a13652c92c17422b2f87837be131afaf`)
  weatherData
  .then((data)=>data.json())
  .then((ele)=>{
    alert(`It's ${Math.round((ele.main.temp)- 273.15)}* Celsius`)
  })
  
}

