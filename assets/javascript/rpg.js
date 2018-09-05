var chars = {

    luke: { 
        health: 200,
        atk: 70,
        def: 40,
    },

    obiWan: {
        health: 300,
        atk: 80,
        def: 50,
    },

    darthVader: {
        health: 500,
        atk: 150,
        def: 60,
    },

    darthSidious: {
        health: 400,
        atk: 100,
        def: 70,
    }

}

var dmgX = 0; // Player dmg
var dmgY = 0; // Enemy dmg

$("#luke").click(function() {
 $("#obiWan").hide();
 $("#darthVader").hide();  
 $("#darthSidious").hide(); 
 $("#luke").off('click');
 lukePath();
});

$("#obiWan").click(function() {
    $("#luke").hide();
    $("#darthVader").hide();  
    $("#darthSidious").hide(); 
});
   
 $("#darthVader").click(function() {
    $("#obiWan").hide();
    $("#luke").hide();  
    $("#darthSidious").hide(); 
});

$("#darthSidious").click(function() {
    $("#obiWan").hide();
    $("#luke").hide();  
    $("#darthVader").hide(); 
});
   

function lukePath() {
    var lukeObiWan = false;
    var lukeVader = false;
    var lukeSidious = false;
    var lukeObiWanClick = false;
    var lukeSidiousClick = false;
    var lukeVaderClick = false;

  $("#messageLog").text("Pick your first opponent!");
  $("#obiWanE").show();
  $("#darthVaderE").show();
  $("#darthSidiousE").show();
  $("#lukeN").text("Health: " + chars.luke.health);
  $("#darthVaderN1").text("Health: " + chars.darthVader.health);
  $("#darthSidiousN1").text("Health: " + chars.darthSidious.health);
  $("#obiWanN1").text("Health: " + chars.obiWan.health);


  $("#obiWanE").click(function() {
    $("#darthVaderE").hide();
    $("#darthSidiousE").hide();
    $("#messageLog").text("Obi-Wan Kenobi: Ah, young Padawan. Have you come for practice? Very well. I will teach you the skills you need to defeat your foes.")
    $("#attackbtn").show();
    lukeObiWanClick = true;
    $("#obiWanE").off('click');
    chars.luke.atk = chars.luke.atk + 20;
    chars.luke.def = chars.luke.def + 25;
  });

 $("#darthVaderE").click(function() {
  $("#darthSidiousE").hide();
  $("#obiWanE").hide();
  if(lukeSidious) {
      $("#messageLog").text("Darth Vader: Luke, you do not yet realize your importance. You have only begun to discover your power. Join me, and I will complete your training. With our combined strength, we can end this destructive conflict and bring order to the galaxy.")
    chars.luke.def = chars.luke.def + 40;
    chars.luke.att = chars.luke.att + 30;
  }
  else {
      $("#messageLog").text("Darth Vader: Young Skywalker, you do not possess the power to defeat me");
  }
  $("#attackbtn").show();
  $("#darthVaderE").off('click');
  lukeVaderClick = true;

 });

 $("#darthSidiousE").click(function() {
     $("#darthVaderE").hide();
     $("#obiWanE").hide();
     if(lukeObiWan){ 
        $("#messageLog").text("Darth Sidious: I sense a great disturbance in the force. Ah, yes. Luke Skywalker. You DARE challenge the might of the Empire!?");
        chars.luke.def = chars.luke.def + 30;
     } else {
        $("#messageLog").text("Darth Sidious: Foolish Jedi. You shall face the entire strength of the empire!");
     }
     $("#attackbtn").show();
     $("#darthSidiousE").off('click');
     lukeSidiousClick = true;

 })

  $('#attackbtn').click(function() {
    if(lukeObiWanClick) {
        dmgX = (2 * (chars.luke.atk - chars.obiWan.def) / .8 - (chars.obiWan.def * 0.25));
        dmgY = (2 * (chars.obiWan.atk - chars.luke.def) / .6 - (chars.luke.def * 0.2));
        chars.luke.health = chars.luke.health - dmgY;
        chars.obiWan.health = chars.obiWan.health - dmgX;
        $("#lukeN").text("Health: " + chars.luke.health);
        $("#obiWanN1").text("Health: " + chars.obiWan.health);
        $("#messageLog").text("You strike Obi-Wan for " + dmgX + " damage and Obi-Wan strikes you for " + dmgY + " damage.")

    if(chars.luke.health <= 0) {
        alert("You have fallen.");
        location.reload();
    }
        
    if(chars.obiWan.health <= 0) {
        $("#messageLog").text("Obi-Wan Kenobi: Very good, young Luke. Use these techniques against your foes, and may the force be with you." + " Choose another opponent to continue.");
        $("#attackbtn").hide();
        lukeObiWan = true;
        lukeObiWanClick = false;
        chars.luke.health = 300;
        $("#lukeN").text("Health: " + chars.luke.health);
        $("#darthVaderE").show();
        $("#darthSidiousE").show();
        $("#obiWanE").hide();
    }
 
    }
    else if(lukeSidiousClick) {
        dmgX = (2 * (chars.luke.atk - chars.darthSidious.def) / .5);
        dmgY = (2 * (chars.darthSidious.atk - chars.luke.def) / .5);
        chars.luke.health = chars.luke.health - dmgY;
        chars.darthSidious.health = chars.darthSidious.health - dmgX;
        $("#lukeN").text("Health: " + chars.luke.health);
        $("#darthSidiousN1").text("Health: " + chars.darthSidious.health);
        $("#messageLog").text("You strike Darth Sidious for " + dmgX + " damage and Darth Sidious strikes you for " + dmgY + " damage.")

        if(chars.luke.health <= 0) {
            alert("You have fallen.");
            location.reload();
        }

        if(chars.darthSidious.health <= 0) {
            $("#messageLog").text("You used the techniques Obi-Wan taught you and destroyed Darth Sidious, also known as Emperor Palpatine. You feel as if your connection with the force is stronger.");
            $("#attackbtn").hide();
            lukeSidious = true;
            lukeSidiousClick = false;
            chars.luke.health = 500;
            $("#lukeN").text("Health: " + chars.luke.health);
            $("#darthVaderE").show();
            $("#darthSidiousE").hide();
        }
    }
    else if(lukeVaderClick) {
        dmgX = (2 * (chars.luke.atk - chars.darthVader.def) / .5);
        dmgY = (2 * (chars.darthVader.atk - chars.luke.def) / .5);
        chars.luke.health = chars.luke.health - dmgY;
        chars.darthVader.health = chars.darthVader.health - dmgX;
        $("#lukeN").text("Health: " + chars.luke.health);
        $("#darthVaderN1").text("Health: " + chars.darthVader.health);
        $("#messageLog").text("You strike Darth Vader for " + dmgX + " damage and Darth Vader strikes you for " + dmgY + " damage.");
        
        if(chars.luke.health <= 0) {
            alert("You have fallen.");
            location.reload();
        }
        if(chars.darthVader.health <= 0) {
            $("#messageLog").text("You overcome the power of the dark side!");
            $("#attackbtn").hide();
            lukeVaderClick = false;
            chars.luke.health = 500;
            $("#lukeN").text("Health: " + chars.luke.health);
            $("#darthVaderE").hide();
            lukeVader = true;
        }
    }
    if(lukeObiWan && lukeVader && lukeSidious) {
        alert("Congratulations! You win.");
        location.reload();
    }
});



}
