let score,pokusaja,step,action;
let playing = false;
let fruits=['1','2','3','4','5','8','9','10','11'];
$(function(){
$('.pokreni').click(function(){
  if(playing == true){
    location.reload();
  }
  else{
    playing = true;
    score = 0;
    $('#skor').html(score);
    $('.zivoti').show();
    pokusaja = 3;
    addHearts();
    $('#pocetak').val('Reset');
    $('.gameOver').hide();
    //$('#zivoti').show();

    //$('.gameOver').hide();
   startAction();
  }
});
function addHearts(){
  $('#zivoti').empty();
  for(i = 0; i < pokusaja; i++){
    $('#zivoti').append('<img src="img/50.png" class="life">');
  }
}
function startAction(){
  let sirina = Math.round($('#prikaz').width());
  $('#fruit1').show();
  chooseFruit();
  $('#fruit1').css({'left' : Math.round((sirina-100)*Math.random()),'top' : -80});
  step = 1+Math.round(5*Math.random());
  action = setInterval(function(){
    $('#fruit1').css('top', $('#fruit1').position().top + step);

    if($('#fruit1').position().top > $('#prikaz').height()){
      if(pokusaja > 1){
        $('#fruit1').show();
        chooseFruit();

        console.log(sirina);
        // console.log('566555');

        $('#fruit1').css({'left': Math.round((sirina-100)*Math.random()), 'top':-80});
        step = 1 + Math.round(5 * Math.random());
        pokusaja--;
        addHearts();
      }
      else{
        playing = false;
        $('#pocetak').val('Start Game');
        $('.gameOver').show();
        $('.gameOver').html(`<p>Game Over</p><p>Your score is ${score}</p>`);
        $('#zivoti').hide();
        stopAction();
      }
    }
  },10);
}
function chooseFruit(){
  let temp = fruits[Math.round(8*Math.random())] + '.png';
  //console.log(temp);
  $('#fruit1').attr('src', `img/${temp}`);
  //$('#fruit1').attr('src','img/1.png');
}

function stopAction(){
  clearInterval(action);
  $('#fruit1').hide();
}
$('#fruit1').mouseover(function(){
  score++;
  //console.log(score);
  $('#skor').html(score);
  $('#sliceSound')[0].play();
  clearInterval(action);
  $('#fruit1').hide('explode', 500);
  setTimeout(startAction, 500);
});

});
