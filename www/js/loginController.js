
appMod.controller('loginCtrl', function($scope,$rootScope,dataServices,$firebaseArray,$firebaseObject,$ionicSideMenuDelegate,$state,$cordovaFileOpener2,$ionicPlatform){
	//$state.go('app.home',{"stuId":2});

	//Login in from Localstorage
	var stuId = localStorage.getItem("stuId");
	var k = setInterval(function(){
		if($scope.domainPath){
			if(stuId){$state.go('app.home',{"stuId":stuId});}
			clearInterval(k);
		}
		console.log($scope.domainPath);
	},1000);



	$ionicSideMenuDelegate.canDragContent(false);
	$rootScope.showFooterBtns = false;

	//$scope.domainPath = "http://localhost/wli_school_app_web_panel/config/APIs_for_mobile_app/";
	
	$scope.doLogin = function(username,password){
		//alert(username+" - "+password);
		$scope.showLoginLoader = "true";
		//console.log($scope.domainPath+"login_student.php?username="+username+"&password="+password);
		dataServices.getDataFromDB($scope.domainPath+"login_student.php?username="+username+"&password="+password).then(function(res){
			var data = res.data;
			if(data == 'null'){
				alert("Server is not responding (Interval Server Error)");
				$scope.showLoginLoader = "false";
				return true;
			}//End if condition

			if(data.response == "true"){
				var stuId = data.id;
				$scope.errorMsg = "";
				//console.log(res.data);
				//$location.path("/home/stuId");
				$scope.showLoginLoader = "false";
				localStorage.setItem("stuId",stuId);
				//alert(localStorage.getItem("stuId"));
				$state.go('app.home',{"stuId":stuId});
				//window.location = "/app.html#/app/home/"+stuId;
			}else{$scope.errorMsg = data.errorMsg;$scope.showLoginLoader = "false";}
		});//End dataService
	}//End function
	//$scope.goToForgetPassword = function(){window.location = "forgotPassword.html";}






//VideoPlayer.play("http://ypost.wlgseducation.org/uploads/post_data/9361325991-bk-a2.mp4");



 /*var videoUrl = "http://ypost.wlgseducation.org/uploads/post_data/9361325991-bk-a2.mp4";

  // Just play a video
  //window.plugins.streamingMedia.playVideo(videoUrl);

  // Play a video with callbacks
  var options = {
    successCallback: function() {
      console.log("Video was closed without error.");
    },
    errorCallback: function(errMsg) {
      console.log("Error! " + errMsg);
    },
    orientation: 'landscape',
    shouldAutoClose: true,  // true(default)/false
    controls: true // true(default)/false. Used to hide controls on fullscreen
  };
  //window.plugins.streamingMedia.playVideo(videoUrl, options);
  console.log(window.LiveReload.plugins);*/




})
