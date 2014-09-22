'use strict';

xdescribe('Controller: IndexCtrl', function () {

  beforeEach(module('letusgo'));

  var createController,$controller,$scope,cartService,cart,$rootScope;

  beforeEach(inject(function ($injector) {
    $rootScope = $injector.get('$rootScope');
    $scope = $injector.get('$rootScope').$new();
    $controller = $injector.get('$controller');
    cartService = $injector.get('CartService');
    createController = function(){
      return $controller('IndexCtrl', {
        $scope: $scope,
        CartService: cartService
      });
    };
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
    expect($scope.cart.cartItems.length).toBe(3);
  });

  it('should on_parent_addCount event trigger', function () {
    spyOn(cartService,'get').and.returnValue(cart);
    spyOn(cartService,'add');
    createController();
    $rootScope.$broadcast('addCount');
    expect($scope.cart.len).toBe(9);
    expect($scope.indexActive).toEqual(true);
    expect($scope.listActive).toEqual(false);
    expect(cartService.add).toHaveBeenCalled();
  });
  it('should highLight trigger', function () {
    createController();
    $scope.highLight('listActive');
    expect($scope.indexActive).toEqual(false);
    expect($scope.listActive).toEqual(true);
    $scope.highLight('cartActive');
    expect($scope.cartActive).toEqual(true);
  });

  it('should on_parent_highLight_active_* event trigger', function () {
    createController();
    $rootScope.$broadcast('highLightActive','list');
    expect($scope.listActive).toEqual(true);
    expect($scope.cartActive).toEqual(false);
    $rootScope.$broadcast('highLightActive','cart');
    expect($scope.cartActive).toEqual(true);
    $rootScope.$broadcast('highLightActive','index');
    expect($scope.indexActive).toEqual(true);
  });

  it('should on_parent_clear event trigger', function () {
    createController();
    $rootScope.$broadcast('clear');
    expect($scope.cart.len).toEqual(0);
    expect($scope.cart.cartItems.length).toEqual(0);
  });

  it('should on_parent_updateCount event trigger', function () {
    spyOn(cartService,'getTotalCount').and.returnValue(8);
    createController();
    $rootScope.$broadcast('updateCount',cart);
    expect(cartService.getTotalCount.calls.count()).toEqual(1);
    expect($scope.cart.len).toEqual(8);
  });

});
