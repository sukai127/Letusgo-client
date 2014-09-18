'use strict';

describe('Service: CartService', function () {

  var localStorageService,service,cart;
  beforeEach(function(){
      module('letusgo');
      inject(function ($injector) {
          localStorageService = $injector.get('localStorageService');
          service = $injector.get('CartService');
      });
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

  });

  it('should get() work when localStorage not empty', function () {
      spyOn(localStorageService,'get').and.returnValue(cart);
      var result = service.get();
      expect(result.cartItems[0].product.name).toEqual('Instant_noodles');
      expect(result.cartItems.length).toBe(3);
      expect(result.len).toBe(8);
  });

  it('should get() work when localStorage not empty', function () {
    spyOn(localStorageService,'get').and.returnValue(null);
    var result = service.get();
    expect(result.cartItems.length).toBe(0);
    expect(result.len).toBe(0);
  });

  it('should set() work',function(){
      spyOn(localStorageService,'set');
      service.add({});
      expect(localStorageService.set).toHaveBeenCalledWith('cart',{});
  });

  it('should the total money equal 49',function(){
       var result = service.getTotalMoney(cart);
      expect(result).toEqual(49);
  });
    it('should the total count equal 7',function(){
        var result = service.getTotalCount(cart);
        expect(result).toEqual(8);
    });

    it('should the subtotal equal 43.50',function(){
        var result = service.getSubtotal(cart.cartItems[2]);
        expect(result).toBe((43.50).toFixed(2));
    });
    it('should remove() work',function(){
        spyOn(localStorageService,'remove');
        service.remove();
        expect(localStorageService.remove).toHaveBeenCalledWith('cart');
    });
});
