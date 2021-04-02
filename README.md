# Homies

Summary:

The original group's idea was to utilize an API from Zillow.com to fetch housing data but that idea was discarded after realizing that the API is not exactly free and requires approval by Zillow. Therefore, the group moved to utilizing APIs from USAjobs.org, which is a government website listing job opportunities with the federal government and provided ample API documentation. The second API selected was from Teleport.org, which provides great quality of life data for 265 major cities in the US and around the world.

The goal of the app is to allow job seekers to search for federal job opportunities in major US cities while receiving detailed quality of life data on those locations. Quality of life data includes 16 categories ranging from housing to education to tolerance level to art and culture.

API Documentation:

USAJobs.gov API:

https://developer.usajobs.gov/

Teleport.org API

https://developers.teleport.org/api/

Homies:

The web application provides an interface to search for federal jobs by keyword and select a location from 25 major American cities. Those 25 cities were selected as they happen to contain the most federal government jobs.

CSS:

Since the team wasn't allowed to utilize Bootstrap for CSS, we researched and determined the ZURB Foundation CSS was a viable alternative. After reviewing documentation, we imported the required Foundation libraries into our index.html files.

HTML:

In addition to CSS, Foundation also provides HTML templates. After reviewing the available options, we selected one geared toward Real Estate. Since there were unnecessary components, trimmed most of those components and were only left with a hero banner, two row divs each containing two column divs, two input boxes and one button.

The hero div contained our banner, app name and slogan.

The first row div contained the two input boxes, one to search for jobs by keyword and another to search or select a location from one of the 25 major cities our app serves. The button was used as a Search button to execute the search.

The second row div contained the job search results in the left column while the quality of life results render in the right column.

We added a footer div to hold standard footer data including dummy Facebook, Twitter and LinkedIn links as well as copyright info.

API Code:

The first step before writing any code was to study the API documentation to learn the proper URL format and search parameters.

For USAjobs.org API, we determined the starting URL for an API request is https://data.usajobs.gov/api/search?Keyword= with the keyword parameter intended to contain a job title, technology, skill or any keyword to search for federal jobs. While many other parameters were provided by API, we only utilized the "&Location=" parameter which is intended to contain the name of the city. The API was forgiving about the format so it would accept Atlanta, GA or Atlanta, Georgia or just Atlanta.

The API required registering for an authentication key. Upon registering (with a dummy email address), we received an authorization key. One challenge in making the fetch call was having to use a headers object that contains two properties "User-Agent" for the email address and "Authorization Key" for the key. Since we weren't very familiar with such code, we received assistance from a TA and successfully constructed the fetch call code and tested it with CURL before writing any code.

The second API for Teleport.org was more challenging. The starting URL was https://api.teleport.org/api/urban_areas/slug: and should be followed by the name of one of the 265 cities they provide data for in a very specific format. Example: Atlanta, GA must be formatted as "atlanta" while San Francisco, CA as "san-francisco-bay-area". Next, we reviewed the list of 265 cities the API provides and compared that against federal job opportunities and came up with a list of 25 major cities to search against.

To address the specific parameter requirements for city name, we added Java Script and jQuery code, which is discussed in more details further below, to manipulate the string values of some of those cities to adhere to the exact city name required by the API.

The API didn't require registering for an authentication key.

JS/jQuery code:

Starting from code line #1, we added 7 const and 3 let variables. The 7 const contained element selectors which we used a combination JavaScript document.getElementByID and jQuery's $('#element'). The three let were used for API URL-related variables that had to be declared globally so they can be utilized inside multiple functions.

To auto complete the list of 25 major cities. Next, we used a jQuery function.

A function titled formSubmitHandler was utilized to capture the user input in both the keyword and location input boxes and store the values inside new variables after applying string methods including. trim() and .toLowercase()

Then we created a variable to construct the URL of the USA jobs API by concatenating the starting API URL, plus the keyword value captured from the user input plus the standard "&LocationName=" parameter plus the location value captured from the user input.

A variable to construct the URL of the Teleport API was used. As mentioned previously, the 25 cities we were passing in the call had different formatting requirements. For 18 of the 25 cities, we used string methods including. substring(0, outputLocation.indexOf(",")) and .replace(/ /, "-") and .replace(/ /, "-"); in order to remove the comma after the city name and everything after the comma. Other cities like Washington, DC and San Francisco required special handling which we achieved via multiple if-else statements.

Similarly, we created a variable to construct the URL of the Teleport API by concatenating the starting API URL, plus the location value captured from the user input.

The fetch code was the same boilerplate code provided in class including then function for response, then function for data to run the api GET call.

For loops were put to use in order to capture the response data and populate it in the respective DIVs. We created tables in each results DIV and populated the <td></td> elements with it.

To trigger the function upon pressing the enter key,in addition to clicking Search button, we utilized this code (event.keyCode === 13). The number 13 stands for the Enter key.

For local storage, we captured three values: last visit date, keyword searched and location selected. On the next user's visit, we retrieved those values and render them on the screen inside a div that reads "You last visited us on <date>, and searched for keyword <keyword> in location <location.>

Finally, we added an event listener using jQuery syntax to fire the search function upon clicking on Search or hitting Enter key.
