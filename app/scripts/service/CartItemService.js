'use strict';
angular.module('letusgo')
    .service('CartItemService',function(){
        this.create = function(product,count){
            return {product : product, count : count};
        };
    });
