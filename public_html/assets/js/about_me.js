(function ($) {

    NProgress.configure({
        trickle: false,
        minimum:0.0001
    });
    NProgress.start();

    var interval = setInterval(function() { NProgress.inc(0.01); }, 10);
    
    $(function () {

        $('#fullpage').fullpage({
            autoScrolling: true,
            controlArrows: true,
            verticalCentered: true,
            scrollingSpeed: 1000,
            fixedElements: '.header, .footer'
        });

        var playlist = new jPlayerPlaylist({
            jPlayer: "#header-music",
            cssSelectorAncestor: "#header-music-container",
            cssSelector: {

            }
        }, [
            {
                title:"Юля Паго - Части тела...",
                mp3:"http://www.jplayer.org/audio/mp3/TSP-01-Cro_magnon_man.mp3",
                oga:"http://www.jplayer.org/audio/ogg/TSP-01-Cro_magnon_man.ogg"
            },
            {
                title:"Partir",
                free: true,
                mp3:"http://www.jplayer.org/audio/mp3/Miaow-09-Partir.mp3",
                oga:"http://www.jplayer.org/audio/ogg/Miaow-09-Partir.ogg"
            },
            {
                title:"Thin Ice",
                mp3:"http://www.jplayer.org/audio/mp3/Miaow-10-Thin-ice.mp3",
                oga:"http://www.jplayer.org/audio/ogg/Miaow-10-Thin-ice.ogg"
            }
        ], {
            swfPath: "../jplayer",
            supplied: "oga, mp3",
            wmode: "window",
            useStateClassSkin: true,
            autoBlur: false,
            smoothPlayBar: true,
            playlistOptions: {
                autoPlay: true
            },
            cssSelector: {
                play: '.header-music-icon--play',
                pause:'.header-music-icon--pause'
            },
            keyEnabled: true
        });

        console.log(playlist);

        $('body').on('click', '.header-btn-menu-radius--close, .fade-menu-item', function(e){
            $('.overlay').hide();
            $('#fullpage, .header-logo, .header-music, .header-itunes, .footer, .fullpage-menu, .header-soc-group').show();
            $('.header-btn-menu-radius--close').removeClass().addClass('header-btn-menu-radius');
        });

        $('body').on('click','.header-btn-menu-radius', function (e) {
            $('.overlay').show();
            $('.header-btn-menu-radius').removeClass().addClass('header-btn-menu-radius--close');
            $('#fullpage, .header-logo, .header-music, .header-itunes, .footer, .fullpage-menu, .header-soc-group').hide();
        });
        
        $('.header-music-icon').on('click', function () {
            if($(this).hasClass('header-music-icon--pause')) {
                $(this).removeClass('header-music-icon--pause').addClass('header-music-icon--play');
                playlist.pause();
            }
            else if ($(this).hasClass('header-music-icon--play')) {
                $(this).removeClass('header-music-icon--play').addClass('header-music-icon--pause');
                playlist.play();
            }
        });
        
        setTimeout(function () {
            $('.splash-screen').hide();
            clearInterval(interval);
            NProgress.done();
        }, 2000)
    });
})(jQuery);