document.addEventListener("DOMContentLoaded", function() {
    var banner1 = document.getElementById("banner1");
    if (banner1) {
        banner1.textContent = "College Park Airport is the world's oldest continually operated airport. Established in 1909";
        banner1.style.backgroundColor = "#96ADFC";
        banner1.style.color = "#333";
        banner1.style.fontFamily = "American Typewriter, serif";
        banner1.style.fontSize = "14px";
        banner1.style.textAlign = "center"; // Align text to the center
        banner1.style.lineHeight = "1.5"; // Set line height for vertical centering
        banner1.style.paddingTop = "25px"; // Add space above the text
        banner1.style.height = "120px"; // Increase the height of the banner
        
        //Arrow Shape
        banner1.style.clipPath = "polygon(0% 15%, 80% 15%, 80% 0%, 100% 50%, 80% 100%, 80% 85%, 0% 85%)";
    }
});

document.addEventListener("DOMContentLoaded", function() {
    var banner2 = document.getElementById("banner2");
    if (banner2) {
        banner2.textContent = "Denver International Airport is the last major airport built in the US in 1995";
        banner2.style.backgroundColor = "#B987DC";
        banner2.style.color = "#333";
        banner2.style.fontFamily = "American Typewriter, serif";
        banner2.style.fontSize = "16px";
        banner2.style.textAlign = "center"; // Align text to the center
        banner2.style.lineHeight = "1.5"; // Set line height for vertical centering
        banner2.style.paddingTop = "25px"; // Add space above the text
        banner2.style.height = "120px"; // Increase the height of the banner
        
        // Other Arrow Shape
        banner2.style.clipPath = "polygon(100% 15%, 25% 15%, 25% 0%, 0% 50%, 25% 100%, 25% 85%, 100% 85%)";
    }
});