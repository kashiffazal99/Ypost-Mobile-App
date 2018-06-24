var appMod = angular.module('starter.controllers', [])
 
// .directive('scrollHeight', function($window) {
//   return {
//     link: function(scope, element, attrs) {
//       scope.onResize = function() {
//         var winHeight = $window.innerHeight;
//         var form = angular.element(document.querySelector('.login-form'))[0];
//         var formHeight = form.scrollHeight;
//         var scrollHeight = winHeight - formHeight;

//         element.css("height", scrollHeight + "px");
//       }
//       scope.onResize();

//       angular.element($window).bind('resize',  unction() {
//         scope.onResize();
//       })
//     }
//   }
// })

.controller('AppCtrl', function($scope,$rootScope,$ionicModal,$timeout,dataServices,$firebaseObject,$state,$ionicModal,$window) {
	

    $scope.getBrandData = function(){dataServices.getDataFromDB($scope.jsonPath+"/brand.json?k="+Math.random()).then(function(res){$scope.brandData = res.data[0];});}//End function
	$scope.getOtherProjectsFun = function(){dataServices.getDataFromDB($scope.jsonPath+"/otherProjects.json?k="+Math.random()).then(function(res){$scope.otherPro = res.data;});}
	$scope.getFounderDirectorFun = function(){dataServices.getDataFromDB($scope.jsonPath+"/founder.json?k="+Math.random()).then(function(res){$scope.aboutUsData = res.data[0];});}

	//Getting Data From External Server ----------------------
	var ref = firebase.database().ref().child("connections").child("wli_mobile_and_web_app");
	$scope.fireServerData = syncObject = $firebaseObject(ref);
	ref.on("value", function(snapshot) {$scope.$apply(function() {
		$scope.fireServerDataBlocked = snapshot.val();
		$scope.domainPath = $scope.fireServerDataBlocked.domainPath;
		$scope.stuImgFolderPath = $scope.fireServerDataBlocked.stuImgFolderPath;
		$scope.postDataPath = $scope.fireServerDataBlocked.postDataPath;
		$scope.stuResults = $scope.fireServerDataBlocked.stuResults;
		$scope.jsonPath = $scope.fireServerDataBlocked.jsonPath;
		console.log($scope.jsonPath);
		$scope.getBrandData();
		$scope.getOtherProjectsFun();
		$scope.getFounderDirectorFun();
	});});
	//Getting Data From External Server ----------------------

	$rootScope.showFooterBtns = true;


    /*$scope.domainPath = "http://localhost/wli_school_app_web_panel/original/config/APIs_for_mobile_app/";
    $scope.stuImgFolderPath = "http://localhost/wli_school_app_web_panel/original/uploads/student_images/";
    $scope.postDataPath = "http://localhost/wli_school_app_web_panel/original/uploads/post_data/";
    $scope.stuResults = "http://localhost/wli_school_app_web_panel/original/uploads/student_results/";
    $scope.jsonPath = "http://localhost/wli_school_app_web_panel/original/js/JSON/";
	$scope.getBrandData();
	$scope.getOtherProjectsFun();
	$scope.getFounderDirectorFun();*/

  $scope.logOut = function(id){
  	//Update student login status to logout
	dataServices.getDataFromDB($scope.domainPath+"logout_student.php?id="+id).then(function(res){});//End dataService
	$state.go('app.login');
	$rootScope.showFooterBtns = false;
	$rootScope.stuDetails = '';
	localStorage.clear();//Clear localstorage for student login
  }//End function




  	$scope.getLocationFun = function(){
  		var k = Math.random();
		dataServices.getDataFromDB($scope.jsonPath+"loactionsJSON.json?k="+k).then(function(res){
			$scope.location = res.data;
		});//End dataService
	}

	$scope.getFaqsFun = function(){
		var k = Math.random();
		dataServices.getDataFromDB($scope.jsonPath+"faqsJSON.json?k="+k).then(function(res){
			$scope.faqsData = res.data;
			//console.log(res.data);

			$scope.showListAnsware = function(index){
				$scope.question = $scope.faqsData[index]['Question'];
				$scope.answer = $scope.faqsData[index]['Answer'];
				$scope.showDetails = true;
			}//End function

			$scope.changeShowDetails = function(){
				$scope.showDetails = false;
			}//End function

		});//End dataService		
	}


	




	$scope.showModal = function(templateUrl) {
		$ionicModal.fromTemplateUrl(templateUrl, {
			scope: $scope,
			animation: 'slide-in-up'
		}).then(function(modal) {
			$scope.modal = modal;
			$scope.modal.show();
		});
	}//End Show Modal Function


	// Close the modal
	$scope.closeModal = function() {
		$scope.modal.hide();
		//$scope.modal.remove();
	}//End Close Modal Function




	$scope.gotoLink = function(pageName){
		window.open(pageName, '_system', 'location=yes'); return false;
	}
	 



	


})






