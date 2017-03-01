// ==UserScript==
// @name StackNarrow
// @description 
// @namespace TravisJ
// @author TravisJ
// @license GNU GPL v3 (http://www.gnu.org/copyleft/gpl.html)
// @include http://meta.stackoverflow.com/*
// @include http://stackoverflow.com/*

//main
(function main() {
 var width = function(elem){
  var view = elem.ownerDocument.defaultView;
  if ( !view || !view.opener ) {
    view = window;
  }
  return view.getComputedStyle(elem).getPropertyValue("width").replace("px","");
 };
 var $ = document.querySelector.bind(document);
 var $$ = document.querySelectorAll.bind(document);
 var listBroken = true;
 var userPage = this.location.href.indexOf('stackoverflow.com/users') > -1;
 var query = userPage? "div" : "body > div";
 observer = new MutationObserver(function(mutations) {
  if(listBroken)
  {
	  var layout = $('.question-list-layout');
	  var sidebar;
	  if(layout) sidebar = $("#sidebar");
	  if(sidebar) {
		  sidebar.parentNode.insertBefore(layout,sidebar);
		  listBroken = false;
	  }
  }
  if(userPage && false){
	  $$("div").forEach(function(div){
		  if(width(div) > 900){
			  div.setAttribute("style","width:100%;padding:0 0 0 0;min-width:initial;");
		  }
	  })
  }else{
	  var check = true;
	  $$(query).forEach(function(div){
		  if(width(div) > 900){
				div.style.width = "100%";
				if(check && (div.className.indexOf('container') >-1)){
					if(!userPage)check = false;
				}else{
					div.style.padding = "0px";
				}
		  }
	  })
  }
  if(document.readyState == "complete"){
   observer.disconnect();
  }
 });
	 	
 var config = { attributes: false, childList: true, characterData: false };
 observer.observe(document.documentElement, config);
})();