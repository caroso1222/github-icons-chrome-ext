// $(document).ready(function() { 
// 	if ($('.single-img').length) {
// 		var theElem = $(".single-img");
// 		if(theElem.css("cursor")!="zoom-out"){
// 			theElem.trigger('click');
// 		}
// 	}
// });

//https://github.com/trilogy-group/dfproto-crm-frontend

console.log("Ok injected file worked");

function replaceIcons(url) {
  let elems = [].slice.call(document.querySelectorAll('td.icon'));
  

  let elem = elems[9];
  let elem2 = elems[10];
  let elem3 = elems[7];
  let elem4 = elems[8];
  
  let svg = document.createElement('IMG');
  let imgURL = url + 'file_type_light_js.svg';
  svg.setAttribute('src', imgURL);
  
  let svg2 = document.createElement('IMG');
  imgURL = url + 'file_type_light_json.svg';
  svg2.setAttribute('src', imgURL);
  
  let svg3 = document.createElement('IMG');
  imgURL = url + 'file_type_jenkins.svg';
  svg3.setAttribute('src', imgURL);
  
  let svg4 = document.createElement('IMG');
  imgURL = url + 'file_type_markdown.svg';
  svg4.setAttribute('src', imgURL);

  requestAnimationFrame(() => {
    addSVGToElem(svg, elem);
    addSVGToElem(svg2, elem2);
    addSVGToElem(svg3, elem3);
    addSVGToElem(svg4, elem4);
  })
}

function cleanElem(elem) {
  while (elem.firstChild) {
    elem.removeChild(elem.firstChild);
  }
}

function addSVGToElem(svg, elem) {
  cleanElem(elem);
  elem.insertBefore(svg, elem.firstChild);
  elem.style.position = 'relative';
  elem.style.top = '2px';
  elem.style.left = '-1px';
}

document.addEventListener('yourCustomEvent', function (e)
{
    var url=e.detail;
    console.log("received "+url);
    replaceIcons(url+'/');
});
