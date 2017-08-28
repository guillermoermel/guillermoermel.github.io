runHotjar();

function runHotjar(myHotjarScriptId) {
	if (getHotjarScriptId(myHotjarScriptId)) {
		(function(h,o,t,j,a,r){
		    h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
		    h._hjSettings={hjid:getHotjarScriptId(myHotjarScriptId),hjsv:5,hjdebug:false};
		    a=o.getElementsByTagName('head')[0];
		    r=o.createElement('script');r.async=1;
		    r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
		    a.appendChild(r);
		})(window,document,'//static.hotjar.com/c/hotjar-','.js?sv=');
	}
}


function getHotjarScriptId(myHotjarScriptId) {
	/*this function returns the id of a pre-defined hotjar script by country for the lower 50% (d2id < 8) the website traffic, or an optional hotjar script id defined by the developer for the higher 50% (d2id > 8). If no id is defined for the higher 50%, only the lower 50% gets a hotjar script id.

	This strategy is intented to capture *both* the whole website navigation experience (e.g. whole use of Mercado Libre México as opposed to just the use of the product page) and also allow for teams to use their own hotjar script (e.g. to have their own incoming feedback, heatmaps or even some specific recordings).
	*/

	//if d2id last character is a number, assign that user to the pool that will get the 'whole site' hotjar script for that country:
	var d2id = window.d2id || readCookie('_d2id');
	regex = /[0-7]$/i;
	var hotjarForWholeSiteRecordings = d2id.search(regex) > 1;

	if (hotjarForWholeSiteRecordings) {
		var country = document.documentElement.dataset.country || document.body.dataset.country; // country id works in ML but not in MP.
		switch (country) {
		    case 'AR': return 589860 
		    case 'BR': return 589861
		    case 'MX': return 589863
		    default  : return 601450
		}
	} else {
		return myHotjarScriptId;
	}
}

function readCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for(var i=0;i < ca.length;i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1,c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
    }
    return null;
}
