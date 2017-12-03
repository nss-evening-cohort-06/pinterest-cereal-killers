"use strict";

app.service("SettingsService", function($http, $q, FIREBASE_CONFIG) {

    const getUsersFromFirebase = (userUid) => {
		let users = [];
    return $q((resolve, reject) => {
      $http.get(`${FIREBASE_CONFIG.databaseURL}/users.json?orderBy="uid"&equalTo="${userUid}"`).then((results) => {
        let fbUsers = results.data;
        Object.keys(fbUsers).forEach((key) => {
          fbUsers[key].id = key;
            users.push(fbUsers[key]);
        });
        resolve(users);
      }).catch((err) => {
        reject(err);
      });
    });
  };

    const getAvatarsFromFirebase = (avatarId) => {
		let avatars = [];
    return $q((resolve, reject) => {
      $http.get(`${FIREBASE_CONFIG.databaseURL}/avatars.json?orderBy="uid"&equalTo="${avatarId}"`).then((results) => {
        let fbAvatars = results.data;
        Object.keys(fbAvatars).forEach((key) => {
          fbAvatars[key].id = key;
            avatars.push(fbAvatars[key]);
        });
        resolve(avatars);
      }).catch((err) => {
        reject(err);
      });
    });
  };

    const postNewUser = (newUser) => {
        console.log(newUser);
        return $http.post(`${FIREBASE_CONFIG.databaseURL}/users.json`, JSON.stringify(newUser));
    };

    const updateUser = (userId, user) => {
		return $http.put(`${FIREBASE_CONFIG.databaseURL}/users/${userId}.json`, JSON.stringify(user));
    };

    const getSingleUser= (userId) => {
        return $http.get(`${FIREBASE_CONFIG.databaseURL}/users/${userId}.json`);
    };


    const createUserObject = (user) => {
        return {
          "userId": user.userId,
          "uid": user.uid,
          "userName": user.userName,
          "firstName": user.firstName,
          "lastName": user.lastName,
          "bio": user.bio,
          "avatar_id": user.userName,
        };
      };

    const addNewAvatar = (newAvatar) => {
	    return $http.post(`${FIREBASE_CONFIG.databaseURL}/avatars.json`, JSON.stringify(newAvatar));
    };

      return {postNewUser, updateUser, addNewAvatar, getSingleUser, getAvatarsFromFirebase};
});

