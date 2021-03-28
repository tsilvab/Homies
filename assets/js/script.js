// var formEl = $('#skills-form');
let formElement = $('#form');
let inputElement = $('#major-cities');
// var nameInputEl = $('#skill-name');
const inputKeyword = document.getElementById("input-keyword");
const inputLocation = document.getElementById("major-cities");
const searchBox = $('#search-now');
let teleportUrl = "https://api.teleport.org/api/urban_areas/slug:";
let usajobsUrl = "https://data.usajobs.gov/api/search?Keyword=";



$(function () {

    let majorCities = [
        "Atlanta, Georgia", 
        "Austin, Texas",
        "Chicago, Illinois", 
        "Dallas, Texas",
        "Denver, Colorado",
        "Las Vegas, Nevada",
        "Los Angeles, California",
        "Nashville, Tennessee",
        "New Orleans, Louisiana",
        "New York, New York",
        "Oklahoma City, Oklahoma",
        "Omaha, Nebraska",
        "Orlando, Florida",
        "Philadelphia, Pennsylvania",
        "Phoenix, Arizona",
        "Pittsburgh, Pennsylvania",
        "Raleigh, North Carolina",
        "Richmond, Virginia",
        "Salt Lake City, Utah",
        "San Antonio, Texas", 
        "San Francisco, California", 
        "Seattle, Washington", 
        "Tampa, Florida",
        "Washington, District of Columbia",
    ]

    $('#major-cities').autocomplete({
        source: majorCities,
    });
})



// var handleFormSubmit = function (event) {
//     event.preventDefault();

//function to capture both keyword and location search inputs and then construct two urls one for each api and run those get api functions in sub functions

function formSubmitHandler (event) {
event.preventDefault();
let outputKeyword = inputKeyword.value.trim();
console.log(outputKeyword);
inputKeyword.value = '';
let outputLocation = inputLocation.value.trim().toLowerCase();
console.log(outputLocation);
inputLocation.value = '';

// //construct URL for USA Jobs API
let requestUrl1 = (usajobsUrl + outputKeyword + "&LocationName=" + outputLocation);

// //construct URL for Teleport API by first manipulating the outputLocation var to remove coma and everything after it; otherwise teleport url would fail. This worked for 14 of 25 cities. 11 need special handing including DC, Tampa, SF and 8 cities with multi word names
let outputLocation2 = outputLocation.substring(0, outputLocation.indexOf(','));
let requestUrl2 = (teleportUrl + outputLocation2 + "/scores/");
//test url for usa jobs api
//test url for teleport api
//call 2 x api functions
getApi1()
getApi2()

    // USA Jobs API
    function getApi1() {
        fetch(requestUrl1, {
            headers: {
                'User-Agent': 'alexward1899@gmail.com',
                'Authorization-Key': 'vrqNHvNHvAnvDRpuB8CPO4FGUP9dUL1XqLHzzIoBIqs=',
            }
        })
            .then(function (response) {
                return response.json();
            }
            )
            .then(function (data) {
                console.log(data);
            })
    }

       // Teleport API
       function getApi2() {
        fetch(requestUrl2)
            .then(function (response) {
                return response.json();
            }
            )
            .then(function (data) {
                console.log(data);
            })
    }
}

 

//fire search on click. Consider changing to submit to allow searching with Enter or click
$(searchBox).on('click', formSubmitHandler)
