/*
 *KNWM Videoplattform
 *@author: Lisa Bell
 *SS 2015, Beuth Hochschule, Berlin
 *Kurs: Streaming
 *
 */
'use strict';

angular
		.module('knwmApp', [])
.filter('customFilter', [function(){
    return function(videos, myParam){
    	var passedTest =[];

        angular.forEach(videos, function(video){
            if(video.tag===myParam){
            	passedTest.push(video);
            }
        });
        return passedTest;
    };
}])
		// Angular controller for videos on main page
		.controller(
				'VideoCtrl',
				function($scope, $sce, $filter) {

					var url1 = $sce
							.trustAsResourceUrl("https://www.youtube.com/embed/romEePZWngs");
					var url2 = $sce
							.trustAsResourceUrl("https://www.youtube.com/embed/-blCB-3dDMU");
					var url3 = $sce
							.trustAsResourceUrl("https://www.youtube.com/embed/2gbLKxrvGxo");
					var url4 = $sce
							.trustAsResourceUrl("https://www.youtube.com/embed/tJemq4WMt24");
					var url5 = $sce
							.trustAsResourceUrl("https://www.youtube.com/embed/LUHmz1V3Hqs");
					var url6 = $sce
							.trustAsResourceUrl("https://www.youtube.com/embed/8_dwf5LJXZ4");
					var url7 = $sce
							.trustAsResourceUrl("https://www.youtube.com/embed/bVLVLwg8h1k");
					var url8 = $sce
							.trustAsResourceUrl("https://www.youtube.com/embed/aCNf4T2EhUo");
					$scope.videos = [ {
						"url" : url1,
						"tag" : "Moabit",
						"creator" : "Lisa"
					}, {
						"url" : url2,
						"tag" : "Moabit",
						"creator" : "Friedrich der Große"
					}, {
						"url" : url3,
						"tag" : "Berlin",
						"creator" : "Friedrich der Große"
					}, {
						"url" : url4,
						"tag" : "Konzert",
						"creator" : "Friedrich der Große"
					}, {
						"url" : url5,
						"tag" : "Wedding",
						"creator" : "Lisa und Kugel"
					}, {
						"url" : url6,
						"tag" : "Moabit",
						"creator" : "Mad Max"
					}, {
						"url" : url7,
						"tag" : "Wedding",
						"creator" : "Mad Max"
					}, {
						"url" : url8,
						"tag" : "Wedding",
						"creator" : "Mad Max"
					}, ];
					$scope.something = [ {
						"url" : url1,
						"tag" : "Moabit",
						"creator" : "Lisa"
					}, {
						"url" : url2,
						"tag" : "Moabit",
						"creator" : "Friedrich der Große"
					}, {
						"url" : url6,
						"tag" : "Moabit",
						"creator" : "Mad Max"
					}, ];

					
					// filter function. filter by tag or creator. Params:
					// Fieldname and value (e.g.: tag, Wedding)
					$scope.filter = function() {
						
						 $scope.videos = $scope.videos.filter(function(ele) {
						        return ($scope.something.indexOf(ele) > 0)
						     });
					}
					
				});


