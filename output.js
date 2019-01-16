
// Get your own API key from https://uwaterloo.ca/api/register
var apiKey = 'b742228fca827e06d466c0a642e65cc7 ';

function time() {
	var d = new Date();
	return d.toTimeString() + " (" + d.getSeconds() + "." + d.getMilliseconds() + ")";
}

function test(){
    alert('hi');
}




var total = 0;


function foodlookup(x) {
	var year = document.getElementById('year').value;
	var week = document.getElementById('week').value;
	if (year == "" || week == ""){
 	   document.getElementById("total").innerHTML = "";
 	   $("#total").append("<p id=none> Please enter a year number and a week number!</p>");
	} else {
 $.getJSON("https://api.uwaterloo.ca/v2/foodservices/"+year+"/"+week+"/menu.json?key=" + apiKey,
 		function (d) {
			var textbox = $('select[name=box]').val();
			var textval = document.getElementById('t1').value;
			textval.toLowerCase();
 			var outlets = d.data.outlets;
 			for(var i=0; i < outlets.length; ++i){
 				if(x == outlets[i].outlet_id){
 					$("#result").append("<div class=resta id=r" + i + ">");
 					
 					$("#r"+i).append("<p id=resname>" +  JSON.stringify(outlets[i].outlet_name, null, 3) + "</p>");
					
					for(var k = 0; k < outlets[i].menu.length; ++k){
						var t = outlets[i].menu[k].meals;
						var lcount = 0;
						var dcount = 0;
						$("#r"+i).append("<div class=day id=d"+i+k + ">");
						$("#d"+i+k).append("<p id=dayname>" +  JSON.parse(JSON.stringify(outlets[i].menu[k].day, null, 3)) + "</p>");
						$("#d"+i+k).append("<p id=timename>" +  "Lunch Items:" + "</p>");
						if (t.lunch.length != 0){
							for(var j=0 ; j< t.lunch.length;++j){
								var type = t.lunch[j].diet_type;
								var name = String(t.lunch[j].product_name);
								var lname = name.toLowerCase();
								console.log(textbox);
								if((type == "Vegetarian" || type == "Vegan") && textbox == "veg"){
									if(~name.indexOf(textval)){
 										$("#d"+i+k).append("<p id=foodname>" + "&#9679;" + " " + JSON.parse(JSON.stringify(name, null, 3)) + "</p>");
 										total++;
 										lcount++;
 										document.getElementById("total").innerHTML = "";
 										$("#total").append("<p> Results:" +  total + "</p>");
									}
								} else if  (type == "Halal" && textbox == "halal"){
									if(~lname.indexOf(textval)){
 										$("#d"+i+k).append("<p id=foodname>" +  "&#9679;" + " " + JSON.parse(JSON.stringify(name, null, 3)) + "</p>");
 										total++;
 										lcount++;
 										document.getElementById("total").innerHTML = "";
 										$("#total").append("<p> Results:" + total + "</p>");
									}
								} else if (textbox == "none"){
 									if(~lname.indexOf(textval)){
 										$("#d"+i+k).append("<p id=foodname>" +  "&#9679;" + " " + JSON.parse(JSON.stringify(name, null, 3)) + "</p>");
 										total++;
 										lcount++;
 										document.getElementById("total").innerHTML = "";
 										$("#total").append("<p> Results:" +  total + "</p>");
									} 
 								} 
 								if(lcount == 0 && j == t.lunch.length-1){
 									$("#d"+i+k).append("<p id=foodname>" + "&#9679;" + " "+  "No Lunch Items Match The Criteria" + "</p>");
 								}
							}
						} else {
							$("#d"+i+k).append("<p id=foodname>" + "&#9679;" + " "+ "No Lunch Items Match The Criteria" + "</p>");
						}
 						$("#d"+i+k).append("<p id=timename>" +  "Dinner Items:" + "</p>");
						if (t.dinner.length != 0){
							for(j=0 ; j< t.dinner.length;++j){
								var type = t.dinner[j].diet_type;
								var name2 = String(t.dinner[j].product_name);
								var lname2 = name2.toLowerCase();
								if((type == "Vegetarian" || type == "Vegan") && textbox == "veg"){
									if(~name.indexOf(textval)){
 										$("#d"+i+k).append("<p id=foodname>" + "&#9679;" + " " + JSON.parse(JSON.stringify(name, null, 3)) + "</p>");
 										total++;
 										lcount++;
 										document.getElementById("total").innerHTML = "";
 										$("#total").append("<p> Results:" +  total + "</p>");
									}
								} else if  (type == "Halal" && textbox == "halal"){
									if(~lname.indexOf(textval)){
 										$("#d"+i+k).append("<p id=foodname>" + "&#9679;" + " " + JSON.parse(JSON.stringify(name, null, 3)) + "</p>");
 										total++;
 										lcount++;
 										document.getElementById("total").innerHTML = "";
 										$("#total").append("<p> Results:" + total + "</p>");
									}
								} else if (textbox == "none"){
 									if(~lname.indexOf(textval)){
 										$("#d"+i+k).append("<p id=foodname>" + "&#9679;" + " " + JSON.parse(JSON.stringify(name, null, 3)) + "</p>");
 										total++;
 										lcount++;
 										document.getElementById("total").innerHTML = "";
 										$("#total").append("<p> Results:" +  total + "</p>");
									} 
 								} 
 								if(dcount == 0 && j == t.dinner.length-1){
 									$("#d"+i+k).append("<p id=foodname>" + "&#9679;" + " "+  "No Dinner Items Match The Criteria" + "</p>");
 								}
							}
						} else {

 							$("#d"+i+k).append("<p id=foodname>" +  "&#9679;" + " "+ "No Dinner Items Match The Criteria" + "</p>");
						}
						$("#r"+i).append("</div>");
					}
 					$("#result").append("</div>");
 				}
 			}

 		});
	}
};




function init() {
 if (apiKey === '') {
 	document.write("You need an API key. Edit output.js");
 }

 $.getJSON("https://api.uwaterloo.ca/v2/foodservices/outlets.json?key=" + apiKey,
 		function (d) {
 			total = 0;
 			document.getElementById("total").innerHTML = "";
 			$('#result').empty();
 			var times= [];
 			for(var i=0; i < 3 ; ++i){
 				if (document.getElementById("c"+(i+1)).checked){
 					times.push(1);
 				}else{
 					times.push(0);
 				}
 			}
 			var fname = d.data;
 			var validres = [];
 			var avail = [];
 			//$("#out").append("<pre>" +JSON.stringify(fname, null, 3) + "</pre>");
 			for(i=0; i < fname.length ; ++i){
 				avail.length = 3;
 				avail[0]=fname[i].has_breakfast;
 				avail[1]=fname[i].has_lunch;
 				avail[2]=fname[i].has_dinner;
 				var t1 = 1;
 				if(avail[0] + avail[1] + avail[2]==0){
 					continue;
 				}
 				for(var k=0; k<3 ; ++k){
 					if(times[k]==1 && avail[k]==0){
 						t1=0 ;
 					}
 				}
 				if(t1==1){
					validres.push(fname[i].outlet_id);
					//$("#out").append("<pre>" +  JSON.stringify(fname[j], null, 3) + "</pre>");
 				}
 				avail = [];
 				avail.length = 0;
 			}
 			document.getElementById("total").innerHTML = "";
 			$("#total").append("<p id=none>" + "Results: 0" + "</p>");
 			if (validres.length == 0){

 			}else{
 				for(var i=0; i < validres.length ; ++i){
					foodlookup(validres[i]);
 				}
 			}
 		});
};

