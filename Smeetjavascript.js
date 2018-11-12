// . The Magic Code using Javascript which allows the meun button
// to appear and enabling the nav bar to be responsive
function myFunction() {
    var x = document.getElementById("mynav1");
    if (x.className === "nav1") {
        x.className += " responsive";
    } else {
        x.className = "nav1";
    }
}
//
 