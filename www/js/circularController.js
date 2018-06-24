appMod.controller('circularCtrl', function($scope,$rootScope,dataServices,$interval) {
	$scope.showPostListLoader = "false";
	$scope.getPostData = function(){
			$scope.dataArray = "";
			dataServices.getDataFromDB($scope.domainPath+"getPost.php?type=other&category=Circular&class="+$rootScope.stuDetails.class+"&section="+$rootScope.stuDetails.section+"&shift="+$rootScope.stuDetails.shift+"&campus="+$rootScope.stuDetails.campus).then(function(res){
					$scope.dataArray = res.data.reverse();
					$scope.showPostListLoader = "true";
					$scope.$broadcast('scroll.refreshComplete');
			})
		;}
	$scope.getPostData();
	//$interval($scope.getPostData, 90000);
});