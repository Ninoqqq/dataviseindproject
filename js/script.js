a = 0
function ophalen(){
    opname = document.getElementById("inputtext_Hoeveel").value
    aandeleninit = document.getElementById("Rectangle_1").value
    aandelenmnd = document.getElementById("Rectangle_17").value
    aandelenrenp = document.getElementById("Path_1").value
    aandelenfeesp = document.getElementById("Rectangle_19").value
    aowgw = document.getElementById("Path_2").value
    aowtot = document.getElementById("Rectangle_20").value
    spareninit = document.getElementById("Rectangle_21").value
    sparenmnd = document.getElementById("Rectangle_22").value
    sparenrenp = document.getElementById("Path_3").value
    berekenen();
}

function berekenen(){
    var pRule = +opname * 300
    var eindbedrag = 0
    var aowbedrag = 1250
    i = 0
    aowbedrag = +aowbedrag * (+aowgw * 0.02)
    while (pRule > eindbedrag) {
        if (i == 0) {
        eindbedrag += (+aandeleninit + (+aandelenmnd * 12)) * (1+(+aandelenrenp/100))
        eindbedrag += (+spareninit + (+sparenmnd * 12)) * (1+(+sparenrenp/100))
        } else {
        eindbedrag += (+aandelenmnd * 12)
        eindbedrag = eindbedrag * (1+(+aandelenrenp/100))
        eindbedrag = eindbedrag * (1-(+aandelenfeesp/100))
        eindbedrag += (+sparenmnd * 12)
        eindbedrag = eindbedrag * (1+(+sparenrenp/100))
        }
        i += 1
    }
    i = i*365
    aantalbedden = [];
    for (k = 0; k < i; k++) {
        aantalbedden.push(1)
      }
    document.getElementById('Projectie').innerHTML ="Met de huidig ingevoerde waardes kunt u over " +i+ " nachtjes slapen met pensioen";
    if (a == 0){
    bedden();
    a = a + 1
    }
}


function bedden() {
    y = 0
    x = 1470
    let div = d3.select("#beddiv").append("div")
    .attr("id", "box")
    .attr("viewBox", "0 0 300 200")
    .style("margin-top", "840px")
    .style("fill", "transparent")
    maken();
}

function maken() {
    var times = Math.ceil(aantalbedden.length / 49);
    let svg = d3.select("#beddiv").selectAll("#box")
    .append("svg")
    .attr("height", function(){
        if (aandelenrenp == 420)
            {return times * 35}
        else
            {return times * 31}})
    .attr("width", "1540px")
    .attr("xmlns:xlink", "http://www.w3.org/2000/svg")
    svg.selectAll("svg")
    .data(aantalbedden)
    .enter()
        .append("image")
        .attr("xlink:href",function(){
            if (aandelenrenp == 420)
                {return "img/leaf.svg"}
            else
                {return "img/bed.svg"}})
        .attr("width", "24")
        .attr("height", "24")
        .attr("x", function(d, i){
            if (i % 49 == 0){
                x = x - 1440
            }
            else {x = x + 30}
            return x
        })
        .attr("y", function(d, i1){
            if (i1 % 49 == 0){
                y = y + 30
            }
            return y
    })}