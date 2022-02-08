$('#keyboard-upper-container').hide();



$(document).keydown(function (e) { //shift key to set uppercase
    let currentKeyPress = e.keyCode;

    if (currentKeyPress === 16) {
        $('#keyboard-lower-container').hide();
        $('#keyboard-upper-container').show();
    }
    //$(`#${currentKeyPress}`).css('background', "red");
});

$(document).keyup(function(e){ //release shift key to set lowercase
    let currentKeyPress = e.keyCode;
    //$(`#${currentKeyPress}`).css('background', "white");
    if (currentKeyPress === 16 ){
        $('#keyboard-upper-container').hide();
        $('#keyboard-lower-container').show();
    }
    $("span").css("background-color", "#F5F5F5");
    $(`#${32}`).css("background-color", "#F5F5F5");
    

});

$(document).keypress( function(e){
    let currentKeyPress = e.keyCode;
    
    //console.log(e.keyCode);
    if (currentKeyPress === 90){
        console.log('Cap Z was pressed')
    }
    $(`#${currentKeyPress}`).css('background', randomColor());

    //$('#97').css('');
    //$('#yellow-block').val();
});

function randomColor(){
    let r = Math.floor(Math.random() * 256);
    
    let g = Math.floor(Math.random() * 256);
    let b = Math.floor(Math.random() * 256);
    
    return `rgb(${r}, ${g}, ${b})`;
    
}



 // if char code === id of keyboard keys, change color to green
//! how to translate key press into ascii and then translate ascii back to key strong to be displayed
//! where to display key on page