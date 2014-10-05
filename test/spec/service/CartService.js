'use strict';

describe('Service: CartService', function () {

  var service,cartItems,$httpBackend,products;

  beforeEach(function(){

      module('letusgo');

      inject(function ($injector) {
          service = $injector.get('CartService');
          $httpBackend = $injector.get('$httpBackend');
      });

      cartItems = [
          {
              id : 1,
              productId : 1,
              count : 4
          },
          {
              id : 2,
              productId : 2,
              count : 3
          },
          {
              id : 3,
              productId: 3,
              count : 1
          }
      ];

      products =[
        {id : 1, name : 'Instant_noodles', unit : 'bag', category : '1', price : 1},
        {id : 2, name : 'apple', unit : 'kg', category : '1', price : 2.5}
      ];

  });

  afterEach(function() {
    $httpBackend.verifyNoOutstandingExpectation();
  });

  it('should buildCartItem() worked', function () {
      $httpBackend.expectGET('/api/products').respond(200,products);
      service.buildCartItem(cartItems,function(data){
        expect(data[0].product.name).toEqual('Instant_noodles');
        expect(data.length).toBe(3);
      });
      $httpBackend.flush();
  });
});
