'use strict';

describe('Service: CartService', function () {

  var service,cartItems,$httpBackend;

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

  });

  it('should get() work when localStorage not empty', function () {
      var result = service.get();
      expect(result.cartItems[0].product.name).toEqual('Instant_noodles');
      expect(result.cartItems.length).toBe(3);
      expect(result.len).toBe(8);
  });

  it('should get() work when localStorage not empty', function () {
    var result = service.get();
    expect(result.cartItems.length).toBe(0);
    expect(result.len).toBe(0);
  });

  it('should set() work',function(){
      service.add({});
  });

  it('should the total money equal 49',function(){
  });

  it('should the total count equal 7',function(){
  });

  it('should the subtotal equal 43.50',function(){
  });
  
  it('should remove() work',function(){
      service.remove();
  });
});
