"use strict";

app.service("PinService", function($http, $q, FIREBASE_CONFIG) {

	const getAllPins = (userUid) => {
		let pinArray = [];
		return $q ((resolve, reject) => {
			$http.get(`${FIREBASE_CONFIG.databaseURL}/pins.json?orderBy="uid"&equalTo="${userUid}"`).then((results) => {
				let pins = results.data;
				console.log(pins);
				Object.keys(pins).forEach((key) => {
					pins[key].id = key;
					pinArray.push(pins[key]);
					});
					
					resolve(pinArray);			
						
					
			}).catch((err) => {
				console.log("error in getAllPins", err);
			});
		});
	};


return {getAllPins};

});
