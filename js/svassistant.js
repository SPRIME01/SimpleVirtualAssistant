/* 
 * SELENA - Simple Virtual Assistant
 * 
 * This source file is subject to the new BSD license that is bundled
 * with this package in the file LICENSE.txt.
 * 
 * @author bl4de bloorq@gmail.com
 * @package	SimpleVirtualAssistant
 * @version Selena 1.0
 * 
 * 
 */

Selena = {};
Selena.SelenaRun = function() {
"use strict";

    //Selena's visibility cookie name
    Selena.cookieName = "sva_hidden";

    //Selena's text xml filename
    Selena.xmlFilePath = "temp.xml";

    Selena.modalClass = ".sva-modal";

    // default on first run - Selena is hidden
    // it fixes issue #1
    if ($.cookie(Selena.cookieName, "")) {
        $.cookie(Selena.cookieName, "1");
        Selena.is_hidden = true;
    }

    /**
     * setting visible of Selena after page refreshing,
     * Selena modal window, depends on 'Selena.is_hidden' true or false
     */
    if ($.cookie(Selena.cookieName) === "1") {
        Selena.is_hidden = true;
        Selena.modalClass = ".sva-minimized";
    } else {

        Selena.is_hidden = false;
        Selena.modalClass = ".sva-modal";
    }



    if (Selena.is_hidden === true) {
        $(Selena.modalClass).hide();
        $('.sva-enabler').show();
    }

    //    var default_text = "Hello, my name is Selena, and I'm Your Virtual Assistant :)";
    $('.sva-hidder').click(function() {
        $(Selena.modalClass).fadeOut();
        $('.sva-enabler').fadeIn();

        Selena.modalClass = ".sva-minimized";
        Selena.is_hidden = true;
        $.cookie(Selena.cookieName, "1");
    });

    $('.sva-enabler i').click(function() {
        Selena.modalClass = ".sva-modal";

        $(Selena.modalClass).fadeIn();
        $('.sva-enabler').fadeOut();

        Selena.is_hidden = false;
        $.cookie(Selena.cookieName, "0");
    });

    $.get(Selena.xmlFilePath, {}, function(xml) {

        $('item', xml).each(function(i) {
            var classname = $(this).find('id').text();
            $('.sva-' + classname).attr("__text", $(this).find('text').text());

            $('.sva-' + classname).mouseenter(function() {
                var that = this;

                if (Selena.is_hidden === true) {
                    $(Selena.modalClass).fadeIn();
                    $('.response').html($(that).attr("__text"));
                } else {
                    $.when($('.response').fadeOut()).done(function() {
                        $('.response').html($(that).attr("__text"));
                        $('.response').fadeIn();
                    });;
                }
            });;

            $('.sva-' + classname).mouseleave(function() {
                if (Selena.is_hidden === true) {
                    $(Selena.modalClass).fadeOut();
                }
            });
        });
    });
};
    
