appMod.controller('postCtrl', function($scope,dataServices,$stateParams,$ionicPlatform, $cordovaMedia,$cordovaFileOpener2,$ionicModal,$sce) {

	$scope.showPostLoader = "false";
	
	var id = $stateParams.postId;
	$scope.type = $stateParams.postType;

	var googleURL_first = "https://docs.google.com/gview?url=";
	var googleURL_lase = "&embedded=true";

	if($scope.type){
		dataServices.getDataFromDB($scope.domainPath+"getPost.php?id="+id).then(function(res){
			$scope.data = res.data[0];
			$scope.url = $sce.trustAsResourceUrl(googleURL_first+$scope.postDataPath+$scope.data.file+googleURL_lase);
			//$scope.url = $sce.trustAsResourceUrl(googleURL_first+"http://app.wlgseducation.org/uploads/post_data/1376911434-danish-c.v--.docx"+googleURL_lase);
			$scope.showPostLoader = "true";
			$scope.resultTitle = false;
		});//End Data Service
	}else{
		//When result page his this post page then $scope.type will be empty
		dataServices.getDataFromDB($scope.domainPath+"getResults.php?id="+id).then(function(res){
			$scope.data = res.data[0];
			$scope.url = $sce.trustAsResourceUrl(googleURL_first+$scope.stuResults+$scope.data.resultFileName+googleURL_lase);
			//$scope.url = $sce.trustAsResourceUrl(googleURL_first+"http://app.wlgseducation.org/uploads/post_data/1376911434-danish-c.v--.docx"+googleURL_lase);
			$scope.showPostLoader = "true";
			$scope.resultTitle = true;
			$scope.type = 'document';
		});//End Data Service
	}//End if condition




 
	$scope.showImages = function() {$scope.showModal('templates/image-popover.html');}
	$scope.showModal = function(templateUrl) {
		$ionicModal.fromTemplateUrl(templateUrl, {
			scope: $scope,
			animation: 'slide-in-up',
			hardwareBackButtonClose: false
		}).then(function(modal) {
			$scope.modal = modal;
			$scope.modal.show();
		});
	}//End Show Modal Function
 
	// Close the modal
	$scope.closeModal = function(mediaPause) {
		$scope.modal.hide();
		$scope.modal.remove();

		if(mediaPause){
			var media = document.getElementById("media");
			media.pause();
		}//End fif condition
	}//End Close Modal Function

	 
	$scope.playVideo = function(src,youtubeUrl) {
		$scope.clipSrc = $sce.trustAsResourceUrl(src);
		$scope.youtubeUrl = $sce.trustAsResourceUrl(youtubeUrl);



		/*$scope.mediaToggle = {
            sources: [
                {
                    src: $scope.clipSrc,
                    type: 'video/mp4'
                }
            ]
        };*/





		$scope.showModal('templates/video-popover.html');
	}//End playVideo

	$scope.playAudio = function(src) {
		$scope.audioSrc = $sce.trustAsResourceUrl(src);


		/*$scope.mediaToggle = {
            sources: [
                {
                    src: $scope.audioSrc,
                    type: 'audio/mpeg'
                }
            ]
        };*/
		
		$scope.showModal('templates/audio-popover.html');
	}//End playVideo


})