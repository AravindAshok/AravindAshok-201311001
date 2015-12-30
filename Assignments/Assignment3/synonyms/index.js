var done = [];
var lang = sessionStorage.getItem('lang');
var number_of_questions;


function next_question(){

//initialising
var option1 = document.getElementById("option1");
option1.style="font-size:30px";
option1.className = "btn btn-default";

var option2 = document.getElementById("option2");
option2.style="font-size:30px";
option2.className = "btn btn-default";

var option3 = document.getElementById("option3");
option3.style="font-size:30px";
option3.className = "btn btn-default";


var xhttp = new XMLHttpRequest();
var rand_options;
var rand_question;

xhttp.onreadystatechange = function() {
    if (xhttp.readyState == 4 && xhttp.status == 200) {
        displayQuestion(xhttp);
    }
};
xhttp.open("GET", "index.xml", true);
xhttp.send();
}

function displayQuestion(xml) {
	var i=0, completed = 1;
	var xmlDoc = xml.responseXML;
	var first_time=1;

	if(lang == "hindi")
		var q = xmlDoc.getElementsByTagName("q_hin");
	else if(lang == "malayalam")
		var q = xmlDoc.getElementsByTagName("q_mal");
	else if(lang == "bengali")
		var q = xmlDoc.getElementsByTagName("q_ben");

	number_of_questions = q.length;
	for (i = 0; i < number_of_questions; i++) {
		if(done[i] != 1)
			completed = 0;
	};

	if(completed == 1)
	{
		alert("Congrats! Game completed.");
		window.location.reload();
		location.href='home.html';
	}

	else
	{
	while(first_time == 1 || done[rand_question] == 1)
	{
		first_time = 0;
		rand_question = Math.floor((Math.random() * number_of_questions));
	}
	done[rand_question] = 1;

	var word = q[rand_question].getElementsByTagName("word")[0].childNodes[0].nodeValue;
	var synonym = q[rand_question].getElementsByTagName("synonym")[0].childNodes[0].nodeValue;
	var option1 = q[rand_question].getElementsByTagName("option1")[0].childNodes[0].nodeValue;
	var option2 = q[rand_question].getElementsByTagName("option2")[0].childNodes[0].nodeValue;

	document.getElementById("word").innerHTML = word;
	rand_options = Math.floor((Math.random() * 3) + 1);

	if(rand_options == 1)
	{
		document.getElementById("option1").innerHTML = synonym;
		document.getElementById("option2").innerHTML = option1;
		document.getElementById("option3").innerHTML = option2;
	}
	if(rand_options == 2)
	{
		document.getElementById("option1").innerHTML = option1;
		document.getElementById("option2").innerHTML = synonym;
		document.getElementById("option3").innerHTML = option2;
	}
	if(rand_options == 3)
	{
		document.getElementById("option1").innerHTML = option2;
		document.getElementById("option2").innerHTML = option1;
		document.getElementById("option3").innerHTML = synonym;
	}
	}
}