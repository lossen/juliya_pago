(function ($) {
    NProgress.configure({
        trickle: false,
        minimum:0.0001
    });
    NProgress.start();

    var interval = setInterval(function() { NProgress.inc(0.01); }, 10);
    $(function () {

        var getActiveLink = function () {
            var url = window.location;
            var urlArr = url.hash.split('#');
            var activeLink = urlArr[1];

            $("a[data-url='" + activeLink + "']").parent().addClass('active');
        };


        // $('.audio-jplayer-container li').wrap('<div class="col-md-3"></div>');


        $('#fullpage').fullpage({
            autoScrolling: true,
            controlArrows: false,
            verticalCentered: true,
            scrollingSpeed: 1000,
            menu: '.media-menu',
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
                autoPlay: false
            },
            keyEnabled: true
        });

        var cssSelector_media = {
            jPlayer: "#audio-jplayer",
            cssSelectorAncestor: "#audio-jplayer-container"
        };

        var playlist_media = [
            {
                author:"TSP",
                title:"Юля Паго – Части Тела #141 (Хит ФМ 10.09.2016)",
                mp3:"http://www.jplayer.org/audio/mp3/TSP-01-Cro_magnon_man.mp3",
                oga:"http://www.jplayer.org/audio/ogg/TSP-01-Cro_magnon_man.ogg"
            },
            {
                author:"TSP",
                title:"Юля Паго – Части Тела #140 (Хит ФМ 8.09.2016)",
                mp3:"http://www.jplayer.org/audio/mp3/TSP-05-Your_face.mp3",
                oga:"http://www.jplayer.org/audio/ogg/TSP-05-Your_face.ogg"
            },
            {
                author:"TSP",
                title:"Юля Паго – Части Тела #139 (Хит ФМ 5.09.2016)",
                mp3:"http://www.jplayer.org/audio/mp3/TSP-07-Cybersonnet.mp3",
                oga:"http://www.jplayer.org/audio/ogg/TSP-07-Cybersonnet.ogg"
            },
            {
                author:"Miaow",
                title:"Юля Паго – Части Тела #138 (Хит ФМ 3.09.2016)",
                mp3:"http://www.jplayer.org/audio/mp3/Miaow-01-Tempered-song.mp3",
                oga:"http://www.jplayer.org/audio/ogg/Miaow-01-Tempered-song.ogg"
            },
            {
                author:"Miaow",
                title:"Юля Паго – Части Тела #137 (Хит ФМ 28.08.2016)",
                mp3:"http://www.jplayer.org/audio/mp3/Miaow-02-Hidden.mp3",
                oga:"http://www.jplayer.org/audio/ogg/Miaow-02-Hidden.ogg"
            },
            {
                author:"Miaow",
                title:"DJ Feel ft. Julia Pago - Circles On The Water (Original)",
                mp3:"http://www.jplayer.org/audio/mp3/Miaow-03-Lentement.mp3",
                oga:"http://www.jplayer.org/audio/ogg/Miaow-03-Lentement.ogg"
            },
            {
                author:"Miaow",
                title:"Юля Паго – Части Тела #135 (Хит ФМ 26.08.2016)",
                mp3:"http://www.jplayer.org/audio/mp3/Miaow-04-Lismore.mp3",
                oga:"http://www.jplayer.org/audio/ogg/Miaow-04-Lismore.ogg"
            },
            {
                author:"Miaow",
                title:"Юля Паго – Части Тела #135 (Хит ФМ 26.08.2016)",
                mp3:"http://www.jplayer.org/audio/mp3/Miaow-05-The-separation.mp3",
                oga:"http://www.jplayer.org/audio/ogg/Miaow-05-The-separation.ogg"
            }
        ];

        var options_media = {
            swfPath: "js",
            supplied: "oga, mp3",
            wmode: "window",
            smoothPlayBar: false,
            keyEnabled: true,
            playlistOptions: {
                autoPlay: false
            }
        };

        var player = new jPlayerPlaylist(cssSelector_media, playlist_media, options_media);

       $('.jp-playlist').on('click', 'ul li a.jp-playlist-item', function () {
           // console.log(player);
           $(this).toggleClass('jp-playlist-current');
            var index = $(this).parent().parent().index();
           if($(this).hasClass('jp-playlist-current')) {
               player.play(index);
           } else {
               player.pause(index);
           }
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


//pagination
        (function($){
            $.fn.extend({
                MyPagination: function(options) {
                    var defaults = {
                        height: 400,
                        fadeSpeed: 400
                    };
                    var options = $.extend(defaults, options);

                    // Создаем ссылку на объект
                    var objContent = $(this);

                    // Внутренние переменные
                    var fullPages = new Array();
                    var subPages = new Array();
                    var height = 0;
                    var lastPage = 1;
                    var paginatePages;

                    // Функция инициализации
                    init = function() {
                        objContent.children().each(function(i){
                            if (height + this.clientHeight > options.height) {
                                fullPages.push(subPages);
                                subPages = new Array();
                                height = 0;
                            }

                            height += this.clientHeight;
                            subPages.push(this);
                        });

                        if (height > 0) {
                            fullPages.push(subPages);
                        }

                        // Оборачиваем каждую полную страницу
                        $(fullPages).wrap("<div class='page'></div>");

                        // Скрываем все обернутые страницы
                        objContent.children().hide();

                        // Создаем коллекцию для навигации
                        paginatePages = objContent.children();

                        // Показываем первую страницу
                        showPage(lastPage);

                        // Выводим элементы управления
                        showPagination($(paginatePages).length);
                    };

                    // Функция обновления счетчика
                    updateCounter = function(i) {
                        $('#page_number').html(i);
                    };

                    // Функция вывода страницы
                    showPage = function(page) {
                        i = page - 1;
                        if (paginatePages[i]) {

                            // Скрываем старую страницу, показываем новую
                            $(paginatePages[lastPage]).fadeOut(options.fadeSpeed);
                            lastPage = i;
                            $(paginatePages[lastPage]).fadeIn(options.fadeSpeed);

                            // и обновлем счетчик
                            updateCounter(page);
                        }
                    };

                    // Функция вывода навигации (выводим номера страниц)
                    showPagination = function(numPages) {
                        var pagins = '';
                        for (var i = 1; i <= numPages; i++) {
                            pagins += '<li><a href="#" onclick="showPage(' + i + '); return false;">' + i + '</a></li>';
                        }
                        $('.pagination li:first-child').after(pagins);
                    };

                    // Выполняем инициализацию
                    init();

                    // Привязываем два события - нажатие на кнопке "Предыдущая страница"
                    $('.pagination #prev').click(function() {
                        showPage(lastPage);
                    });
                    // и "Следующая страница"
                    $('.pagination #next').click(function() {
                        showPage(lastPage+2);
                    });

                }
            });
        })(jQuery);

        $('.pagination').on('click', 'ul li', function () {
            $('.pagination ul li.active-page').removeClass('active-page');
            $(this).addClass('active-page');
        });

// Инициализация при загрузке страницы
        jQuery(window).load(function() {
            $('.photo-group').MyPagination({height: 400, fadeSpeed: 0});
        });

//pagination end

        $('.photo-album').masonry({
            itemSelector: '.photo-album-item',
            columnWidth: 248,
            gutter: 17,
            isFitWidth: true,
            transitionDuration: 1000
        });

        $.fn.exists = function() {
            return $(this).length;
        };

        if($(".audio-jplayer-container .jp-playlist ul li").exists()) {
            $('.audio-jplayer-container').masonry({
                itemSelector: '.jp-playlist ul li',
                columnWidth: 248,
                gutter: 17,
                isFitWidth: true,
                transitionDuration: 1000
            });
        }


        $('#aniimated-thumbnials').lightGallery({
            thumbnail:true
        });


        $('.media-menu-item').click(function(){
            $('.media-menu li.active').removeClass('active');
            $(this).addClass('active')
        });

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

        getActiveLink();

        setTimeout(function () {
            $('.splash-screen').hide();
            clearInterval(interval);
            NProgress.done();
        }, 2000)
    });
})(jQuery);