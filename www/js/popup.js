// RasPi-Cast-Chrome-Extension
// Copyright (C) 2015 Walter Harvey

// This program is free software; you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation; either version 2 of the License, or
// (at your option) any later version.

// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.

// You should have received a copy of the GNU General Public License along
// with this program; if not, write to the Free Software Foundation, Inc.,
// 51 Franklin Street, Fifth Floor, Boston, MA 02110-1301 USA.


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
