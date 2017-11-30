"use strict";

app.service("PinService", function($http, $q, FIREBASE_CONFIG) {

	const createPinObject = (newpin) => {
		return {
			"board": newpin.board,
			"title": newpin.title,
			"url": newpin.url,
			"notes": newpin.notes,
			"datePinned": newpin.datePinned,
			"user_id": "fasdfasdfafas313123xxs",
		};
	};

	const getBoards = (userUid) => {
	    let boards = [];
	    return $q((resolve, reject) => { 
	    	$http.get(`${FIREBASE_CONFIG.databaseURL}/boards.json?orderBy="uid"&equalTo="${userUid}"`).then((results) => {
	            let myBoards = results.data;
	            Object.keys(myBoards).forEach((key) => {
	                myBoards[key].id = key; 
	                boards.push(myBoards[key]);
	            });
	            resolve(boards);
	    	}).catch((err) => {
	    		reject(err);
	    	});
	    });
	};


	const deleteBoard = (boardId) => {
		return $http.delete(`${FIREBASE_CONFIG.databaseURL}/boards/${boardId}.json`);
	};


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

	const addNewPin = (newPin) => {
		return $http.post(`${FIREBASE_CONFIG.databaseURL}/pins.json`, JSON.stringify(newPin));
	};

	const deletePin = (pinId) => {
		return $http.delete(`${FIREBASE_CONFIG.databaseURL}/pins/${pinId}.json`);
	};

	const updatePin = (updatedPin, pinId) => {
		return $http.put(`${FIREBASE_CONFIG.databaseURL}/pins/${pinId}.json`, JSON.stringify(updatedPin));
	};

	const getSinglePin = (pinId) => {
		return $http.get(`${FIREBASE_CONFIG.databaseURL}/pins/${pinId}.json`);
	};
    
    const addNewAvatar = (newAvatar) => {
		return $http.post(`${FIREBASE_CONFIG.databaseURL}/avatars.json`, JSON.stringify(newAvatar));
    };
    
return {getBoards, deleteBoard, getAllPins, addNewPin, deletePin, updatePin, getSinglePin, createPinObject, addNewAvatar};

});
