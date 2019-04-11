
/* eslint-disable */
console.warn('Project One JS Initialized');
/* eslint-enable */

// global variables
const { $ } = window;
/* eslint-disable */
let eventName;
let userLocation;
let userRange;
let formBlock = [];
let eventVenueLong;
let eventVenueLati;
let venueDistance;
let venueTravelTime;
/* eslint-enable */
function loadVideoBackground() {
  const bv = new Bideo(); // eslint-disable-line no-undef
  bv.init({
    // Video element
    videoEl: document.querySelector('#background_video'),

    // Container element
    container: document.querySelector('body'),

    // Resize
    resize: true,

    // autoplay: false,

    // Array of objects containing the src and type
    // of different video formats to add
    src: [
      {
        src: './static/images/thebots-blinded.mp4',
        type: 'video/mp4',
      },
      // {
      //   src: 'https://vjs.zencdn.net/v/oceans.webm',
      //   type: 'video/webm;codecs="vp8, vorbis"'
      // }
    ],

    // What to do once video loads (initial frame)
    onLoad() {
      document.querySelector('#video_cover').style.display = 'none';
    },
  });
}

loadVideoBackground();

function retrieveForm(event) {
  event.preventDefault();

  /* eslint-disable */
  eventName = $('#eventName').val().trim();
  console.log("Input: ", eventName);
  userLocation = $('#userLocation').val().trim();
  console.log("Input: ", userLocation);
  userRange = $('#userRange').val().trim();
  console.log("Input: ", userRange);
  // formBlock = [eventName, userLocation, userRange];

  requestTicketmaster(eventName, userLocation, userRange);
  /* eslint-enable */
}
/* eslint-disable */
function requestTicketmaster(eventName, userLocation, userRange) {
  $("#cardZone").empty();
  let myUrl = `https://app.ticketmaster.com/discovery/v2/events.json?countryCode=US&apikey=IOLEuwOBaextS3XP3HR0L3NUcF3eaFqf&keyword=${eventName}&postalCode=${userLocation}&radius=${userRange}&unit=miles`;

  console.log("API URL, Notice its broken if inout is spaced: ", myUrl);

  $.ajax({
    url: myUrl,
    method: 'GET',
  }).then(function (response) {
    let responseX = response['_embedded'];
    console.log(responseX);
//if else statements added
    if (responseX === undefined) {
      console.log("tryagain");
      var noResults = $("<div");
      noResults.text("Try Again")
      $(".someclass").append(noResults);
    } else {
      if (responseX.length === 0) {
        var noResults = $("<div");
        noResults.text("Try Again")
        $(".someclass").append(noResults);
    } else {

        console.log(response);
        console.log("responseX: ", responseX);
        const events = responseX.events

        $.each(events, function (index, event) {
          let eventTitle = event.name;
          console.log("eventTitle: ", eventTitle);
          let eventImg = event.images;
          console.log("eventImg: ", eventImg);
          let eventDate = event.dates.start.localDate;
          console.log("eventDate: ", eventDate);
          let eventTime = event.dates.start.localTime;
          console.log("eventTime: ", eventTime);
          let eventUrl = event.url;
          console.log("eventUrl: ", eventUrl);
          let eventVenueName = event['_embedded'].venues[0].name;
          console.log("eventVenueName: ", eventVenueName);
          let eventVenueLong = event['_embedded'].venues[0].location.longitude;
          console.log("eventVenueLong: ", eventVenueLong);
          let eventVenueLati = event['_embedded'].venues[0].location.latitude;
          console.log("eventVenueLati", eventVenueLati);

          let newCard = $("<div class='card'>");
          $("#cardZone").append(newCard);

          let cardHeader = $("<div class='card-header'>");
          newCard.append(cardHeader);
          cardHeader.text(eventTitle);

          let cardBody = $("<div class='card-body'>");
          cardHeader.append(cardBody);

          let button = $("<button>");
          button.attr("type", "button");
          button.attr("class", "btn btn-primary");
          button.attr("data-toggle", "modal");
          button.attr("data-target", "#exampleModal");
          button.text("More Info");

          let info = $("<div>").append(

            $("<p>").text(eventDate),
            $("<p>").text(eventTime),
            $("<p>").text(eventVenueName),
            $("<div>").append(button)
          );
          cardBody.append(info);
        })
      }
    }



  })
};

function findDistance() {
  let myUrl = 'http://maps.googleapis.com/maps/api/distancematrix/json?key=AIzaSyBix0KNYLf70SQQTX8ghmRR59vDqArz2Wk&units=imperial&origins=' + eventVenueLong
    + ',' + eventVenueLati + '&destinations=' + userLocation

  $.ajax({
    url: myUrl,
    method: 'GET'
  }).then(function (response) {
    venueDistance = response.rows.elements.distance.text;
    venueTravelTime = reponse.rows.elements.duration.text;
  })
}

$('#submit-btn').on('click', retrieveForm);
