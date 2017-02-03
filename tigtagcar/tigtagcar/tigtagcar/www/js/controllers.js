angular.module('starter.controllers', []).controller('AppCtrl', function($scope, $rootScope, $http, $state, $ionicModal, $timeout, $ionicPopup, ionicToast, store, $ionicHistory, $ionicViewSwitcher, $cordovaNetwork, $ionicPlatform, $ionicSideMenuDelegate) {
    document.addEventListener("deviceready", function() {
        var isOnline = $cordovaNetwork.isOnline();
        var isOffline = $cordovaNetwork.isOffline();
        if (isOnline == 'false' || isOnline == false) {
            $state.go('NoConnection');
        } else if (isOnline == 'true' || isOnline == true) {
            $state.go('app.browse');
        }
        // listen for Online event
        $rootScope.$on('$cordovaNetwork:online', function(event, networkState) {
                $state.go('app.browse');
            })
            // listen for Offline event
        $rootScope.$on('$cordovaNetwork:offline', function(event, networkState) {
            $state.go('NoConnection');
        })
    })
    $scope.isActive = false;
    $scope.rotate = function() {
        $scope.isActive = !$scope.isActive;
    };
    $scope.init = function() {
        $rootScope.islogin = store.get('userdata') || false;
        $scope.IsClickEnable = true;
        $scope.IsClickEnable0 = true;
        $scope.IsClickEnable1 = true;
        $scope.animate = false; 
        $scope.animate0 = false; 
        $scope.animate1 = false; 
        if ($state.current.name == "app.car-booking") {
            $rootScope.$root.showMenuButton = true;
        } else {
            $rootScope.$root.showMenuButton = false;
        }
    }
    $scope.logout = function() {
        store.remove('userdata');
        localStorage.clear();
        $scope.init();
        $ionicSideMenuDelegate.toggleLeft();
        $state.go('app.browse');
        // $state.go('app.login');
    }
    $scope.customBack = function() {
        if ($state.current.name == "app.carpage.cartype1" || $state.current.name == "app.carpage.cartype2" || $state.current.name == "app.carpage.cartype3" || $state.current.name == "app.carpage.cartype4" || !$ionicHistory.backView()) {
            console.log("customBack");
            goDefaultBack();
        } else {
            $ionicHistory.goBack();
        }

        function getDefaultBack() {
            return ($state.current || {}).defaultBack;
        }

        function goDefaultBack() {
            $ionicViewSwitcher.nextDirection('back');
            $ionicHistory.nextViewOptions({
                disableBack: true,
                historyRoot: true
            });
            var params = {};
            if (getDefaultBack().getStateParams) {
                params = getDefaultBack().getStateParams($stateParams);
                console.log(params);
            }
            $state.go(getDefaultBack().state, params);
        }
    };
    $scope.data = {
        "startdatedisplay": "",
        "enddatedisplay": "",
        "selectedstartTime": "",
        "selectedendTime": "",
        "age": "",
        "address": ""
    };
    // An alert dialog
    $scope.showAlert = function() {
        var alertPopup = $ionicPopup.alert({
            title: ' About choosing age!',
            template: 'If  You Are Under 18...so please Stay away from this Machine '
        });
        alertPopup.then(function(res) {
            console.log('Thank you for choosing Age');
        });
    };
    // Form data for the login modal
    $scope.getCities = function() {
        $rootScope.$root.showMenuButton = false;
        $http.get(baseURL + 'getCities').success(function(res, req) {
            $scope.cities = res;
            $scope.selectedCityModel = $scope.cities[0];
        }).error(function(err) {
            console.log('Internet Connection Is Not Available.');
        })
    }
    $scope.formdata = {};
    $scope.disable = true;
    $scope.gotoCarBooking = function(flag, city) {

        if (city == "Select City") {
            $scope.errMSg = 'Select City';
        } else {
            $scope.IsClickEnable = false;
            $scope.IsClickEnable0 = false;
            $scope.IsClickEnable1 = false;
            if (flag == 'Special Events') {
                $scope.animate = true;
            } else if (flag == 'Outside Your City') {
                console.log(flag);
                $scope.animate0 = true;
            } else if (flag == 'In Your City') {
                console.log(flag);
                $scope.animate1 = true;
            }
            $timeout(function() {
                $scope.formdata.flag = flag;
                $scope.formdata.city = city;
                store.set('flagcity', $scope.formdata);
                store.remove('data');
                $state.go('app.car-booking');
            }, 1800);
        }
    }
    $scope.errmsg = function() {
        $scope.errMSg = '';
    }
    
    // Create the login login_modal that we will use later
    $ionicModal.fromTemplateUrl('templates/login.html', {
        scope: $scope
    }).then(function(login_modal) {
        $scope.login_modal = login_modal;
    });
    // Triggered in the login login_modal to close it
    $scope.closeLogin = function() {
        $scope.login_modal.hide();
    };
    // Open the loginmodal
    $scope.login = function() {
        $scope.login_modal.show();
    };
    // Create the login register_model that we will use later
    $ionicModal.fromTemplateUrl('templates/register.html', {
        scope: $scope
    }).then(function(register_model) {
        $scope.register_model = register_model;
    });
    $scope.register_modelClose = function() {
        $scope.register_model.hide();
    };
    $scope.gotoRegister = function() {
        console.log("gotoRegister");
        $scope.closeLogin();
        $scope.register_model.show();
    }
}).controller('ListCtr', ['$scope', '$rootScope', '$http', '$state', '$stateParams', 'store', 'ionicDatePicker', 'ionicTimePicker', 'ionicToast', '$filter', '$timeout', '$ionicHistory', function($scope, $rootScope, $http, $state, $stateParams, store, ionicDatePicker, ionicTimePicker, ionicToast, $filter, $timeout, $ionicHistory, $ionicViewSwitcher) {
    $scope.init = function() {
        var flagcity = store.get('flagcity');
        $scope.location = {};
        $scope.autocompleteOptions = {
            componentRestrictions: { country: 'in' },
            types: ['geocode']
        };

        if (store.get('data')) {
            $scope.data = store.get('data');
        } else {
            $scope.data = {
                "startdatedisplay": "",
                "enddatedisplay": "",
                "selectedstartTime": "",
                "selectedendTime": "",
                "age": "",
                "address": ""
            };
        }
        $rootScope.$root.showMenuButton = true;
        $scope.data.selectedCity = flagcity.city;
        $scope.data.flag = flagcity.flag;
    }
    var startdateSelect = {
        callback: function(val) { //Mandatory
            console.log('Start Date is : ' + new Date(val));
            $scope.startdatedisplay = new Date(val);
            $scope.startdateval =  val;
            $scope.data.startdatedisplay = $scope.startdatedisplay;
        },
        disabledDates: [],
        from: new Date(), //Optional
        to: new Date(2016, 10, 30), //Optional
        inputDate: new Date(), //Optional
        mondayFirst: true, //Optional
        disableWeekdays: [], //Optional
        closeOnSelect: false, //Optional
        templateType: 'popup' //Optional
    };
    $scope.startdate = function() {
        ionicDatePicker.openDatePicker(startdateSelect);
    };

    $scope.enddate = function() {
        // var nextDay = new Date($scope.startdatedisplay.getTime() + (24 * 60 * 60 * 1000));
        var nextDay = new Date($scope.startdatedisplay.getTime());
            var enddateSelect = {
            callback: function(val) { //Mandatory

            console.log('End Date is : ' + new Date(val));
            $scope.enddatedisplay = new Date(val);
            var diff = $scope.enddatedisplay.getTime() - $scope.startdatedisplay.getTime();
            console.log(diff / (1000*60*60*24));
            $scope.data.enddatedisplay = $scope.enddatedisplay;
        },
        disabledDates: [],
        // from: new Date(), //Optional
        from : nextDay,
        to: new Date(2016, 10, 30), //Optional
        inputDate: nextDay, //Optional
        mondayFirst: true, //Optional
        disableWeekdays: [], //Optional
        closeOnSelect: false, //Optional
        templateType: 'popup' //Optional
    };
        ionicDatePicker.openDatePicker(enddateSelect);
    };
    $scope.data = {};
    var starttimeselect = {
        callback: function(val) { //Mandatory
            if (typeof(val) === 'undefined') {
                console.log('Time not selected');
            } else {
                $scope.selectedstartTime = new Date(val * 1000);
                $scope.data.selectedstartTime = $scope.selectedstartTime;
                console.log('Selected epoch is : ', val, 'and the time is ', $scope.selectedstartTime.getUTCHours(), 'H :', $scope.selectedstartTime.getUTCMinutes(), 'M');
                console.log('getUTCHours' + $scope.selectedstartTime.getUTCHours(), 'HH:', $scope.selectedstartTime.getUTCMinutes(), 'MM');
            }
        },
        // inputTime: (((new Date()).getHours() * 60 * 60) + (((new Date()).getMinutes() * 60) - 30)),   //Optional
        inputTime : 50400,
        format: 12,
        //Optional
        step: 30,           //Optional
        setLabel: 'Set' //Optional
    };
    /*
        var starttimeselect = {
        callback: function (val) {      //Mandatory
          if (typeof (val) === 'undefined') {
            console.log('Time not selected');
          } else {

            $scope.selectedTime = new Date(val * 1000);
            $scope.data.selectedTime =  $scope.selectedTime;
            console.log('Selected epoch is : ', val, 'and the time is ', $scope.selectedTime.getUTCHours(), 'H :', $scope.selectedTime.getUTCMinutes(), 'M');
          }
        },
        inputTime: 50400,   //Optional
        format: 12,         //Optional
        step: 15,           //Optional
        setLabel: 'Set2'    //Optional
      };
    */

    $scope.calculateDiff = function(data, callback){

        var today = data.startdatedisplay;
        var dd = today.getDate();
        var mm = today.getMonth()+1; //January is 0!
        var yyyy = today.getFullYear();
        
        dd = parseInt(dd);
        mm = parseInt(mm);
        yyyy = parseInt(yyyy);

        // var tommorrow = new Date(new Date().getTime() + 2*(24 * 60 * 60 * 1000));

        var tommorrow =    data.enddatedisplay

        console.log(today+ '  '+ tommorrow);

        var tdd = tommorrow.getDate();
        var tmm = tommorrow.getMonth()+1; //January is 0!
        var tyyyy = tommorrow.getFullYear();

        tdd = parseInt(tdd);
        tmm = parseInt(tmm);
        tyyyy = parseInt(tyyyy);

        var oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
        var diffDays = (Math.abs((today.getTime() - tommorrow.getTime()) / (oneDay))-1)*24;

        if(dd<10){dd='0'+dd} if(mm<10){mm='0'+mm} today = dd+'/'+mm+'/'+yyyy;  //Current Date

        if(tdd<10){tdd='0'+tdd} if(tmm<10){tmm='0'+tmm} tommorrow = tdd+'/'+tmm+'/'+tyyyy;  //tommorow's date

        var valuestart = $filter('date')(data.selectedstartTime, 'h:mm a' , 'UTC'); // "2:00 PM";
        var valuestop = $filter('date')(data.selectedendTime, 'h:mm a' , 'UTC'); //"2:00 PM";$("select[name='timestop']").val();

        console.log('valuestart', valuestart);

        console.log('valuestop', valuestop);

        var timeStart = new Date(data.selectedstartTime).getUTCHours();
        var timeEnd = new Date(data.selectedendTime).getUTCHours();
    
        timeStart = parseInt(timeStart);            
        timeEnd = parseInt(timeEnd);

        callback((24-parseInt(timeStart)) + parseInt(timeEnd)+diffDays);
    }

    $scope.startTime = function() {
        ionicTimePicker.openTimePicker(starttimeselect);
    };
    var endtimeselect = {
        callback: function(val) { //Mandatory
            if (typeof(val) === 'undefined') {
                console.log('Time not selected');
            } else {
                $scope.selectedendTime = new Date(val * 1000);
                $scope.data.selectedendTime = $scope.selectedendTime;
                console.log('Selected epoch is : ', val, 'and the time is ', $scope.selectedendTime.getUTCHours(), 'H :', $scope.selectedendTime.getUTCMinutes(), 'M');
            }
        },
        inputTime: 50400,   //Optional
        /*format: 12,         //Optional
        step: 15,    */ //Optional
        setLabel: 'Set',
        format: 12 //Optional
    };
    $scope.endTime = function() {
        ionicTimePicker.openTimePicker(endtimeselect);
    };
    $scope.carBooking = function(data) {
        console.log(data);
        data.addressFormated = data.address.formatted_address;
        $scope.calculateDiff(data, function(totalHrs){
            console.log(totalHrs);
            console.log(data);
            store.set('data', data);
            ionicToast.show("Start Date :" + $filter('date')(new Date($scope.data.startdatedisplay)) + '<br/>' + 'End Date :' + $filter('date')(new Date($scope.data.enddatedisplay)) + '<br/>' + 'Start time :' + $filter('date')($scope.data.selectedstartTime, 'hh:mm a', 'UTC') + '<br/>' + 'End time :' + $filter('date')($scope.data.selectedendTime, 'hh:mm a', 'UTC') + '<br/>' + 'Age :' + $scope.data.age + '<br/>' + 'Address :' + $scope.data.addressFormated + '<br/>'+ 'TotalHrs : '+ totalHrs, 'middle', true, 2500);
            $timeout(function() {
                ionicToast.hide();
                $state.go('app.carpage.cartype1');
            }, 1000);    
        })
        
    }
}]);