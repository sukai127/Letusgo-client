'use strict';

describe('Service: CartService', function () {

  var service,cartItems,$httpBackend,products,$http;

  beforeEach(function(){

      module('letusgo');

      inject(function ($injector) {
          service = $injector.get('CartService');
          $httpBackend = $injector.get('$httpBackend');
          $http = $injector.get('$http');
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

  it('should add() worked', function () {
    spyOn($http,'post');
    service.add(cartItems[1]);
    expect($http.post.calls.count()).toBe(1);
  });

  it('should getTotalMoney() worked', function () {

    var cartItems = [{id : 1,productId : 1,count : 4,product: products[1]}];
    var result = service.getTotalMoney(cartItems);

    expect(result).toBe(10);
  });

  it('should getTotalCount() worked', function () {

    var cartItems = [{id : 1,productId : 1,count : 4,product: products[1]}];
    var result = service.getTotalCount(cartItems);

    expect(result).toBe(4);
  });

  it('should getSubtotal() worked', function () {

    var cartItem = {id : 1,productId : 1,count : 4,product: products[1]};
    var result = service.getSubtotal(cartItem);

    expect(result).toBe((10).toFixed(2));
  });
});
