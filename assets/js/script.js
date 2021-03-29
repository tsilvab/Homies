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
let jobsUrl = "";



// jquery function to auto complete the Location field with a predefined list of 25 locations
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


//function to capture both keyword and location search inputs and then construct two urls one for each api and later run those get api functions in sub functions
function formSubmitHandler (event) {
event.preventDefault();
let outputKeyword = inputKeyword.value.trim();
inputKeyword.value = '';
let outputLocation = inputLocation.value.trim().toLowerCase();
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

// //construct URL for Teleport API
let requestUrl2 = (teleportUrl + outputLocation2 + "/scores/");

//call 2 x api functions
getApi1()
getApi2()

    // USA Jobs API function
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

            //For Loop to capture job title, agency and url          
            let searchResults = data.SearchResult.SearchResultItems;
            for (let i = 0; i < searchResults.length; i++) {
                let jobsTitle = searchResults[i].MatchedObjectDescriptor.PositionTitle;
                let jobsAgency = searchResults[i].MatchedObjectDescriptor.OrganizationName;
                jobsUrl = searchResults[i].MatchedObjectDescriptor.PositionURI;

            //Render job title, agency to job search results table. Render url in next function so we build a friendly url
            $('#job-table').append('<tr><td>'+jobsTitle+'</td><td>'+jobsAgency+'</td><td class="link-td">'+jobsUrl+'</td></tr>');
           
            }
            // --------------TRYING TO SET FRIENDLY URL for jobsUrl----------------
            //manged to create a foundation css button but unable to properly assign value to each
            function setUrl () {
                let link = $('<button type="button" id="view-job" class="success button" <a href="">View Job</a></button>');
                link.attr("value", jobsUrl)
                link.attr("href", jobsUrl)
                // link.attr("href", jobsUrl)
                // link.attr("text", "View Job")
                $('.link-td').append(link);
                $('#view-job').on('click', function () {
                    let buttonValue = $(this).val();
                    console.log(buttonValue);
                })
                // setTd.$(this)
            }
            setUrl ()

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

