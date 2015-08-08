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