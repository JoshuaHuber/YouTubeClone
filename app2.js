$(document).ready(function(){                                   //after HTML loads
                                                                //input from the user
  $(".js-search-form").submit(function(event) {                 //on form submit do the following
    event.preventDefault();                                     //stop page from refreshing on submit
    var userInput = $("#js-user").val();                         //record userInput val
    console.log(userInput);
    getResults(userInput);                                      //call getResults using the userInput
  })

//---------------------------------                             //using userInput get JSON

  function getResults(userInput) {                              //make call to api using userInoyt
    $.getJSON(
      "https://www.googleapis.com/youtube/v3/search",           //make a call to this url
      {                                                         //https://developers.google.com/youtube/v3/docs/search/list --
        part: "snippet",                                        //*required parameter* specifies a comma-separated list
        maxResults: 20,                                         //values 0 to 50. The default value is 5
        key: "AIzaSyB-I--j0AfDhMjhyfM_wA-o5cXKdUdYoUQ",         //my key
        q: userInput,                                           //the userInput from the function
        type: "video"                                           //other types are playlist and channel
      },
      function(receivedApiData) {                               //???
        console.log(receivedApiData)                            //make sure I'm getting data
        if(receivedApiData.pageInfo.totalResults == 0) {        //if the results return 0 or "0"
          alert("No videos found!");                            //alert no videos
        }
        else {                                                  //otherwise
          displaySearchResults(receivedApiData.items);          //execute this func using object.items
        }
      });
  }

//----------------------------------                                    //

  function displaySearchResults(videosArray) {                          //using recivedApiData.items from above
    var buildHTML = "";                                                 //start with an empty string
      $.each(videosArray, function(videosArrayKey, videosArrayValue){   //for each item in the videoArray.  excute func ???
        buildHTML += "<li>";
        buildHTML += "<p>" + videosArrayValue.snippet.title + "</p>";   //receivedApiData.items.snippet.title = title of video
        buildHTML += "<a href='https://www.youtube.com/watch?v=";       //the start to the link
        buildHTML += videosArrayValue.id.videoId + "' target='_blank'>";//building link using items.id.videId and target
        buildHTML += "<img src='" + videosArrayValue.snippet.thumbnails.medium.url + "'>"; //display med thumbnal
        buildHTML += "</a>" + "</li>";

      });
      $(".js-search-results").html(buildHTML);                          //send contents to this HTML ul
  }

})