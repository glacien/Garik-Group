import {
hero,
body,
header,
heroBtn,
tabs,
btnMore,
fPattern,
year,
secondaryNavAll,
currentLanguage,
languages,
menuBtn,
menu,
featureBoxes,
html,
languageData
} from './data.js'


const _ = require('lodash');



















////////////////////////////////////////////////////////          sticky header         ////////////////////////////////////////////////////////////




new IntersectionObserver(function([enties]){
  if (!enties.isIntersecting) {
    body.classList.add('sticky');
  }
  else if (enties.isIntersecting) {
    body.classList.remove('sticky');

  };
},
{
  root: null,
  threshold: 0,
  rootMargin: `-${header.getBoundingClientRect().height}px`
}).observe(hero);






//////////////////////////////////////////////////////              f-pattern             //////////////////////////////////////////////////////////


btnMore.addEventListener('click',function(){
  if (fPattern.classList.contains('roled')) {
    if (document.querySelector('html').getAttribute('lang')==='en') btnMore.innerHTML='Learn less &uarr;';
    if (document.querySelector('html').getAttribute('lang')==='uk') btnMore.innerHTML='Дізнатись менше &uarr;';
    if (document.querySelector('html').getAttribute('lang')==='cs') btnMore.innerHTML='Zjistit méně &uarr;';
  }

  if (!fPattern.classList.contains('roled')) {
    if (document.querySelector('html').getAttribute('lang')==='en') btnMore.innerHTML='Learn more &darr;';
    if (document.querySelector('html').getAttribute('lang')==='uk') btnMore.innerHTML='Дізнатись більше &darr;';
    if (document.querySelector('html').getAttribute('lang')==='cs') btnMore.innerHTML='Zjistit více &darr;';
  }

  fPattern.classList.toggle('roled');
});











///////////////////////////////////////////////////////           tab component           //////////////////////////////////////////////////////////



document.querySelector('.tab-content--active').style.opacity = '1';

tabs.addEventListener('click',function(e){
  if (!e.target.closest('.tab--btn')) return;
  const btnClicked = e.target.closest('.tab--btn');
  const btnActive = document.querySelector('.tab--btn--active');
  if (!btnClicked.classList.contains('tab--btn--active')) {
    btnActive.classList.remove('tab--btn--active');
    btnClicked.classList.add('tab--btn--active');
  }

  const tabContentCurrent = document.querySelector('.tab-content--active');
  const tabContentActive = [...document.querySelectorAll('.tab-content')].find(el=>el.dataset.figureNumber===btnClicked.dataset.btnNumber);

  if (tabContentActive===tabContentCurrent) return;

  else { tabContentCurrent.style.opacity = '0'
    setTimeout(function(){
      tabContentCurrent.classList.remove('tab-content--active');
      tabContentActive.classList.add('tab-content--active');
    },85);
    setTimeout(()=>tabContentActive.style.opacity = '1',115);
  };
});











////////////////////////////////////////////////////////////          others        ////////////////////////////////////////////////////////////////



year.innerHTML = new Date().getFullYear();






////////////////////////////////////////////////////////////          menu          ////////////////////////////////////////////////////////////////



menuBtn.addEventListener('click',function (){
  menuBtn.classList.toggle('open');
  menu.classList.toggle('menu-active');
});







///////////////////////////////////////////////////////////          languages        //////////////////////////////////////////////////////////////



currentLanguage.addEventListener('click',function () {
  document.querySelector('.languages').classList.toggle('active');
  document.querySelector('.current-language .arrow-icon').classList.toggle('open');
});




languages.addEventListener('click',function(e){
  const currentLangEl = document.querySelector('.current-language .flag');

  const langEl = e.target.closest('.language').querySelector('.flag');

  const lang = e.target.closest('.language').querySelector('.flag').dataset.language;
  const langAlt = e.target.closest('.language').querySelector('.flag').getAttribute('alt');
  const langSrc = e.target.closest('.language').querySelector('.flag').getAttribute('src');

  langEl.setAttribute('alt', currentLangEl.getAttribute('alt'));
  langEl.setAttribute('src', currentLangEl.getAttribute('src'));
  langEl.setAttribute('data-language', currentLangEl.dataset.language);

  currentLangEl.setAttribute('alt', langAlt);
  currentLangEl.setAttribute('src', langSrc);
  currentLangEl.setAttribute('data-language', lang);


  for (let num of Object.keys(languageData[lang])) document.querySelectorAll(`body *[data-language-el-${num}]`).forEach((el)=>el.innerHTML = languageData[lang][num]);

  html.setAttribute('lang', lang);

});



body.addEventListener('click', function(e){
  if (!e.target.closest('.current-language') && document.querySelector('.languages').classList.contains('active')) {
    document.querySelector('.languages').classList.remove('active');
    document.querySelector('.current-language .arrow-icon').classList.remove('open');
  }
});









////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//                                                                    queries

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
















///////////////////////////////////////////////////////            secondary nav        ////////////////////////////////////////////////////////////

const secondaryNavFunctionAdd = function(){
  secondaryNavAll.forEach((el)=>el.classList.add('active'));
  document.querySelectorAll(".main-nav--services .arrow-icon").forEach((el)=>el.classList.add('open'));
};

const secondaryNavFunctionRemove = function(){
  secondaryNavAll.forEach((el)=>el.classList.remove('active'));
  document.querySelectorAll(".main-nav--services .arrow-icon").forEach((el)=>el.classList.remove('open'));
};

const secondaryNavFunctionClick = function(){
  secondaryNavAll.forEach((el)=>el.classList.toggle('active'));
  document.querySelectorAll(".main-nav--services .arrow-icon").forEach((el)=>el.classList.toggle('open'));
};

const secondaryNavFunctionBody = function (e) {
  if (!e.target.closest('.main-nav--services--li') && [...secondaryNavAll][0].classList.contains('active')) {
    secondaryNavAll.forEach((el)=>el.classList.remove('active'));
    document.querySelectorAll(".main-nav--services .arrow-icon").forEach((el)=>el.classList.remove("open"));
  }
};












///////////////////////////////////////////////////////////////         scroll        //////////////////////////////////////////////////////////////





const smoothScrollLaptop = function(e){
  e.preventDefault();
  if (e.target.closest('a')?.getAttribute('href')?.startsWith('#')) {
    const section = document.getElementById(e.target.closest('a').getAttribute('href').slice(1) || 'top');
    window.scrollTo({
      top: section.getBoundingClientRect().y + window.scrollY - header.getBoundingClientRect().height,
      left: window.scrollX,
      behavior: 'smooth'
    });
  }
}

const smoothScrollTablet = function(e){
  e.preventDefault();
  if (!(e.target.closest('a')?.getAttribute('href')?.startsWith('#')  &&  e.target.closest('a')?.getAttribute('href') === '#section--our-services') && e.target.closest('a')?.getAttribute('href')) {
    const section = document.getElementById(e.target.closest('a').getAttribute('href').slice(1) || 'top');
    window.scrollTo({
      top: section.getBoundingClientRect().y + window.scrollY - header.getBoundingClientRect().height,
      left: window.scrollX,
      behavior: 'smooth'
    });
  }
}









//////////////////////////////////////////////////////////////       other        //////////////////////////////////////////////////////////////////





menuBtn.addEventListener('click',function () {
  if (menu.classList.contains('menu-active')) {
    if (!body.classList.contains('sticky')) {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'smooth'
      });
    }
    body.style = 'overflow-y: hidden';
  }
  if (!menu.classList.contains('menu-active')) {
    body.style = 'overflow-y: unset';
  }
});




menu.addEventListener('click', function (e){
  if (!(e.target.closest('a')?.getAttribute('href')?.startsWith('#')  &&  e.target.closest('a')?.getAttribute('href') === '#section--our-services') && e.target.closest('a')?.getAttribute('href')) {
    menuBtn.classList.remove('open');
    menu.classList.remove('menu-active');
    body.style = 'overflow-y: unset';
  }
});



/////////////////////////////////////////////////////////           feature boxes          /////////////////////////////////////////////////////////


const featureBoxesMouseover = function(e){
  if (!e.target.closest('.feature-box--closed')) return;
  e.target.closest('.feature-box--closed').closest('.feature-box').classList.add('feature-box--active');
};

const featureBoxesMouseout = function(e){
  if (!e.target.closest('.feature-box--closed')) return;
  e.target.closest('.feature-box--closed').closest('.feature-box').classList.remove('feature-box--active');
};

/* const featureBoxesClick = function(e){
  if (!e.target.closest('.feature-box--closed')) return;
  e.target.closest('.feature-box--closed').closest('.feature-box').classList.toggle('feature-box--active');
};

const featureBoxesBody = function (e) {
  if (!e.target.closest('.feature-box--closed')) {
    document.querySelectorAll('.feature-box').forEach((el)=>el.classList.remove('feature-box--active'));
    return;
  }
  document.querySelectorAll('.feature-box').forEach((el)=>el.classList.remove('feature-box--active'));
  e.target.closest('.feature-box--closed').closest('.feature-box').classList.add('feature-box--active')
}; */






const featureBox1 = new IntersectionObserver(function([enties]){
  console.log(enties)
  if (!enties.isIntersecting) {
    document.querySelector('.feature-box--1').classList.remove('feature-box--active');      }
  else if (enties.isIntersecting) {
    document.querySelector('.feature-box--1').classList.add('feature-box--active');
  };
  
},
{
  root: null,
  threshold: 0,
  rootMargin: '-300px 0px'
});


const featureBox2 = new IntersectionObserver(function([enties]){
  console.log(enties)
  if (!enties.isIntersecting) {
    document.querySelector('.feature-box--2').classList.remove('feature-box--active');      }
  else if (enties.isIntersecting) {
    document.querySelector('.feature-box--2').classList.add('feature-box--active');
  };
  
},
{
  root: null,
  threshold: 0,
  rootMargin: '-300px 0px'
});



const featureBox3 = new IntersectionObserver(function([enties]){
  console.log(enties)
  if (!enties.isIntersecting) {
    document.querySelector('.feature-box--3').classList.remove('feature-box--active');      }
  else if (enties.isIntersecting) {
    document.querySelector('.feature-box--3').classList.add('feature-box--active');
  };
  
},
{
  root: null,
  threshold: 0,
  rootMargin: '-300px 0px'
});



const featureBox4 = new IntersectionObserver(function([enties]){
  console.log(enties)
  if (!enties.isIntersecting) {
    document.querySelector('.feature-box--4').classList.remove('feature-box--active');      }
  else if (enties.isIntersecting) {
    document.querySelector('.feature-box--4').classList.add('feature-box--active');
  };
  
},
{
  root: null,
  threshold: 0,
  rootMargin: '-300px 0px'
});



const featureBox5 = new IntersectionObserver(function([enties]){
  console.log(enties)
  if (!enties.isIntersecting) {
    document.querySelector('.feature-box--5').classList.remove('feature-box--active');      }
  else if (enties.isIntersecting) {
    document.querySelector('.feature-box--5').classList.add('feature-box--active');
  };
  
},
{
  root: null,
  threshold: 0,
  rootMargin: '-300px 0px'
});







///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////           changes               ////////////////////////////////////////////////////////////////






new ResizeObserver(_.debounce(function(){
  if (window.innerHeight <= 630) {
    document.querySelector('.hero-text-box').style.fontSize='95%';
    if (window.innerHeight <= 600) {
      document.querySelector('.hero-text-box').style.fontSize='90%';
      if (window.innerHeight <= 570) {
        document.querySelector('.hero-text-box').style.fontSize='85%';
        if (window.innerHeight <= 540) {
          document.querySelector('.hero-text-box').style.fontSize='80%';
          
        };
      };
    };
  }
  else if (document.querySelector('.hero-text-box').style.fontSize!=='100%') {
    document.querySelector('.hero-text-box').style.fontSize='100%';
  };




  document.querySelectorAll('.feature-box--details').forEach(function(el){
    el.style.width = `${Math.ceil(document.querySelector('.feature-box').getBoundingClientRect().width)}px`;
  }); 




  if (Math.floor(body.getBoundingClientRect().width > 1200)) {
    secondaryNavAll.forEach((el)=>el.removeEventListener('click',secondaryNavFunctionClick));
    secondaryNavAll.forEach((el)=>el.addEventListener('mouseover', secondaryNavFunctionAdd));
    secondaryNavAll.forEach((el)=>el.addEventListener('mouseout', secondaryNavFunctionRemove));

    body.addEventListener('click',secondaryNavFunctionBody);
  }
  else if (Math.floor(body.getBoundingClientRect().width <= 1200)) {
    secondaryNavAll.forEach((el)=>el.removeEventListener('mouseover', secondaryNavFunctionAdd));
    secondaryNavAll.forEach((el)=>el.removeEventListener('mouseout', secondaryNavFunctionRemove));
    secondaryNavAll.forEach((el)=>el.addEventListener('click',secondaryNavFunctionClick));

    body.addEventListener('click',secondaryNavFunctionBody);

  }




  if (Math.floor(body.getBoundingClientRect().width > 1200)) {
    header.removeEventListener('click',smoothScrollTablet);
    heroBtn.removeEventListener('click', smoothScrollTablet);
    header.addEventListener('click', smoothScrollLaptop);
    heroBtn.addEventListener('click', smoothScrollLaptop);
  }
  else if (Math.floor(body.getBoundingClientRect().width <= 1200)) {
    header.removeEventListener('click',smoothScrollLaptop);
    heroBtn.removeEventListener('click', smoothScrollLaptop);
    header.addEventListener('click', smoothScrollTablet);
    heroBtn.addEventListener('click', smoothScrollTablet);
  }



  if (Math.floor(body.getBoundingClientRect().width > 1200)) {
    /* featureBoxes.removeEventListener('click',featureBoxesClick);
    body.removeEventListener('click', featureBoxesBody); */


    featureBox1.unobserve(document.querySelector('.feature-box--1'));
    featureBox2.unobserve(document.querySelector('.feature-box--2'));
    featureBox3.unobserve(document.querySelector('.feature-box--3'));
    featureBox4.unobserve(document.querySelector('.feature-box--4'));
    featureBox5.unobserve(document.querySelector('.feature-box--5'));


    featureBoxes.addEventListener('mouseover',featureBoxesMouseover);
    featureBoxes.addEventListener('mouseout',featureBoxesMouseout);
  }
  else if (Math.floor(body.getBoundingClientRect().width <= 1200)) {
    featureBoxes.removeEventListener('mouseover',featureBoxesMouseover);
    featureBoxes.removeEventListener('mouseout',featureBoxesMouseout);

    /* featureBoxes.addEventListener('click',featureBoxesClick);
    body.addEventListener('click', featureBoxesBody); */

    featureBox1.observe(document.querySelector('.feature-box--1'));
    featureBox2.observe(document.querySelector('.feature-box--2'));
    featureBox3.observe(document.querySelector('.feature-box--3'));
    featureBox4.observe(document.querySelector('.feature-box--4'));
    featureBox5.observe(document.querySelector('.feature-box--5'));
    



  }

}, 100)).observe(document.documentElement);



