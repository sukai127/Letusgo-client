/**
 * Created by sukai on 14-8-28.
 */
'use strict';

describe('Service: CartItemService', function () {

    var cartItemService,cartitem;
    beforeEach(function(){
        module('angularLetusgoApp');
        inject(function ($injector) {
            cartItemService = $injector.get('CartItemService');
        });
    });

    it('should create() work', function () {
        var product ={name : 'apple', unit : 'kg', category : 'grocery', price : 2.5};
        cartitem = cartItemService.create(product,1);
        expect(cartitem.product.name).toEqual('apple');
        expect(cartitem.count).toBe(1);
    });
});
