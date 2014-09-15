'use strict';
angular.module('angularLetusgoApp')
    .service('CartItemService',function(){
        this.create = function(product,count){
            return {product : product, count : count};
        };
    });
