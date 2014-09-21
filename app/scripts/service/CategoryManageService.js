'use strict';
angular.module('letusgo')
    .service('CategoryManageService',function(localStorageService,$http){
        this.loadAllCategories = function(callback){
            $http.get('/api/categories').success(function(data){
              callback(data);
            });
        };
        this.add = function(categories){
          $http.post('/api/categories',{categories:categories});
          return categories;
        };
        this.insert = function(name,callback){
          this.loadAllCategories(function(categories){
            var isExist = _.some(categories,{name : name});
            if(name && !isExist){
              var id = parseInt(categories[categories.length-1].id) + 1;
              var category = {id: id,name : name};
              categories.push(category);
              callback(categories);
            }
          });
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
          this.loadAllCategories(function(categories){
            var result = _.find(categories,function(category){
              return category.id+'' === ''+id;
            });
            callback(result);
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
