(function(app){

    var select2Mother = function($document){
        return{
            restrict:'A',
            controller: function(){
                var select2All = document.getElementsByClassName('select_custom');  
                var _closeAll = function(){
                    for(var i=0; i< select2All.length; i++){
                        angular.element(select2All[i]).scope().isOpened = false;
                    }
                };
                $document.on('click',function(){
                    console.log('clicou');
                    _closeAll();
                });
            }
        }

    };

    app.directive('select2Mother',['$document', select2Mother]);
    
})(angular.module('select2Cust'));