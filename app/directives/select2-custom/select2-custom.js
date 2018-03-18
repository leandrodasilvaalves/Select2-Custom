
(function (app) {
    var select2Custom = function ($sce) {

        return {
            retrict: 'E',
            replace: true,
            //template: '<div><style></style></div>',
            templateUrl:'app/directives/select2-custom/select2-custom.html',
            require: 'ngModel',
            scope: {
                array: '=list',
                template: '=template',
                placeholder: '@',
                model: '=ngModel'
            },
            link: function (scope, elem) {

                scope.isOpened = false;
                scope.selected = '';
                scope.hasSelected = false;
                scope.placeholder = 'Selecione...';
                scope.withTemplate = false;
                scope.showClean = false;

                scope.toogleClick = function () {
                    scope.isOpened = !scope.isOpened;
                    _resolvePosition();
                };

                scope.setSelected = function (obj) {
                    if (scope.withTemplate) {
                        scope.model = _getModel(obj);
                        scope.selected = $sce.trustAsHtml(obj);
                    }
                    else {
                        scope.selected = obj;
                        scope.model = obj;
                    }
                    scope.toogleClick();
                    scope.cleanSearch();
                    scope.hasSelected = true;
                };

                scope.render = function (obj) {
                    return $sce.trustAsHtml(obj);
                };

                scope.cleanSearch = function () {
                    scope.search = '';
                };

                scope.$watch(function () {
                    if (scope.search == '' || scope.search == null || scope.search == undefined)
                        scope.showClean = false;
                    else
                        scope.showClean = true;
                });

                var _getModel = function (obj) {
                    var index = scope.template.indexOf(obj);
                    return scope.array[index];
                };

                var _offsetElemento = function(el) {
                    var rect = el.getBoundingClientRect(),
                    scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
                    scrollTop = window.pageYOffset || document.documentElement.scrollTop;
                    return { top: rect.top + scrollTop, left: rect.left + scrollLeft }
                };

                var _percentualXdeY= function(x, y){
                    return (x/y) * 100;
                }

                var _resolvePosition = function(){
                    var topElem = _offsetElemento(elem[0]).top;
                    var bodyHeight =document.body.offsetHeight;
                    var result = _percentualXdeY(topElem, bodyHeight);
                    var dropdow = elem[0].getElementsByClassName('select_dropdown')[0];
                    
                    if(result > 90){
                        dropdow.style.bottom="1.92em";
                        dropdow.style.borderRadius="0.25em 0.25em 0 0";
                    }
                    else{
                        dropdow.style.borderRadius="0 0 0.25em 0.25em";                            
                    }
                }

                var _init = function () {
                    scope.withTemplate = scope.template != undefined;
                };
                
                _init();
            }

        };
    };

    app.directive('select2Custom',['$sce', select2Custom]);

})(angular.module('select2Cust'));