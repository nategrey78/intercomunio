angular.module('starter.services', ['firebase'])

	.factory('servicePlayer', function ($firebaseArray) {
	
	var  ref = new Firebase("https://blinding-inferno-6858.firebaseio.com/");
	ref.orderByChild("id");
	var mockData = [
		{
			nombre: 'Reggae',
			id: 1,
			puntuacion: [
				{
					jornada: '1',
					puntos: 1
				}, {
					jornada: '2',
					puntos: 2
				}
			]
		},
		{
			nombre: 'Chill',
			id: 2,
			puntuacion: [
				{
					jornada: '1',
					puntos: 34
				}, {
					jornada: '2',
					puntos: 54
				}
			]
		},
		{
			nombre: 'Dubstep',
			id: 3,
			puntuacion: [
				{
					jornada: '1',
					puntos: 12
				}, {
					jornada: '2',
					puntos: 23
				}
			]
		},
		{
			nombre: 'Indie',
			id: 4,
			puntuacion: [
				{
					jornada: '1',
					puntos: 45
				}, {
					jornada: '2',
					puntos: 3
				}
			]
		},
		{
			nombre: 'Rap',
			id: 5,
			puntuacion: [
				{
					jornada: '1',
					puntos: 89
				}, {
					jornada: '2',
					puntos: 12
				}
			]
		},
		{
			nombre: 'Cowbell',
			id: 6,
			puntuacion: [
				{
					jornada: '1',
					puntos: 32
				}, {
					jornada: '2',
					puntos: 46
				}
			]
		}
	];
	
	
	var _data = ref.child("players");
	var listaDatos= $firebaseArray(new Firebase("https://blinding-inferno-6858.firebaseio.com/players"));
	var idMax = 7;

	return {
		getPuntosTotales: function (jugador) {
			if ((jugador.puntuacion) && (jugador.puntuacion.length > 0)) {
				var total = 0;
				for (var i = 0; i < jugador.puntuacion.length; i++) {
					total = total + jugador.puntuacion[i].puntos;
				}
				return total;
			}
			return -1;
		},
		getListaJugadores: function name() {
			console.log(listaDatos);
			return listaDatos;
		},
		addPlayer: function (nombreJugador) {
			var aux = {				
					nombre: nombreJugador,				
					puntuacion: []				
			};
			idMax = idMax + 1;
			_data.child(idMax).set(aux);			
		},
		getPlayer: function (idJugador) {				
			for (var i = 0; i < listaDatos.length; i++) {
				console.log(listaDatos[i].$id);	
				console.log(idJugador);
				if (idJugador == listaDatos[i].$id) {					
					return listaDatos[i];
				}
			}
		},
		notJornada: function (jugador, jornada) {
			if ((jugador.puntuacion) && (jugador.puntuacion.length > 0)) {
				for (var i = 0; i < jugador.puntuacion.length; i++) {
					if (jugador.puntuacion[i].jornada == jornada) {
						return false;
					}
				}
			}
			return true;
		},
		addPuntuacion: function (jugador, jornada) {
			if ((!jugador.puntuacion) || (jugador.puntuacion.length == 0)) {
				jugador.puntuacion = [];
			}
			console.log(jornada);
			
			jugador.puntuacion.push(jornada);
			console.log(jugador);
			_data.child(jugador.$id).update(jugador.puntuacion);
		}
	};
});