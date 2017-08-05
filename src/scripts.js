$(document).ready(function () {
    $('#search').keypress(function (e) {
        if (e.which == 13) {//Enter key pressed
            
        }
    });

    $('#random').click(function (e) {
        var win = window.open("https://en.wikipedia.org/wiki/Special:Random", '_blank');
        win.focus();
    });
});