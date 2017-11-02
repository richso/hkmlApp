//var allLinks = document.getElementsByTagName('a'); 
//if (allLinks) {
//    var i;
//    for (i=0; i<allLinks.length; i++) {
//        var link = allLinks[i];
//        var target = link.getAttribute('target'); 
//        if (target && target == '_blank') {
//            link.setAttribute('target','_self');
//        }
//    }
//}
$j('a[href][target]').attr('target', '_self')

setTimeout(function(){
    showPopupText = function(){}
}, 500)
