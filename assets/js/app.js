window.addEventListener('scroll', function () {
  var header = document.querySelector('header');
  header.classList.toggle('sticky', window.scrollY > 0)
})

$('.menu__icon').click(function () {
  $('.menu__icon--one').toggleClass('active')
  $('.menu__icon--two').toggleClass('active')
    $('.menu__icon--three').toggleClass('active')
    $('.nav__list').toggleClass('active')
    $('.hero .hero__logo').toggleClass('active')
});

