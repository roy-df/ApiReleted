angular.module('starter.controllers')
.controller('profileCtrl', ['$scope', '$rootScope', '$http', '$state', '$stateParams', '$cordovaOauth', 'store', 'ionicDatePicker', 'ionicTimePicker', 'ionicToast', '$filter', '$timeout', '$ionicHistory', function($scope, $rootScope, $http, $state, $stateParams, $cordovaOauth, store, ionicDatePicker, ionicTimePicker, ionicToast, $filter, $timeout, $ionicHistory, $ionicViewSwitcher,$cordovaSocialSharing) {
	
	$scope.init = function(){
		$rootScope.islogin = store.get('userdata') || false;
		console.log($rootScope.islogin);
		var userData =  {
			userId : $rootScope.islogin.user_id
		}
		$http.post(baseURL + 'getProfile', userData).success(function(res, req) {
			$scope.userInfo = res.record;
        }).error(function(err) {
            console.log('Internet Connection Is Not Available.');
        })
	}

	$scope.updateUserInfo = function(data){
		$http.post(baseURL + 'updateUserInfo', data).success(function(res, req) {
			if(res.status == 1){
				
			}else{
				$scope.errMsg = res.message;				
			}
		}).error(function(err) {
			console.log('Internet Connection Is Not Available.');
		})
	}


    $scope.whatsappShare=function(){
    window.plugins.socialsharing.
    shareViaWhatsApp('Digital Signature Maker', null /* img */, 
     "https://play.google.com/store/apps/details?id=com.prantikv.digitalsignaturemaker" /* url */, null,

   function(errormsg){alert("Error: Cannot Share")});
  }

}])