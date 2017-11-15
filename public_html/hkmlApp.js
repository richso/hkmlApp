$j(document).ready(function() {
    var $ = $j;
    
    var appHead = $('html').attr('hkmlApp_head');
    
    if (! appHead) {
        showPopupText = function(){}
        
        $('html').attr('hkmlApp_head', 'done'); // prevent double invoke
    
        $('html > head').append('<meta name="viewport" content="width=device-width, initial-scale=1">')
            .append('<style type="text/css">[class*=myalbum-thumbs-], .myalbum-thumbs {overflow: hidden; margin: 0 auto !important;}\n'+
            '#divStayTopLeft {display: none;}\n' +
            '#postform input[type="file"], #postform input[type="text"] {width: 100% !important;}\n' +
            '#postform #posteditor_textarea {height: 90px !important;}\n' + 
            '.lightbutton {padding: 0 5px !important; color: #050505 !important; background-image: url(../../images/d-xite_blue/header_bg.gif); background-repeat: repeat-x; background-position: 0 50%; outline: 1px solid #4691C8; border: 1px solid #FFF !important; height: 19px !important; line-height: 17px !important;}\n' +
            '#posteditor_controls .editor_buttonnormal, #posteditor_controls .editor_buttonhover, #posteditor_controls .editor_buttonselected {float: left;}' +
            '.toptenblock {display: inline-block;}\n' +
            '.msgborder, .msgheader { margin: 0 !important;}</style>');
        $('*').css('font-size', '16px');
        $('.logo').css('display', 'none');
        $('.t_row > tbody > tr > td:nth-child(2) img:not([smilieid]):not([src^="images/d-xite"]):not([src^="images/common"]):not([src^="http://www.hkml.net/Discuz/images/common"]):not([src^="http://hkml.net/Discuz/images/common"]):not([src^="images/attachicons"]):not([src^="http://wpa.qq.com/pa?p="]):not([src^="http://web.icq.com/whitepages/online?icq="]):not([src^="http://edit.yahoo.com/config/send_webmesg?.target="])').css('width', '100%');
        $('.t_row > tbody > tr > td:nth-child(2) a[href][target]').attr('target', '_self').css('color', 'blue')

        var hashSeg = location.href.split(/\#/)[0];
        var urlParts = hashSeg.split(/\//);
        var lastLocSeg = urlParts[urlParts.length-1].split(/\?/)[0];
        var lastLocParams = urlParts[urlParts.length-1].split(/\?/)[1];
        var mainTable_q = $('body > center > .maintable');
        /* check if index page */
        if (mainTable_q.length && /^index\.php$/.test(lastLocSeg)) {
            var mainTable = mainTable_q[0];
            
            // new message boxes
            var sph_q = $('> .spaceborder', mainTable);
            $(sph_q[0]).css('display', 'none');

            var sph = sph_q[1];
            $('<div id="hkmlApp-forumBox"></div>').insertBefore(sph);
            $('> table:first-child table', sph).each(function(i, n){
                $(n).css('width', '100%');
                $('#hkmlApp-forumBox').append(n);
            })

            // billboard
            var billboard_div = sph_q[2];
            $('<div id="hkmlApp-billboard"></div>').insertBefore(billboard_div);
            $('<div id="hkmlApp-themepark"></div>').insertAfter('#hkmlApp-billboard');
            $('> table > tbody > tr > td > table', billboard_div).each(function(i, n){
                if (i==0) {
                    var btd = $('> tbody > tr:nth-child(2) > td', n);
                    $('<div id="billboard-inner"></div>').insertAfter($('> table', btd[0]));
                    $('> table > tbody > tr > td', btd[0]).each(function(j, n2){
                        $('#billboard-inner').append('<div style="width:50%; text-align: center;float:left;">'+n2.innerHTML+'</div>');
                        $(n2).html('');
                    })
                    $('#hkmlApp-billboard').append(n);
                    $('> table', btd[0]).remove();
                } else {
                    $('#hkmlApp-themepark').append(n);
                }
            })
            for(var x=3; x < sph_q.length; x++) {
                $(sph_q[x]).css('display', 'none');
            }

        }

        /* apply to content page only */
        if (/^redirect\.php$/.test(lastLocSeg) || /^viewthread\.php$/.test(lastLocSeg)) { 
             var usercnt = '';
             $('form[name="delpost"] > div.spaceborder > table > tbody > tr > td').each(function(i, n){
                if ((i+1) % 2==1) {
                    var img = $('.avatar > img', n).css({height: '20px', width: 'auto'});
                    $(n).prepend(img);
                    $('> div.smalltxt', n).remove();
                    usercnt = $(n).html();
                    $(n).remove();
                } else {
                    var node = $('<div>'+usercnt+'</div>');
                    $('table', node[0]).attr('align', 'left').attr('width', '').attr('valign', 'middle');
                    node.prependTo(n);
                }
            });
             
            $('a[href^="misc.php"]').parent('div').parent('td').parent('tr').css('background-image', 'none');
            $('a[href^="misc.php"]').parent('div').parent('td').parent('tr').css('background-color', '#eeeeee');
            var p = $('a[href^="misc.php"]').parent('div').parent('td');
            $('a[href^="misc.php"]').parent('div').removeClass('right').appendTo(p[0]);
            
            var utilLinkParent = $('a[href^="misc.php?action=emailfriend"]').parent();
            $('a[href^="misc.php?action=emailfriend"]').remove();
            $('a[href^="viewthread.php?action=printable"]').remove();
            var span = $('<span></span>')
            $('> *', utilLinkParent).each(function(i, n){
                if (i > 0) {
                    $(span).append(' | ');
                }
                $(n).appendTo(span);
            });
            $(utilLinkParent).empty().append(span);
            
            // like frame
            try {
                var fs = $('fieldset')[0];
                if (fs) {
                    var tb = $('table', fs)[1]
                    if (tb) {
                        var slt = $('<select id="likeActions" style="width: 100%;" />');
                        var opt = $('<option value="">---</option>');
                        $(slt).append(opt);
                        $('td a', tb).each(function(i, n){
                            var label = $('font', n).text();
                            opt = $('<option value="'+$(n).attr('href')+'">'+label+'</option>');
                            $(slt).append(opt);
                        });
                        $(slt).on('change', function(){
                            if (this.value) {
                                location = this.value;
                            }
                        });
                        $(tb).remove();
                        $(fs).append('讚好:');
                        $(fs).append(slt);
                    } 
                }
            } catch (e) {
                //alert(e.message);
            }
            
            // replace youtube link with in place youtube box
            var tube = $('a[href^="https://www.youtube.com/watch?v="]').attr('href'); 
            try {
                var match = tube.match(/^https\:\/\/www\.youtube\.com\/watch\?v\=([^\&]+)/)
                var w = $(window).width();
                var vw = w * 0.8;
                var vh = vw * 315 / 560;
                $('a[href^="https://www.youtube.com/watch?v="]').replaceWith('<div style="text-align: center;"><iframe width="'+vw+'" height="'+vh+'" src="https://www.youtube.com/embed/'+match[1]+'" frameborder="0" allowfullscreen></iframe></div>')
            } catch (e) {
                //
            }
            
            // postform
            $('#postform > .spaceborder > table > tbody > tr:not(tr:first-child) > td:first-child, '+
            '#postform > .maintable > .spaceborder > table > tbody > tr:not(tr:first-child) > td:first-child, '+
            '#postform > .maintable > .spaceborder > table > tbody > tr:not(tr:first-child) > td:nth-child(2), '+
            '#postform > .maintable > .spaceborder > table > tbody > tr:not(tr:first-child) > td:last-child').css('display', 'none');
            $('#postform #attachbody tr.row2 > td, #postform #attachbody tr.row1 > td').css({
                'border-bottom': '1px dotted #555555', 
                'padding-bottom': '20px', 
                'padding-top': '10px'
            });
            $('#postform #attachbody tr.row2:last-child, #postform #attachbody tr.row1:last-child > td').css('border-bottom', 'none');
            
            var formTables = $('#postform > .maintable > .spaceborder > table > tbody > tr.bottom table');
            var formToolTable = formTables[0];
            $(formToolTable).css('display', 'none');
            $('#postform input[name="subject"]').attr('placeholder', '主題(可選)');
            $('#postform #message').attr('placeholder', '內容(可選)');
            
            // file upload set
            $('> tbody > tr > td:first-child', formTables[2]).css('width', 'auto !important');
            $('> tbody > tr > td:nth-child(2)', formTables[2]).each(function(i, n){
                if (i!=0) {
                    $('input', n).attr('placeholder', '描述');
                    $('input', n).appendTo($('> td:first-child', $(n).parent()).append('<br/>'));
                }
                $(n).remove();
            });
            
        }    
        
        if (/^logging.php$/.test(lastLocSeg)) {
            $('form[name="login"] input[name="answer"]').css('width', '100%');
        }
        
        if (/^toptendetails.php$/.test(lastLocSeg)) {
            var tbTop = $('.tableborder');
            var nav = tbTop[0];
            if (nav) {
                var div = $('<div />');
                $('> tbody > tr > td', nav).each(function(i, n){
                    console.log(n.childNodes)
                    n.childNodes.forEach(function(c){
                        console.log(n.childNodes[0])
                        $(div).append(n.childNodes[0]);
                    });
                    $(n).remove();
                });
                var td = $('<td />')
                $(td).append(div);
                $('> tbody > tr', nav).append(td);
            }
            var tb0 = tbTop[1];
            var tb1 = $('> tbody > tr > td > table', tb0);
            if (tb0 && tb1[0]) {
                var tb = tb1[0];
                $('> tbody > tr > td', tb).each(function(i, td){
                    var div = $('<div class="toptenblock" />');
                    $('> *', td).each(function(j, n){
                        $(div).append(n);
                    });
                    $(tb0).append(div);
                });
                $(tb1).remove();
                $('.toptenblock:last-child')
                        .css({
                            display: 'block', 
                            width: '100%', 
                            border: 'none'
                        });
            }
        }
        
        if (/^post.php$/.test(lastLocSeg)) {
            $('#postform > .spaceborder > table > tbody > tr:not(tr:first-child) > td:first-child').css('display', 'none');
    
            var formTables = $('#postform > .spaceborder > table > tbody > tr.bottom table');
            $('#postform input[name="subject"]').attr('placeholder', '主題(可選)');
            $('#postform #posteditor_textarea').attr('placeholder', '內容(可選)');
            
            // file upload set
            var eb = $(formTables).filter(function(){
                return $(this).hasClass('editor_button');
            })[0];
            var editor_table = $('> tbody > tr:nth-child(2) > td > table', eb)[0];
            $('> tbody > tr > td:first-child', editor_table).css('width', 'auto !important');
            $('> tbody > tr > td:nth-child(2)', editor_table).each(function(i, n){
                if (i!=0) {
                    $('input', n).attr('placeholder', '描述');
                    $('input', n).appendTo($('> td:first-child', $(n).parent()).append('<br/>'));
                }
                $(n).remove();
            });
            
            var ctrlTd = $('<td></td>');
            $('#postform #posteditor_controls > table').each(function(i, n){
                //var fc = $('> tbody > tr > td:first-child', n);
                $('> tbody > tr > td', n).each(function(j, n2){
                    if (! n2.id) {
                        $('> *', n2).each(function(k, n3){
                            if (n3.tagName != 'IMG' && -1 == $.inArray(n3.id, ['posteditor_cmd_createlink', 'posteditor_cmd_unlink', 'posteditor_cmd_email'])) {
                                $(n3).appendTo(ctrlTd);
                            }
                        });
                    }
                    $(n2).remove();
                });
                $('> tbody > tr', n).append(ctrlTd);
            });
        }
        
        if (/^my\.php$/.test(lastLocSeg)) { 
            $('td.subject a[target="_blank"]').attr('target', '_self');
            $('td a[href^="forumdisplay"][target="_blank"]').attr('target', '_self');
            $('> td:nth-child(3)', $('td.subject').parent('tr')).css('display', 'none');
            $('> td:nth-child(3)', $('tr.category')).css('display', 'none');
            $('> table > tbody > tr > td:first-child', $('.maintable')[2]).css('display', 'none');
            $('input[type="text"]').css('width', '100%');
        }
        
        if (/^search\.php$/.test(lastLocSeg)) { 
            if (lastLocParams) {
                $('td.subject a[target="_blank"]').attr('target', '_self');
                $('td a[href^="forumdisplay"][target="_blank"]').attr('target', '_self');
                $('td a[href^="space"][target="_blank"]').attr('target', '_self');
                $('> td:nth-child(4)', $('td.subject').parent('tr')).css('display', 'none');
                $('> td:nth-child(5)', $('td.subject').parent('tr')).css('display', 'none');
                $('> td:nth-child(4)', $('tr.category')).css('display', 'none');
                $('> td:nth-child(5)', $('tr.category')).css('display', 'none');
                $('> tr:first-child > td:nth-child(4)', $('td.subject').parent('tr').parent('tbody')).css('display', 'none');
                $('> tr:first-child > td:nth-child(5)', $('td.subject').parent('tr').parent('tbody')).css('display', 'none');
            } else {
                $('input[type="text"]').css('width', '100%');
                $('input[name="srchtxt"]').attr('placeholder', '關鍵字');
                $('input[name="srchuname"]').attr('placeholder', '用戶名');
                $('form[action="search.php"] > div > table > tbody > tr > td:first-child').css('display', 'none');
                $('form[action="search.php"] > div > table > tbody > tr > td:nth-child(3)').css('display', 'none');
            }
        }

        $('input[type="text"]').css('height', 'auto');
                
        /* hide the board instruction panel */
        $('body center > div.tableborder').css('display', 'none');
        /* hide the model brands links panel */
        $('body center center').css('display', 'none');
       
        $('body > center > div.menu + div').css('display', 'none');
        
        // hide unuseful links
        $('a[href="medals.php"]').remove();
        $('#memcp').remove();
        $('a[href="faq.php"]').remove();
        var span = $('<span></span>');
        $('body > center > div.menu > div.maintable > *').each(function(i, n){
            if (i > 1) {
                $(span).append(' | ');
            }
            $(n).appendTo(span);
        });
        $('body > center > div.menu > div.maintable').empty().append(span);
        
        try {
            $('a[href="javascript:void(0)"]').each(function(i, n){
                var out = n.outerHTML;
                var mth = out.match(/onclick\=\"window\.open\(\'([^\']+)\'/);

                if (mth && mth[1]) {
                    var fb_sharer = 'http://www.facebook.com/sharer/sharer.php?u=';
                    if (/^http[s]{0,1}\:\/\/www\.facebook\.com/.test(mth[1])) {
                        $(n).attr('href', 'facebookshare:' + mth[1].substring(fb_sharer.length).replace(/\&amp;/g, '&'));
                    } else {
                        $(n).attr('href', mth[1]);
                    }
                    $(n)[0].onclick = null;
                }
            });
            
            $("body").swipe( {
                //Generic swipe handler for all directions
                swipeLeft:function(event, direction, distance, duration, fingerCount, fingerData) {
                    history.forward();
                },
                swipeRight:function(event, direction, distance, duration, fingerCount, fingerData) {
                    history.back();
                },
                //Default is 75px, set to 0 for demo so any distance triggers swipe
                 threshold:120
            });
        } catch (e) {
            //alert(e.message);
        }
    }
})

