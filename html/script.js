MultiCharacters = {}
var selectedChar = null;
var WelcomePercentage = "30vh"
var Loaded = false;
var clickDisable = false;

$(document).ready(function (){
    window.addEventListener('message', function (event) {
        var data = event.data;
        if (data.action == "ui") {
            if (data.toggle) {
                start()
            } else {
                $('.container').fadeOut(250);
                MultiCharacters.resetAll();
            }
        }
        if (data.action == "setupCharacters") {
            setupCharacters(event.data.characters)
        }
        if (data.action == "logout") {
            refreshCharacters()
            start()
        }
        if (data.action == "setupCharInfo") {
            setupCharInfo(event.data.chardata)
        }
        if (data.action == "activeClick") {
            loadingCharacter(false);
        }
        if (data.action == "activeLoading") {
            loadingCharacter(true);
        }
    });
    $('.datepicker').datepicker();
});

loadingCharacter = function(val) {
    if (val) {
        $(".welcomescreen").fadeIn(150);
        $("#loading-text").html("Loading Character");
        clickDisable = true;
    } else {
        $(".welcomescreen").fadeOut(150);
        $("#loading-text").html("");
        clickDisable = false;
        if (selectedChar !== null) {
            $('.char-selector').css({"visibility":"visible"})
        } else {
            $('.char-selector').css({"visibility":"hidden"});
            resetCharSelector()
        }
    }
}

$('.char-selector').click(function(){
    setTimeout(function(){
    if ($('.char-buttons').css("visibility") == "visible") {
        $('.char-buttons').css({"visibility":"visible"}).animate({opacity:1.0},1000);
    } else {
        $('.char-buttons').css({"visibility":"visible"}).animate({opacity:1.0},1000);
    }
	}, 10000);
});

bodyclick = function(){
    if (clickDisable) {
        return false;
    }   
}


resetCharSelector = function() {
	 setTimeout(function(){
    $('.char-selector').css({"visibility":"hidden"}) 
    $('.char-buttons').css({"visibility":"visible"}).animate({opacity:1.0},1000);
	}, 3000);
}

loadingIcon = function(tiempo) {
    $(".welcomescreen").fadeIn(1000);

    var originalText = "Retrieving player information";
    var loadingProgress = 0;
    var loadingDots = 0;
    $("#loading-text").html(originalText);
    var DotsInterval = setInterval(function() {
        $("#loading-text").append(".");
        loadingDots++;
        loadingProgress++;
        if (loadingProgress == 3) {
            originalText = "Validating player data"
            $("#loading-text").html(originalText);
        }
        if (loadingProgress == 4) {
            originalText = "Retrieving player characters"
            $("#loading-text").html(originalText);
        }
        if (loadingProgress == 6) {
            originalText = "Validating player characters"
            $("#loading-text").html(originalText);
        }
        if(loadingDots == 4) {
            $("#loading-text").html(originalText);
            loadingDots = 0;
        }
    }, 500);

    setTimeout(function(){
        clearInterval(DotsInterval);
        loadingProgress = 0;
        originalText = "Retrieving Data";
    }, tiempo);//2000);
}

$(document).ready(function(){
    $('.collapsible').collapsible();
    $('.tooltipped').tooltip()
});
      

let test = true

start = function() {
    $('.container').show();
    $('.bars').fadeOut(0)
    $(".welcomescreen").fadeOut(0);    
    MultiCharacters.resetAll();
    setTimeout(function(){
       SelectionMenu();
    }, test && 1 || 1000);
}

SelectionMenu = function() {
    $('.main-select').fadeIn(100);
    setTimeout(() => {
        $('.mid-account').css({"display":"block"}).animate({right: 0+"vh",}, test && 1 || 2500); 
        $('.mid-characters').css({"display":"block"}).animate({left: 0+"vh",}, test && 1 || 2500);
    }, 300);
}

$(".pinfodata p").click(function(){
    
});

let VipConfig = [
    cola = {

    },
    
]

let vipstate = [
    buyed = 'green'
]

setPlayerValues = function(data) {

    setAllHide(true)
    $('#streamermode').prop('checked', true);
    $('.steamname').html("Martu");
    $('.steam').html('No tengo xd');
    $('.discord').html("test");
    $('.icoins').html("0");
    $('.vip').html("Desactivado");
    let htmlinsert = '<li><div class="collapsible-header vipcolap"><i class="material-icons">filter_drama</i>Cola prioritaria<span class="new badge yellow">4</span></div><div class="collapsible-body bodycolap"><p></p></div></li>'
}

$( "#streamermode" ).change(function() {
    let valstreamer = $(this).prop('checked')
    setAllHide(valstreamer)
    $.post('http://qb-multicharacter/streamermode', JSON.stringify({val: valstreamer}));
});

setAllHide = function(val) {
    $('.playerinfoslot').each(function(i, obj) {
       let inf = $(obj).find( ".pinfodata p" )
       let btn = $(obj).find( ".hidebtn" )
       if (val) {
           $(inf).addClass('hideinfo')
           $(btn).html('visibility_off')
        } else {
            $(inf).removeClass('hideinfo')
            $(btn).html('visibility')
        }
    });
}

$(".hidebtn").click(function(){
    let val = $('.'+$(this).data("val"))
    if (val.hasClass('hideinfo')) {
        val.removeClass('hideinfo')
        $(this).html('visibility')
    } else {
        val.addClass('hideinfo')
        $(this).html('visibility_off')
    }
});

$(".mid-account").hover(
    function(){
        $('.mid-account .borderSelect').stop().animate({height:100+'vh',}, 500);
    },
    function(){
        $('.mid-account .borderSelect').stop().animate({height:0+'vh',}, 500);  
    }
);

$(".mid-characters").hover(
    function(){
        $('.mid-characters .borderSelect').stop().animate({height:100+'vh',}, 500);  
    },
    function(){
        $('.mid-characters .borderSelect').stop().animate({height:0+'vh',}, 500);  
    }
);


$('.backbtn').click(function(e){
    $.post('http://qb-multicharacter/activeBlur');
    $('.container').hide(400);
	$('.char-buttons').fadeOut(300);
    setTimeout(() => {
        start();
    }, 500);  
   $(selectedChar).removeClass("char-selected");
        selectedChar = null;
        $("#play").css({"display":"none"});
        $("#delete").css({"display":"none"});
        //MultiCharacters.fadeInDown('.character-info', '-80%', 400);
        $.post('http://qb-multicharacter/asdasdasdsa', JSON.stringify({
                cData: "delete"
        }));
        clickDisable = true;
		$('.char-buttons').fadeOut(300);	
 
});

let accountOpen = false;

$('#paccountselect').click(function(e){
    if ($(this).hasClass('blocked')) {
        return
    }
});

$('#pcharselect').click(function(e){
    e.preventDefault();
    $('.main-select').fadeOut(1000);
    setTimeout(() => {   
        loadingIcon(2000);   
        setTimeout(function(){
            $.post('http://qb-multicharacter/setupCharacters');
            setTimeout(function(){
                MultiCharacters.resetAll();
                $(".welcomescreen").fadeOut(150);
                $('.bars').fadeIn(1000)
                //MultiCharacters.fadeInDown('.character-info', '20%', 400);
                MultiCharacters.fadeInLeft('.characteqb-list', '7%', 400);
                $.post('http://qb-multicharacter/removeBlur');
            }, 2000);
        }, 2000);
    }, 500);
});

$('.disconnect-btn').click(function(e){
    e.preventDefault();

    $.post('http://qb-multicharacter/closeUI');
    $.post('http://qb-multicharacter/disconnectButton');
});

function setupCharInfo(cData) {
    if (cData == 'empty') {
        $('a.char-info').attr('data-tooltip','<div class="tooltipchar"><span id="no-char">You do not have a character created in this slot</span></div>');
        $('.char-info').tooltip();
        $('.char-info').addClass('disabled')
        $('.char-delete').addClass('disabled')
    } else {
        var gender = "Woman"
        if (cData.charinfo.gender == 1) { gender = "Man" }
        $('.char-info').removeClass('disabled')
        $('.char-delete').removeClass('disabled')
        $('a.char-info').attr('data-tooltip','<div class="tooltipchar">' +
        '<div class="character-info-box"><span id="info-label">Name: </span><span class="char-info-js">'+cData.charinfo.firstname+' '+cData.charinfo.lastname+'</span></div>' +
        '<div class="character-info-box"><span id="info-label">Birth: </span><span class="char-info-js">'+cData.charinfo.birthdate+'</span></div>' +
        '<div class="character-info-box"><span id="info-label">Gender: </span><span class="char-info-js">'+gender+'</span></div>' +
        '<div class="character-info-box"><span id="info-label">Nationality: </span><span class="char-info-js">'+cData.charinfo.nationality+'</span></div>' +
        '<div class="character-info-box"><span id="info-label">Job: </span><span class="char-info-js">'+cData.job.label+'</span></div>' +
        '<div class="character-info-box"><span id="info-label">Money: </span><span class="char-info-js">$ '+cData.money.cash+'</span></div>' +
        '<div class="character-info-box"><span id="info-label">Bank: </span><span class="char-info-js">$ '+cData.money.bank+'</span></div><br>' +
        '<div class="character-info-box"><span id="info-label">Phone: </span><span class="char-info-js">'+cData.charinfo.phone+'</span></div>' +
        '<div class="character-info-box"><span id="info-label">Bank account: </span><span class="char-info-js">'+cData.charinfo.account+'</span></div></div>');
        $('.char-info').tooltip();
    }
}

function setupCharacters(characters) {
    $.each(characters, function(index, char){
        $('#char-'+char.cid).html("");
        $('#char-'+char.cid).data("citizenid", char.citizenid);
        setTimeout(function(){
            $('#char-'+char.cid).html('<span id="slot-icon2" class="material-icons">account_box</span><span id="slot-name">'+char.charinfo.firstname+' '+char.charinfo.lastname+'</span>');
            $('#char-'+char.cid).data('cData', char)
            $('#char-'+char.cid).data('cid', char.cid)
        }, 100)
    })
}

$(document).on('click', '#close-log', function(e){
    e.preventDefault();
    selectedLog = null;
    $('.welcomescreen').css("filter", "none");
    $('.server-log').css("filter", "none");
    $('.server-log-info').fadeOut(150);
    logOpen = false;
});

$(document).on('click', '.character', function(e) {
    if ($(this).hasClass('blocked')) {
        return
    }
	
    var cDataPed = $(this).data('cData');
    e.preventDefault();
    resetCharSelector();
    

    if (selectedChar === null) {
        selectedChar = $(this);
        if ((selectedChar).data('cid') == "") {
            $(selectedChar).addClass("char-selected");
            setupCharInfo('empty')
            $.post('http://qb-multicharacter/cDataPed', JSON.stringify({
                cData: cDataPed
            }));
            clickDisable = true;
        } else {
            $(selectedChar).addClass("char-selected");
            setupCharInfo($(this).data('cData'))
            $.post('http://qb-multicharacter/cDataPed', JSON.stringify({
                cData: cDataPed
            }));
            clickDisable = true;
        }
		setTimeout(function(){
	    $('.char-buttons').fadeIn(300);
    }, 3000);
    } else if ($(selectedChar).attr('id') !== $(this).attr('id')) {
        $(selectedChar).removeClass("char-selected");
        selectedChar = $(this);
        if ((selectedChar).data('cid') == "") {
            $(selectedChar).addClass("char-selected");
            setupCharInfo('empty')
            $.post('http://qb-multicharacter/cDataPed', JSON.stringify({
                cData: cDataPed
            }));
            clickDisable = true;
        } else {
            $(selectedChar).addClass("char-selected");
            setupCharInfo($(this).data('cData'))
            $.post('http://qb-multicharacter/cDataPed', JSON.stringify({
                cData: cDataPed
            }));
            clickDisable = true;
        }
		setTimeout(function(){
	    $('.char-buttons').fadeIn(300);
    }, 3000);
    } else if ($(selectedChar).attr('id') === $(this).attr('id')) { 
        $(selectedChar).removeClass("char-selected");
        selectedChar = null;
        $("#play").css({"display":"none"});
        $("#delete").css({"display":"none"});
        //MultiCharacters.fadeInDown('.character-info', '-80%', 400);
        $.post('http://qb-multicharacter/asdasdasdsa', JSON.stringify({
                cData: "delete"
        }));
        clickDisable = true;
		$('.char-buttons').fadeOut(300);
    }
});

$(document).on('click', '#create', function(e){
    e.preventDefault();
    $.post('http://qb-multicharacter/createNewCharacter', JSON.stringify({
        firstname: $('#first_name').val(),
        lastname: $('#last_name').val(),
        nationality: $('#nationality').val(),
        birthdate: $('#birthdate').val(),
        gender: $('select[name=gender]').val(),
        cid: $(selectedChar).attr('id').replace('char-', ''),
    }));
    $(".container").fadeOut(150);
    $('.characteqb-list').css("filter", "none");
    $('.character-info').css("filter", "none");
    MultiCharacters.fadeOutDown('.character-register', '125%', 400);
    refreshCharacters()
});

$(document).on('click', '#accept-delete', function(e){
    $.post('http://qb-multicharacter/removeCharacter', JSON.stringify({
        citizenid: $(selectedChar).data("citizenid"),
    }));
    $('.character-delete').fadeOut(150);
    refreshCharacters()
    start()
});

function refreshCharacters() {
    $('.characteqb-list').html('<div class="character-list-header"><p>My Characters</p></div><div class="character" id="char-1" data-cid=""><span id="slot-icon" class="material-icons">account_box</span><span id="slot-name">Empty Slot<span id="cid"></span></span></div><div class="character" id="char-2" data-cid=""><span id="slot-icon" class="material-icons">account_box</span><span id="slot-name">Empty Slot<span id="cid"></span></span></div><div class="character" id="char-3" data-cid=""><span id="slot-icon" class="material-icons">account_box</span><span id="slot-name">Empty Slot<span id="cid"></span></span></div><div class="character" id="char-4" data-cid=""><span id="slot-icon" class="material-icons">account_box</span><span id="slot-name">Empty Slot<span id="cid"></span></span></div><div class="character" id="char-5" data-cid=""><span id="slot-icon" class="material-icons">account_box</span><span id="slot-name">Empty Slot<span id="cid"></span></span></div>')    
    setTimeout(function(){
        $(selectedChar).removeClass("char-selected");
        selectedChar = null;
        $("#delete").css({"display":"none"});
        $("#play").css({"display":"none"});
        $('.char-buttons').fadeOut(300);
        MultiCharacters.resetAll();
        $('.char-selector').css({"visibility":"hidden"});
        resetCharSelector()
    }, 100)
}

function closereg(){
    $('.characteqb-list').css("filter", "none")
    $('.character-info').css("filter", "none")
    MultiCharacters.fadeOutDown('.character-register', '125%', 400);
}

function closedel(){
    $('.characteqb-block').css("filter", "none");
    $('.character-delete').fadeOut(250);
}

chatplay = function(){
    setTimeout(function(){
    $('.char-buttons').css({"visibility":"hidden"}).animate({opacity:1.0},1000);
    }, 3000);
    $('.tooltipped').tooltip('close');
	
    var charData = $(selectedChar).data('cid');
    if (selectedChar !== null) {
        if (charData !== "") {
            $.post('http://qb-multicharacter/selectCharacter', JSON.stringify({
                cData: $(selectedChar).data('cData')
            }));
            setTimeout(function(){
                MultiCharacters.fadeOutDown('.characteqb-list', "-40%", 400);
                MultiCharacters.fadeOutDown('.character-info', "-40%", 400);
                $("#delete").css({"display":"none"});
                $("#play").css({"display":"none"});
                MultiCharacters.resetAll();
            }, 1500);
        } else {
            $('.characteqb-list').css("filter", "blur(2px)")
            $('.character-info').css("filter", "blur(2px)")
            MultiCharacters.fadeInDown('.character-register', '25%', 400);
        }
    }
    $('.char-selector').css({"visibility":"hidden"});
    resetCharSelector();
}

deletePlayer = function(){
    var charData = $(selectedChar).data('cid');
    if (selectedChar !== null) {
        if (charData !== "") {
            $('.characteqb-block').css("filter", "blur(2px)")
            $('.character-delete').fadeIn(150);
        }
    }
}

MultiCharacters.fadeOutUp = function(element, time) {
    $(element).css({"display":"block"}).animate({top: "-80.5%",}, time, function(){
        $(element).css({"display":"none"});
    });
}

MultiCharacters.fadeOutDown = function(element, percent, time) {
    if (percent !== undefined) {
        $(element).css({"display":"block"}).animate({top: percent,}, time, function(){
            $(element).css({"display":"none"});
        });
    } else {
        $(element).css({"display":"block"}).animate({top: "103.5%",}, time, function(){
            $(element).css({"display":"none"});
        });
    }
}

MultiCharacters.fadeInDown = function(element, percent, time) {
    $(element).css({"display":"block"}).animate({top: percent,}, time);
}

MultiCharacters.fadeInLeft = function(element, percent, time) {
    $(element).css({"display":"block"}).animate({left: percent,}, time);
}

MultiCharacters.resetAll = function() {
    $('.characteqb-list').hide();
    $('.characteqb-list').css("top", "-40");
    $('.character-info').hide();
    $('.character-info').css("top", "-40");
    $('.mid-account').css({"display":"none"}).animate({right: -100+"vh",}, test && 1 || 2500); 
    $('.mid-characters').css({"display":"none"}).animate({left: -100+"vh",}, test && 1 || 2500);
    $('.welcomescreen').css("top", WelcomePercentage);
    $('.server-log').show();
    $('.server-log').css("top", "25%");
}

if (test) {
    start()
}