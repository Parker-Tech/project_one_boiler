/* eslint-disable */
console.warn('Project One JS Initialized');
/* eslint-enable */

const { $ } = window;

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

function addEventCard() {
  // set variables for our parameters
  /* eslint-disable */
  const eventName = $('#eventName').val();
  const userLocation = $('#userLocation').val();
  const userRange = $('#userRange').val();
  /* eslint-disable */
  // search for venues that are within the maximum distance from userLocation
}

loadVideoBackground();

$('#submit-btn').on('click', addEventCard);
