"use strict";

app.service("BoardService", function($http, $q, $rootScope, FIREBASE_CONFIG, PinService) {

	const getBoards = (userUid) => {
	    let boards = [];
	    return $q((resolve, reject) => { 
	    	$http.get(`${FIREBASE_CONFIG.databaseURL}/boards.json?orderBy="uid"&equalTo="${userUid}"`).then((results) => {
	            let myBoards = results.data; 
	            Object.keys(myBoards).forEach((key) => {
	                myBoards[key].id = key; 
	                boards.push(myBoards[key]);
	            });
	            // countPinsOnBoard(boards);
	            resolve(countPinsOnBoard(boards));
	    	}).catch((err) => {
	    		reject(err);
	    	});
	    }); 
	};

	const countPinsOnBoard = (boardsArray) => {
		let Uid = $rootScope.uid;
		let pinBoardArray = [];
		let tempArray = [];
		var counts = {};

		PinService.getAllPins(Uid).then((results) => {
			pinBoardArray = results;
			pinBoardArray.forEach(function(pin) {
				tempArray.push(pin.board_id);
			});

			for (let i = 0; i < tempArray.length; i++) {
			  let num = tempArray[i];
			  counts[num] = counts[num] ? counts[num] + 1 : 1;
			}

			boardsArray.forEach(function(board) {
				board.counts = counts[board.id] ?  counts[board.id] : 0;
			});


		}).catch((err) => {
			console.log("error in getPins", err);
		});
	};


	const deleteBoard = (boardId) => {
		return $http.delete(`${FIREBASE_CONFIG.databaseURL}/boards/${boardId}.json`);
	};

	const putBoard = (existingBoard) => { // firebase returns id when post is successfull
		let boardId = existingBoard.id;
		delete existingBoard.id;
		delete existingBoard.$$hashKey;
		return $http.put(`${FIREBASE_CONFIG.databaseURL}/boards/${boardId}.json`, JSON.stringify(existingBoard));
	};

	const createNewBoard = (newBoard) => { // firebase returns id when post is successfull
		return $http.post(`${FIREBASE_CONFIG.databaseURL}/boards.json`, JSON.stringify(newBoard));
	};


	const joinBoards = (pinArray) => {
		let Uid = $rootScope.uid;
		let boardsArray = [];
		getBoards(Uid).then((results) => {
			pinArray.forEach(function(pin) {
			    let temp = boardsArray.filter(function(board) {
			    	
			        return board.id === pin.board_id;
			    });
			    pin.board = (temp[0] !== undefined) ? temp[0].name : null;
			    
			});
		}).catch((err) => {
			console.log("error in joinBoards", err);
		});
	};


	return { getBoards, deleteBoard, putBoard, createNewBoard, joinBoards };

});