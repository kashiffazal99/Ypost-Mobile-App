angular.module('starter.service', [])
.service('dataServices', function($http) {

	//GET-Data==========================================================================
		this.getDataFromDB = function(API){
			return $http.get(API).success(function(response){
				//console.log(response);
				var getData = response;
			}).error(function(error){
				console.log(error);
				var getData = error;
			});
			return getData;
		}
	//End-GET-Data======================================================================


		this.getCurrentDate = function(){
			var today = new Date();
			var dd = today.getDate();
			var mm = today.getMonth()+1; //January is 0!
			var yyyy = today.getFullYear();

			if(dd<10) {dd='0'+dd} 
			if(mm<10) {mm='0'+mm} 

			today = dd+'-'+mm+'-'+yyyy;
			return today
		}

		this.getCurrentTime = function(){
			  var date = new Date();
			  var hours = date.getHours();
			  var minutes = date.getMinutes();
			  var second = date.getSeconds();
			  var ampm = hours >= 12 ? 'PM' : 'AM';
			  hours = hours % 12;
			  hours = hours ? hours : 12; // the hour '0' should be '12'
			  minutes = minutes < 10 ? '0'+minutes : minutes;
			  second  = second  < 10 ? '0'+second  : second;
			  var strTime = hours+':'+minutes+':'+second+ ' ' + ampm;
			  return strTime;
		}


});//End service