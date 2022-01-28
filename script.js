
var str = document.currentScript.src;
str = str.split("?").pop();
console.log(str);


var body = document.getElementsByTagName("BODY")[0];
var newdiv = document.createElement("div");
body.appendChild(newdiv);

const queryString = str;
console.log("query");
console.log(queryString);
var searchParams = new URLSearchParams(str);

var bkcolor = searchParams.getAll('bkgcol');
console.log(bkcolor);
console.log(bkcolor);
if(bkcolor == null){bkcolor = "white"}
console.log(bkcolor);
// bkcolor
var pmcolor = searchParams.getAll('pmcol');
if(pmcolor == null){pmcolor = "gray"}
console.log(pmcolor);
// pmcolor
var fontcolor = searchParams.getAll('fontcol');
if(fontcolor == null){fontcolor = "black"}
console.log(fontcolor);
// fontcolor


newdiv.outerHTML += `<svg width="100%" height="163" style="position: absolute;z-index: 200;">
  <rect x="2%" y="20" rx="20" ry="20" width="95%" height="133"
  style="fill:` + bkcolor + `;stroke:black;stroke-width:5;opacity:1" />
  <text x="5%" y="100" font-family="Verdana" font-size="32" fill="` + fontcolor + `">Texto de relleno para ver como queda el texto</text>
  <g>
  <rect x="80%" y="80" width="10%" height="40" onclick="sacar()" style="fill:` + pmcolor + `;stroke-width:3;stroke:rgb(0,0,0)" />
	<text x="81.5%" y="110" font-family="Verdana" onclick="sacar()" font-size="32" fill="` + fontcolor + `">Aceptar</text>
  </g>
Sorry, your browser does not support inline SVG.
</svg>`;

function sacar(){
  var asd = document.getElementsByTagName('svg')[0];
  asd.remove();
}
//rgb(75,0,166)