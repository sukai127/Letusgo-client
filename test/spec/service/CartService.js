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
        expect(data.length).toBe(2);
      });
      $httpBackend.flush();
  });

  it('should get() worked success', function () {

    $httpBackend.expectGET('/api/cartItems').respond(200,cartItems);
    $httpBackend.expectGET('/api/products').respond(200,products);

    service.get(function(data){
      expect(data.cartItems[0].product.name).toEqual('Instant_noodles');
      expect(data.cartItems.length).toBe(2);
      expect(data.count).toBe(7);
    });
    $httpBackend.flush();
  });
});
