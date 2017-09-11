runHotjar();

function runHotjar(myHotjarScriptId) {
	var hotjarScriptId = getHotjarScriptId(myHotjarScriptId);

	if (hotjarScriptId) {
		(function(h,o,t,j,a,r){
		    h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
		    h._hjSettings={hjid:hotjarScriptId,hjsv:5,hjdebug:false};
		    a=o.getElementsByTagName('head')[0];
		    r=o.createElement('script');r.async=1;
		    r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
		    a.appendChild(r);
		})(window,document,'//static.hotjar.com/c/hotjar-','.js?sv=');
	}
}

function getHotjarScriptId(myHotjarScriptId) {
	/*this function returns the id of a pre-defined hotjar script by country for the lower 50% (d2id < 8) the website traffic, or an optional hotjar script id defined by the developer for the higher 50% (d2id > 8). If no id is defined for the higher 50%, only the lower 50% gets a hotjar script id.

	This strategy is intended to capture *both* the whole website navigation experience (e.g. whole use of Mercado Libre México as opposed to just the use of the product page) and also allow for teams to use their own hotjar script (e.g. to have their own incoming feedback, heatmaps or even some specific recordings).
	*/
		//if d2id last character is a number, assign that user to the pool that will get the 'whole site' hotjar script for that country:
		if (myHotjarScriptId) { 
			// solo dividir el tráfico si viene un parámetro de id en runHotjar(myHotjarScriptId)
			// si viene runHotjar() a secas, enviar 100% del tráfico al hotjar script general
			var d2id = readCookie('_d2id');
			var regex = /[0-7]$/i;
			var hotjarForWholeSiteRecordings = d2id.search(regex) > 1;
		} else {
			var hotjarForWholeSiteRecordings = true;
		}

		if (hotjarForWholeSiteRecordings) {
			var country = document.documentElement.getAttribute('data-country') || document.body.getAttribute('data-country'); // country id works in ML but not in MP.
			var mapa = {
					 'ML': {
					   'AR': 589860,
					   'BR': 589861,
					   'MX': 589863,
					   'default': 601450
					 },
					 'MP': {
					   'AR': 000000,
					   'BR': 111111,
					   'MX': 222222,
					   'default': 999999
					 }
				};

			var country = getCountry(window.location.href); // AR
			var platform = getPlatform(window.location.href); // ML
			var hotjarScriptId = mapa[platform][country];
			return hotjarScriptId;

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

function getCountry(url) {
	switch (url.match) {
	    case /com\.ar|\.com\/ar|\.com\/mla/ : return 'AR' 
	    case /com\.br|\.com\/br|\.com\/mlb/ : return 'BR'
	    case /com\.mx|\.com\/mx|\.com\/mlm/ : return 'MX'
	    case /com\.uy|\.com\/uy|\.com\/mlu/ : return 'UY'
			
		default : return 'default'
	}
}

function getPlatform(url) {
	switch (url.match) {
		case /mercadolibre/ :	return 'ML' 
		case /mercadopago/ :	return 'MP'
		case /metroscubicos/ :	return 'MC'
		case /tucarro/ :	return 'TC'
		// hace falta también tu lancha, tu avion, tu moto, tuinmueble?
		//http://www.tuinmueble.com.ve/
		//http://www.tulancha.com.ve/
		//http://www.tuavion.com/
		//no se me ocurre en qué caso devolvería un default : return 'default'
		//metroscubicos tiene el problema de que es .com (pero tiene country_id)
	}
}


