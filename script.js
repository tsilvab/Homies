// function getApi() {
//     let requestUrl = "https://api.teleport.org/api/urban_areas/slug:boston/scores/"
//     fetch(requestUrl) 
//       .then(function (response) {
//           return response.json();
//       }
//       )
//       .then(function (data) {
//         console.log(data);
//       }) }
// getApi()
// //jquery event listener to trigger get api function on click
// $('.button').on('click', getApi);


function getApi(event) {
    event.preventDefault();
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
$('.button').on('click', getApi);