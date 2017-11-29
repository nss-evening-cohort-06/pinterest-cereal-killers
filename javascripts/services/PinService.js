"use strict";

app.service("PinService", function($http, $q, FIREBASE_CONFIG) {

	const getAllPins = (userUid) => {
		let pinArray = [];
		return $q ((resolve, reject) => {
			$http.get(`${FIREBASE_CONFIG.databaseURL}/pko.json?orderBy="pinId"&equalTo="${userUid}"`).then((results) => {
				let pins = results.data;
				Object.keys(pins).forEach((key) => {
					pins[key].id = key;
					pinArray.push(pins[key]);
					});
					
					resolve(pinArray);			
					console.log(pinArray);	
					
			}).catch((err) => {
				console.log("error in getAllThePins", err);
			});
		});
	};


return {getAllPins};

});
