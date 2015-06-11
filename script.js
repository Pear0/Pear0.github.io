/*jshint browser:true */
/*global $:false, jQuery:false, console:false, escape:false */

$(function () {


    function addApp(title, img, body, url) {
        var html = $("#template-app-entry").html();

        html = html.replace("/title/", title);
        html = html.replace("/image/", img);
        html = html.replace("/body/", body);
        if (url !== undefined) {
            html = html.replace("/url/", url);
        }


        $("#apps").append(html);

    }

    //Fill in content

    addApp("ImageStorm <span class=\"label label-default\">New</span>", "assets/img_storm.png", "Rain images from the sky!", "ImageStorm/#cats");
    addApp("Side Scroll 4 <span class=\"label label-default\">New</span>", "assets/side_scroll_4.png", "A 2D Side Scroller!", "Side-Scroll-4/");

    //Do Bootstrap stuff
    $('[data-toggle="tooltip"]').tooltip();

});
