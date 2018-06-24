appMod.controller('forgetPasswordCtrl', function($scope,$rootScope,dataServices,$firebaseObject) {

//$scope.domainPath = "http://localhost/wli_school_app_web_panel/config/APIs_for_mobile_app/";


	$rootScope.showResetPassFields = false;
	$scope.passReset = function(username,phone_number){
		dataServices.getDataFromDB($scope.domainPath+"checkRegPhoneForForgotPassword.php?username="+username+"&phone_number="+phone_number).then(function(res){
			var data = res.data;
			console.log(data);
			if(data['response'] == "true"){$scope.showResetPassFields = true;$scope.msg = "";$scope.stuId = data['id'];
			}else{$scope.showResetPassFields = false;$scope.msg = data['errorMsg'];}
		});//End dataService
	}//End function

	$scope.changePassword = function(password,confirmPassword){
		if(password != confirmPassword){$scope.msg = "Password did not match";return false;}else{$scope.msg = "";}
		if(password.length < 6){$scope.msg = "Please type more than 6 character";return false;}else{$scope.msg = "";}

		dataServices.getDataFromDB($scope.domainPath+"updatePassword.php?password="+password+"&id="+$scope.stuId).then(function(res){
			var data = res.data;
			console.log(data);
			if(data['response'] == "true"){
				$scope.msgSuccess = data['msg'];
				//dddddd
			}else{$scope.msgError = data['errorMsg'];}
		});//End dataService

	}//End function


	$scope.goLoginPage = function(){window.location = "index.html";}//End function


})

