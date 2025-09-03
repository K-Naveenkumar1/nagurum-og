// Remove any loading elements when the page loads
window.addEventListener('load', function() {
    const loaders = [
        '#preloader',
        '.preloader',
        '.loader',
        '.loading',
        '[class*="preloader-"]',
        '[class*="loader-"]',
        '[class*="loading-"]',
        '[class*="pre-loading"]'
    ];
    
    loaders.forEach(selector => {
        const elements = document.querySelectorAll(selector);
        elements.forEach(el => {
            el.style.display = 'none';
            el.remove();
        });
    });
});

//step 1: get DOM
let nextDom = document.getElementById('next');
let prevDom = document.getElementById('prev');

let carouselDom = document.querySelector('.carousel');
let SliderDom = carouselDom.querySelector('.carousel .list');
let thumbnailBorderDom = document.querySelector('.carousel .thumbnail');
let thumbnailItemsDom = thumbnailBorderDom.querySelectorAll('.item');
let timeDom = document.querySelector('.carousel .time');

thumbnailBorderDom.appendChild(thumbnailItemsDom[0]);
let timeRunning = 3000;
let timeAutoNext = 7000;

nextDom.onclick = function(){
    showSlider('next');    
}

prevDom.onclick = function(){
    showSlider('prev');    
}
let runTimeOut;
let runNextAuto = setTimeout(() => {
    next.click();
}, timeAutoNext)
function showSlider(type){
    let SliderItemsDom = SliderDom.querySelectorAll('.carousel .list .item');
    let thumbnailItemsDom = document.querySelectorAll('.carousel .thumbnail .item');
    
    // Remove existing animation classes
    carouselDom.classList.remove('next');
    carouselDom.classList.remove('prev');
    
    // Force reflow to ensure animations restart properly
    void carouselDom.offsetWidth;
    
    if(type === 'next'){
        // Add the next item to the DOM before animation starts
        if(SliderItemsDom.length > 1) {
            // Position the next slide for animation
            SliderItemsDom[1].style.zIndex = "0";
            SliderItemsDom[0].style.zIndex = "1";
        }
        
        // Add animation class
        carouselDom.classList.add('next');
        
        // After animation completes, update DOM order
        clearTimeout(runTimeOut);
        runTimeOut = setTimeout(() => {
            SliderDom.appendChild(SliderItemsDom[0]);
            thumbnailBorderDom.appendChild(thumbnailItemsDom[0]);
            carouselDom.classList.remove('next');
            // Reset z-index
            SliderItemsDom.forEach(item => item.style.zIndex = "");
        }, timeRunning);
    } else {
        // For previous slide, we need to move the last item to the front first
        SliderDom.prepend(SliderItemsDom[SliderItemsDom.length - 1]);
        thumbnailBorderDom.prepend(thumbnailItemsDom[thumbnailItemsDom.length - 1]);
        
        // Force reflow again after DOM manipulation
        void carouselDom.offsetWidth;
        
        // Get updated DOM references after prepend
        SliderItemsDom = SliderDom.querySelectorAll('.carousel .list .item');
        
        // Position slides for animation
        if(SliderItemsDom.length > 1) {
            SliderItemsDom[0].style.zIndex = "1";
            SliderItemsDom[1].style.zIndex = "0";
        }
        
        // Add animation class
        carouselDom.classList.add('prev');
        
        // After animation completes, clean up
        clearTimeout(runTimeOut);
        runTimeOut = setTimeout(() => {
            carouselDom.classList.remove('prev');
            // Reset z-index
            SliderItemsDom.forEach(item => item.style.zIndex = "");
        }, timeRunning);
    }

    clearTimeout(runNextAuto);
    runNextAuto = setTimeout(() => {
        next.click();
    }, timeAutoNext)
}