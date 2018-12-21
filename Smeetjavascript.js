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
window.onscroll = function() {myFunction1()};

function myFunction1() {
  var winScroll = document.body.scrollTop || document.documentElement.scrollTop;
  var height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
  var scrolled = (winScroll / height) * 100;
  document.getElementById("myBar").style.width = scrolled + "%";
}

function mel() {
    document.getElementById("melBlog").style.display = "block";
    document.getElementById("baliBlog").style.display = "none";
  }

  function bali() {
    document.getElementById("melBlog").style.display = "none";
    document.getElementById("baliBlog").style.display = "block";
  }

  