"use strict";

var API_KEY = '5d4e7b2733ce0572a15b412c36bbf941';
var PHOTOSET_ID = '72157638482375066';


angular.module('cartagenaApp')
  .directive('flickrBackground', function(Flickr) {
    var _flickrBackground = function($scope, $element, $attributes) {
      Flickr.getPhotos().then(function(photos) {
        var photo = _.sample(photos);
        var url = 'https://farm' + photo.farm + '.staticflickr.com/' +
        photo.server + '/' + photo.id + '_' + photo.secret + '_b.jpg';
        $($element).css('background-image', 'url(\'' + url +'\')');
      });
    };
    return {
      restrict: 'A',
      link: _flickrBackground
    };
  });

angular.module('cartagenaApp')
  .service('Flickr', function($q, $http) {
    this.getPhotos = function() {
      return $q(function(resolve, reject) {
        $http.get('https://api.flickr.com/services/rest/?method=flickr.photosets.getPhotos&' +
          'api_key=' + API_KEY +
          '&photoset_id=' + PHOTOSET_ID +
          '&format=json&nojsoncallback=1').then(function(result) {
          resolve(result.data.photoset.photo);
        });
      });
    };
  });
