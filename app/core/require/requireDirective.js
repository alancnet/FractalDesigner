'use strict';
/*
Usage: <div amd-required='dep1 dep2 dep3' amd-base-url='myscripts/folder'>...</div>
*/


define('app/core/requireDirective', [

    // AMD Modules
    'require',
    './amdModule'

], function (require, amd) {
    
    // Directive is registered without AMD because it is required to be registered before bootstrap.
    amd.directive('amdRequire', [

        // Angular services
        '$compile',

        // Factory
        function($compile) {

            return {
                restrict: 'A',
                priority: 1000,
                scope: true,
                replace: false,
                transclude: true,
                compile: function() {
                    return {
                        pre: function($scope, $element, attrs, ctrl, transclude) {
                            if (typeof attrs.amdBaseUrl !== 'undefined') {
                                if (attrs.amdBaseUrl.length && attrs.amdBaseUrl.charAt(attrs.amdBaseUrl.length - 1) != '/') {
                                    // Add / to the end
                                    attrs.amdBaseUrl += '/';
                                }
                                $scope.requireBaseUrl = attrs.amdBaseUrl;
                            }
                            var deps = attrs.amdRequire
                                .split(' ')
                                // Reduce to non-empty strings, append baseUrl
                                .reduce(function(pv, cv, i, a) {
                                    var item = cv.trim();
                                    if (item) {
                                        var path;
                                        if (item.charAt(0) == '.') {
                                            // Apply relative pathing
                                            while (item.indexOf('./') == 0) {
                                                // Remove leading ./
                                                item = item.substr(2);
                                            }
                                            path = ($scope.requireBaseUrl || '') + item;
                                        } else {
                                            path = item;
                                        }
                                        pv.push(path);
                                    }
                                    return pv;
                                }, []);
                            // Load dependencies
                            require(deps, function() {
                                // Compile transclude
                                $scope.$apply(function() {
                                    transclude($scope, function (clone) {
                                        $element.append(clone);
                                    })
                                })
                            });
                        } // pre
                    } //return
                } // compile
            } // return
        } // function
    ]);

});
