$j(document).ready(function() {
    var $ = $j;
    
    var appHead = $('html').attr('hkmlApp_head');
    
    if (! appHead) {
        showPopupText = function(){}
        
        $('html').attr('hkmlApp_head', 'done'); // prevent double invoke
    
        $('html > head').append('<meta name="viewport" content="width=device-width, initial-scale=1">')
            .append('<style>[class*=myalbum-thumbs-], .myalbum-thumbs {margin: 0 auto !important;}\n.msgborder, .msgheader { margin: 0 !important;}</style>');
        $('html > head').append('<meta name="Content-Type" content="text/html; charset=big5-hkscs">')
        $('*').css('font-size', '16px');
        $('.logo').css('display', 'none');
        $('.t_row > tbody > tr > td:nth-child(2) img:not([smilieid]):not([src^="images/d-xite"]):not([src^="http://"]):not([src^="images/attachicons"])').css('width', '100%');
        $('.t_row > tbody > tr > td:nth-child(2) a[href][target]').attr('target', '_self').css('color', 'blue')

        var hashSeg = location.href.split(/\#/)[0];
        var urlParts = hashSeg.split(/\//);
        var lastLocSeg = urlParts[urlParts.length-1].split(/\?/)[0];
        var mainTable_q = $('body > center > .maintable');
        /* check if index page */
        if (mainTable_q.length && /^index\.php$/.test(lastLocSeg)) {
            var mainTable = mainTable_q[0];
            var sph_q = $('> .spaceborder', mainTable);
            $(sph_q[0]).css('display', 'none');

            var sph = sph_q[1];
            $('<div id="hkmlApp-forumBox"></div>').insertBefore(sph);
            $('> table:first-child table', sph).each(function(i, n){
                $(n).css('width', '100%');
                $('#hkmlApp-forumBox').append(n);
            })

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
             })
        }    

        /* hide the board instruction panel */
        $('body center > div.tableborder').css('display', 'none');
        /* hide the model brands links panel */
        $('body center center').css('display', 'none');
       
        $('body > center > div.menu + div').css('display', 'none');
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
        } catch (e) {
            //alert(e.message);
        }
    }
})

