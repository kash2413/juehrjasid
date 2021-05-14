var tagEnv_FE = tagEnv_FE || new Object();
tagElement = document.body;

function checkDevice() {
    var userDevice = navigator.userAgent.toLowerCase();
    var detectedDevice = userDevice.search(/(android|avantgo|blackberry|bolt|boost|cricket|docomo|fone|hiptop|mini|mobi|palm|phone|pie|tablet|up\.browser|up\.link|webos|wos)/i);
    return detectedDevice;
}

    var gftNvg = document.querySelector('script[src$="//api.grumft.com/common/gftnvg.js"]');
if(!gftNvg) {
    var nvg = document.createElement("script");
    nvg.type = "text/javascript";
    nvg.async = true;
    nvg.id = 'navegg';
    nvg.src = "//api.grumft.com/common/gftnvg.js";
        
    document.getElementsByTagName('head')[0].appendChild(nvg);
    
    
}
var pos = (document.location.href).indexOf(document.location.hostname);
pos += (document.location.hostname).length;
var u4r0i = (document.location.href).slice(pos);
u4r0i = u4r0i.slice(0,39);
getCookie = function(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i < ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
}
var wdir = getCookie('wdir');

var uid = getCookie('gftuid');
if(uid.length <= 0)
{
    var imported = document.createElement('script');
    imported.src = '//api.grumft.com/fp_gft/fpgft.min.js';
    document.head.appendChild(imported);

    imported.onload = function()
    {
        var fp = new Fingerprint({
            canvas: true,
            ie_activex: true,
            screen_resolution: true
        });
        
        var uid = fp.get();
        document.cookie = `gftuid=${uid}`;
    }
}
var targetValue = null;


function getAdtagConfig()
{   
    if(checkDevice() != -1 ) { // mobile
        adtagHeight = 50 ? 50 : 0;
        adtagWidth = 320 ? 320 :  0;
        right = (window.innerWidth > adtagWidth) ? Math.round((window.innerWidth - adtagWidth) / 2) : 0;
        adtag = {
            adunit: "23288_320x50_barra",
            zindex: 10000,
            width: 320,
            height: 50,
            definition: `position:fixed;bottom:0;right:${right}px;`,
            bgDefinition: `position:fixed;bottom:0;background:white;box-shadow: 0px 0px 10px 3px #888888;`,
            close: "right:21px;width:35px;height:35px;top:-25px;background:white;border:7px solid white;border-radius:7px;",
            id: "1248",
        };
    } else {
        adtagHeight = 90 ? 90 : 0;
        adtagWidth = 728 ? 728 : 0;
        right = (window.innerWidth > adtagWidth) ? Math.round((window.innerWidth - adtagWidth) / 2) : 0;
        adtag = {
            adunit: "23288_728x90_barra",
            zindex: 10000,
            width: 728,
            height: 90,
            definition: `position:fixed;bottom:0;right:${right}px;`,
            
            id: "1249",
        };
    }
    return adtag;
}
(
(environment) => 
{   
    var idMainContainer = "grumftFeMainContainer";
    var idBg = "grumftFeBG";
    adtag = getAdtagConfig();

    if( adtag.adunit!="") 
    {
        // Style
        var style = document.createElement('style');
        style.innerHTML = `#${idMainContainer} {position:fixed; z-index:${adtag.zindex}; width:${adtag.width}px; height:${adtag.height}px;  ${adtag.definition} background:none;}`+
                            `#${idBg} {position:fixed; z-index:${adtag.zindex}; width:${window.innerWidth+20}px; height:${adtag.height+10}px; ${adtag.bgDefinition} }`;
        tagElement.appendChild( style );
        // GPT Script
        var googleGptScript = document.createElement('script');
        googleGptScript.src = "//www.googletagservices.com/tag/js/gpt.js";
        document.head.appendChild(googleGptScript);
        
        // DIV append
        if(checkDevice() != -1 ){
            var elementBg = document.createElement('div');
            elementBg.id = idBg;
            tagElement.appendChild( elementBg );
        }

        var elementDivMain = document.createElement('div');
        elementDivMain.id = idMainContainer;
        tagElement.appendChild( elementDivMain );

        var elementDivAd = document.createElement('div');
        elementDivAd.id = `${adtag.adunit}`;
        elementDivAd.style.width = `${adtag.width}px`;
        elementDivAd.style.height = `${adtag.height}px`;
        elementDivMain.appendChild( elementDivAd );

        if(adtag.adunit){
            var div_adtag_close = document.createElement('img');
            div_adtag_close.id =  `${adtag.adunit}_close`;
            div_adtag_close.src =  "//cdn.mediagrumft.com/ad/common/imgs/close.png";
            div_adtag_close.style =  `position:absolute;opacity:1;cursor:pointer;${adtag.close}`;
            div_adtag_close.onclick =  hideDiv;
        }

        var GrumftFE = GrumftFE || new Object();
        
        GrumftFE.gpt = {
            count: '',
            define : function(pass = '', count = '')
            {
                var content = [
                    'window.googletag = window.googletag || {};',
                    'googletag.cmd = googletag.cmd || [];',
                    'googletag.cmd.push(function() {',
                    `var gptadslot_${adtag.adunit}${count} = googletag.defineSlot("/150790500/${adtag.adunit}${pass}", [${adtag.width},${adtag.height}], "${adtag.adunit}${count}")`,
                                            `;`,
                        `gptadslot_${adtag.adunit}${count}.addService(googletag.pubads()`,
                            `.addEventListener("slotRenderEnded", function(event) {`,
                                `if (event.slot.getSlotElementId() == "${adtag.adunit}${count}") {`,
                                    `tagEnv_FE.GrumftFE.gpt.customRefresh(event);`,
                                `}`,
                            `})`,
                        `);`,
                        `gptadslot_${adtag.adunit}${count}.setTargeting("wex_code", "7f450f0a14ddbd0ac6b5c0e28afb2201");`,
                        `gptadslot_${adtag.adunit}${count}.setTargeting("wcode", "23288");`,
                        `gptadslot_${adtag.adunit}${count}.setTargeting("acode", ${adtag.id});`,
                        `gptadslot_${adtag.adunit}${count}.setTargeting("tengwdir", ${wdir});`,
                        `gptadslot_${adtag.adunit}${count}.setTargeting("gpcid", ${uid});`,
                        `gptadslot_${adtag.adunit}${count}.setTargeting("pageDomain", document.location.hostname);`,
                        `gptadslot_${adtag.adunit}${count}.setTargeting("referrer", ((document.referrer.length > 0)?document.referrer:"null" ));`,
                                                    `gptadslot_${adtag.adunit}${count}.setTargeting("pageUrl", u4r0i);`,
                                                                            `var name, col, persona = JSON.parse(window.localStorage.getItem("nvgpersona70303"));
for (col in persona) {
    name = "nvg_" + col;
    name = name.substring(0, 10);
    if (typeof(googletag) == "object")
        googletag.pubads().setTargeting(name, persona[col]);
    if (typeof(GA_googleAddAttr) == "function")
        GA_googleAddAttr(name, persona[col]);
}`,                                                'googletag.enableServices();',
                        `setTimeout(function() {
                            if(googletag.pubads().isInitialLoadDisabled()) {
                                googletag.pubads().refresh([gptadslot_${adtag.adunit}${count}]);
                            }
                        }, 1);`,
                    '});'
                ];
                var script = document.createElement('script');
                script.type = "text/javascript";
                script.text = content.join(' ');
                return script;
            },
            display: function(count = '') {
                var content = [
                    'googletag.cmd.push(function() {',
                    `    googletag.display("${adtag.adunit}${count}")`,
                    '});'
                ];
        
                var div = document.getElementById(`${adtag.adunit}${count}`);
        
                var script = document.createElement('script');
                script.type ="text/javascript";
                script.text = content.join(' ');
                div.appendChild(script);
                return div;
            },
            customRefresh: function(event)
            {
                if (tagEnv_FE.GrumftFE.gpt.count < 5 )
                {
                    googletag.destroySlots([`${adtag.adunit}${tagEnv_FE.GrumftFE.gpt.count}`]);
                    var div = document.getElementById(`${adtag.adunit}${tagEnv_FE.GrumftFE.gpt.count}`);
                    tagEnv_FE.GrumftFE.gpt.count++;
                    div.id = `${adtag.adunit}${tagEnv_FE.GrumftFE.gpt.count}`;
                    
                    setTimeout(function() {
                        tagElement.appendChild(  tagEnv_FE.GrumftFE.gpt.define('_R', tagEnv_FE.GrumftFE.gpt.count) );
                        tagEnv_FE.GrumftFE.gpt.display(tagEnv_FE.GrumftFE.gpt.count);
                    }, 15000);
                }
            },

        analytics: function(propertyId){
    var gtmScriptGtag = document.createElement("script");
    gtmScriptGtag.async = true;
    gtmScriptGtag.type = "text/javascript";
    gtmScriptGtag.src = `https://www.googletagmanager.com/gtag/js?id=${propertyId}`;
    
    document.getElementsByTagName('head')[0].appendChild(gtmScriptGtag);

    window.dataLayer = window.dataLayer || [];
    function gtag() {
        dataLayer.push(arguments);
    }
    gtag('js', new Date());
    gtag('config', propertyId);
}
        };
        function hideDiv() {
            var tagElement = document.getElementById(idMainContainer);
            var bgElement = document.getElementById(idBg);
            tagElement.style.display = "none";
            bgElement.style.display = "none";
        }
        // Obj declaration
        environment.googleGptScript = googleGptScript;
        environment.GrumftFE = GrumftFE;
    }
})
(tagEnv_FE);

if( tagEnv_FE.GrumftFE!=undefined ) 
{
    tagEnv_FE.googleGptScript.onload = function() {
        tagElement.appendChild(  tagEnv_FE.GrumftFE.gpt.define() );

        var gtagAllExists = document.querySelector('script[src$="https://www.googletagmanager.com/gtag/js?id=UA-187953244-1"]');
    if(!gtagAllExists){
        tagEnv_FE.GrumftFE.gpt.analytics('UA-187953244-1');
    } 


        tagEnv_FE.GrumftFE.gpt.display();
    }
}