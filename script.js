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

    }

    addApp("ImageStorm", "assets/app.png", "Rain images from the sky!", "ImageStorm/");

});
