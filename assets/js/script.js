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

    let majorCities = ["Atlanta,GA", "Austin,TX", "Washington,DC", "Tampa,FL", "Seattle,WA", "San Francisco,CA", "San Antonio, TX", "Salt Lake City",
        "Richmond, VA",
        "Raleigh, NC",
        "Pittsburgh, PA",
        "Phoenix, AZ",
        "Philadelphia, PA",
        "Orlando, FL",
        "Omaha, NE",
        "Oklahoma City, OK",
        "New York, NY",
        "New Orleans, LA",
        "Nashville, TN",
        "Los Angeles, CA",
        "Las Vegas, NV",
        "Dallas, TX",
        "Denver, CO",
        "Chicago, Il"]

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
let requestUrl2 = (teleportUrl + outputLocation + "/scores/");
//test url for usa jobs api
console.log(requestUrl1);
//test url for teleport api
console.log(requestUrl2);
//call 2 x api functions
getApi1()
getApi2()

    // USA Jobs API
    function getApi1() {
        // let requestUrl = "https://data.usajobs.gov/api/search?Keyword=Software&LocationName=reston%20va&?ResultsPerPage=10"
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
        // let requestUrl = "https://data.usajobs.gov/api/search?Keyword=Software&LocationName=reston%20va&?ResultsPerPage=10"
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
