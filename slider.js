"use strict"
//slider.js
 //slider scripts
class SlidingItemsBar {
    constructor(numItemsToBeShown, divName){
        
        this.sliderName = divName;
        
        this.slideIndex = 0;
        
        this.dotted =  false;
        
        this.arrowNavigation = true;
        
        this.slideTimeInterval = 5000;
        
        this.numItemsToBeShown = numItemsToBeShown;

        this.slider = document.getElementById(divName);
        
        this.numOfItems = this.slider.children.length;
        
        this.itemSlider_frame = 0;
        
        this.runningFuncs = {};
        
        this.startSliding();
        
        window.addEventListener("resize", this.winResize.bind(this));
        
        this.initSizes();

    }
    
    initSizes(){
        
        this.numExcessItems = this.numOfItems  - this.numItemsToBeShown;
        
        this.itemSlider_pace = Math.floor(window.innerWidth / this.numItemsToBeShown);
        
    }
    
    pushSlide(direction){
                
        switch (direction) {
            case "prev" : this.startSliding(-1);
                break;
            case "next" : this.startSliding(1);
                break;
        }
                        
    }
    startSliding (n = 1){
        
        clearTimeout(this.runningFuncs);
        
        let slideItems = Array.from(this.slider.children);
        
        this.itemSlider_frame += n;
                
        if(this.itemSlider_frame > this.numExcessItems){this.itemSlider_frame = 0};
        
        if(this.itemSlider_frame < 0){this.itemSlider_frame = this.numExcessItems};
        
        let pos = -1 * (this.itemSlider_frame * this.itemSlider_pace );
        
        slideItems.forEach(slide => {slide.style.left = "" + pos + "px";}) ;
        
        this.runningFuncs =  setTimeout(this.startSliding.bind(this), this.slideTimeInterval);          
    }
       
   winResize(){
       
       this.initSizes();
       
   }
    
}



class StationarySlide {
    
    constructor(divName){
        this.divName = divName;
        this.container = document.getElementById(this.divName);
        this.slides = Array.from(this.container.children);
        this.slideIndex = 0;
        this.refWidth = 800;
        this.slideTimeInterval = 5000;
        this.itemSlider_frame = 0;
        this.runningFuncs = {};
        this.dots = this.setDots();
        this.controlWindowSize();
        window.addEventListener("resize", this.controlWindowSize.bind(this));
    
    }
    // Next/previous controls
    plusSlides() {
      this.showSlides(this.slideIndex+1);
    }

    // Thumbnail image controls
    currentSlide(n) {
      this.showSlides(n);
    }

    showSlides(n) {
      let i;
      this.slideIndex = n % this.slides.length;
      for (i = 0; i < this.slides.length; i++) {
          this.slides[i].style.display = "none";
      }
      for (i = 0; i < this.dots.length; i++) {
          this.dots[i].className = this.dots[i].className.replace(" active", "");
      }
      this.slides[this.slideIndex].style.display = "block";
      this.dots[this.slideIndex].className += " active";
    }
    
    setDots(){
        //adds navigation dots to a slide container Division
        let div = document.createElement("div");
        div.style = "text-align:center";
        div.className = this.divName + "DotContainer";
        for(let i = 0; i < this.slides.length;i++){
            let spn = document.createElement("span");
            spn.className = "dot";
            spn.addEventListener("click", function(){this.currentSlide(i);}.bind(this));
            div.appendChild(spn);
        }
        this.container.after(div);
        return document.getElementsByClassName("dot");
    }
    
    showAllSlides(s){
        this.slides.forEach(slide => 
                       {slide.style.display = "block"; slide.className.replace(" active", "")});
    }
  
    controlWindowSize(){
                    
        clearTimeout(this.runningFuncs);
        
        if(window.innerWidth < this.refWidth){
            this.showSlides(this.slideIndex);
            this.runNextSlide("reset");
           }  else {
               clearTimeout(this.runningFuncs);
               this.showAllSlides();
               
           }
        
    }
    
    runNextSlide(instant=""){
        clearTimeout(this.runningFuncs);
        instant=="reset"? "" : this.plusSlides();
        this.runningFuncs = setTimeout(this.runNextSlide.bind(this), this.slideTimeInterval);  
        
    }
    

}
