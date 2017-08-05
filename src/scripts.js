$(document).ready(function () {
    $('#search').keypress(function (e) {
        if (e.which == 13) {//Enter key pressed
            var search = $('#search').val();
            if (search.trim().length > 0) {
                //console.log("searching");

                var api = 'https://en.wikipedia.org/w/api.php?format=json&action=query&generator=search&gsrnamespace=0&gsrlimit=10&prop=pageimages|extracts&pilimit=max&exintro&explaintext&exsentences=1&exlimit=max&pithumbsize=500&gsrsearch=';
                var cb = '&callback=JSON_CALLBACK';
                var page = 'https://en.wikipedia.org/?curid=';

                $.ajax({
                    url: api + search + cb,
                    dataType: "jsonp",
                }).done(function (data) {
                    //console.log(data);
                    if (data.query) {
                        $("#error").html("");
                        var html = "";
                        var results = data.query.pages;
                        for (var key in results) {
                            if (!results.hasOwnProperty(key)) continue;

                            var obj = results[key];

                            html += "<a class=\"centered card\" href=\"" + page + obj.pageid + "\" target=\"_blank\">";
                            html += "<div class=\"image\">";
                            if (!obj.thumbnail) {
                                html += "<img src=\"https://en.wikipedia.org/static/images/project-logos/enwiki-2x.png\">";
                            }
                            else {
                                html += "<img src=\"" + obj.thumbnail.source + "\">";
                            }

                            html += "</div>";
                            html += "<div class=\"content\">";
                            html += "<div class=\"header\">" + obj.title + "</div>";
                            html += "<div class=\"description\">" + obj.extract + "</div>"
                            html + "</div>";
                            html += "</div>"
                            html += "</div>"
                        }
                        $(".ui.link.cards").html(html);
                    }
                    else {

                        $("#error").html("No search results found");
                    }
                }).fail(function () {
                    $("#error").text("Search could not be complete... :(");
                });
            }
        }
    });

    $('#random').click(function (e) {
        var win = window.open("https://en.wikipedia.org/wiki/Special:Random", '_blank');
        win.focus();
    });
});