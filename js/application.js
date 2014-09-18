window.addEventListener('load', function() {
var key ='mylist';
var appCache = window.applicationCache;
var div = document.getElementById('go');

div.addEventListener('click', handleDivClick, false);	  
	  
	  
function handleCacheEvent(e) {
  //alert('handleCacheEvent');
}

function handleCacheError(e) {
  alert('Error: Cache failed to update!');
};

function handleCacheUpdateReadyEvent(e) {
  //llamar swapcache para evitar tener que dar reload para ver los cambios que se les hicieron un nuevo cached
  appCache.swapCache();
  window.navigator.reload();
}

// Fired after the first cache of the manifest.
appCache.addEventListener('cached', handleCacheEvent, false);

// Checking for an update. Always the first event fired in the sequence.
appCache.addEventListener('checking', handleCacheEvent, false);

// An update was found. The browser is fetching resources.
appCache.addEventListener('downloading', handleCacheEvent, false);

// The manifest returns 404 or 410, the download failed,
// or the manifest changed while the download was in progress.
appCache.addEventListener('error', handleCacheError, false);

// Fired after the first download of the manifest.
appCache.addEventListener('noupdate', handleCacheEvent, false);

// Fired if the manifest file returns a 404 or 410.
// This results in the application cache being deleted.
appCache.addEventListener('obsolete', handleCacheEvent, false);

// Fired for each resource listed in the manifest as it is being fetched.
appCache.addEventListener('progress', handleCacheEvent, false);

// Fired when the manifest resources have been newly redownloaded.
appCache.addEventListener('updateready', handleCacheUpdateReadyEvent, false);	  
		 



//appCache.update();






switch (appCache.status) {
  case appCache.UNCACHED: // UNCACHED == 0
    return 'UNCACHED';
    break;
  case appCache.IDLE: // IDLE == 1
    return 'IDLE';
    break;
  case appCache.CHECKING: // CHECKING == 2
    return 'CHECKING';
    break;
  case appCache.DOWNLOADING: // DOWNLOADING == 3
    return 'DOWNLOADING';
    break;
  case appCache.UPDATEREADY:  // UPDATEREADY == 4
    return 'UPDATEREADY';
    break;
  case appCache.OBSOLETE: // OBSOLETE == 5
    return 'OBSOLETE';
    break;
  default:
    return 'UKNOWN CACHE STATUS';
    break;
};





function handleDivClick(e) {
	e.stopImmediatePropagation();
	e.preventDefault();		
	if (navigator.onLine){			
		var getListado = 'http://tisew.cloudapp.net/simpleWCFRest/MyService.svc/ListadoX';

		$.ajax(getListado,
		{
			beforeSend: function (xhr) {
				// $.mobile.showPageLoadingMsg();
			},

			complete: function () {
				// $.mobile.hidePageLoadingMsg();
			},
			contentType: 'application/json',
			dataType: 'jsonp',
			jsonp: 'callback',
			type: 'GET',
			error: function (xhr, ajaxOptions, thrownError) {
				alert(xhr.status);
				alert(xhr.responseText);
				//alert(thrownError);
			},
			success: function (data) {
				var result = data.GetListadoXResult;
				
				$('#milistado').empty();
				var html = '';
				$.each(result, function (index, milista) {
					html += '<li>' + milista + '</li>';
				});
				updatelist(html);
				//update the localstorage with the list just received
				localStorage.setItem(key,html);
			 //end of success return call			
			}
		});			
	} else {
		var html = localStorage.getItem(key);
		if (html ===null){
			html = '<li>Offline:No Data!</li>';
			updatelist(html);
		}else {
			//actualiza el contenido con lo que esté en el localstorage para esta lista con la llave especificada
			html = '<li>**Offline**</li>' + html;
			updatelist(html);
		}
	
	}
}

function updatelist(html){
	document.getElementById('milistado').innerHTML = html;
}


		  
	}, false);
	




		