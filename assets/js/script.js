var formEl = $('#skills-form');
var nameInputEl = $('#skill-name');
var dateInputEl = $('#datepicker');

var handleFormSubmit = function (event) {
    event.preventDefault();
    var nameInput = nameInputEl.val();
    var dateInput = dateInputEl.val();

    if (!nameInput || !dateInput) {
        console.log('You need to fill out the form!');
        return;
    }

    printSkills(nameInput, dateInput);

    nameInputEl.val('');
    dateInputEl.val('');
};

formEl.on('submit', handleFormSubmit);
$(function () {

    var skillNames = ["Atlanta,GA", "Austin,TX", "Washington,DC", "Tampa,FL", "Seattle,WA", "San Francisco,CA", "San Antonio, TX", "Salt Lake City",
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
        "   Chicago, Il"];

    $('#skill-name').autocomplete({
        source: skillNames,
    });
});







function getTeleportApi() {
    let tprequestUrl = "https://api.teleport.org/api/urban_areas/slug:boston/scores/"
    fetch(tprequestUrl)
        .then(function (response) {
            return response.json();
        }
        )
        .then(function (data) {
            console.log(data);
        })
}
//jquery event listener to trigger get api function on click
$('#teleport').on('click', getTeleportApi);


function getApi() {
    let requestUrl = "https://data.usajobs.gov/api/search?Keyword=Software&LocationName=reston%20va&?ResultsPerPage=10"
    fetch(requestUrl, {
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
$('#search-now').on('click', getApi);