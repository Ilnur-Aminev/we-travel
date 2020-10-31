// Load static fonts
require('typeface-merriweather');

exports.onRouteUpdate = location => {
  if (location.hash) {
    setTimeout(() => {
      document.querySelector(`${location.hash}`).scrollIntoView();
    }, 0);
  }
};
