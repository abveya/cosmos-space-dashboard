let todayInSpaceSection = document.getElementById("today-in-space");
let launchesSection = document.getElementById("launches");
let planetsSection = document.getElementById("planets");
let mainSections = document.querySelectorAll(".app-section");
let links = document.querySelectorAll("aside nav a");
let planetsCard = document.getElementById("planets-grid");
let planetDetailImage = document.getElementById("planet-detail-image");
let planetDetailName = document.getElementById("planet-detail-name");
let planetDetailDesc = document.getElementById("planet-detail-description");
let planetDistance = document.getElementById("planet-distance");
let planetRadius = document.getElementById("planet-radius");
let planetMass = document.getElementById("planet-mass");
let planetDensity = document.getElementById("planet-density");
let planetOrbitalPeriod = document.getElementById("planet-orbital-period");
let planetRotation = document.getElementById("planet-rotation");
let moons = document.getElementById("planet-moons");
let planetGravity = document.getElementById("planet-gravity");
let planetDiscover = document.getElementById("planet-discoverer");
let planetDiscoverDate = document.getElementById("planet-discovery-date");
let planetBody = document.getElementById("planet-body-type");
let planetVolume = document.getElementById("planet-volume");
let planetsFacts = document.getElementById("planet-facts");
let planetPerihelion = document.getElementById("planet-perihelion");
let planetAphelion = document.getElementById("planet-aphelion");
let planetEccentricity = document.getElementById("planet-eccentricity");
let planetInclination = document.getElementById("planet-inclination");
let planetAxialTilt = document.getElementById("planet-axial-tilt");
let planetTemp = document.getElementById("planet-temp");
let planetEscape = document.getElementById("planet-escape");
let apodDate = document.getElementById("apod-date");
let apodImage = document.getElementById("apod-image");
let apodTitle = document.getElementById("apod-title");
let apodDateDetail = document.getElementById("apod-date-detail");
let apodExplanation = document.getElementById("apod-explanation");
let apodDateInfo = document.getElementById("apod-date-info");
let apodMediaType = document.getElementById("apod-media-type");
let todayApodBtn = document.getElementById("today-apod-btn");
let apodLoading = document.getElementById("apod-loading");
let btnLayer = document.getElementById("button-layer");
let showResolution = document.getElementById("show-full-resolution");
let dateInput = document.getElementById("apod-date-input");
let dateDispay = document.getElementById("date-display");
let loadBtn = document.getElementById("load-date-btn");
const API_KEY = 'DmQgC6MCQfgFJ7czbnRJPbBDMtwd8N7kp7hpggJN';


//sidebar logic 
function sidebarLogic() {
    for (let i = 0; i < links.length; i++) {
        links[i].addEventListener("click", function () {
            let selectedSection;

            for (let x = 0; x < mainSections.length; x++) {
                mainSections[x].classList.add("hidden")
            }

            for (let j = 0; j < links.length; j++) {
                links[j].classList.remove("bg-blue-500/10")
                links[j].classList.remove("text-blue-400")
                links[j].classList.add("hover:bg-slate-800")
                links[j].classList.add("text-slate-300")
            }

            if (links[i].getAttribute("href") == "#today-in-space") {
                selectedSection = todayInSpaceSection;
                links[i].classList.add("bg-blue-500/10")
                links[i].classList.add("text-blue-400")
                links[i].classList.remove("hover:bg-slate-800")
                links[i].classList.remove("text-slate-300")
            }
            else if (links[i].getAttribute("href") == "#launches") {
                selectedSection = launchesSection;
                links[i].classList.add("bg-blue-500/10")
                links[i].classList.add("text-blue-400")
                links[i].classList.remove("hover:bg-slate-800")
                links[i].classList.remove("text-slate-300")
            }
            else if (links[i].getAttribute("href") == "#planets") {
                selectedSection = planetsSection;
                links[i].classList.add("bg-blue-500/10")
                links[i].classList.add("text-blue-400")
                links[i].classList.remove("hover:bg-slate-800")
                links[i].classList.remove("text-slate-300")

            }

            if (selectedSection) {
                selectedSection.classList.remove("hidden")
            }
        })
    }
}

sidebarLogic()

//launches logic

let launches = []
async function getLaunches() {
    try {
        let response = await fetch(`https://lldev.thespacedevs.com/2.3.0/launches/upcoming/?limit=10`);
        if (!response.ok) {
            throw new Error("Failed to fetch NASA data");
        }
        let data = await response.json();
        launches = data.results;
        displayStaticLaunches();
        displayLaunches()
    } catch (error) {
        console.log(error)
        document.getElementById("featured-launch").innerHTML = `<p class="w-full flex justify-center" style="font-size:17px;">Please try again...</p>`
    }
}

function displayStaticLaunches() {
    let launchDate = new Date(launches[0].net)
    let launchDateFormat = launchDate.toLocaleDateString("en-US",
        {
            weekday: "long",
            month: "long",
            day: "2-digit",
            year: "numeric"
        }
    )
    let launchTimeFormat = launchDate.toLocaleString("en-US", {
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
        timeZone: "UTC"
    }) + " UTC";

    container = `
   <div class="relative bg-slate-800/30 border border-slate-700 rounded-3xl overflow-hidden group hover:border-blue-500/50 transition-all"
            >
              <div
                class="absolute inset-0 bg-linear-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity"
              ></div>
              <div class="relative grid grid-cols-1 lg:grid-cols-2 gap-6 p-8">
                <div class="flex flex-col justify-between">
                  <div>
                    <div class="flex items-center gap-3 mb-4">
                      <span
                        class="px-4 py-1.5 bg-blue-500/20 text-blue-400 rounded-full text-sm font-semibold flex items-center gap-2"
                      >
                        <i class="fas fa-star"></i>
                        Featured Launch
                      </span>
                      <span
                        class="px-4 py-1.5 bg-green-500/20 text-green-400 rounded-full text-sm font-semibold"
                      >
                        Go
                      </span>
                    </div>
                    <h3 class="text-3xl font-bold mb-3 leading-tight">
                      ${launches[0].name}
                    </h3>
                    <div
                      class="flex flex-col xl:flex-row xl:items-center gap-4 mb-6 text-slate-400"
                    >
                      <div class="flex items-center gap-2">
                        <i class="fas fa-building"></i>
                        <span>${launches[0].launch_service_provider.name}</span>
                      </div>
                      <div class="flex items-center gap-2">
                        <i class="fas fa-rocket"></i>
                        <span>${launches[0].rocket.configuration.name}</span>
                      </div>
                    </div>
                    <div
                      class="inline-flex items-center gap-3 px-6 py-3 bg-linear-to-r from-blue-500/20 to-purple-500/20 rounded-xl mb-6"
                    >
                      <i class="fas fa-clock text-2xl text-blue-400"></i>
                      <div>
                        <p class="text-2xl font-bold text-blue-400">2</p>
                        <p class="text-xs text-slate-400">Days Until Launch</p>
                      </div>
                    </div>
                    <div class="grid xl:grid-cols-2 gap-4 mb-6">
                      <div class="bg-slate-900/50 rounded-xl p-4">
                        <p
                          class="text-xs text-slate-400 mb-1 flex items-center gap-2"
                        >
                          <i class="fas fa-calendar"></i>
                          Launch Date
                        </p>
                        <p class="font-semibold">${launchDateFormat}</p>
                      </div>
                      <div class="bg-slate-900/50 rounded-xl p-4">
                        <p
                          class="text-xs text-slate-400 mb-1 flex items-center gap-2"
                        >
                          <i class="fas fa-clock"></i>
                          Launch Time
                        </p>
                        <p class="font-semibold">${launchTimeFormat}</p>
                      </div>
                      <div class="bg-slate-900/50 rounded-xl p-4">
                        <p
                          class="text-xs text-slate-400 mb-1 flex items-center gap-2"
                        >
                          <i class="fas fa-map-marker-alt"></i>
                          Location
                        </p>
                        <p class="font-semibold text-sm">${launches[0].pad.location.name}</p>
                      </div>
                      <div class="bg-slate-900/50 rounded-xl p-4">
                        <p
                          class="text-xs text-slate-400 mb-1 flex items-center gap-2"
                        >
                          <i class="fas fa-globe"></i>
                          Country
                        </p>
                        <p class="font-semibold">${launches[0].pad.country.name}</p>
                      </div>
                    </div>
                    <p class="text-slate-300 leading-relaxed mb-6">
                     ${launches[0].mission.description}
                    </p>
                  </div>
                  <div class="flex flex-col md:flex-row gap-3">
                    <button
                      class="flex-1 self-start md:self-center px-6 py-3 bg-blue-500 rounded-xl hover:bg-blue-600 transition-colors font-semibold flex items-center justify-center gap-2"
                    >
                      <i class="fas fa-info-circle"></i>
                      View Full Details
                    </button>
                    <div class="icons self-end md:self-center">
                      <button
                        class="px-4 py-3 bg-slate-700 rounded-xl hover:bg-slate-600 transition-colors"
                      >
                        <i class="far fa-heart"></i>
                      </button>
                      <button
                        class="px-4 py-3 bg-slate-700 rounded-xl hover:bg-slate-600 transition-colors"
                      >
                        <i class="fas fa-bell"></i>
                      </button>
                    </div>
                  </div>
                </div>
                <div class="relative">
                  <div
                    class="relative h-full min-h-[400px] rounded-2xl overflow-hidden bg-slate-900/50"
                  >
                    <!-- Placeholder image/icon since we can't load external images reliably without correct URLs -->
                    <img src="${launches[0].image?.image_url || 'images/launch-placeholder.png'}" class="w-full h-full object-cover" alt="${launches[0].name}" 
                     onerror="showPlaceholder(this)"/>
                    <div
                      class="absolute inset-0 bg-linear-to-t from-slate-900 via-transparent to-transparent"
                    ></div>
                  </div>
                </div>
              </div>
            </div>
    `;

    document.getElementById("featured-launch").innerHTML = container;

}

function displayLaunches() {
    let container = '';
    for (let i = 1; i < launches.length; i++) {
        let launchDate = new Date(launches[i].net);
        let launchDateFormat = launchDate.toLocaleString("en-US", {
            month: "short",
            day: "2-digit",
            year: "numeric"
        });
        let launchTimeFormat = launchDate.toLocaleString("en-US", {
            hour: "numeric",
            minute: "2-digit",
            hour12: true,
            timeZone: "UTC"

        }) + " UTC";
        container +=
            `<div
              class="bg-slate-800/50 border border-slate-700 rounded-2xl overflow-hidden hover:border-blue-500/30 transition-all group cursor-pointer"
            >
              <div
                class="relative h-48 bg-slate-900/50 flex items-center justify-center"
              >
                <img src="${launches[i].image.image_url}" class="w-full h-full object-cover" alt="${launches[i].name}"
                onerror="showPlaceholder(this)"/>
                <div class="absolute top-3 right-3">
                  <span
                    class="px-3 py-1 bg-green-500/90 text-white backdrop-blur-sm rounded-full text-xs font-semibold"
                  >
                    Go
                  </span>
                </div>
              </div>
              <div class="p-5">
                <div class="mb-3">
                  <h4
                    class="font-bold text-lg mb-2 line-clamp-2 group-hover:text-blue-400 transition-colors"
                  >
                    ${launches[i].name}
                  </h4>
                  <p class="text-sm text-slate-400 flex items-center gap-2">
                    <i class="fas fa-building text-xs"></i>
                    ${launches[i].launch_service_provider.name}
                  </p>
                </div>
                <div class="space-y-2 mb-4">
                  <div class="flex items-center gap-2 text-sm">
                    <i class="fas fa-calendar text-slate-500 w-4"></i>
                    <span class="text-slate-300">${launchDateFormat}</span>
                  </div>
                  <div class="flex items-center gap-2 text-sm">
                    <i class="fas fa-clock text-slate-500 w-4"></i>
                    <span class="text-slate-300">${launchTimeFormat}</span>
                  </div>
                  <div class="flex items-center gap-2 text-sm">
                    <i class="fas fa-rocket text-slate-500 w-4"></i>
                    <span class="text-slate-300">${launches[i].rocket.configuration.name}</span>
                  </div>
                  <div class="flex items-center gap-2 text-sm">
                    <i class="fas fa-map-marker-alt text-slate-500 w-4"></i>
                    <span class="text-slate-300 line-clamp-1">${launches[i].pad.location.name}</span>
                  </div>
                </div>
                <div
                  class="flex items-center gap-2 pt-4 border-t border-slate-700"
                >
                  <button
                    class="flex-1 px-4 py-2 bg-slate-700 rounded-lg hover:bg-slate-600 transition-colors text-sm font-semibold"
                  >
                    Details
                  </button>
                  <button
                    class="px-3 py-2 bg-slate-700 rounded-lg hover:bg-slate-600 transition-colors"
                  >
                    <i class="far fa-heart"></i>
                  </button>
                </div>
              </div>
            </div>
        `
    }

    document.getElementById("launches-grid").innerHTML = container
}

function showStaticPlaceholder(image) {
    image.outerHTML =
        `<div class="flex items-center justify-center h-full min-h-[400px] bg-slate-800">
        <i class="fas fa-rocket text-9xl text-slate-700/50"></i>
    </div>`
}

function showPlaceholder(image) {
    image.outerHTML = `<i class='fas fa-space-shuttle text-5xl text-slate-700'></i>`
}

getLaunches()


//planets logic 

let planet = [];

function showPlanetError() {
    planetDetailName.innerHTML = "Invalid Value";
    planetDetailDesc.innerHTML = "Invalid Value";
    planetDetailImage.setAttribute("src", `images/favicon.png`);
    planetDetailImage.setAttribute("alt", `planet image`);
    planetDistance.innerHTML = "Invalid Value";
    planetRadius.innerHTML = "Invalid Value";
    planetMass.innerHTML = "Invalid Value";
    planetDensity.innerHTML = "Invalid Value";
    planetOrbitalPeriod.innerHTML = "Invalid Value";
    planetRotation.innerHTML = "Invalid Value";
    moons.innerHTML = "Invalid Value";
    planetGravity.innerHTML = "Invalid Value";
    planetDiscover.innerHTML = "Invalid Value";
    planetDiscoverDate.innerHTML = "Invalid Value";
    planetBody.innerHTML = "Invalid Value";
    planetVolume.innerHTML = "Invalid Value";
    planetPerihelion.innerHTML = "Invalid Value";
    planetAphelion.innerHTML = "Invalid Value";
    planetEccentricity.innerHTML = "Invalid Value";
    planetInclination.innerHTML = "Invalid Value";
    planetAxialTilt.innerHTML = "Invalid Value";
    planetTemp.innerHTML = "Invalid Value";
    planetEscape.innerHTML = "Invalid Value";
}

async function getPlanets() {
    try {
        let response = await fetch(`https://solar-system-opendata-proxy.vercel.app/api/planets`);
        if (!response.ok) {
            throw new Error("Failed to fetch NASA data");
        }
        let data = await response.json();
        planet = data.bodies;
        displayHeadPlanet();
        showFirstDetailsPlanet();
        showDetails();
        displayTable();
    } catch (error) {
        showPlanetError()
    }
}

function displayHeadPlanet() {
    let container = ``;
    for (let i = 0; i < planet.length; i++) {

        let planetColor = "";
        let mouseOverBorderColor = "";

        if (planet[i].id === "uranus") {
            planetColor = "#06b6d4";
            mouseOverBorderColor = "#06b6d480";
        } else if (planet[i].id === "neptune") {
            planetColor = "#2563eb";
            mouseOverBorderColor = "#2563eb80";
        } else if (planet[i].id === "jupiter") {
            planetColor = "#fb923c";
            mouseOverBorderColor = "#fb923c80";
        } else if (planet[i].id === "mars") {
            planetColor = "#ef4444";
            mouseOverBorderColor = "#ef444480";
        } else if (planet[i].id === "mercure") {
            planetColor = "#eab308";
            mouseOverBorderColor = "#eab30880";
        } else if (planet[i].id === "saturne") {
            planetColor = "#facc15";
            mouseOverBorderColor = "#facc1580";
        } else if (planet[i].id === "terre") {
            planetColor = "#3b82f6";
            mouseOverBorderColor = "#3b82f680";
        } else if (planet[i].id === "venus") {
            planetColor = "#f97316";
            mouseOverBorderColor = "#f9731680";
        }


        container += `
    <div class="planet-card bg-slate-800/50 border border-slate-700 rounded-2xl p-4 transition-all cursor-pointer group"
            data-planet-id="${planet[i].id}" style="--planet-color: ${planetColor}" onmouseover="this.style.borderColor='${mouseOverBorderColor}'"
            onmouseout="this.style.borderColor='#334155'">
            <div class="relative mb-3 h-24 flex items-center justify-center">
              <img class="w-20 h-20 object-contain group-hover:scale-110 transition-transform"
                src="${planet[i].image}" alt="${planet[i].englishName}" />
            </div>
            <h4 class="font-semibold text-center text-sm">${planet[i].englishName}</h4>
            <p class="text-xs text-slate-400 text-center">${(planet[i].semimajorAxis / 149597870.7).toFixed(2)}</p>
          </div>`

    }
    document.getElementById("planets-grid").innerHTML = container
}

function showFirstDetailsPlanet() {
    for (let i = 0; i < planet.length; i++) {
        if (planet[i].englishName.toLowerCase() == "earth") {
            planetDetailName.innerHTML = planet[i].englishName;
            planetDetailDesc.innerHTML = planet[i].description;
            planetDetailImage.setAttribute("src", `images/${planet[i].englishName.toLowerCase()}.png`);
            planetDistance.innerHTML = (planet[i].semimajorAxis / 1000000).toFixed(1) + "M km";
            planetRadius.innerHTML = planet[i].meanRadius + " km";
            planetMass.innerHTML = planet[i].mass.massValue + " x " + "10^" + planet[i].mass.massExponent + " kg";
            planetDensity.innerHTML = (planet[i].density).toFixed(2) + " g/cm³";
            planetOrbitalPeriod.innerHTML = planet[i].sideralOrbit.toFixed(2) + " days";
            planetRotation.innerHTML = planet[i].sideralRotation.toFixed(2) + " hours";
            moons.innerHTML = planet[i].moons.length
            planetGravity.innerHTML = planet[i].gravity.toFixed(2) + " m/s²";
            planetDiscover.innerHTML = planet[i].discoveredBy || "Known since antiquity";
            planetDiscoverDate.innerHTML = planet[i].discoveryDate || "Ancient times";
            planetBody.innerHTML = planet[i].bodyType;
            planetVolume.innerHTML = planet[i].vol.volValue + " x " + "10^" + planet[i].vol.volExponent + " km³";
        }
    }
    ShowPlanetStaticFacts();
    ShowOrbitalCharacteristicsStatic()
}
let card = "";

function showDetails() {
    planetsCard.addEventListener("click", function ({ target }) {
        card = target.closest(".planet-card");
        for (let i = 0; i < planet.length; i++) {
            if (planet[i].id == card.getAttribute("data-planet-id")) {
                planetDetailName.innerHTML = planet[i].englishName;
                planetDetailDesc.innerHTML = planet[i].description;
                planetDetailImage.setAttribute("src", `images/${planet[i].englishName.toLowerCase()}.png`);
                planetDetailImage.setAttribute("alt", `${planet[i].englishName}`);
                planetDistance.innerHTML = (planet[i].semimajorAxis / 1000000).toFixed(1) + "M km";
                planetRadius.innerHTML = planet[i].meanRadius + " km";
                planetMass.innerHTML = planet[i].mass.massValue + " x " + "10^" + planet[i].mass.massExponent + " kg";
                planetDensity.innerHTML = (planet[i].density).toFixed(2) + " g/cm³";
                planetOrbitalPeriod.innerHTML = planet[i].sideralOrbit.toFixed(2) + " days";
                planetRotation.innerHTML = planet[i].sideralRotation.toFixed(2) + " hours";
                moons.innerHTML = planet[i].moons?.length || 0
                planetGravity.innerHTML = planet[i].gravity.toFixed(2) + " m/s²";
                planetDiscover.innerHTML = planet[i].discoveredBy || "Known since antiquity";
                planetDiscoverDate.innerHTML = planet[i].discoveryDate || "Ancient times";
                planetBody.innerHTML = planet[i].bodyType;
                planetVolume.innerHTML = planet[i].vol.volValue + " x " + "10^" + planet[i].vol.volExponent + " km³";
            }
        }
        ShowPlanetFacts()
        ShowOrbitalCharacteristics()
    })
}

function ShowPlanetFacts() {

    let container = "";
    for (let i = 0; i < planet.length; i++) {
        let facts = [
            `Mass: ${planet[i].mass.massValue} × 10^${planet[i].mass.massExponent} kg`,
            `Surface gravity: ${planet[i].gravity.toFixed(2)} m/s²`,
            `Density: ${planet[i].density} g/cm³`,
            `Axial tilt: ${planet[i].axialTilt.toFixed(2)}°`
        ];
        if (planet[i].id == card.getAttribute("data-planet-id")) {
            for (let j = 0; j < facts.length; j++) {
                container +=
                    `
            <li class="flex items-start">
                  <i class="fas fa-check text-green-400 mt-1 mr-2"></i>
                  <span class="text-slate-300">${facts[j]}</span>
                </li>
            `
            }
        }
    }

    document.getElementById("planet-facts").innerHTML = container;
}


function ShowPlanetStaticFacts() {

    let container = "";
    for (let i = 0; i < planet.length; i++) {
        let facts = [
            `Mass: ${planet[i].mass.massValue} × 10^${planet[i].mass.massExponent} kg`,
            `Surface gravity: ${planet[i].gravity.toFixed(2)} m/s²`,
            `Density: ${planet[i].density} g/cm³`,
            `Axial tilt: ${planet[i].axialTilt.toFixed(2)}°`
        ];
        if (planet[i].englishName.toLowerCase() == "earth") {
            for (let j = 0; j < facts.length; j++) {
                container +=
                    `
            <li class="flex items-start">
                <i class="fas fa-check text-green-400 mt-1 mr-2"></i>
                <span class="text-slate-300">${facts[j]}</span>
            </li>
            `
            }
        }
    }

    document.getElementById("planet-facts").innerHTML = container;
}


function ShowOrbitalCharacteristics() {

    for (let i = 0; i < planet.length; i++) {
        if (planet[i].id == card.getAttribute("data-planet-id")) {
            planetPerihelion.innerHTML = (planet[i].perihelion / 1000000).toFixed(1) + " M km";
            planetAphelion.innerHTML = (planet[i].aphelion / 1000000).toFixed(1) + " M km";
            planetEccentricity.innerHTML = planet[i].eccentricity;
            planetInclination.innerHTML = planet[i].inclination.toFixed(2) == 0.00 ? "N/A" : planet[i].inclination.toFixed(2) + "°";
            planetAxialTilt.innerHTML = planet[i].axialTilt.toFixed(2) + "°";
            planetTemp.innerHTML = planet[i].avgTemp + "°C";
            planetEscape.innerHTML = (planet[i].escape / 1000).toFixed(2) + " km/s";
        }
    }

}


function ShowOrbitalCharacteristicsStatic() {

    for (let i = 0; i < planet.length; i++) {
        if (planet[i].englishName.toLowerCase() == "earth") {
            planetPerihelion.innerHTML = (planet[i].perihelion / 1000000).toFixed(1) + " M km";
            planetAphelion.innerHTML = (planet[i].aphelion / 1000000).toFixed(1) + " M km";
            planetEccentricity.innerHTML = planet[i].eccentricity;
            planetInclination.innerHTML = planet[i].inclination.toFixed(2) == 0.00 ? "N/A" : planet[i].inclination.toFixed(2) + "°";
            planetAxialTilt.innerHTML = planet[i].axialTilt.toFixed(2) + "°";
            planetTemp.innerHTML = planet[i].avgTemp + "°C";
            planetEscape.innerHTML = (planet[i].escape / 1000).toFixed(2) + " km/s";
        }
    }

}

function displayTable() {
    let container = ``
    let planetColor = ""
    let typeBgColor = ""
    let typeTextColor = ""

    for (let i = 0; i < planet.length; i++) {
        if (planet[i].id === "uranus") {
            planetColor = "#06b6d4";
        } else if (planet[i].id === "neptune") {
            planetColor = "#2563eb";
        } else if (planet[i].id === "jupiter") {
            planetColor = "#fdba74";
        } else if (planet[i].id === "mars") {
            planetColor = "#ef4444";
        } else if (planet[i].id === "mercure") {
            planetColor = "#6b7280";
        } else if (planet[i].id === "saturne") {
            planetColor = "#fde047";
        } else if (planet[i].id === "terre") {
            planetColor = "#3b82f6";
        } else if (planet[i].id === "venus") {
            planetColor = "#fb923c";
        }

        if (planet[i].type === "Terrestrial") {
            typeBgColor = "#f9731680";
            typeTextColor = "#fb923c"
        } else if (planet[i].type === "Ice Giant") {
            typeBgColor = "#3b82f680";
            typeTextColor = "#60a5fa"
        } else if (planet[i].type === "Gas Giant") {
            typeBgColor = "#a855f780";
            typeTextColor = "#c084fc"
        }
        container += `<tr class="hover:bg-slate-800/30 transition-colors">
                    <td class="px-4 md:px-6 py-3 md:py-4 sticky left-0 bg-slate-800 z-10">
                      <div class="flex items-center space-x-2 md:space-x-3">
                        <div class="w-6 h-6 md:w-8 md:h-8 rounded-full flex-shrink-0" style="background-color: ${planetColor}">
                        </div>
                        <span class="font-semibold text-sm md:text-base whitespace-nowrap">${planet[i].englishName}</span>
                      </div>
                    </td>
                    <td class="px-4 md:px-6 py-3 md:py-4 text-slate-300 text-sm md:text-base whitespace-nowrap">
                     ${(planet[i].semimajorAxis / 149597870.7).toFixed(2)}
                    </td>
                    <td class="px-4 md:px-6 py-3 md:py-4 text-slate-300 text-sm md:text-base whitespace-nowrap">
                      ${planet[i].meanRadius * 2}
                    </td>
                    <td class="px-4 md:px-6 py-3 md:py-4 text-slate-300 text-sm md:text-base whitespace-nowrap">
                      ${((planet[i].mass.massValue * 10 ** planet[i].mass.massExponent) / 5.9722e24).toFixed(3)}
                    </td>
                    <td class="px-4 md:px-6 py-3 md:py-4 text-slate-300 text-sm md:text-base whitespace-nowrap">
                      ${(planet[i].sideralOrbit / 365.25).toFixed(1)} years
                    </td>
                    <td class="px-4 md:px-6 py-3 md:py-4 text-slate-300 text-sm md:text-base whitespace-nowrap">
                      ${planet[i].moons?.length || 0}
                    </td>
                    <td class="px-4 md:px-6 py-3 md:py-4 whitespace-nowrap">
                      <span class="px-2 py-1 rounded text-xs" style="background-color:${typeBgColor}; color:${typeTextColor};" >${planet[i].type}</span>
                    </td>
                  </tr>`
    }
    document.getElementById("planet-comparison-tbody").innerHTML = container;
}

getPlanets()


//today in space logic

let apod = {};

function defaultDate() {
    let todayDate = new Date()
    let todatDateFormatInput = todayDate.toLocaleString("en-US",
        {
            month: "short",
            day: "2-digit",
            year: "numeric"
        }
    )
    dateDispay.innerHTML = todatDateFormatInput
}

function showLoading() {

    apodDate.innerHTML = "Astronomy Picture of the Day - Loading...";
    apodTitle.innerHTML = "Loading...";
    apodExplanation.innerHTML = "Loading Description...";
    apodDateDetail.innerHTML = "Loading...";
    apodDateInfo.innerHTML = "Loading...";
    apodMediaType.innerHTML = "Loading...";
    apodLoading.classList.remove("hidden");
    apodLoading.innerHTML = `
    <i class="fas fa-spinner fa-spin text-4xl text-blue-400 mb-4"></i>
                <p class="text-slate-400">Loading today's image...</p>`;
    apodImage.classList.add("hidden");
    btnLayer.classList.add("hidden");
}

function showApodError() {
    apodDate.innerHTML = "Astronomy Picture of the Day - Invalid Date";
    apodTitle.innerHTML = "";
    apodExplanation.innerHTML = "";
    apodDateDetail.innerHTML = "Invalid Date";
    apodDateInfo.innerHTML = "Invalid Date";
    apodMediaType.innerHTML = "Invalid";

    apodLoading.classList.remove("hidden");

    apodLoading.innerHTML = `
        <i class="fa-solid fa-triangle-exclamation
        text-4xl text-red-400 mb-4"></i>
         <p class="text-slate-400">Failed to load image</p>
    `;

    apodImage.classList.add("hidden");
    btnLayer.classList.add("hidden");
}

let date = new Date();
let maxDateFormat = date.toLocaleString("en-CA",
    {
        day: "2-digit",
        month: "numeric",
        year: "numeric"
    }
).split("/").join("-")
dateInput.setAttribute("max", maxDateFormat)
dateInput.value = maxDateFormat


async function getTodayInSpace() {
    defaultDate()
    showLoading()
    try {
        let response = await fetch(`https://api.nasa.gov/planetary/apod?api_key=${API_KEY}`);
        if (!response.ok) {
            throw new Error("Failed to fetch NASA data");
        }
        let data = await response.json();
        apod = data;
        displayApod()
    } catch (error) {
        showApodError()
    }
}

getTodayInSpace()

todayApodBtn.addEventListener("click", function () {
    getTodayInSpace();
});

async function getApodBasedDate() {
    defaultDate()
    showLoading()
    try {
        let selectedDate = dateInput.value
        let dateInputInput = new Date(selectedDate);
        let DateFormatInput = dateInputInput.toLocaleString("en-US",
            {
                month: "short",
                day: "2-digit",
                year: "numeric"
            })
        dateDispay.innerHTML = DateFormatInput;

        let response = await fetch(`https://api.nasa.gov/planetary/apod?api_key=${API_KEY}&date=${selectedDate}`);
        if (!response.ok) {
            throw new Error("Failed to fetch NASA data");
        }
        let data = await response.json();
        apod = data;
        displayApod(DateFormatInput)

    } catch (error) {
        showError()
    }
}

loadBtn.addEventListener("click", function () {
    getApodBasedDate()
})


dateInput.addEventListener("change", function () {
    let selectedDate = dateInput.value
    let dateInputInput = new Date(selectedDate);
    let DateFormatInput = dateInputInput.toLocaleString("en-US",
        {
            month: "short",
            day: "2-digit",
            year: "numeric"
        })
    dateDispay.innerHTML = DateFormatInput;
})

function displayApod(DateFormatInput) {
    if (!DateFormatInput) {
        let todayDate = new Date();

        DateFormatInput = todayDate.toLocaleDateString("en-US", {
            month: "short",
            day: "2-digit",
            year: "numeric"
        });
    }

    dateDispay.innerHTML = DateFormatInput
    apodDate.innerHTML = "Astronomy Picture of the Day - " + (DateFormatInput || "Invalid Date");
    apodLoading.classList.add("hidden");
    apodImage.classList.remove("hidden");
    btnLayer.classList.remove("hidden");

    showResolution.setAttribute("href", apod.hdurl)
    apodImage.setAttribute("src", apod.hdurl);
    apodImage.setAttribute("alt", apod.title || "NASA APOD");
    apodTitle.innerHTML = apod.title || "";
    apodDateDetail.innerHTML = `<i class="far fa-calendar mr-2"></i> ${DateFormatInput || "invalid-date"}`;
    apodExplanation.innerHTML = apod.explanation || "";
    apodDateInfo.innerHTML = DateFormatInput || "invalid-date";
    apodMediaType.innerHTML = apod.media_type || "image";
}