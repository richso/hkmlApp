$j(document).ready(function() {
    
    var $ = $j;
    
    var appHead = $('html').attr('hkmlApp_head');
    
    if (! appHead) {
        showPopupText = function(){}
        setcopy = function(){}
        
        $('html').attr('hkmlApp_head', 'done'); // prevent double invoke
        
        var hashSeg = location.href.split(/\#/)[0];
        var urlParts = hashSeg.split(/\//);
        var lastLocSeg = urlParts[urlParts.length-1].split(/\?/)[0];
        var lastLocParams = urlParts[urlParts.length-1].split(/\?/)[1];
        var mainTable_q = $('body > center > .maintable');
    
        var jsonData = {}
    
        /* check if index page */
        if (/^logging\.php$/.test(lastLocSeg)) {
            
            var logoutLink = $('a[href^="logging.php?action=logout"]')
            jsonData.loggedIn = !!logoutLink.length;

            // for ios
            if (window.webkit && window.webkit.messageHandlers && typeof window.webkit.messageHandlers.hkmlApp != "undefined") {
                window.webkit.messageHandlers.hkmlApp.postMessage(jsonData);
            }
            
        }
        
        console.log(jsonData);
    
    }
});