"use strict";

var API_KEY = '5d4e7b2733ce0572a15b412c36bbf941';
var PHOTOSET_ID = '72157638482375066';


angular.module('cartagenaApp')
  .directive('flickrBackground', function(Flickr, $http) {
    var _flickrBackground = function($scope, $element) {
      var _next = function() {
        Flickr.getPhotos().then(function(photos) {
          var photo = _.sample(photos);
          var url = 'https://farm' + photo.farm + '.staticflickr.com/' +
            photo.server + '/' + photo.id + '_' + photo.secret + '_b.jpg';
            $http.get(url).then(function() {
              $($element).css('background-image', 'url(\'' + url + '\')');
            });
        });
      };

      _next();

      $scope.$on('next', _next);
    };
    return {
      restrict: 'A',
      link: _flickrBackground
    };
  });

angular.module('cartagenaApp')
  .service('Flickr', function($q, $http) {
    var cache;
    this.getPhotos = function() {
      return $q(function(resolve) {
        if (cache) {
          resolve(cache);
        } else {
          $http.get('https://api.flickr.com/services/rest/?method=flickr.photosets.getPhotos&' +
            'api_key=' + API_KEY +
            '&photoset_id=' + PHOTOSET_ID +
            '&format=json&nojsoncallback=1').then(function(result) {
            cache = result.data.photoset.photo;
            resolve(result.data.photoset.photo);
          });
        }
      });
    };
  });
