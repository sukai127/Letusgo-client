'use strict';
angular.module('letusgo')
    .service('CategoryManageService',function(localStorageService,$http){
        this.loadAllCategories = function(callback){
            var service = this;
            $http.get('/api/categories').success(function(categories){
              _.forEach(categories,function(category){
                service.isIncludeProduct(category.id,function(data){
                  category.couldDelete = data ? false: true;
                });
                callback(categories);
              });
            });
        };
        this.add = function(categories){
          $http.post('/api/categories',{categories:categories});
          return categories;
        };
        this.insert = function(name,callback){
          if(name){
            var category = {name:name};
            $http.post('/api/categories',{category:category}).success(function(){
              category.couldDelete = true;
              callback(category);
            });
          }
        };

        this.delete = function(id){
          $http.delete('/api/categories/'+id);
        };

        this.isIncludeProduct = function(id,callback){
          $http.get('/api/items').success(function(products){
            var result = _.find(products,function(product){
              return product.categoryId === ''+id;
            });
            callback(result);
          });
        };
        this.getCategoryById = function(id,callback){
          $http.get('/api/categories/'+id).success(function(data){
            callback(data);
          });
        };
        this.updateCategory = function(category){
          this.loadAllCategories(function(categories){
            _.forEach(categories,function(item,index){
              if(item.id === category.id){
                categories[index] = category;
              }
            });
          });
          return category;
        };
    });
