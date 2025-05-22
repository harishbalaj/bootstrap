//range for input start
const budgetSlider = document.getElementById("budgetRange");

const budgetMin =  1000; 
const budgetMax = 100000; 
const budgetStep = 1000; 
budgetSlider.max = budgetMax;
budgetSlider.step = budgetStep;
//range for end

//filter the dropbox when user select the option
document.addEventListener("DOMContentLoaded", function(){

const applyButton  = document.getElementById("btn");
const packageFilter = document.getElementById("packageFilter");
const destinationFilter = document.getElementById("destinationFilter");
const durationFilter = document.getElementById("durationFilter");
const transportFilter = document.getElementById("transportFilter");
const themeFilter = document.getElementById("themeFilter");
const budgetRange = document.getElementById('budgetRange');
const budgetValue = document.getElementById('budgetValue');
const cards = document.querySelectorAll('.card');
const notFindMessage = document.getElementById('notFind');
 
//Initialize default values
function resetFilters(){
    packageFilter.value = "all";
    destinationFilter.value = "all";
    durationFilter.value = "all";
    transportFilter.value = "all";
    themeFilter.value = "all";
    budgetRange.value = budgetRange.max; // Set to max budget(show all)
    budgetValue.textContent = `₹${budgetRange.max}/-`;
    showAllCards();
}

//show all cards when page loads
function showAllCards(){
    cards.forEach(card =>{
        card.closest(".col-md-6").style.display = "block"; 
    });
    notFindMessage.textContent = ""; // Clear the message
}

//Update Budget Display in real-time
budgetRange.addEventListener("input",function(){
    budgetValue.textContent = `₹${this.value}/Per head`;
    budgetValue.style.color = "black";
    budgetValue.style.fontWeight = "bold";
    budgetValue.style.fontSize = "20px";
});

//Filter Function cards based on selected criteria
function filterCards(){
    const selectedPackage = packageFilter.value;
    const selectDestination = destinationFilter.value;
    const selectDuration = durationFilter.value;
    const selectTransport = transportFilter.value;
    const selectTheme = themeFilter.value;
    const selectedBudget = parseInt(budgetRange.value);

    let anyVisible = false;

    cards.forEach(card =>{
        const cardPackage= card.getAttribute("data-package");
        const cardDestination = card.getAttribute("data-destination");
        const cardDuration = card.getAttribute("data-duration");
        const cardTransport = card.getAttribute("data-transport");
        const cardTheme = card.getAttribute("data-theme");
        const cardPrice = parseInt(card.getAttribute("data-price"));

        //check if the card matches the selected filters
        const matchesAllFilters = 
        (selectedPackage === "all" || cardPackage === selectedPackage) &&
        (selectDestination === "all" || cardDestination === selectDestination) &&
        (selectDuration === "all" || cardDuration === selectDuration) &&
        (selectTransport === "all" || cardTransport === selectTransport) &&
        (selectTheme === "all" || cardTheme === selectTheme) &&
        cardPrice <= selectedBudget;

        if(matchesAllFilters){
            card.closest(".col-md-6").style.display = "block";
            anyVisible = true; //atleast visible one card
        } else{
            card.closest(".col-md-6").style.display = "none";
        }
    });
    notFindMessage.textContent = anyVisible ? "":
    "No package found matching criteria";
}
//apply button event listener
applyButton.addEventListener("click",function(){

    //check if any filter is active
    const isAnyFilterActive = 
    packageFilter.value !== "all" ||
    destinationFilter.value !== "all" ||
    durationFilter.value !== "all" ||
    transportFilter.value !== "all" ||
    themeFilter.value !== "all" ||
    budgetRange.value !== budgetRange.max; // Budget filter is active

    if(isAnyFilterActive){
        filterCards(); // Call the filter function
    }
    else{
        showAllCards(); // Show all cards if no filter is active
    }
    
   });

   //reset filters after applying
   resetFilters(); 

});



// Jquery


$(document).ready(function() {
    // Handle Book Now button clicks
    $(".btnBook").click(function() {
        // Show the cart count badge
       $("#cartCount").removeClass("d-none").addClass("d-block");
      // Get the specific card's elements
      var $card = $(this).closest(".card");
      
      // Increment only this card's counter
      var $cardCounter = $card.find(".card-cart-count");
      var currentCount = parseInt($cardCounter.text()) || 0;
      $cardCounter.text(currentCount + 1);
      
      // Update main cart total
      var totalCount = parseInt($("#cartCount").text()) || 0;
      $("#cartCount").text(totalCount + 1);
      
      // Get item details from this specific card
      var imgSrc = $card.find("img").attr("src");
      var title = $card.find(".packageHead").attr("cartId");
      var price = $card.find(".amnt").attr("cartId");
      var info = $card.find(".card-list").attr("infoId");
      
      // Add to cart (your existing functionality)
      var cartItem = `
      <div class="main row d-flex border border-top-0 border-left-0 border-right-0">
        <div class="col-md-12 d-flex justify-content-center align-content-center border border-left-0 border-right-0 border-bottom-0">
          <img src="${imgSrc}" class="w-100" alt="" />
        </div>
        <div id="title" class="col-md-12 mt-2 d-flex flex-wrap justify-content-center align-content-center p-2">
          <p class="fw-bold fs-4">${title}</p>
        </div>
        <div id="price" class="col-md-12 d-flex flex-wrap justify-content-center align-content-center">
          <p class="fs-4">${info}</p>
        </div>
        <div id="price" class="col-md-12 d-flex flex-wrap justify-content-center align-content-center">
          <h6><span class="fs-3">₹</span><span class="cartPrice fs-3">${price}</span></h6>
        </div>
        <button class="close btn btn-sm btn-danger">×</button>
      </div>`;
      
      $(".cartBox").append(cartItem);
    });
    
    // Handle close buttons (using event delegation)
    $(document).on("click", ".close", function() {
      $(this).closest(".main").remove();
      // Update main cart total
      $("#cartCount").text($(".main").length);
      $("#cartCount").text(cartCount);
      if(cartCount === 0) {
      $("#cartCount").removeClass("d-block").addClass("d-none");
    }
    });
    
    $(".orderBtn").click(function(){
             var cartItems = $("#cartContainer .main");
            if(cartItems.length > 0){
                //Generate the 6 digit number
                var bookingId = Math.floor(Math.random() * 900000 + 100000);
                alert("Your Booking is ready!! & Your Booking ID - "+ bookingId);
                cartItems.remove(); // remove all cart Item keep CartBox
                cartCount=0;
                $("#cartCount").text("0").removeClass("d-block").addClass("d-none");
            }
            else{
                alert("Your booking details is empty!!");
            }
         })

  });

