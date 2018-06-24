appMod.controller('homeCtrl', function($scope,$rootScope,dataServices,$stateParams,$ionicPush) {
	$rootScope.showFooterBtns = true;





//VideoPlayer.play("file:///android_asset/www/movie.mp4");
/*VideoPlayer.play(
    "file:///android_asset/www/movie.mp4",
    {
        volume: 0.5,
        scalingMode: VideoPlayer.SCALING_MODE.SCALE_TO_FIT_WITH_CROPPING
    },
    function () {
        console.log("video completed");
    },
    function (err) {
        console.log(err);
    }
);
*/



	

	$rootScope.rootStuId = $stateParams.stuId;
	//Getting Student Details by student ID
	dataServices.getDataFromDB($scope.domainPath+"getStudents.php?id="+$rootScope.rootStuId).then(function(res){
		$rootScope.stuDetails = res.data;
		console.log($rootScope.stuDetails);

		//Save Device Token In DB ---------------------------------------//
		$ionicPush.register().then(function(t){
			return $ionicPush.saveToken(t);
		}).then(function(t) {
			//console.log('Token saved:', t.token);
			//alert('Token saved:', t.token);
			dataServices.getDataFromDB($scope.domainPath+"saveDeviceTokenInDB.php?token="+t.token+"&stuRef_id="+$rootScope.stuDetails.id).then(function(res){
				//alert(res.data);
			});//End dataService

		});

		$scope.$on('cloud:push:notification', function(event, data) {
			var msg = data.message;
			//alert(msg.title + ': ' + msg.text);
		});
		//-----------------------------------------------------------------//



		//Getting Total Posts
		dataServices.getDataFromDB($scope.domainPath+"getTotalNumberOfPosts.php?class="+$rootScope.stuDetails.class+"&section="+$rootScope.stuDetails.section+"&shift="+$rootScope.stuDetails.shift+"&campus="+$rootScope.stuDetails.campus).then(function(res){$scope.totalPosts = res.data.trim();});
		//Getting Total Comments
		dataServices.getDataFromDB($scope.domainPath+'getAllComments.php?id='+$rootScope.stuDetails.id).then(function(res){
			$scope.totalComments = res.data.length;
		});
	});
});