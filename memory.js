document.getElementById("start").addEventListener("click",function () { start_game(); } );

var current_cards = new Array();
var create_listener = new Array(12);

var one_visible = false;
var counter_turn = 0;
var first_card = -1;
var lock = false;
var correct_pairs = 0;

var level = 1;
var times = 42;
var current_lock_timer = false;

var timer_box = document.createElement("div");
timer_box.setAttribute("class","timer");
document.body.appendChild(timer_box);

function create_timer() // utworzenie timera
{
	$('.timer').html("Pozostały czas: "+times+"s"); 
	setTimeout(function() { $('.timer').css('opacity','1'); },1000);
}

function timer(first_timer_lock) //uruchomienie i zatrzymanie timera
{
	
	if(first_timer_lock == false)
	{
		if(correct_pairs == 0)
			{
				create_timer();
			}

		if(current_lock_timer == false)
		{
			if(times == 0) // porażka gdy upłynął czas
			{
				setTimeout(function() { 
				$('.score').css('opacity','0'); 
				$('.card').css('opacity','0');
				$('.card_active').css('opacity','0');
				$('.timer').css('opacity','0');
				$('.describe').css('opacity','0');
				$('.timer').css('display','none');
				},500);	
				
				setTimeout(function() { 
				$('.board').html('<div class="winner"><h1>PRZEGRANA</h1> <br> Suma ruchów to: '+counter_turn+"<br><br>Ilość odkrytych par: "+correct_pairs+"<br><br><span id='start' onclick='location.reload()'>Zacznij grę od nowa</span></div>");
				},1000);
				
				setTimeout(function() { $('.winner').css('opacity','1'); },1400);
			}
			
			else
			{
				times--;
				$('.timer').html("Pozostały czas: "+times+"s");
				setTimeout("timer("+first_timer_lock+")",1000);
			}
		}
	}
}

function winner(if_level_4) //wygrana
{
		current_lock_timer = true;
		times = 62;
		setTimeout(function() { 
		$('.score').css('opacity','0'); 
		$('.card').css('opacity','0');
		$('.card_active').css('opacity','0');
		$('.timer').css('opacity','0');
		$('.describe').css('opacity','0');
		},500);	
		
		if(if_level_4 == true)
		{
			setTimeout(function() { 
			$('.board').html('<div class="winner"><h1>OSTATECZNE ZWYCIĘSTWO</h1> <br> Suma ruchów to: '+counter_turn+"<br><br>Ilość odkrytych par: "+correct_pairs+"<br><br> Udało Ci się przejść wszystkie poziomy - GRATULACJE WIEDŹMINIE <br><br><span id='start' onclick='location.reload()'>Zacznij grę od nowa</span></div>");
			},800);
		}
		
		else
		{
			setTimeout(function() { 
			$('.board').html('<div class="winner"><h1>ZWYCIĘSTWO</h1> <br> Suma ruchów to: '+counter_turn+"<br><br>Ilość odkrytych par: "+correct_pairs+"<br><br><span id='start' onclick='start_game()'>NASTĘPNY POZIOM</span></div>");
			},800);
		}
		
		setTimeout(function() { $('.winner').css('opacity','1'); },1200);
		
		level++;
}


function matching_cards(card1,card2) //usuwanie dobranej pary i okodowanie zwycięstwa
{
	$('#c'+card1).css('opacity','0');
	$('#c'+card2).css('opacity','0');
	lock = false;
		
	switch(correct_pairs)
	{
		case 6:
		{
			if(level == 1) winner(false);
		}break;
		
		case 9:
		{
			if(level == 2) winner(false);
		}break;
		
		case 12:
		{
			if(level == 3) winner(false);
		}break;
		
		case 15:
		{
			if(level == 4) winner(true);
		}break;
	}
}

function not_matching_cards(card1,card2) //chowanie niepasujacych kart
{
	$('#c'+card1).css('background-image','url("img/karta.png")');
	$('#describe'+card1).css('opacity','0');
	$('#c'+card1).addClass('card');
	$('#c'+card1).removeClass('card_active');
		
	$('#c'+card2).css('background-image','url("img/karta.png")');
	$('#describe'+card2).css('opacity','0');
	$('#c'+card2).addClass('card');
	$('#c'+card2).removeClass('card_active');
	
	lock = false;
	first_card = -1;
}

function reveal_card(nr) //system porównania dwóch kart
{
	var opacity_value = $('#c'+nr).css('opacity');
	
	if(opacity_value != 0 && first_card != nr && lock == false)
	{
		lock = true;
		var image = "url('img/"+current_cards[nr]+".jpg')";
		
		$('#c'+nr).css('background-image',image);
		$('#describe'+nr).css('opacity','0.6');
		$('#c'+nr).addClass('card_active');
		$('#c'+nr).removeClass('card');
		
		if(one_visible == false)
		{
			one_visible = true;
			first_card = nr
			lock = false;
		}
		else
		{
			if(current_cards[nr] == current_cards[first_card])
			{
				setTimeout(function() { matching_cards(first_card,nr) },1000);
				correct_pairs++;
			}
			else
			{
				setTimeout(function() { not_matching_cards(first_card,nr) },1000);
			}
			
			counter_turn++;
			$('.score').html('<span id="level">Level: '+level+'</span> Liczba ruchów: '+counter_turn);
			one_visible = false;
		}
	}
}

function start_game() //inicjowanie planszy gry
{
	counter_turn = 0;
	correct_pairs = 0;
	var time = 1;
	
	if(level != 1)
	{
		$('.winner').css('opacity','0');
		setTimeout(function() { $('.winner').css('display','none'); },400);
		time = 2;
	}
	else if(level == 1)
	{
	$('#start').css('opacity','0');
	setTimeout(function() { $('#start').css('display','none'); },400*time);	
	}
	
	var for_to_do = 11;
	var width_board;
	
	var cards1 = ["Ciri","Ciri","Regis","Regis","Geralt","Geralt","Pan Lusterko","Pan Lusterko","Krwawy Baron","Krwawy Baron","Sigi Dijkstra","Sigi Dijkstra"];
	var cards = cards1;
	var losuj = 11;
	
	
	switch(level)
	{
		case 2:
		{
			for_to_do = 17;
			losuj = 17;
			$('.board').css('width','900px');
			var cards2 = ["Ciri","Ciri","Regis","Regis","Geralt","Geralt","Pan Lusterko","Pan Lusterko","Krwawy Baron","Krwawy Baron","Sigi Dijkstra","Sigi Dijkstra","Troll Bart","Troll Bart","Lambert","Lambert","Vesemir","Vesemir"];
			cards = cards2;
			times += 5;
		}break;
		
		case 3:
		{
			for_to_do = 23;
			losuj = 23;
			$('.board').css('width','1200px');
			var cards3 = ["Ciri","Ciri","Regis","Regis","Geralt","Geralt","Pan Lusterko","Pan Lusterko","Krwawy Baron","Krwawy Baron","Sigi Dijkstra","Sigi Dijkstra","Troll Bart","Troll Bart","Lambert","Lambert","Vesemir","Vesemir","Hjalmar","Hjalmar","Dettlaff","Dettlaff","Imlerith","Imlerith"];
			cards = cards3;
			times += 15;
		}break;
		
		case 4:
		{
			for_to_do = 29;
			losuj = 29;
			$('.board').css('width','100vw');
			var cards4 = ["Ciri","Ciri","Regis","Regis","Geralt","Geralt","Pan Lusterko","Pan Lusterko","Krwawy Baron","Krwawy Baron","Sigi Dijkstra","Sigi Dijkstra","Troll Bart","Troll Bart","Lambert","Lambert","Vesemir","Vesemir","Hjalmar","Hjalmar","Dettlaff","Dettlaff","Imlerith","Imlerith","Milton","Milton","Skurwiel Junior","Skurwiel Junior","Utopiec","Utopiec"];
			cards = cards4;
			times += 30;
		}break;
	}

		for(i=0; i<=for_to_do; i++)
		{
					var rand = Math.round(Math.random()*losuj);
					current_cards[i] = cards[rand];
					cards.splice(rand,1);
					losuj--;
		}
		
	var board = document.getElementById("board");

	var score = document.createElement("div");
	score.setAttribute("class","score");
	score.innerHTML = "<span id='level'>Level: "+level+"</span> Liczba ruchów: 0";
	board.appendChild(score);

	setTimeout(function() {
	for(let i=0; i<=for_to_do; i++)
		{
			var divs = document.createElement("div");
			divs.setAttribute("class","card");
			divs.setAttribute("id","c"+i+"");
			board.appendChild(divs);
			$('#c'+i).html("<div class='describe' id='describe"+i+"'>"+current_cards[i]+"</div>");
			create_listener[i] = document.getElementById("c"+i);
			create_listener[i].addEventListener("click", () => reveal_card(i));
		}
	},400*time);
	
	setTimeout(function() { $('.score').css('opacity','1'); },1000*time);	
	setTimeout(function() { $('.card').css('opacity','1'); },1000*time);
	
	current_lock_timer = false;
	setTimeout(function() { timer(current_lock_timer); },500*time);
}