document.addEventListener('DOMContentLoaded', 
	function(){
		$('#save').on('click', function(){
			var server = $('#server').val();
			
			chrome.storage.local.set({"server":server}, function(){
				$('#saved').html('saved');
				setTimeout(function(){ 
					$('#saved').html(''); }, 3000);
			});
		});
		
		chrome.storage.local.get("server", function(result){
			$('#server').val(result.server);
		});
	}, false);