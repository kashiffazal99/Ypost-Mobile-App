  // Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers','starter.service','ngCordova','firebase','ngSanitize','ionic.cloud','vjs.video'])

.run(function($ionicPlatform,$ionicPopup,$ionicHistory) {

// To Conditionally Disable Back
$ionicPlatform.registerBackButtonAction(function(){
  //alert($ionicHistory.currentStateName());  
  if($ionicHistory.currentStateName() === 'app.home'){
    event.preventDefault();
  }else{
    $ionicHistory.goBack();
  }
}, 100);



  
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }


   // Check for network connection
    if(window.Connection) {
      if(navigator.connection.type == Connection.NONE) {
        $ionicPopup.confirm({
          title: 'No Internet Connection',
          content: 'Sorry, no Internet connectivity detected. Please reconnect and try again.'
        })
        .then(function(result) {
          if(!result) {
            ionic.Platform.exitApp();
          }
        });
      }
    }



    
  });//End $ionicPlatform.ready


})//End Run

// .filter('reverse', function() {
//   return function(items) {
//     return items.slice().reverse();
//   };
// })

.config(function($stateProvider, $urlRouterProvider,$ionicCloudProvider) {



  $ionicCloudProvider.init({
    "core": {
      "app_id": "8af8e422"
    },
    "push": {
      "sender_id": "1044509584634",
      "pluginConfig": {
        "ios": {
          "badge": true,
          "sound": true
        },
        "android": {
          "iconColor": "#343434"
        }
      }
    }
  });








  $stateProvider
 
  .state('app', {
    url: '/app',
    abstract: true,
    templateUrl: 'templates/menu.html',
    controller: 'AppCtrl'
  })

  .state('app.login', {
    url: '/login',
    views: {
      'menuContent': {
        templateUrl: 'templates/login.html',
        controller: 'loginCtrl'
      }
    }
  })



  .state('app.forgotPassword', {
    url: '/forgotPassword',
    views: {
      'menuContent': {
        templateUrl: 'templates/forgotPassword.html',
        controller: 'forgetPasswordCtrl'
      }
    }
  })

  .state('app.home', {
    url: '/home/:stuId',
    views: {
      'menuContent': {
        templateUrl: 'templates/home.html',
        controller: 'homeCtrl'
      }
    }
  })



  .state('app.videoPost', {
    url: '/videoPost',
    views: {
      'menuContent': {
        templateUrl: 'templates/videoPost.html',
        controller: 'videoPostCtrl'
      }
    }
  })

  .state('app.audioPost', {
    url: '/audioPost',
    views: {
      'menuContent': {
        templateUrl: 'templates/audioPost.html',
        controller: 'audioPostCtrl'
      }
    }
  })


.state('app.documentPost', {
    url: '/documentPost',
    views: {
      'menuContent': {
        templateUrl: 'templates/documentPost.html',
        controller: 'documentsPostCtrl'
      }
    }
  })
.state('app.otherPost', {
    url: '/otherPost',
    views: {
      'menuContent': {
        templateUrl: 'templates/otherPost.html',
        controller: 'otherPostCtrl'
      }
    }
  })

.state('app.post', {
    url: '/post/:postId/:postType',
    views: {
      'menuContent': {
        templateUrl: 'templates/post.html',
        controller: 'postCtrl'
      }
    }
  })

  .state('app.announcement', {
    url: '/announcement',
    views: {
      'menuContent': {
        templateUrl: 'templates/announcement.html',
        controller: 'announcementCtrl'
      }
    }
  })

  .state('app.circular', {
    url: '/circular',
    views: {
      'menuContent': {
        templateUrl: 'templates/circular.html',
        controller: 'circularCtrl'
      }
    }
  })

  .state('app.updates', {
    url: '/updates',
    views: {
      'menuContent': {
        templateUrl: 'templates/updates.html',
        controller: 'updatesCtrl'
      }
    }
  })

  .state('app.results', {
    url: '/results',
    views: {
      'menuContent': {
        templateUrl: 'templates/results.html',
        controller: 'resultsCtrl'
      }
    }
  })

  .state('app.question', {
    url: '/question',
    views: {
      'menuContent': {
        templateUrl: 'templates/question.html',
        controller: 'questionCtrl'
      }
    }
  })

  .state('app.miscellaneous', {
    url: '/miscellaneous',
    views: {
      'menuContent': {
        templateUrl: 'templates/miscellaneous.html',
        controller: 'miscellaneousCtrl'
      }
    }
  });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/login');
});
