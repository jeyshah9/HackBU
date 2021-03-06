﻿
var myApp = angular.module('TrashBin', []);
var colorData = 'Hello';
myApp.directive('fileModel', ['$parse', function ($parse) {
    return {
        restrict: 'A',
        link: function (scope, element, attrs) {
            var model = $parse(attrs.fileModel);
            var modelSetter = model.assign;

            element.bind('change', function () {
                scope.$apply(function () {
                    modelSetter(scope, element[0].files[0]);
                });
            });
        }
    };
}]);

myApp.service('fileUpload', ['$http',function ($http) {
    this.uploadFileToUrl = function (file, uploadUrl) {
        var fd = new FormData();
        fd.append('file', file);

        $http.post(uploadUrl, fd, {
            transformRequest: angular.identity,
            headers: { 'Content-Type': undefined }
        })

        .success(function (res) {
            console.log(res);
            colorData = res;
        })

        .error(function (res) {
            console.log(res);
        });
    }
}]);

myApp.controller('MainCtrl', ['$scope', 'fileUpload', function ($scope, fileUpload) {
    $scope.uploadFile = function () {
        var file = $scope.myFile;

        console.log('file is ');
        console.dir(file);

        var uploadUrl = "/junk";
        fileUpload.uploadFileToUrl(file, uploadUrl);
        $scope.content = colorData;
    };
}]);
