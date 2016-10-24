var body = document.body,
    html = document.documentElement;

var height = Math.max( body.scrollHeight, body.offsetHeight, 
                       html.clientHeight, html.scrollHeight, html.offsetHeight );
var heightBouton = Math.max(150,(height-48)/4).toString()+'px'; 


var format = "rgb";


function getRGB(colorval) {
    var parts = colorval.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
    delete(parts[0]);
    return parts;
}


function rgbToHex(r, g, b) {
        var rgb = b | (g << 8) | (r << 16);
    return '#' + (0x1000000 + rgb).toString(16).slice(1);
 }

function rgbtToRgba(r,g,b) {
    return 'rgba(' + r + ',' + g + ',' + b + ',1' +  ')' ;
}

$(function(){
    new Clipboard('.bouton');
    $('.bouton').css('height',heightBouton);
    $('.bouton').each(function() {
	$(this).attr('data-clipboard-text',"");		
    });

    $(".dropdown-menu li a").click(function(){
	$(".dropdown-toggle:first-child").text($(this).text());
	$(".dropdown-toggle:first-child").val($(this).text());
	if ($(this).text() === "HEX - #1234EF") {
	    format = "hex";
	    $('.bouton').each(function() {
		var x = $(this).css('backgroundColor');
		var color = getRGB(x);
		var fcolor = rgbToHex(color[1], color[2], color[3]);
		$(this).attr('data-clipboard-text',fcolor);		
	    });
	} else if ($(this).text() === "RGB - (255,255,255)") {
	    format = "rgb";
	    $('.bouton').each(function() {
		var x = $(this).css('backgroundColor');
		$(this).attr('data-clipboard-text',x);		
	    });
	} else {
	    format = "rgba";
	    $('.bouton').each(function() {
		var x = $(this).css('backgroundColor');
		var color = getRGB(x);
		var fcolor = rgbtToRgba(color[1], color[2], color[3]);
		$(this).attr('data-clipboard-text',fcolor);		
	    });
	}
    });
});

$('.bouton').click(function() {
    $("#copied").css("display", "inline-block");
    setTimeout(function() {
	$('#copied').fadeOut('fast');
    }, 1000);
});
