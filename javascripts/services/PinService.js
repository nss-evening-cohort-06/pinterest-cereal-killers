"use strict";

app.service("PinService", function($http, $q, FIREBASE_CONFIG) {

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


	const putBoard = (existingBoard) => { // firebase returns id when post is successfull
		let boardId = existingBoard.id;
		delete existingBoard.id;
		delete existingBoard.$$hashKey;
		return $http.put(`${FIREBASE_CONFIG.databaseURL}/boards/${boardId}.json`, JSON.stringify(existingBoard));
	};

	const postNewContact = (newContact) => { // firebase returns id when post is successfull
		return $http.post(`${FIREBASE_CONFIG.databaseURL}/contacts.json`, JSON.stringify(newContact));
	};


	const deleteBoard = (boardId) => {
		return $http.delete(`${FIREBASE_CONFIG.databaseURL}/boards/${boardId}.json`);
	};

	return { getBoards, postNewContact, deleteBoard, putBoard };
}); 