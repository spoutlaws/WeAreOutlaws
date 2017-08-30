// html5media enables <video> and <audio> tags in all major browsers
// External File: https://api.html5media.info/1.1.8/html5media.min.js


// Add user agent as an attribute on the <html> tag...
// Inspiration: https://css-tricks.com/ie-10-specific-styles/
var b = document.documentElement;
b.setAttribute('data-useragent', navigator.userAgent);
b.setAttribute('data-platform', navigator.platform);


// HTML5 audio player + playlist controls...
// Inspiration: http://jonhall.info/how_to/create_a_playlist_for_html5_audio
// Mythium Archive: https://archive.org/details/mythium/
jQuery(function ($) {
    var supportsAudio = !!document.createElement('audio').canPlayType;
    if (supportsAudio) {
        var index = 0,
            playing = false,
            mediaPath = 'https://git.spoutlaws.org/spoutlaws/hype/master/mix/',
            extension = '',
            tracks = [{
                "track": 1,
                "name": "AC-DC - TNT (SPO Remix)",
                "length": "1:22",
                "file": "AC-DC - TNT (SPO Remix)"
            }, {
                "track": 2,
                "name": "Gasoline Outlaws - Outlaws",
                "length": "4:11",
                "file": "Gasoline Outlaws - Outlaws"
            }, {
                "track": 3,
                "name": "Wiz Khalifa Ft. Iggy Azalea - Go Hard or Go Home (SPO Remix)",
                "length": "1:40",
                "file": "Wiz Khalifa Ft. Iggy Azalea - Go Hard or Go Home (SPO Remix)"
            }, {
                "track": 4,
                "name": "Ayo & Teo - Rolex",
                "length": "2:36",
                "file": "Ayo & Teo - Rolex"
            }, {
                "track": 5,
                "name": "Jock Jams - Lets get ready to Rumble",
                "length": "3:52",
                "file": "Jock Jams - Lets get ready to Rumble"
            }, {
                "track": 6,
                "name": "Disciple - Outlaws",
                "length": "3:29",
                "file": "Disciple - Outlaws"
            }, {
                "track": 7,
                "name": "Fabolous ft. Jeremih - It's My Time (SPO Remix)",
                "length": "1:50",
                "file": "Fabolous ft. Jeremih - It's My Time (SPO Remix)"
            }, {
                "track": 8,
                "name": "Kendrick Lamar - HUMBLE (SPO Remix)",
                "length": "1:45",
                "file": "Kendrick Lamar - HUMBLE (SPO Remix)"
            }, {
                "track": 9,
                "name": "Flo Rida - My House (Clean)",
                "length": "3:10",
                "file": "Flo Rida - My House (Clean)"
            }, {
                "track": 10,
                "name": "The White Stripes - Seven Nation Army (Woah oh oh oh Kill_mR_DJ Remix Edit)",
                "length": "4:00",
                "file": "The White Stripes - Seven Nation Army (Woah oh oh oh Kill_mR_DJ Remix Edit)"
            }],
            buildPlaylist = $.each(tracks, function(key, value) {
                var trackNumber = value.track,
                    trackName = value.name,
                    trackLength = value.length;
                if (trackNumber.toString().length === 1) {
                    trackNumber = '0' + trackNumber;
                } else {
                    trackNumber = '' + trackNumber;
                }
                $('#plList').append('<li><div class="plItem"><div class="plNum">' + trackNumber + '.</div><div class="plTitle">' + trackName + '</div><div class="plLength">' + trackLength + '</div></div></li>');
            }),
            trackCount = tracks.length,
            npAction = $('#npAction'),
            npTitle = $('#npTitle'),
            audio = $('#audio1').bind('play', function () {
                playing = true;
                npAction.text('Now Playing...');
            }).bind('pause', function () {
                playing = false;
                npAction.text('Paused.');
            }).bind('ended', function () {
                npAction.text('Paused.');
                if ((index + 1) < trackCount) {
                    index++;
                    loadTrack(index);
                    audio.play();
		    $('#audio1').stop().animate({volume: 1}, 500);
                } else {
                    audio.pause();
                    index = 0;
                    loadTrack(index);
		    audio.play();
	            $('#audio1').stop().animate({volume: 1}, 500);
                }
            }).get(0),
            btnPrev = $('#btnPrev').click(function () {
                if ((index - 1) > -1) {
                    index--;
                    loadTrack(index);
                    if (playing) {
                        audio.play();
			$('#audio1').stop().animate({volume: 1}, 500);
                    }
                } else {
                    audio.pause();
                    index = 0;
                    loadTrack(index);
                }
            }),
            btnNext = $('#btnNext').click(function () {
                if ((index + 1) < trackCount) {
                    index++;
                    loadTrack(index);
                    if (playing) {
                        audio.play();
			$('#audio1').stop().animate({volume: 1}, 500);
                    }
                } else {
                    audio.pause();
                    index = 0;
                    loadTrack(index);
                }
            }),
            btnFadeOut = $('#btnFadeOut').click(function () {
                if (playing) {
                    $('#audio1').animate({volume: 0}, 1000, function () {
                        audio.pause();
                    });
                }
                else {
                        audio.play();
			$('#audio1').stop().animate({volume: 1}, 1000);
                }
            }),
            li = $('#plList li').click(function () {
                var id = parseInt($(this).index());
                if (id !== index) {
                    playTrack(id);
                }
            }),
            loadTrack = function (id) {
                $('.plSel').removeClass('plSel');
                $('#plList li:eq(' + id + ')').addClass('plSel');
                npTitle.text(tracks[id].name);
                index = id;
                audio.src = mediaPath + tracks[id].file + extension;
            },
            playTrack = function (id) {
                loadTrack(id);
                audio.play();
		$('#audio1').stop().animate({volume: 1}, 500);
            };
        extension = audio.canPlayType('audio/mpeg') ? '.mp3' : audio.canPlayType('audio/ogg') ? '.ogg' : '';
        loadTrack(index);
    }
});
