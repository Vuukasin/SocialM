const hideHeader = document.getElementById('hide-header');
const header = document.getElementById('header');
const showHeader = document.getElementById('show-header');
const main = document.getElementById('main');
const slider = document.getElementById('track');
let isDown = false;
let startX;
let scrollLeft;


// slider.addEventListener('mousedown', (e)=> {
//     isDown = true;
//     startX = e.pageX - slider.offsetLeft;
//     scrollLeft = slider.scrollLeft;
// });


// slider.addEventListener('mouseleave', () => {
//     isDown = false;
//   });

//   slider.addEventListener('mouseup', () => {
//     isDown = false;
//   });

// slider.addEventListener('mousemove', (e)=> {
//     if(!isDown) return;
//     e.preventDefault();
//     const x = e.pageX - slider.offsetLeft;
//     const walk = (x - startX); //scroll-fast
//     slider.scrollLeft = scrollLeft - walk;
//     console.log(walk);
// });




hideHeader.addEventListener('click', ()=> {
    header.style.display = "none";
    main.style.borderRadius = "0";
    showHeader.style.display = "block";
});


showHeader.addEventListener('click', ()=> {
    header.style.display = "block";
    main.style.borderRadius = "15px 0 0 15px";
    showHeader.style.display = "none";
});