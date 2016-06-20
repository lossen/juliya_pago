(function ($) {
    NProgress.configure({
        trickle: false,
        minimum: 0.0001
    });
    NProgress.start();

    var interval = setInterval(function () {
        NProgress.inc(0.01);
    }, 10);

    $(function () {

        $('#fullpage').fullpage({
            autoScrolling: true,
            controlArrows: true,
            verticalCentered: true,
            scrollingSpeed: 1000,
            anchors: ['firstPage', 'secondPage', '3rdPage', '4thPage', '5thPage', '6thPage'],
            menu: '.fullpage-menu',
            fixedElements: '.header, .footer'
        });

        var playlist = new jPlayerPlaylist({
            jPlayer: "#header-music",
            cssSelectorAncestor: "#header-music-container",
            cssSelector: {}
        }, [{
            title: "Юля Паго - Части тела...",
            mp3: "http://www.jplayer.org/audio/mp3/TSP-01-Cro_magnon_man.mp3",
            oga: "http://www.jplayer.org/audio/ogg/TSP-01-Cro_magnon_man.ogg"
        }, {
            title: "Partir",
            free: true,
            mp3: "http://www.jplayer.org/audio/mp3/Miaow-09-Partir.mp3",
            oga: "http://www.jplayer.org/audio/ogg/Miaow-09-Partir.ogg"
        }, {
            title: "Thin Ice",
            mp3: "http://www.jplayer.org/audio/mp3/Miaow-10-Thin-ice.mp3",
            oga: "http://www.jplayer.org/audio/ogg/Miaow-10-Thin-ice.ogg"
        }], {
            swfPath: "../jplayer",
            supplied: "oga, mp3",
            wmode: "window",
            useStateClassSkin: true,
            autoBlur: false,
            smoothPlayBar: true,
            playlistOptions: {
                autoPlay: true
            },
            keyEnabled: true
        });

        console.log(playlist);

        $('.header-music-icon').on('click', function () {
            if ($(this).hasClass('header-music-icon--pause')) {
                $(this).removeClass('header-music-icon--pause').addClass('header-music-icon--play');
                playlist.pause();
            } else if ($(this).hasClass('header-music-icon--play')) {
                $(this).removeClass('header-music-icon--play').addClass('header-music-icon--pause');
                playlist.play();
            }
        });

        // $("#header-music").jPlayer({
        //     ready: function () {
        //         $(this).jPlayer('setMedia',{
        //             mp3:'./assets/music/juliya_pago-1.mp3'
        //         }).jPlayer('play');
        //
        //         $('.header-music-icon').on('click', function () {
        //             $(this).toggleClass('mute');
        //
        //             if($(this).hasClass('mute')) {
        //                 $('#header-music').jPlayer('mute');
        //             } else {
        //                 $('#header-music').jPlayer('unmute');
        //             }
        //         });
        //     }
        // });

        // var myPlaylist = new jPlayerPlaylist({
        //     jPlayer: "#header-music"
        // }, [
        //     {
        //         title:"Cro Magnon Man",
        //         artist:"The Stark Palace",
        //         mp3:"./assets/music/juliya_pago-1.mp3"
        //     }
        // ], {
        //     playlistOptions: {
        //         enableRemoveControls: true,
        //         autoplay:true
        //     },
        //     supplied: "ogv, m4v, oga, mp3",
        //     // smoothPlayBar: true,
        //     keyEnabled: true
        // });

        $('body').on('click', '.header-btn-menu-radius--close, .fade-menu-item', function (e) {
            $('.overlay').hide();
            $('#fullpage, .header-logo, .header-music, .header-itunes, .footer, .fullpage-menu, .header-soc-group').show();
            $('.header-btn-menu-radius--close').removeClass().addClass('header-btn-menu-radius');
        });

        $('body').on('click', '.header-btn-menu-radius', function (e) {
            $('.overlay').show();
            $('.header-btn-menu-radius').removeClass().addClass('header-btn-menu-radius--close');
            $('#fullpage, .header-logo, .header-music, .header-itunes, .footer, .fullpage-menu, .header-soc-group').hide();
        });
        setTimeout(function () {
            $('.splash-screen').hide();
            clearInterval(interval);
            NProgress.done();
        }, 2000);

        // NProgress.done();
        // NProgress.configure({
        //     template: "<div class='nprogress'></div>"
        // });
    });
})(jQuery);