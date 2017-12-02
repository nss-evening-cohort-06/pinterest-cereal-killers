"use strict";

app.service("BoardService", function($http, $q, FIREBASE_CONFIG) {

	const getBoards = (userUid) => {
	    let boards = [];
	    return $q((resolve, reject) => { 
	    	$http.get(`${FIREBASE_CONFIG.databaseURL}/boards.json?orderBy="uid"&equalTo="${userUid}"`).then((results) => {
	            let myBoards = results.data; 
	            // console.log('in getBoards', myBoards);
	            Object.keys(myBoards).forEach((key) => {
	                myBoards[key].id = key; 
	                boards.push(myBoards[key]);
	            });
	            resolve(boards);
	            // console.log('in getBoards', boards);
	    	}).catch((err) => {
	    		reject(err);
	    	});
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
		let Uid = pinArray[0].uid;
		let boardsArray = [];
		getBoards(Uid).then((results) => {
			boardsArray = results;
			pinArray.forEach(function(pin) {
			    let temp = boardsArray.filter(function(board) {
			        return board.boardId === pin.board_id;
			    });
			    pin.board = (temp[0] !== undefined) ? temp[0].name : null;
			});
		// console.log('joinBoards - boardsArray', boardsArray);
		}).catch((err) => {
			console.log("error in joinBoards", err);
		});
	};


	return { getBoards, deleteBoard, putBoard, createNewBoard, joinBoards };

});