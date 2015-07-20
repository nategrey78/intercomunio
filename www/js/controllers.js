angular.module('starter.controllers', [])

  .controller('AppCtrl', function ($scope, $ionicModal, $timeout) {

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  // Form data for the login modal
  $scope.loginData = {};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function (modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function () {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function () {
    $scope.modal.show();
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function () {
    console.log('Doing login', $scope.loginData);

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function () {
      $scope.closeLogin();
    }, 1000);
  };
})

  .controller('ClasificacionCtrl', function ($scope, servicePlayer) {
  $scope.jugadores = servicePlayer.getListaJugadores();

  $scope.calculaPuntos = function (jugador) {
    return servicePlayer.getPuntosTotales(jugador);
  };

})
  .controller('JugadorCtrl', function ($scope, $stateParams, servicePlayer, $state) {
    
  //$scope.player=jugador;
  $scope.player = servicePlayer.getPlayer($stateParams.jugadorId);
  console.log("id del jugador: " + $stateParams.jugadorId);
  console.log($scope.player);
  $scope.getPuntos = function () {
    return servicePlayer.getPuntosTotales($scope.player);
  };
  $scope.getClassPuntuacion = function (puntos) {
    if (puntos < 20) {
      return "badge-calm";
    } else if (puntos < 30) {
      return "badge-balanced";
    } else if (puntos < 40) {
      return "badge-energized";
    } else {
      return "badge-royal";
    }
  };

  $scope.addPuntuacion = function () {
    $state.go("app.puntuacion", { jugadorId: $scope.player.$id });
  }

}).controller('addPuntosCtrl', function ($scope, $stateParams, servicePlayer, $state) {

  $scope.player = servicePlayer.getPlayer($stateParams.jugadorId);
   console.log("id del jugador22: " + $stateParams.jugadorId);
  console.log($scope.player);
  $scope.jornadas = [];
  $scope.puntuacion = {};
  for (var i = 1; i <= 38; i++) {
    if (servicePlayer.notJornada($scope.player, i)) {
      $scope.jornadas.push(i);
    }

  }
  $scope.addPuntuacion = function () {
    servicePlayer.addPuntuacion($scope.player, $scope.puntuacion);
  };

}).controller('createCtrl', function ($scope, $stateParams, servicePlayer, $state, $ionicHistory) {

  $scope.jugador = {};

  $scope.addPlayer = function () {
    servicePlayer.addPlayer($scope.jugador.nombre);
    $ionicHistory.nextViewOptions({
      disableBack: true
    });
    $state.go("app.clasificacion");
  };

});
