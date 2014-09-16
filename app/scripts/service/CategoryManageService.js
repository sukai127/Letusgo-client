'use strict';
angular.module('letusgo')
    .service('CategoryManageService',function(localStorageService){
        this.loadAllCategories = function(){
            var categories = [
              {id : 1, name: 'grocery'},
              {id : 2, name: 'device'}
            ];
            var temp = localStorageService.get('categories');
            return temp ? temp : (localStorageService.add('categories',categories),categories);
        };
        this.add = function(categories){
          localStorageService.add('categories',categories);
          return categories;
        };
        this.insert = function(name){
          var categories = this.loadAllCategories();
          var isExist = _.some(categories,{name : name});
          if(name && !isExist){
            var id = parseInt(categories[categories.length-1].id) + 1;
            var category = {id: id,name : name};
            categories.push(category);
          }
          return categories;
        };

        this.isIncludeProduct = function(id){
          var products = localStorageService.get('products');
          var result = _.find(products,function(product){
            return product.category == id;
          });
          return result ? true : false;
        };
        this.getCategoryById = function(id){
            var categories = localStorageService.get('categories');
            return _.find(categories,function(category){
              return category.id == id;
            });
        };
        this.updateCategory = function(category){
          var categories = localStorageService.get('categories');
          _.forEach(categories,function(item,index){
            if(item.id === category.id){
              categories[index] = category;
            }
          });
          this.add(categories);
          return category;
        };
    });
