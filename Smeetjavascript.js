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
$(document).ready(function($) {

	$('.card__share > a').on('click', function(e){ 
		e.preventDefault() // prevent default action - hash doesn't appear in url
   		$(this).parent().find( 'div' ).toggleClass( 'card__social--active' );
		$(this).toggleClass('share-expanded');
    });
  
});
 