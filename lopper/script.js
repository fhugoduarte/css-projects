const $body = document.querySelector('body');
const $header = document.querySelector('header');
const $lists = document.querySelectorAll('.nav-link');
const $links = document.querySelectorAll('.nav-link a');
const $sections = document.querySelectorAll('section');
const $seeMoreLink = document.querySelector('#see-more');
const $menu = document.querySelectorAll('.menu')[0];
const $navBar = document.querySelector('nav');

window.addEventListener('scroll', toggleHeader, false);

function toggleHeader() {
  if (window.pageYOffset > 100 && $header.classList.contains('max-header')){
    $header.classList.remove('max-header');
    $header.classList.add('min-header');
  } else if (window.pageYOffset <= 100 && $header.classList.contains('min-header')) {
    $header.classList.add('max-header');
    $header.classList.remove('min-header');
  }

  $sections.forEach(function(section, index) {
    const topYValue = section.offsetTop;
    const bottomYValue = topYValue + section.offsetHeight;
    const isCurrentSection = window.pageYOffset >= topYValue && window.pageYOffset < bottomYValue;

    if (isCurrentSection && !$lists[index].classList.contains('selected')) {
      $lists[index].classList.add('selected');
    } else if (!isCurrentSection && $lists[index].classList.contains('selected')) {
      $lists[index].classList.remove('selected');
    }
  })
}

$links.forEach(function(link){
  link.addEventListener('click', function(event) {
    event.preventDefault();

    window.scrollTo({
      top: document.querySelector(link.getAttribute('href')).offsetTop,
      left: 0,
      behavior: 'smooth'
    })
  }, false);
})

$seeMoreLink.addEventListener('click', function(event) {
  event.preventDefault();

  window.scrollTo({
    top: document.querySelector('#intro').offsetTop,
    left: 0,
    behavior: 'smooth'
  })
}, false);

$menu.addEventListener('click', toggleMenu, false);

var isOpen = false;

function toggleMenu() {
  $navBar.classList.toggle('menu-open', isOpen);
  $header.classList.toggle('menu-open', isOpen);
  $body.classList.toggle('menu-open', isOpen);
  $menu.firstElementChild.classList.toggle('close-btn', isOpen);

  isOpen = !isOpen;
}

$navBar.addEventListener('click', navClick, false);

function navClick(event) {
  if (event.target.tagName == 'A') {
    toggleMenu();
  }
}