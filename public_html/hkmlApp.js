$j(document).ready(function()
  {
       $j('html > head').append('<meta name="viewport" content="width=device-width, initial-scale=1">')
           .append('<style>[class*=myalbum-thumbs-], .myalbum-thumbs {margin: 0 auto !important;}\n.avatar, .avatar > img { width: 45px !important; height: auto !important;}</style>');
       $j('*').css('font-size', '16px');
       $j('.logo').css('display', 'none');
       
       var hashSeg = location.href.split(/\#/)[0]
       var urlParts = hashSeg.split(/\//)
       var lastLocSeg = urlParts[urlParts.length-1].split(/\?/)[0]
       var mainTable_q = $j('body > center > .maintable')
       if (mainTable_q.length && /^index\.php$/.test(lastLocSeg)) { // index page
           var mainTable = mainTable_q[0]
           var sph_q = $j('> .spaceborder', mainTable)
           $j(sph_q[0]).css('display', 'none')
                   
           var sph = sph_q[1]
           $j('<div id="hkmlApp-forumBox"></div>').insertBefore(sph)
           $j('> table:first-child table', sph).each(function(i, n){
               $j(n).css('width', '100%')
               $j('#hkmlApp-forumBox').append(n)
           })
                   
           var billboard_div = sph_q[2];
           $j('<div id="hkmlApp-billboard"></div>').insertBefore(billboard_div);
           $j('<div id="hkmlApp-themepark"></div>').insertAfter('#hkmlApp-billboard');
           $j('> table > tbody > tr > td > table', billboard_div).each(function(i, n){
               if (i==0) {
                   var btd = $j('> tbody > tr:nth-child(2) > td', n)
                   $j('<div id="billboard-inner"></div>').insertAfter($j('> table', btd[0]))
                   $j('> table > tbody > tr > td', btd[0]).each(function(j, n2){
                       $j('#billboard-inner').append('<div style="width:50%; text-align: center;float:left;">'+n2.innerHTML+'</div>')
                       $j(n2).html('');
                   })
                   $j('#hkmlApp-billboard').append(n);
                   $j('> table', btd[0]).remove();
               } else {
                   $j('#hkmlApp-themepark').append(n);
               }
           })
           for(var x=3; x < sph_q.length; x++) {
               $j(sph_q[x]).css('display', 'none');
           }
                      
       }
       // hide the board instruction panel
       $j('body center > div.tableborder').css('display', 'none')
       // hide the model brands links panel
       $j('body center center').css('display', 'none')
       
        $j('body > center > div.menu + div').css('display', 'none')
        try {
            $j('a[href="javascript:void(0)"]').each(function(i, n){
                var out = n.outerHTML
                var mth = out.match(/onclick\=\"window\.open\(\'([^\']+)\'/)

                if (mth && mth[1]) {
                    $j(n).attr('href', /* 'facebookshare:' + */ mth[1])[0].onclick = null;
                }
            })
        } catch (e) {
            alert(e.message)
        }
  })

