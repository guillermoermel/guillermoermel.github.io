/*  
    (function(h,o,t,j,a,r){
        h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
        h._hjSettings={hjid:556259,hjsv:5,hjdebug:false};
        a=o.getElementsByTagName('head')[0];
        r=o.createElement('script');r.async=1;
        r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
        a.appendChild(r);
    })(window,document,'//static.hotjar.com/c/hotjar-','.js?sv=');

*/
//console.log('userId: ' + userId);

var userId = readCookie('orguseridp');
var retryCount = 1;
var interval = setInterval(function() {mapHotjarIdToUserId()}, 3000);

function mapHotjarIdToUserId() { 
  //console.log('interval'+interval);
  var hotjarId;

      try {
        //console.log('retryCount'+retryCount);
        hotjarId = hj.pageVisit.property.get('userId').split("-").shift();
        //console.log('hotjarId 1' + hotjarId);
        if (hotjarId) {
          localStorage.hotjarId = hotjarId;
          //console.log("Exito en guardar en Local Storage user de hotjar");
          var data = JSON.stringify({
            "UserId": userId,
            "HotjarUser": hotjarId,
            "HotjarSiteId": hj.settings.site_id.toString()
            });

          console.log('Track this in melidata: ' + data);
          //probably somethink like melidata("add", "user", {"hotjar_id":"7fd50d77"});
          clearInterval(interval);

        }
      }
      catch(e) {
        if (retryCount >= 3) { clearInterval(interval); console.log ('No se reintentará más porque se alcanzó el límite de 3 intentos.')}
        else {window.retryCount++;}
        console.log('retryCount'+retryCount);
        console.log("Error al guardar en Local Storage user de hotjar.");
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
