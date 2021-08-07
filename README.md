# SimleSlider.js
A simple Javascript implementation to create a slide inside an HTML page

- Consist of two class definitions; one for animated sliding and the other one is for stationary slides. 
- Both are periodically sliding with timeintervals.

## HTML implementation

Two Div elements are needed to wrap the slider items. 

    <div id="itemSliderContainer" class="itemSliderContainer">
        <a class="prev" onclick="itemSlider.pushSlide('prev')">&#10094;</a>
        <a class="next" onclick="itemSlider.pushSlide('next')">&#10095;</a>
        <div id="itemSlider" class="itemSlider">
          .
          .
          .
           <div class="categoryItem">
                <a href="..." target="_blank">
                    <img src="...">
                </a> 
            </div>
          .
          .
          .
        </div>
    </div>
    
  Then slider should be initialised.
  
  <script src="slider.js"></script>
  <script>
    const itemSlider = new SlidingItemsBar(3, "itemSlider");
  </script>
    
  that is it. Open the page and see the items sliding. Congrats!
    
