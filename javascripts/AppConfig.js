"use strict";

let isAuth = (AuthService) => new Promise ((resolve, reject) => {
	if(AuthService.isAuthenticated()){
		resolve();  // sends true back
	} else {
		reject();  // sends false back
	}
});

app.run(function($location, $rootScope, FIREBASE_CONFIG, AuthService){
	firebase.initializeApp(FIREBASE_CONFIG);


	//watch method that fires on change of a route.  3 inputs. 
  	//event is a change event
  	//currRoute is information about your current route
  	//prevRoute is information about the route you came from
  	$rootScope.$on('$routeChangeStart', function(event, currRoute, prevRoute) { // every time route changes this fires
    	// checks to see if there is a current user
    	var logged = AuthService.isAuthenticated();
    	var appTo;

    	// to keep error from being thrown on page refresh
    	if (currRoute.originalPath) {
      		// check if the user is going to the login page = currRoute.originalPath
      		// if user is on login page then appTo is true
      		// if it finds something other than /login it return a -1 and -1!==-1 so resolves to false
      		// currRoute.originalPath ='/search' -1 != -1 appTo= false 
      		// currRoute.originalPath ='/search' 0 != -1 appTo= true
      		appTo = currRoute.originalPath.indexOf('/login') !== -1;
      	}  
    	//if not on /login page AND not logged in redirect to /login
    	if (!appTo && !logged) {
      		event.preventDefault();
      		$location.path('/login');
    	}
  	});
});

app.config(function($routeProvider){
	$routeProvider
		.when("/login", {
			templateUrl: 'partials/login.html',  
			controller: 'LoginCtrl' 
		})
		.when("/pinterest/view", {
			templateUrl: 'partials/view.html',  
			controller: 'ViewCtrl',
			// resolve:  {isAuth}
		})
		.when("/pinterest/boards", {
			templateUrl: 'partials/boards.html',  
			controller: 'BoardsCtrl',
			// resolve:  {isAuth}
		})
		.when("/pinterest/settings", {
			templateUrl: 'partials/favorites.html',  
			controller: 'ViewCtrl',
			// resolve:  {isAuth}
		})
		.otherwise("/login"); 
});