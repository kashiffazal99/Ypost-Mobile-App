appMod.controller('questionCtrl', function($scope,$rootScope,dataServices,$interval) {
	$rootScope.showFooterBtns = true;
	$scope.showPostListLoader = 'false';

	$scope.sendQuestion = function(ques,id){
		$scope.questionModel = "";
		//alert($scope.questionModel);
		var date = dataServices.getCurrentDate();
		var time = dataServices.getCurrentTime();

		//alert(ques+" -- "+id);
		dataServices.getDataFromDB($scope.domainPath+'insert_comments.php?id='+id+'&date='+date+'&time='+time+'&comments='+ques).then(function(res){
			$scope.dataArray = res.data;
			$scope.getData();
		});
	}//end function

	$scope.getData = function(){
		dataServices.getDataFromDB($scope.domainPath+'getAllComments.php?id='+$rootScope.stuDetails.id).then(function(res){
			$scope.dataArray = res.data.reverse();
			$scope.showPostListLoader = 'true';
			$scope.$broadcast('scroll.refreshComplete');
		});
	}//end function
	$scope.getData();
	//Getting Totap Posts
		$interval($scope.getData, 1800000);//check every 30 second

})
