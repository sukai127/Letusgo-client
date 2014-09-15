'use strict';

describe('Controller: MainCtrl', function () {

  beforeEach(module('angularLetusgoApp'));

  var createController,$controller,$scope,cartService,cart;

  beforeEach(inject(function ($injector) {
    $scope = $injector.get('$rootScope').$new();
    $controller = $injector.get('$controller');
    cartService = $injector.get('CartService');
    createController = function(){
      return $controller('ResultCtrl', {
        $scope: $scope,
        CartService: cartService
      });
    }
    cart = {
      cartItems: [
        {
          product: {name : 'Instant_noodles', unit : 'bag', category : 'grocery', price : 1},
          count : 4
        },
        {
          product: {name : 'coca_cola', unit : 'bottle', category : 'grocery', price : 0.5},
          count : 3
        },
        {
          product: {name : 'kettle', unit : 'piece', category : 'device', price : 43.5},
          count : 1
        }
      ],
      len : 8
    };
  }));

  it('should init work', function () {
    spyOn(cartService,'get').and.returnValue(cart);
    createController();
    expect($scope.cartItems.length).toBe(3);
  });
  it('should getSubtotal work', function () {
    spyOn(cartService,'getSubtotal').and.returnValue(4);
    createController();
    var result = $scope.getSubtotal(cart.cartItems[0]);
    expect(result).toBe(4);
  });

  it('should clearData work', function () {
    spyOn(cartService,'remove');
    spyOn($scope,'$emit');
    createController();
    $scope.clearData();
    expect(cartService.remove).toHaveBeenCalled();
    expect($scope.$emit).toHaveBeenCalled();
  });
});
