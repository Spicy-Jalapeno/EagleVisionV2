// implementation of AR-Experience (aka "World")
var World = {
	// you may request new data from server periodically, however: in this sample data is only requested once
	isRequestingData: false,

	// true once data was fetched
	initiallyLoadedData: false,

	//different POI-Marker assets

	// list of AR.GeoObjects that are currently shown in the scene / World
	markerList: [],

	// The last selected marker
	currentMarker: null,

	// called to inject new POI data
	loadPoisFromJsonData: function loadPoisFromJsonDataFn(poiData) {

		// $('#back').click(function() { //back button
			
		// });

		// empty list of visible markers
		World.allMarker = []; //hold a list of all markers
		World.markerList = [];
		World.markerDrawable = {"idle": {}, "selected": {}};

		World.markerDrawable.idle["bldg"] = new AR.ImageResource("assets/marker_bldg_idle.png")
		World.markerDrawable.selected["bldg"] = new AR.ImageResource("assets/marker_bldg_selected.png")
		World.markerDrawable.idle["food"] = new AR.ImageResource("assets/marker_food_idle.png")
		World.markerDrawable.selected["food"] = new AR.ImageResource("assets/marker_food_selected.png")

		World.markerDrawable_directionIndicator = new AR.ImageResource("assets/indi.png");

		// loop through POI-information and create an AR.GeoObject (=Marker) per POI
		for (var currentPlaceNr = 0; currentPlaceNr < poiData.length; currentPlaceNr++) {
			var singlePoi = {
				"id": poiData[currentPlaceNr].id,
				"latitude": parseFloat(poiData[currentPlaceNr].latitude),
				"longitude": parseFloat(poiData[currentPlaceNr].longitude),
				"altitude": parseFloat(poiData[currentPlaceNr].altitude),
				"title": poiData[currentPlaceNr].name,
				"description": poiData[currentPlaceNr].description,
				"category": poiData[currentPlaceNr].category,
				"image": poiData[currentPlaceNr].image
			};

			World.markerList.push(new Marker(singlePoi));
			
		}

		World.updateStatusMessage(currentPlaceNr + ' places loaded');
	},

	chiudiScreen: function chiudiScreenFn() {

		if (World.initialized) {
	  
		 document.location = 'architectsdk://button?action=chiudiScreen';
	  
		}
	  
	},

	goBack: function goBackFn() {

	
   
	},

	updateDistanceToUserValues: function updateDistanceToUserValuesFn() {
		for (var i = 0; i < World.markerList.length; i++) {
			World.markerList[i].distanceToUser = World.markerList[i].markerObject.locations[0].distanceToUser();
		}
	},

	// updates status message shown in small "i"-button aligned bottom center
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

	onPoiDetailMoreButtonClicked: function onPoiDetailMoreButtonClickedFn() {
		var currentMarker = World.currentMarker;
		var markerSelectedJSON = {
            action: "present_poi_details",
            id: currentMarker.poiData.id,
            title: currentMarker.poiData.title,
            description: currentMarker.poiData.description
        };
		/*
			The sendJSONObject method can be used to send data from javascript to the native code.
		*/
		AR.platform.sendJSONObject(markerSelectedJSON);
	},

	// location updates, fired every time you call architectView.setLocation() in native environment
	locationChanged: function locationChangedFn(lat, lon, alt, acc) {

		// request data if not already present
		if (!World.initiallyLoadedData) {
			World.requestDataFromLocal(lat, lon);
			World.initiallyLoadedData = true;
		} else if (World.locationUpdateCounter === 0) {
			// update placemark distance information frequently, you max also update distances only every 10m with some more effort
			World.updateDistanceToUserValues();
		}

		World.locationUpdateCounter = (++World.locationUpdateCounter % World.updatePlacemarkDistancesEveryXLocationUpdates);
	},

	// fired when user pressed maker in cam
	onMarkerSelected: function onMarkerSelectedFn(marker) {

		World.currentMarker = marker;

		// update panel values
		$("#poi-detail-image").html("<img src='" + marker.poiData.image + "'/>");
		$("#poi-detail-title").html(marker.poiData.title);
		$("#poi-detail-description").html(marker.poiData.description);
		//$("#poi-detail-image").html("<img src='" + marker.poiData.image + "'/>");

		/* It's ok for AR.Location subclass objects to return a distance of `undefined`. In case such a distance was calculated when all distances were queried in `updateDistanceToUserValues`, we recalcualte this specific distance before we update the UI. */
		if( undefined == marker.distanceToUser ) {
			marker.distanceToUser = marker.markerObject.locations[0].distanceToUser();
		}
		var distanceToUserValue = (marker.distanceToUser > 999) ? ((marker.distanceToUser / 1000).toFixed(2) + " km") : (Math.round(marker.distanceToUser) + " m");

		$("#poi-detail-distance").html(distanceToUserValue);

		// show panel
		// $("#panel-poidetail").panel("open", 123);

		//$(".ui-panel-dismiss").unbind("mousedown");

		// $("#panel-poidetail").on("panelbeforeclose", function(event, ui) {
		// 	World.currentMarker.setDeselected(World.currentMarker);
		// });

		$(document).ready(function(){
			$("#panel").slideUp("fast");
		});
	},

	// screen was clicked but no geo-object was hit
	onScreenClick: function onScreenClickFn() {
		if (World.currentMarker) {
			World.currentMarker.setDeselected(World.currentMarker);
			$(document).ready(function(){
				$("#panel").slideDown();
			});
		}
	},

	// display range slider
	showRange: function showRangeFn() {
		if (World.markerList.length > 0) {

			// update labels on every range movement
			$('#panel-distance-range').change(function() {
				World.updateRangeValues();
			});

			World.updateRangeValues();
			World.handlePanelMovements();

			// open panel
			$("#panel-distance").trigger("updatelayout");
			$("#panel-distance").panel("open", 123);
		} else {

			// no places are visible, because the are not loaded yet
			World.updateStatusMessage('No places available yet', true);
		}
	},

	// udpates values show in "range panel"
	updateRangeValues: function updateRangeValuesFn() {

		// get current slider value (0..100);
		var slider_value = $("#panel-distance-range").val();

		// max range relative to the maximum distance of all visible places
		var maxRangeMeters = Math.round(World.getMaxDistance() * (slider_value / 100));

		// range in meters including metric m/km
		var maxRangeValue = (maxRangeMeters > 999) ? ((maxRangeMeters / 1000).toFixed(2) + " km") : (Math.round(maxRangeMeters) + " m");

		// number of places within max-range
		var placesInRange = World.getNumberOfVisiblePlacesInRange(maxRangeMeters);

		// update UI labels accordingly
		$("#panel-distance-value").html(maxRangeValue);
		$("#panel-distance-places").html((placesInRange != 1) ? (placesInRange + " Places") : (placesInRange + " Place"));

		// update culling distance, so only places within given range are rendered
		AR.context.scene.cullingDistance = Math.max(maxRangeMeters, 1);

		// update radar's maxDistance so radius of radar is updated too
		PoiRadar.setMaxDistance(Math.max(maxRangeMeters, 1));
	},

	handlePanelMovements: function handlePanelMovementsFn() {

		$("#panel-distance").on("panelclose", function(event, ui) {
			$("#radarContainer").addClass("radarContainer_left");
			$("#radarContainer").removeClass("radarContainer_right");
			PoiRadar.updatePosition();
		});

		$("#panel-distance").on("panelopen", function(event, ui) {
			$("#radarContainer").removeClass("radarContainer_left");
			$("#radarContainer").addClass("radarContainer_right");
			PoiRadar.updatePosition();
		});
	},

	getNumberOfVisiblePlacesInRange: function getNumberOfVisiblePlacesInRangeFn(maxRangeMeters) {

		// sort markers by distance
		World.markerList.sort(World.sortByDistanceSorting);

		// loop through list and stop once a placemark is out of range ( -> very basic implementation )
		for (var i = 0; i < World.markerList.length; i++) {
			if (World.markerList[i].distanceToUser > maxRangeMeters) {
				return i;
			}
		};

		// in case no placemark is out of range -> all are visible
		return World.markerList.length;
	},

	getMaxDistance: function getMaxDistanceFn() {

		// sort places by distance so the first entry is the one with the maximum distance
		World.markerList.sort(World.sortByDistanceSortingDescending);

		// use distanceToUser to get max-distance
		var maxDistanceMeters = World.markerList[0].distanceToUser;

		// return maximum distance times some factor >1.0 so ther is some room left and small movements of user don't cause places far away to disappear
		return maxDistanceMeters * 1.1;
	},

	// helper to sort places by distance
	sortByDistanceSorting: function(a, b) {
		return a.distanceToUser - b.distanceToUser;
	},

	// helper to sort places by distance, descending
	sortByDistanceSortingDescending: function(a, b) {
		return b.distanceToUser - a.distanceToUser;
	},

	/*
		In case the data of your ARchitect World is static the content should be stored within the application. 
		Create a JavaScript file (e.g. myJsonData.js) where a globally accessible variable is defined.
		Include the JavaScript in the ARchitect Worlds HTML by adding <script src="js/myJsonData.js"/> to make POI information available anywhere in your JavaScript.
	*/

	// request POI data
	requestDataFromLocal: function requestDataFromLocalFn(lat, lon) {

		// var poisNearby = Helper.bringPlacesToUser(myJsonData, lat, lon);
		// World.loadPoisFromJsonData(poisNearby);

		/*
		For demo purpose they are relocated randomly around the user using a 'Helper'-function.
		Comment out previous 2 lines and use the following line > instead < to use static values 1:1. 
		*/

		World.loadPoisFromJsonData(myJsonData);
	}

};

var Helper = {

	/* 
		For demo purpose only, this method takes poi data and a center point (latitude, longitude) to relocate the given places randomly around the user
	*/
	bringPlacesToUser: function bringPlacesToUserFn(poiData, latitude, longitude) {
		for (var i = 0; i < poiData.length; i++) {
			poiData[i].latitude = latitude + (Math.random() / 5 - 0.1);
			poiData[i].longitude = longitude + (Math.random() / 5 - 0.1);
			/* 
			Note: setting altitude to '0'
			will cause places being shown below / above user,
			depending on the user 's GPS signal altitude. 
				Using this contant will ignore any altitude information and always show the places on user-level altitude
			*/
			poiData[i].altitude = AR.CONST.UNKNOWN_ALTITUDE;
		}
		return poiData;
	}
}


/* forward locationChanges to custom function */
AR.context.onLocationChanged = World.locationChanged;

/* forward clicks in empty area to World */
AR.context.onScreenClick = World.onScreenClick;

AR.context.scene.scalingFactor = 1.0; //small

AR.context.scene.globalScale = 0.3;