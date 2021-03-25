function getApi() {
    let requestUrl = "https://api.teleport.org/api/cities/?search=Fairfax&limit=10"
    fetch(requestUrl) 
      .then(function (response) {
          return response.json();
      }
      )
      .then(function (data) {
        // console.log(data);

      }) }

getApi()