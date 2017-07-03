demoRestartApp.controller("cfTemplateController",
    function sfTemplateController($scope, $routeParams, $location, $timeout, Upload, DataService, cfpLoadingBar) {



        function ArrayBufferToString(buffer) {
            return BinaryToString(String.fromCharCode.apply(null, Array.prototype.slice.apply(new Uint8Array(buffer))));
        }

        function StringToArrayBuffer(string) {
            return StringToUint8Array(string).buffer;
        }

        function BinaryToString(binary) {
            var error;

            try {
                return decodeURIComponent(escape(binary));
            } catch (_error) {
                error = _error;
                if (error instanceof URIError) {
                    return binary;
                } else {
                    throw error;
                }
            }
        }

        function StringToBinary(string) {
            var chars, code, i, isUCS2, len, _i;

            len = string.length;
            chars = [];
            isUCS2 = false;
            for (i = _i = 0; 0 <= len ? _i < len : _i > len; i = 0 <= len ? ++_i : --_i) {
                code = String.prototype.charCodeAt.call(string, i);
                if (code > 255) {
                    isUCS2 = true;
                    chars = null;
                    break;
                } else {
                    chars.push(code);
                }
            }
            if (isUCS2 === true) {
                return unescape(encodeURIComponent(string));
            } else {
                return String.fromCharCode.apply(null, Array.prototype.slice.apply(chars));
            }
        }

        function StringToUint8Array(string) {
            var binary, binLen, buffer, chars, i, _i;
            binary = StringToBinary(string);
            binLen = binary.length;
            buffer = new ArrayBuffer(binLen);
            chars = new Uint8Array(buffer);
            for (i = _i = 0; 0 <= binLen ? _i < binLen : _i > binLen; i = 0 <= binLen ? ++_i : --_i) {
                chars[i] = String.prototype.charCodeAt.call(binary, i);
            }
            return chars;
        }






        var onError = function (response) {
            $scope.message = response.statusText + "\r\n";
            if (response.data.modelState) {
                for (var key in response.data.modelState) {
                    $scope.message += response.data.modelState[key] + "\r\n";
                }
            }
            if (response.data.exceptionMessage) {
                $scope.message += response.data.exceptionMessage;
            }
            $scope.errorOnPage = true;
        };

        if ($routeParams.categoryId) {
            $scope.ActionTxt = "Edit";
            cfpLoadingBar.start();
            DataService.getCategory($routeParams.categoryId)
                .then(function (response) {
                    $scope.category = response.data;
                    var file = new Blob([$scope.category.picture], { type: 'image/jpeg' });
                    $scope.imgfile = file;
                    $scope.errorOnPage = false;
                }, onError)
                .finally(function () {
                    cfpLoadingBar.complete();
                });
        } else {
            $scope.ActionTxt = "Add";
            $scope.category = {};
        }

        $scope.btnSubmitClick = function () {
            if ($scope.Categoryform.$invalid) return false;
            if ($routeParams.categoryId) {
                DataService.editCategory($scope.category)
                    .then(function (response) {
                        GoBack();
                    }, onError);
            } else {
                DataService.addCategory($scope.category)
                    .then(function (response) {
                        GoBack();
                    }, onError);
            }
        }

        var GoBack = function () {
            $location.path('/category');
        };

        $scope.upload = function (file) {
            if (file) {
                var reader = new FileReader();
                reader.onload = function () {
                    var arrayBuffer = this.result;
                    $scope.category.picture = ArrayBufferToString(arrayBuffer);
                }
                reader.readAsArrayBuffer(file);
            }
            $scope.imgfile = file;
        };
    });