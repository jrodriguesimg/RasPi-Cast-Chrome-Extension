document.addEventListener('DOMContentLoaded', function() {
	var server;
	var isServerSet = function(){
		if(!server){
			chrome.runtime.openOptionsPage();
		}
	};
	
	chrome.storage.local.get("server", function(result){
		server = result.server;
	});
	
		
	$('#castvid').on('click',function(){ 		chrome.tabs.query(
		 { active: true, lastFocusedWindow: true }, function(tabs) {
			var url = tabs[0].url;
			isServerSet();
			$.post('http://' + server, 
				{'action':'shortcut', 
				'shortcut': 'start',
				'path': url });
		});
	});
	
	
	$('#config').on('click', function() {
		chrome.runtime.openOptionsPage();
	});
	
	setInterval(function(){
		isServerSet();
		$.get('http://' + server, {'json' : '1', 'action':'get-status'}, function(data){
			var status = JSON.parse(data);
			$('#status').text(status.status);
		});
	}, 500);
	
	
	$('#quit').on('click', function(){
		isServerSet();
		$.post('http://' + server, {'action':'shortcut', 'shortcut': 'q'});});
	
	$('#pause').on('click', function(){
		isServerSet();
		$.post('http://' + server, {'action':'shortcut', 'shortcut': 'p'});});
	
	$('#volup').on('click', function(){
		isServerSet();
		$.post('http://' + server, {'action':'shortcut', 'shortcut': '+'});});
	
	$('#voldn').on('click', function(){
		isServerSet();
		$.post('http://' + server, {'action':'shortcut', 'shortcut': '-'});});

}, false);
