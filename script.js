function getTeleportApi() {
    let tprequestUrl = "https://api.teleport.org/api/urban_areas/slug:boston/scores/"
    fetch(tprequestUrl) 
      .then(function (response) {
          return response.json();
      }
      )
      .then(function (data) {
        console.log(data);
      }) }
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