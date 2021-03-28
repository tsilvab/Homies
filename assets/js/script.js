// var formEl = $('#skills-form');
let formElement = $('#form');
let inputElement = $('#major-cities');
// var nameInputEl = $('#skill-name');
const inputKeyword = document.getElementById("input-keyword");
const inputLocation = document.getElementById("major-cities");
const searchBox = $('#search-now');
let teleportUrl = "https://api.teleport.org/api/urban_areas/slug:";
let usajobsUrl = "https://data.usajobs.gov/api/search?Keyword=";
let outputLocation2 = "";



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
        "San Jose, California",
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

// //construct URL for Teleport API by first manipulating the outputLocation var to remove coma and everything after it using substring string method; otherwise teleport url would fail. This worked for 14 of 25 cities. For 8 cities with multi word names, we added a .replace string method to replace the space with - which teleport url requires.  To handle DC, Tampa, SF which have weird URLS that are not exactly dervied from the name, we created three if else statements 
if (outputLocation === "san francisco, california") {
    outputLocation2 = "san-francisco-bay-area";    
}
else if (outputLocation === "tampa, florida") {
    outputLocation2 = "tampa-bay-area";
}
else if (outputLocation === "washington, district of columbia") {
    outputLocation2 = "washington-dc"
}
else {
    outputLocation2 = outputLocation.substring(0, outputLocation.indexOf(',')).replace(/ /,"-").replace(/ /,"-");
}

let requestUrl2 = (teleportUrl + outputLocation2 + "/scores/");

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

        //capture sample search result from index 0 and paint first table row with title, agency and url. Works great except for URL which needs more work
        let jobTitle = (data.SearchResult.SearchResultItems[0].MatchedObjectDescriptor.PositionTitle);
        let jobAgency = (data.SearchResult.SearchResultItems[0].MatchedObjectDescriptor.OrganizationName);
        let jobLink = (data.SearchResult.SearchResultItems[0].MatchedObjectDescriptor.PositionURI)
        //use jquery to format link as url
        let jobLinkFormatted = document.createElement('a');;
        jobLinkFormatted.href = jobLink;
        jobLinkFormatted.target = '_blank';
        jobLinkFormatted.innerText = "View Job";
        $('#job-table').append('<tr><td>'+jobTitle+'</td><td>'+jobAgency+'</td><td>'+$(jobLinkFormatted)+'</td></tr>');
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

//proof of concept to populate job search table with data using jquery. Next step is to pull data from jobs api and use forloop with function below similar to weather project
function appendTable () {
    let jobTitle = "Software Engineer";
    let jobAgency = "FDIC";
    let jobLink = "Click me"
    $('#job-table').append('<tr><td>'+jobTitle+'</td><td>'+jobAgency+'</td><td>'+jobLink+'</td></tr>');
}
appendTable()
// markup = "<tr><td> + information + </td></tr>"