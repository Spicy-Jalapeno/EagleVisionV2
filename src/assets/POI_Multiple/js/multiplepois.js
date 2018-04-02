// implementation of AR-Experience (aka "World")
var World = {
	// true once data was fetched
	initiallyLoadedData: false,

	// list of AR.GeoObjects that are currently shown in the scene / World
	markerList: [],

	// Marker Drawables
	markerDrawables: {
		"food": {
			"idle": "assets/marker_food_idle.png",
			"selected": "assets/marker_food_selected.png"
		},
		"bldg": {
			"idle": "assets/marker_bldg_idle.png",
			"selected": "assets/marker_bldg_selected.png"
		}
	},

	// The last selected marker
	currentMarker: null,

	// called to inject new POI data
	loadPoisFromJsonData: function loadPoisFromJsonDataFn(poiData) {
		// empty list of visible markers
		World.markerList = [];

		// start loading marker assets

		// loop through POI-information and create an AR.GeoObject (=Marker) per POI
		for (var currentPlaceNr = 0; currentPlaceNr < poiData.length; currentPlaceNr++) {
			var singlePoi = {
				"id": poiData[currentPlaceNr].id,
				"latitude": parseFloat(poiData[currentPlaceNr].latitude),
				"longitude": parseFloat(poiData[currentPlaceNr].longitude),
				"altitude": parseFloat(poiData[currentPlaceNr].altitude),
				"title": poiData[currentPlaceNr].name,
				"description": poiData[currentPlaceNr].description,
				"category": poiData[currentPlaceNr].category
			};

			/*
				To be able to deselect a marker while the user taps on the empty screen, 
				the World object holds an array that contains each marker.
			*/
			World.markerList.push(new Marker(singlePoi));
		}

		World.updateStatusMessage(currentPlaceNr + ' places loaded');
	},

	// updates status message shon in small "i"-button aligned bottom center
	updateStatusMessage: function updateStatusMessageFn(message, isWarning) {

		var themeToUse = isWarning ? "e" : "c";
		var iconToUse = isWarning ? "alert" : "info";

		$("#status-message").html(message);
		$("#popupInfoButton").buttonMarkup({
			theme: themeToUse
		});
		$("#popupInfoButton").buttonMarkup({
			icon: iconToUse
		});
	},

	// location updates, fired every time you call architectView.setLocation() in native environment
	locationChanged: function locationChangedFn(lat, lon, alt, acc) {

		/*
			The custom function World.onLocationChanged checks with the flag World.initiallyLoadedData if the function was already called. With the first call of World.onLocationChanged an object that contains geo information will be created which will be later used to create a marker using the World.loadPoisFromJsonData function.
		*/
		if (!World.initiallyLoadedData) {
			/* 
				requestDataFromLocal with the geo information as parameters (latitude, longitude) creates different poi data to a random location in the user's vicinity.
			*/
			World.requestDataFromLocal(lat, lon);
			World.initiallyLoadedData = true;
		}
	},

	// fired when user pressed maker in cam
	onMarkerSelected: function onMarkerSelectedFn(marker) {

		// deselect previous marker
		if (World.currentMarker) {
			if (World.currentMarker.poiData.id == marker.poiData.id) {
				return;
			}
			World.currentMarker.setDeselected(World.currentMarker);
		}

		// highlight current one
		marker.setSelected(marker);
		World.currentMarker = marker;
	},

	// screen was clicked but no geo-object was hit
	onScreenClick: function onScreenClickFn() {
		if (World.currentMarker) {
			World.currentMarker.setDeselected(World.currentMarker);
		}
	},

	// request POI data
	requestDataFromLocal: function requestDataFromLocalFn(centerPointLatitude, centerPointLongitude) {
		var poiData = [
			{
				"id": 1,
				"latitude": 26.4641588,
				"longitude": -81.7756809,
				"description": '',
				"altitude": 50.0,
				"name": "Marieb Hall",
				"category": "bldg"
			},
			{
				"id": 2,
				"latitude": 26.4647207,
				"longitude": -81.7763434,
				"description": '',
				"altitude": 50.0,
				"name": "PG4",
				"category": "bldg"
			},
			{
				"id": 3,
				"latitude": 26.4655323,
				"longitude": -81.7757802,
				"description": '',
				"altitude": 50.0,
				"name": "WGCU",
				"category": "bldg"
			},
			{
				"id": 4,
				"latitude": 26.4667928,
				"longitude": -81.7740635,
				"description": '',
				"altitude": 50.0,
				"name": "PG3",
				"category": "bldg"
			},
			{
				"id": 5,
				"latitude": 26.4659685,
				"longitude": -81.7717854,
				"description": '',
				"altitude": 50.0,
				"name": "Cohen Center",
				"category": "bldg"
			},
			{
				"id": 6,
				"latitude": 26.466088,
				"longitude": -81.7719224,
				"description": '',
				"altitude": 50.0,
				"name": "Book Store",
				"category": "bldg"
			},
			{
				"id": 7,
				"latitude": 26.4659668,
				"longitude": -81.7721109,
				"description": '',
				"altitude": 50.0,
				"name": "Einstein Bagels",
				"category": "food"
			},
			{
				"id": 8,
				"latitude": 26.4658581,
				"longitude": -81.7717514,
				"description": '',
				"altitude": 50.0,
				"name": "Papa John's",
				"category": "food"
			},
			{
				"id": 9,
				"latitude": 26.4658659,
				"longitude": -81.7716971,
				"description": '',
				"altitude": 50.0,
				"name": "Chik-Fil-A",
				"category": "food"
			},
			{
				"id": 10,
				"latitude": 26.4658545,
				"longitude": -81.7718949,
				"description": '',
				"altitude": 50.0,
				"name": "Brahma Sushi",
				"category": "food"
			},
			{
				"id": 11,
				"latitude": 26.4657428,
				"longitude": -81.7702275,
				"description": '',
				"altitude": 50.0,
				"name": "PG1",
				"category": "bldg"
			},
			{
				"id": 12,
				"latitude": 26.4634422,
				"longitude": -81.772332,
				"description": '',
				"altitude": 50.0,
				"name": "Library",
				"category": "bldg"
			},
			{
				"id": 13,
				"latitude": 26.4636042,
				"longitude": -81.7725387,
				"description": '',
				"altitude": 50.0,
				"name": "Starbucks",
				"category": "food"
			},
			{
				"id": 14,
				"latitude": 26.4616352,
				"longitude": -81.7714773,
				"description": '',
				"altitude": 50.0,
				"name": "Bower School of Music",
				"category": "bldg"
			},
			{
				"id": 15,
				"latitude": 26.4617445,
				"longitude": -81.7722134,
				"description": '',
				"altitude": 50.0,
				"name": "Arts Complex",
				"category": "bldg"
			},
			{
				"id": 16,
				"latitude": 26.4595038,
				"longitude": -81.7728533,
				"description": '',
				"altitude": 50.0,
				"name": "PG2",
				"category": "bldg"
			},
			{
				"id": 17,
				"latitude": 26.4604244,
				"longitude": -81.7732027,
				"description": '',
				"altitude": 50.0,
				"name": "Health Services",
				"category": "bldg"
			},
			{
				"id": 18,
				"latitude": 26.4614681,
				"longitude": -81.7752924,
				"description": '',
				"altitude": 50.0,
				"name": "University Police",
				"category": "bldg"
			},
			{
				"id": 19,
				"latitude": 26.4623695,
				"longitude": -81.7758022,
				"description": '',
				"altitude": 50.0,
				"name": "Family Resource Center",
				"category": "bldg"
			},
			{
				"id": 20,
				"latitude": 26.4636686,
				"longitude": -81.7766248,
				"description": '',
				"altitude": 50.0,
				"name": "Lutgert Hall",
				"category": "bldg"
			},
			{
				"id": 21,
				"latitude": 26.46347,
				"longitude": -81.7760542,
				"description": '',
				"altitude": 50.0,
				"name": "Dunkin Donuts",
				"category": "food"
			},
			{
				"id": 22,
				"latitude": 26.4636182,
				"longitude": -81.7755593,
				"description": '',
				"altitude": 50.0,
				"name": "Holmes Hall",
				"category": "bldg"
			},
			{
				"id": 23,
				"latitude": 26.4636506,
				"longitude": -81.7750061,
				"description": '',
				"altitude": 50.0,
				"name": "Seidler Hall",
				"category": "bldg"
			},
			{
				"id": 24,
				"latitude": 26.4634561,
				"longitude": -81.7742705,
				"description": '',
				"altitude": 50.0,
				"name": "Egan Observatory",
				"category": "bldg"
			},
			{
				"id": 25,
				"latitude": 26.4638115,
				"longitude": -81.7742175,
				"description": '',
				"altitude": 50.0,
				"name": "Whitaker Hall",
				"category": "bldg"
			},
			{
				"id": 26,
				"latitude": 26.4646069,
				"longitude": -81.7734528,
				"description": '',
				"altitude": 50.0,
				"name": "Griffin Hall",
				"category": "bldg"
			},
			{
				"id": 27,
				"latitude": 26.4598642,
				"longitude": -81.7808863,
				"description": '',
				"altitude": 50.0,
				"name": "Food Forest",
				"category": "bldg"
			},
			{
				"id": 28,
				"latitude": 26.4617681,
				"longitude": -81.7799721,
				"description": '',
				"altitude": 50.0,
				"name": "Welcome Center",
				"category": "bldg"
			}
		];

		// var poisToCreate = 20;
		// for (var i = 0; i < poisToCreate; i++) {
		// 	poiData.push({
		// 		"id": (i + 1),
		// 		"longitude": (centerPointLongitude + (Math.random() / 5 - 0.1)),
		// 		"latitude": (centerPointLatitude + (Math.random() / 5 - 0.1)),
		// 		"description": ("This is the description of POI#" + (i + 1)),
		// 		"altitude": "100.0",
		// 		"name": ("POI#" + (i + 1))
		// 	});
		// }
		World.loadPoisFromJsonData(poiData);
	}

};

/* 
	Set a custom function where location changes are forwarded to. There is also a possibility to set AR.context.onLocationChanged to null. In this case the function will not be called anymore and no further location updates will be received. 
*/
AR.context.onLocationChanged = World.locationChanged;

/*
	To detect clicks where no drawable was hit set a custom function on AR.context.onScreenClick where the currently selected marker is deselected.
*/
AR.context.onScreenClick = World.onScreenClick;