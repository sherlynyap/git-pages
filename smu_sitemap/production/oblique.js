 jQuery(document).ready(function ($) {
 
jQuery(function() {
  obgResize();
});
 

 jQuery.fn.cssFloat = function (prop) {
    return parseFloat(this.css(prop)) || 0;
  };  

  jQuery(window).resize(function() {
    obgResize();
  });

  function obgResize() {    
    var siteWidth = jQuery('#header').cssFloat("width");
    console.log("siteWidth: ", siteWidth);
    var siteLeftMargin = Math.ceil(jQuery('#header-two > .container').cssFloat("margin-left"));
    var siteLeftPadding = Math.ceil(jQuery('#header-two > .container').cssFloat("padding-left"));
    var obgWhiteWt = siteLeftMargin + siteLeftPadding;
    var obgSiteWt = siteWidth - obgWhiteWt;
    jQuery(".obg-white").css("width", obgWhiteWt + "px");
    jQuery(".obg-site").css("width", obgSiteWt + "px");  
  }
});
 