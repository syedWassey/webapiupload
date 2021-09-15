(function(){

  var app = angular.module('notesApp',['ngRoute', 'ngMaterial']);

  app.config(['$locationProvider', '$routeProvider',
      function ($locationProvider, $routeProvider) {

        $routeProvider
          .when('/', {
            templateUrl: '/partials/notes-view.html',
            controller: 'notesController'
          })
          .when('/login', {
             templateUrl: '/partials/login.html',
             controller: 'loginController',
          })
          .otherwise('/');
      }
  ]);

  app.run(['$rootScope', '$location', 'AuthService', function ($rootScope, $location, AuthService) {
      $rootScope.$on('$routeChangeStart', function (event) {

          if ($location.path() == "/login"){
             return;
          }

          if (!AuthService.isLoggedIn()) {
              console.log('DENY');
              event.preventDefault();
              $location.path('/login');             
          }
      });
  }]);


  app.service('AuthService', function($http){
        var loggedUser = null;

        function login (username, password){
            return $http.post("api/login", {username: username, password: password}).then(function(user){
                loggedUser = user;
            }, function(error){
                loggedUser = null;
            })
        }

        function isLoggedIn(){
            return loggedUser != null;
        }
        return {
            login : login,
            isLoggedIn: isLoggedIn
        }
  });

  app.controller('loginController', function($scope, AuthService, $location){

    $scope.invalidCreds = false;
    $scope.login = {
        username : null,
        password : null
    };

    $scope.login = function(){    	
    	if ($scope.myform.username.$error.required || $scope.myform.password.$error.required){
    		alert('User name or password cannot be empty');
    	}else{   		
          AuthService.login($scope.login.username, $scope.login.password).then(function(user){
            console.log(user);
            if(user==null)
            	 $scope.invalidCreds = true;
            $location.path("/");
        }, function(error){
            console.log(error);
            $scope.invalidCreds = true;
        });
      }
    };
    
    
  });
  
  


  app.controller('notesController', function($scope,$http){	  
	  
	  
	$scope.saveNote = function(){		
    	  return $http.post("/addNotes", {noteDate: $scope.saveNote.date, notesSummary: $scope.saveNote.note}).then(function(){
    		  $scope.isEditCreateView = false;
    		  $scope.viewNoteAdded = true;
    		  $scope.viewNotes();
    		  $scope.clearForm();
          }, function(error){
              loggedUser = null;
          })
    };

    $scope.isEditCreateView = false;

    $scope.newNoteView = function(){
        $scope.isEditCreateView = true;
        $scope.viewNoteAdded = false;
    };

    $scope.deleteNote = function (i) {
      var r = confirm("Are you sure you want to delete this note?");
      if (r == true){
        //TODO delete the note
      }
    };

    $scope.viewNotes =function() {
        $http({
            method : 'GET',
            url : 'getNotes'
        }).then(function successCallback(response) {
            $scope.notes = response.data;
        }, function errorCallback(response) {
            console.log(response.statusText);
        });
    }
    
    $scope.clearForm =function() {
        $scope.saveNote.date = "";
        $scope.saveNote.note = "";
        $scope.isEditCreateView = false;             
    };
    
  });
  
  

})();