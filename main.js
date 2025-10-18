let center = document.querySelector(".center")
let second = document.querySelector(".second")

function generate(key,value) {
    let div = document.createElement("div")
    div.classList.add("container")

    let keyDiv = document.createElement("div")
    keyDiv.classList.add("key")
    keyDiv.innerHTML = key

    let valueDiv = document.createElement("div")
    valueDiv.classList.add("value")
    valueDiv.innerHTML = value

    if (key ==="Flag") {
        let img = document.createElement("img")
        img.src = value
        img.alt = "Country Flag"
        valueDiv.appendChild(img)
    }
    else if (key ==="Map") {
        let a = document.createElement("a")
        a.href = value
        a.target = "_blank"
        a.innerHTML = "Click to open Google Map"
        valueDiv.appendChild(a)

    }
    else
        valueDiv.innerHTML = value

    div.appendChild(keyDiv)
    div.appendChild(valueDiv)
    second.appendChild(div)
}

function getAPIData() {
    let request = new XMLHttpRequest()
    let Country = "Bharat"

    let input = document.getElementById("Country")
    if (input.value !=="")
        Country = input.value

    request.open("get", "https://restcountries.com/v3.1/name/" + Country)
    request.send()

    request.addEventListener("load", () => {
        center.removeChild(second)
        second = document.createElement("div")
        second.classList.add("second")
        center.appendChild(second)

        let data = JSON.parse(request.responseText)
        data.forEach(item => {
            generate("Name", item.name.official ??"N/A")
            generate("Capital", item.capital??"N/A")
            generate("Flag", item.flags.png??"N/A")
            generate("Population", item.population ?? "N/A")
            generate("Area", item.area??"N/A")
            generate("Region", item.region??"N/A")
            generate("Subregion", item.subregion??"N/A")
            generate("Independent", item.independent?? "N/A")
            generate("UnMember", item.unMember??"N/A")
            generate("LandLock", item.landlocked??"N/A")
            generate("TimeZone", item.timezones??"N/A")
            generate("Languages", Object.values(item.languages))
            generate("Currencies", Object.values(Object.values(item.currencies)[0]))
            generate("Map", item.maps.googleMaps)

            const div = document.createElement("div")
            div.style.height = "30px"
            div.style.backgroundColor = "white"
            second.appendChild(div)
        });
    })
}

getAPIData()