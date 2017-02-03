angular.module('starter.controllers')
.controller('carController', function($scope, $state, $http, $rootScope, $ionicModal, $timeout, store, $ionicSlideBoxDelegate, yearListService, monthListService, $ionicHistory, $ionicViewSwitcher) {
	
    $scope.imageURL = imageURL;
    

    $scope.getCities = function(){
		$http.get( baseURL + 'getCities').success(function (res, req) {
		    $scope.cities = res;
		}).error(function (err) {
		  console.log('Internet Connection Is Not Available.');
		})
    }
    
    $scope.getCar = function(){
        $http.get( baseURL + 'getCar').success(function (res, req) {
            $scope.carlist = res;
        }).error(function (err) {
          console.log('Internet Connection Is Not Available.');
        })
    };
      
    $scope.getYearMonthList = function(){
        $scope.yearlist = yearListService.list;
        $scope.monthlist = monthListService.list;
    }

     $scope.banks = {
        0: {
            bank: "SBI"
        },
        1: {
            bank: "HDFC BANK"
        },
        2: {
            bank: "ICICI BANK"
        },
        3: {
            bank: "AXIS BANK"
        },
        4: {
            bank: "KOTAK BANK"
        },
        5: {
            bank: "PNB BANK"
        }
    };

    $scope.getCarBookingDetails = function(){
    	console.log('getCarBookingDetails');
    	$scope.BookingDetails = store.get('data');
    	console.log($scope.BookingDetails);
    }

    $scope.paymentMode = "creditCard"
    $scope.tabActive = 0;
	$scope.slideHasChanged = function($index){
	  if($index === 0){
	  	$scope.tabActive = $index
	  	$scope.paymentMode = "creditCard";
	  }else if($index === 1){
	  	$scope.paymentMode = "DebitCard";
	  	$scope.tabActive = $index
	  }else{
	  	$scope.paymentMode = 'netBanking';
	  	$scope.tabActive = $index
	  }
	};

    $scope.ProceedPaymentDC = function(DCDetails){
        console.log(DCDetails);
    }

    $scope.ProceedPaymentBank = function(BankName){
        console.log(BankName.bank);
    }
     

   $scope.sections = [
        { id:'1',
          km: '20km',
         price: '280',
          tax:'12.4'},
        {km: '40km',
          price:'640',
           tax:'12.4'},
        {km: '60km',
         price:'960',
          tax:'12.4'}];

    $scope.isSelected = function(section,car_CarId) {
      console.log(section, car_CarId);
      $scope.selectedas = section;
      $scope.carCarId = car_CarId;
      $scope.price=section.price;
      $scope.tax=section.tax;


      $scope.totalHrs=section.totalHrs;
      console.log(section.totalHrs);
     // $scope.amounttax=parseInt(section.price*section.tax)/100;
      $scope.amounttax = parseInt(section.price) *parseFloat(section.tax)/100;
      console.log(parseFloat(section.tax));
      $scope.total=parseInt(section.price)+(parseInt(section.price) *parseFloat(section.tax))/100;

      var selectedPackage = {
        packgeKm : section.km,
        packgePrice : section.price,
        packgetax: section.tax,
        CarId : car_CarId,  
        //amounttax:parseInt(section.price*section.tax)/100,

        packgetotal:parseInt(section.price)+(parseInt(section.price) *parseFloat(section.tax))/100
      }
      console.log($scope.amounttax);
      store.set('selectedPackage',selectedPackage);
    }
     
          $scope.showDetail = function(e){
        console.log(e, store.get('selectedPackage').CarId);
        if( e.car_CarId == store.get('selectedPackage').CarId ){
            $state.go('app.carDetails',{carId:e._id});    
        }else{
            alert('Please select packge');
        }
        
    }


      $scope.finalpackages = function(){

        
      }

})
    
.controller('carDetailsCtrl', function($scope, $state, $http, $stateParams, $rootScope, $ionicModal, $timeout, store, $ionicSlideBoxDelegate, yearListService, monthListService, $ionicHistory, $ionicViewSwitcher) {

    $scope.init = function(){
        $scope.imageURL = imageURL;
        $scope.extrakm=0;
        $scope.extraPerKM = 15; 
        var crId = {
            carId : $stateParams.carId
        }
        $http.post(baseURL,crId).success(function( res, req ){
            $scope.carDetails = res[0];
        }).error(function (err) {
          console.log('Internet Connection Is Not Available.');
        })
         $scope.selectedPackage = store.get('selectedPackage');
         //console.log($scope.selectedPackage);
    }

    $scope.changeExtra = function(extrakm){
        if(extrakm){
            var extratotal =$scope.extraPerKM + (extrakm * $scope.extraPerKM * 12.4)/100

            console.log(extratotal);
            $scope.selectedPackage.packgetotal = $scope.selectedPackage.packgetotal+extratotal;
        }
    }

    $scope.getCarBookingDetails = function(){
        console.log('getCarBookingDetails');
        $scope.BookingDetails = store.get('data');
    }
    console.log($stateParams.carId);

    $scope.showPayment = function(e){
       $state.go('app.carPayment',{carId:e});
    }
   //packages value show
   
})

.controller('carPaymentCtrl', function($scope, $state, $http, $stateParams, $rootScope, $ionicModal, $timeout, store, $ionicSlideBoxDelegate, yearListService, monthListService, $ionicHistory, $ionicViewSwitcher) {
    
    $scope.init = function(){
        $scope.imageURL = imageURL;

        var crId = {
            carId : $stateParams.carId
        }
        $http.post(baseURL+'getCarDetails',crId).success(function( res, req ){
            $scope.carDetails = res[0];
        }).error(function (err) {
          console.log('Internet Connection Is Not Available.');
        })
    }

     $scope.getCarBookingDetails = function(){
        console.log('getCarBookingDetails');
        $scope.BookingDetails = store.get('data');
    }

    /*$scope.sendEmail = function() {

            window.plugin.email.open({

            }, function () {
                console.log('email view dismissed');
            },
            this);    
        }
*/
     

})