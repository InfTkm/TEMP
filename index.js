"use restrict"
let numnerOfPages = 6;
let curPageId = 0; // Index of page which user is now browsing
const pagesContainer = document.querySelector(".pages-container")

/*** Function that don't edit DOM themselves, but can call DOM functions ***/
window.addEventListener('wheel', scrollUpDown);


// Detect whether user is scrolling up or down.
function scrollUpDown(e) {
    //Going Up
    if ((e.deltaY < 0) && (curPageId != 0)) {
      window.removeEventListener('wheel', scrollUpDown)
      pagesContainer.style = " transition: 0.8s;transition-timing-function: ease-out;transform:translate3d(0px, -" + (curPageId - 1) + "00% , 0px);"
      setTimeout(function() {
        window.addEventListener('wheel', scrollUpDown);
      }, 1200);
      curPageId = curPageId - 1;
    }
    //Going Down
    if ((e.deltaY > 0) && (curPageId != numnerOfPages - 1)) {
      window.removeEventListener('wheel', scrollUpDown)
      pagesContainer.style = " transition: 0.8s;transition-timing-function: ease-out;transform:translate3d(0px, -" + (curPageId + 1) + "00%  , 0px);"
      setTimeout(function() {
        window.addEventListener('wheel', scrollUpDown);
      }, 1200);
      curPageId = curPageId + 1;
    }
  }