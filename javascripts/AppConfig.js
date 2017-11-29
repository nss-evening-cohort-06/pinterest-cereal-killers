"use strict";


let isAuth = (AuthService) => new Promise ((resolve, reject) => {
    if(AuthService.isAuthenticated()){
      resolve();
    } else {
      reject();
    }
  });

// app.run(function($location, $rootScope, FIREBASE_CONFIG, AuthService){
//     firebase.initializeApp(FIREBASE_CONFIG);
    
//     $rootScope.$on('$routeChangeStart', function(event, currRoute, prevRoute) {
//         var logged = AuthService.isAuthenticated();
        
//         var appTo;
    
//         if (currRoute.originalPath) {
//             appTo = currRoute.originalPath.indexOf('/login') !== -1;
//         }
    
//         if (!appTo && !logged) {
//             event.preventDefault();
//             $location.path('/login');
//         }
//     });
// });

app.config(function($routeProvider){
    $routeProvider
        .when("/login", {
            templateUrl: 'partials/login.html',
            controller: 'LoginCtrl'
        })
        .when("/pinterest/boards", {
            templateUrl: 'partials/pinterest/boards.html',
            controller: 'BoardsCtrl',
            // resolve: {isAuth}
        })
        .when("/pinterest/settings", {
            templateUrl: 'partials/pinterest/settings.html',
            controller: 'SettingsCtrl',
            // resolve: '{isAuth}'
        })
        .when("/pinterest/view", {
            templateUrl: 'partials/pinterest/view.html',
            controller: 'ViewCtrl',
            // resolve: '{isAuth}'
        })
        .when("/pinterest/editBoard/:id", {
            templateUrl: 'partials/boardsNew.html',
            controller: 'BoardsNewCtrl',
            resolve: {isAuth}
        })
        .otherwise('/login');
});

