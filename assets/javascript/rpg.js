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

$(document).ready(function() {
console.log("Luke's path: Obi-Wan, Darth Sidious, Darth Vader");
console.log("Obi-Wan's path: Luke, Darth Vader, Darth Sidious");
console.log("Darth Vader's path: Luke, Obi-Wan, Darth Sidious");
console.log("Darth Sidious's path: Obi-Wan, Darth Vader, Luke");
 });

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
    $("#obiWan").off('click');
    obiWanPath();
});
   
 $("#darthVader").click(function() {
    $("#obiWan").hide();
    $("#luke").hide();  
    $("#darthSidious").hide(); 
    $("#darthVader").off('click');
    vaderPath();
});

$("#darthSidious").click(function() {
    $("#obiWan").hide();
    $("#luke").hide();  
    $("#darthVader").hide(); 
    $("#darthSidious").off('click');
    sidiousPath();
    
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

function obiWanPath() {
  var obiLuke = false;
  var obiVader = false;
  var obiSidious = false;
  var obiLukeClick = false;
  var obiVaderClick = false;
  var obiSidiousClick = false;

  $("#messageLog").text("Pick your first opponent!");
  $("#lukeE").show();
  $("#darthVaderE").show();
  $("#darthSidiousE").show();
  $("#lukeN1").text("Health: " + chars.luke.health);
  $("#darthVaderN1").text("Health: " + chars.darthVader.health);
  $("#darthSidiousN1").text("Health: " + chars.darthSidious.health);
  $("#obiWanN").text("Health: " + chars.obiWan.health);

  $("#lukeE").click(function() {
    $("#darthVaderE").hide();
    $("#darthSidiousE").hide();
    $("#messageLog").text("Luke: Master Kenobi, I'm ready for your lesson!")
    $("#attackbtn").show();
    obiLukeClick = true;
    $("#lukeE").off('click');
  });

  $("#darthVaderE").click(function() {
    $("#darthSidiousE").hide();
    $("#lukeE").hide();
    if(obiLuke) {
        $("#messageLog").text("Darth Vader: Ah, my old master comes to face me. Draw your lightsaber, Obi-Wan. Prepare to fall!")
      chars.obiWan.def = chars.obiWan.def + 50;
      chars.obiWan.att = chars.obiWan.att + 50;
    }
    else {
        $("#messageLog").text("Darth Vader: Ah, Master Kenobi. Your connection to the force is weak. You will die today.");
    }
    $("#attackbtn").show();
    $("#darthVaderE").off('click');
    obiVaderClick = true;
  
   });

   $("#darthSidiousE").click(function() {
    $("#darthVaderE").hide();
    $("#lukeE").hide();
    if(obiVader){ 
       $("#messageLog").text("Darth Sidious: I sense a great disturbance in the force. Ah, Ben Kenobi. You will face the full strength of the empire!");
    } else {
       $("#messageLog").text("Darth Sidious: Hahahaha! Foolish Jedi, you cannot harm me.");
    }
    $("#attackbtn").show();
    $("#darthSidiousE").off('click');
    obiSidiousClick = true;

})

  $('#attackbtn').click(function() {
    if(obiLukeClick) {
        dmgX = (2 * ((chars.obiWan.atk - chars.luke.def) / .8) -20);
        dmgY = (2 * (chars.luke.atk - chars.obiWan.def) / .5);
        chars.obiWan.health = chars.obiWan.health - dmgY;
        chars.luke.health = chars.luke.health - dmgX;
        $("#lukeN1").text("Health: " + chars.luke.health);
        $("#obiWanN").text("Health: " + chars.obiWan.health);
        $("#messageLog").text("You strike Luke for " + dmgX + " damage and Luke strikes you for " + dmgY + " damage.")

    if(chars.obiWan.health <= 0) {
        alert("You have fallen.");
        location.reload();
    }
        
    if(chars.luke.health <= 0) {
        $("#messageLog").text("Luke: Your connection to the force is still strong, master Kenobi. Go forth, and may the force be with you.");
        $("#attackbtn").hide();
        obiLuke = true;
        obiLukeClick = false;
        chars.obiWan.health = 600;
        $("#obiWanN").text("Health: " + chars.obiWan.health);
        $("#darthVaderE").show();
        $("#darthSidiousE").show();
        $("#lukeE").hide();
    }
 
    }
    else if(obiSidiousClick) {
        if(obiVader) {
        dmgX = (2 * (chars.obiWan.atk - chars.darthSidious.def) / .5)
        }
        else {
        dmgX = 0;
        }
        dmgY = (3 * (chars.darthSidious.atk - chars.obiWan.def) / .8);
        chars.obiWan.health = chars.obiWan.health - dmgY;
        chars.darthSidious.health = chars.darthSidious.health - dmgX;
        $("#obiWanN").text("Health: " + chars.obiWan.health);
        $("#darthSidiousN1").text("Health: " + chars.darthSidious.health);
        $("#messageLog").text("You strike Darth Sidious for " + dmgX + " damage and Darth Sidious strikes you for " + dmgY + " damage.")

        if(chars.obiWan.health <= 0) {
            alert("You have fallen.");
            location.reload();
        }

        if(chars.darthSidious.health <= 0) {
            $("#messageLog").text("You used the techniques Obi-Wan taught you and destroyed Darth Sidious, also known as Emperor Palpatine. You feel as if your connection with the force is stronger.");
            $("#attackbtn").hide();
            obiSidious = true;
            obiSidiousClick = false;
            chars.obiWan.health = 500;
            $("#obiWanN").text("Health: " + chars.obiWan.health);
            $("#darthVaderE").show();
            $("#darthSidiousE").hide();
        }
    }
    else if(obiVaderClick) {
        dmgX = (2 * (chars.obiWan.atk - chars.darthVader.def) / .2);
        dmgY = (2 * (chars.darthVader.atk - chars.obiWan.def) / .8);
        chars.obiWan.health = chars.obiWan.health - dmgY;
        chars.darthVader.health = chars.darthVader.health - dmgX;
        $("#obiWanN").text("Health: " + chars.obiWan.health);
        $("#darthVaderN1").text("Health: " + chars.darthVader.health);
        $("#messageLog").text("You strike Darth Vader for " + dmgX + " damage and Darth Vader strikes you for " + dmgY + " damage.");
        
        if(chars.obiWan.health <= 0) {
            alert("You have fallen.");
            location.reload();
        }
        if(chars.darthVader.health <= 0) {
            $("#messageLog").text("Using power you gained from fighting Luke, you strike down Darth Vader!");
            $("#attackbtn").hide();
            lukeVaderClick = false;
            chars.obiWan.health = 500;
            $("#obiWanN").text("Health: " + chars.obiWan.health);
            $("#darthVaderE").hide();
            $("#darthSidiousE").show();
            chars.obiWan.def = chars.obiWan.def - 10;
            obiVader = true;
        }
    }
    if(obiLuke && obiVader && obiSidious) {
        alert("Congratulations! You win.");
        location.reload();
    }
});

}

function sidiousPath() {
    var sidiousObiWan = false;
    var sidiousLuke = false;
    var sidiousVader = false;
    var sidiousObiWanClick = false;
    var sidiousVaderClick = false;
    var sidiousLukeClick = false;

  $("#messageLog").text("Pick your first opponent!");
  $("#obiWanE").show();
  $("#lukeE").show();
  $("#darthVaderE").show();
  $("#lukeN1").text("Health: " + chars.luke.health);
  $("#darthVaderN1").text("Health: " + chars.darthVader.health);
  $("#darthSidiousN").text("Health: " + chars.darthSidious.health);
  $("#obiWanN1").text("Health: " + chars.obiWan.health);


  $("#obiWanE").click(function() {
    $("#lukeE").hide();
    $("#darthVaderE").hide();
    $("#messageLog").text("Obi-Wan: I sense a great evil. Who are you, Sith?")
    $("#attackbtn").show();
    sidiousObiWanClick = true;
    $("#obiWanE").off('click');
  });

 $("#lukeE").click(function() {
    $("#darthVaderE").hide();
    $("#obiWanE").hide();
    $("#attackbtn").show();
    $("#lukeE").off('click');
    if(sidiousVader) {
    $("#messageLog").text("Luke: You. You're the true evil of the empire, aren't you? Prepare yourself.")
    }
    else {
    $("#messageLog").text("Luke: Your powers shall not work here, Sith!")
    chars.luke.atk = chars.luke.atk + 40;
    }
    sidiousLukeClick = true;
 });

 $("#darthVaderE").click(function() {
     $("#lukeE").hide();
     $("#obiWanE").hide();
     $("#attackbtn").show();
     $("#darthVaderE").off('click');
     sidiousVaderClick = true;
     $("#messageLog").text("Darth Vader: Master? What are you doing!?")
 });

  $('#attackbtn').click(function() {
    if(sidiousObiWanClick) {
        dmgX = (2 * (chars.darthSidious.atk - chars.obiWan.def));
        dmgY = (2 * (chars.obiWan.atk - chars.darthSidious.def));
        chars.darthSidious.health = chars.darthSidious.health - dmgY;
        chars.obiWan.health = chars.obiWan.health - dmgX;
        $("#darthSidiousN").text("Health: " + chars.darthSidious.health);
        $("#obiWanN1").text("Health: " + chars.obiWan.health);
        $("#messageLog").text("You strike Obi-Wan for " + dmgX + " damage and Obi-Wan strikes you for " + dmgY + " damage.")

    if(chars.darthVader.health <= 0) {
        alert("You have fallen.");
        location.reload();
    }
        
    if(chars.obiWan.health <= 0) {
        $("#messageLog").text("You strike down Obi-Wan Kenobi. You feel your connection to the dark side grow, but there still remains an obstacle in your way.");
        $("#attackbtn").hide();
        sidiousObiWan = true;
        sidiousObiWanClick = false;
        chars.darthSidious.health = 400;
        $("#darthSidiousN").text("Health: " + chars.darthSidious.health);
        $("#darthVaderE").show();
        $("#lukeE").show();
        $("#obiWanE").hide();
    }
 
    }
    else if(sidiousVaderClick) {
        if (sidiousObiWan) {
            dmgX = (2 * (chars.darthVader.atk - chars.darthSidious.def));   
        }
        else {
            dmgX = 0;
        }
        dmgY = (2 * (chars.darthSidious.atk - chars.darthVader.def) - 10);
        chars.darthVader.health = chars.darthVader.health - dmgX;
        chars.darthSidious.health = chars.darthSidious.health - dmgY;
        $("#darthVaderN1").text("Health: " + chars.darthVader.health);
        $("#darthSidiousN").text("Health: " + chars.darthSidious.health);
        $("#messageLog").text("You strike Darth Vader for " + dmgX + " damage and Darth Vader strikes you for " + dmgY + " damage.")

        if(chars.darthSidious.health <= 0) {
            alert("You have fallen.");
            location.reload();
        }

        if(chars.darthVader.health <= 0) {
            $("#messageLog").text("You strike down Darth Vader, just as you ordered him to strike down Count Dooku so many years ago. The path to the true dark side is now clear for you.");
            $("#attackbtn").hide();
            sidiousVader = true;
            sidiousVaderClick = false;
            chars.darthSidious.health = 500;
            $("#darthSidiousN").text("Health: " + chars.darthSidious.health);
            $("#darthVaderE").hide();
            $("#lukeE").show();
        }
    }
    else if(sidiousLukeClick) {
        if (sidiousVader) {
            dmgX = (2 * (chars.darthSidious.atk - chars.luke.def) / .5);
        }
        else {
            dmgX = 0;
        }
        dmgY = (2 * (chars.luke.atk - chars.darthSidious.def) / .5);
        chars.luke.health = chars.luke.health - dmgX;
        chars.darthSidious.health = chars.darthSidious.health - dmgY;
        $("#lukeN1").text("Health: " + chars.luke.health);
        $("#darthSidiousN").text("Health: " + chars.darthSidious.health);
        $("#messageLog").text("You strike Luke for " + dmgX + " damage and Luke strikes you for " + dmgY + " damage.");
        
        if(chars.darthSidious.health <= 0) {
            alert("You have fallen.");
            location.reload();
        }
        if(chars.luke.health <= 0) {
            $("#attackbtn").hide();
            vaderLukeClick = false;
            chars.darthSidious.health = 400;
            $("#darthSidiousN").text("Health: " + chars.darthVader.health);
            $("#lukeE").hide();
            sidiousLuke = true;
        }
    }
    if(sidiousObiWan && sidiousLuke && sidiousVader) {
        alert("Congratulations! You win.");
        location.reload();
    }
}); 
}

function vaderPath() {
    var vaderObiWan = false;
    var vaderLuke = false;
    var vaderSidious = false;
    var vaderObiWanClick = false;
    var vaderSidiousClick = false;
    var vaderLukeClick = false;

  $("#messageLog").text("Pick your first opponent!");
  $("#obiWanE").show();
  $("#lukeE").show();
  $("#darthSidiousE").show();
  $("#lukeN1").text("Health: " + chars.luke.health);
  $("#darthVaderN").text("Health: " + chars.darthVader.health);
  $("#darthSidiousN1").text("Health: " + chars.darthSidious.health);
  $("#obiWanN1").text("Health: " + chars.obiWan.health);


  $("#obiWanE").click(function() {
    $("#lukeE").hide();
    $("#darthSidiousE").hide();
    if(vaderLuke) {
        $("#messageLog").text("Obi-Wan: We might again, Vader. You don't need to do this, come back to the light side.")
    }
    else {
        $("#messageLog").text("Obi-Wan: We might again, Vader. You will not succed today.")
    }
    $("#attackbtn").show();
    vaderObiWanClick = true;
    $("#obiWanE").off('click');
  });

 $("#lukeE").click(function() {
    $("#darthSidiousE").hide();
    $("#obiWanE").hide();
    $("#attackbtn").show();
    $("#lukeE").off('click');
    $("#messageLog").text("Luke: So, it finally comes to this. Draw your lightsaber, Sith!")
    vaderLukeClick = true;
 });

 $("#darthSidiousE").click(function() {
     $("#lukeE").hide();
     $("#obiWanE").hide();
     $("#attackbtn").show();
     $("#darthSidiousE").off('click');
     vaderSidiousClick = true;
     $("#messageLog").text("Luke: So, it finally comes to this. Draw your lightsaber, Sith!")
 });

  $('#attackbtn').click(function() {
    if(vaderObiWanClick) {
        if(vaderLuke) {
        dmgX = (2 * (chars.darthVader.atk - chars.obiWan.def));
        } else {
        dmgX = (0);
        }
        dmgY = (2 * (chars.obiWan.atk - chars.darthVader.def));
        chars.darthVader.health = chars.darthVader.health - dmgY;
        chars.obiWan.health = chars.obiWan.health - dmgX;
        $("#darthVaderN").text("Health: " + chars.darthVader.health);
        $("#obiWanN1").text("Health: " + chars.obiWan.health);
        $("#messageLog").text("You strike Obi-Wan for " + dmgX + " damage and Obi-Wan strikes you for " + dmgY + " damage.")

    if(chars.darthVader.health <= 0) {
        alert("You have fallen.");
        location.reload();
    }
        
    if(chars.obiWan.health <= 0) {
        $("#messageLog").text("You strike down your old master. The rage within you burns even more. The dark side is pulling you further. Strike now.");
        $("#attackbtn").hide();
        vaderObiWan = true;
        vaderObiWanClick = false;
        chars.luke.health = 300;
        $("#darthVaderN").text("Health: " + chars.darthVader.health);
        $("#darthSidiousE").show();
        $("#obiWanE").hide();
    }
 
    }
    else if(vaderSidiousClick) {
        if (vaderObiWan) {
            dmgX = (2 * (chars.darthVader.atk - chars.darthSidious.def));   
        }
        else {
            dmgX = 0;
        }
        dmgY = (2 * (chars.darthSidious.atk - chars.darthVader.def));
        chars.darthVader.health = chars.darthVader.health - dmgY;
        chars.darthSidious.health = chars.darthSidious.health - dmgX;
        $("#darthVaderN").text("Health: " + chars.darthVader.health);
        $("#darthSidiousN1").text("Health: " + chars.darthSidious.health);
        $("#messageLog").text("You strike Darth Sidious for " + dmgX + " damage and Darth Sidious strikes you for " + dmgY + " damage.")

        if(chars.darthVader.health <= 0) {
            alert("You have fallen.");
            location.reload();
        }

        if(chars.darthSidious.health <= 0) {
            $("#messageLog").text("You strike down Darth Sidious - all sense of the light side is gone.");
            $("#attackbtn").hide();
            vaderSidious = true;
            vaderSidiousClick = false;
            chars.darthVader.health = 500;
            $("#darthVaderN").text("Health: " + chars.darthVader.health);
            $("#darthSidiousE").hide();
        }
    }
    else if(vaderLukeClick) {
        dmgY = (2 * (chars.luke.atk - chars.darthVader.def) / .5);
        dmgX = (2 * (chars.darthVader.atk - chars.luke.def) / .5);
        chars.luke.health = chars.luke.health - dmgX;
        chars.darthVader.health = chars.darthVader.health - dmgY;
        $("#lukeN1").text("Health: " + chars.luke.health);
        $("#darthVaderN").text("Health: " + chars.darthVader.health);
        $("#messageLog").text("You strike Luke for " + dmgX + " damage and Luke strikes you for " + dmgY + " damage.");
        
        if(chars.darthVader.health <= 0) {
            alert("You have fallen.");
            location.reload();
        }
        if(chars.luke.health <= 0) {
            $("#messageLog").text("You strike down your son. A rage burns inside you, and you know what you must do.");
            $("#attackbtn").hide();
            vaderLukeClick = false;
            chars.darthVader.health = 500;
            $("#darthVaderN").text("Health: " + chars.darthVader.health);
            $("#obiWanE").show();
            $("#darthSidiousE").show();
            $("#lukeE").hide();
            vaderLuke = true;
        }
    }
    if(vaderObiWan && vaderLuke && vaderSidious) {
        alert("Congratulations! You win.");
        location.reload();
    }
});    
}