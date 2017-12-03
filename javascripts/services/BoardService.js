"use strict";

app.service("BoardService", function($http, $q, FIREBASE_CONFIG, PinService) {

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
	            countPinsOnBoard(boards);
	            resolve(boards);
	            // console.log('in getBoards', boards);
	    	}).catch((err) => {
	    		reject(err);
	    	});
	    });
	};

	const countPinsOnBoard = (boardsArray) => {
		let Uid = boardsArray[0].uid;
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
				board.counts = counts[board.boardId] ?  counts[board.boardId] : 0;
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
		let Uid = pinArray[0].uid;
		let boardsArray = [];
		getBoards(Uid).then((results) => {
			boardsArray = results; console.log(" boardsArray: ", results);
			pinArray.forEach(function(pin) {
			    let temp = boardsArray.filter(function(board) {
			    	console.log('board.boardId: ',board.boardId, ' pin.board_id: ', pin.board_id );
			        return board.boardId === pin.board_id;
			    });
			    console.log('temp[0]: ', temp[0]);
			    pin.board = (temp[0] !== undefined) ? temp[0].name : null;
			    console.log('pin.board: ', pin.board);

			});
		// console.log('joinBoards - boardsArray', boardsArray);
		}).catch((err) => {
			console.log("error in joinBoards", err);
		});
	};


	return { getBoards, deleteBoard, putBoard, createNewBoard, joinBoards };

});