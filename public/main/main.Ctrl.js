(function() {
  'use strict';

  angular
    .module('app')
    .controller('MainCtrl', MainCtrl);

  MainCtrl.$inject = ['$scope', '$localStorage', 'socket', 'lodash'];

  function MainCtrl($scope, $localStorage, socket, lodash) {
    $scope.message = '';
    $scope.users = [];
    $scope.messages = [];
    $scope.mynickname = $localStorage.nickname;
    var nickname = $scope.mynickname;


    socket.on('show-message', function(data) {
      console.log(data);
    });

    socket.emit('get-users');
    socket.emit('get-messages');

    $scope.sendMessage = function(data) {
      var newMessage = {
        message: $scope.message,
        from: nickname
      }
      socket.emit('send-message', newMessage);
      // $scope.messages.push(newMessage);
      $scope.message = '';
    };

    socket.on('all-messages', function(data){
      console.log($scope.messages = data);
    });



    socket.on('all-users', function(data) {
      console.log(data);
      $scope.users = data.filter(function(item) {
        return item.nickname !== nickname;
      });
    });

    socket.on('message-received', function(data) {
      $scope.messages.push(data);
      (function() {
        var audio = new Audio('audio/pop.mp3');
        audio.play();
      })();

    });

    socket.on('update', function(data) {
      $scope.users = [];
      $scope.users = data.filter(function(item) {
        return item.nickname !== nickname;
      });
    });
  };
})();