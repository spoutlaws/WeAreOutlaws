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
                "name": "12 - Darius",
                "length": "0:19",
                "file": "12 - Darius"
            }, {
                "track": 2,
                "name": "02 - Davon",
                "length": "0:19",
                "file": "02 - Davon"
            }, {
                "track": 3,
                "name": "07 - Brady",
                "length": "0:19",
                "file": "07 - Brady"
            }, {
                "track": 4,
                "name": "14 - Cole",
                "length": "0:19",
                "file": "14 - Cole"
            }, {
                "track": 5,
                "name": "05 - Carter",
                "length": "0:19",
                "file": "05 - Carter"
            }, {
                "track": 6,
                "name": "03 - Blaze",
                "length": "0:19",
                "file": "03 - Blaze"
            }, {
                "track": 7,
                "name": "01 - Owen",
                "length": "0:19",
                "file": "01 - Owen"
            }, {
                "track": 8,
                "name": "10 - John Hodges",
                "length": "0:19",
                "file": "10 - John Hodges"
            }, {
                "track": 9,
                "name": "13 - Landon",
                "length": "0:19",
                "file": "13 - Landon"
            }, {
                "track": 10,
                "name": "11 - Blake",
                "length": "0:19",
                "file": "11 - Blake"
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
                npAction.text('Next Song Loaded.');
                if ((index + 1) < trackCount) {
		    index++;
                    loadTrack(index);
		    if(playing) {
		        audio.pause();		        
		    }
		    //$('#audio1').stop().animate({volume: 1}, 500);
                } else {
                    index = 0;
                    loadTrack(index);
		    if(playing) {
		        audio.pause();
		    }
                }
		npAction.text('Paused.');
            }).get(0),
            btnPrev = $('#btnPrev').click(function () {
                if ((index - 1) > -1) {
                    index--;
                    loadTrack(index);
		    if(playing) {
		        audio.pause();
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
		    if(playing) {
		        audio.pause();
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
            btnSwitch = $('#btnSwitch').click(function () {
                window.location.href = "https://git.spoutlaws.org/spoutlaws/hype/master/mix/index.html"
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
        extension = audio.canPlayType('audio/mpeg') ? '.mp3' : audio.canPlayType('audio/ogg') ? '.ogg' : audio.canPlayType('audio/mpeg') ? '.MP3' : '';
        loadTrack(index);
    }
});
