// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'ngCordova','ngCordovaOauth', 'starter.controllers', 'angular-storage', 'ionic-datepicker', 'ionic-toast','ionic-timepicker', 'ngMessages'])

.run(function($ionicPlatform, $rootScope, $ionicNavBarDelegate, $cordovaNetwork) {

  $rootScope.$on('$stateChangeSuccess', function() {
        $ionicNavBarDelegate.showBackButton(true);
  });

  $ionicPlatform.ready(function() {

    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.directive('tabState', function($state) {

    return {
      restrict: 'A',
      link: function (scope, element, attrs) {
        scope.$watch(function() {
          return $state.current.name;
        }, function(stateName) {
           if(stateName === attrs.uiSref) {
             element.addClass('active')
           }
          else {
            element.removeClass('active')
          }
        });
      }
    };
  })

.config(function($stateProvider, $urlRouterProvider, ionicDatePickerProvider, ionicTimePickerProvider, $ionicConfigProvider ) {

   var datePickerObj = {
      inputDate: new Date(),
      setLabel: 'Set',
      todayLabel: 'Today',
      closeLabel: 'Close',
      mondayFirst: false,
      weeksList: ["S", "M", "T", "W", "T", "F", "S"],
      monthsList: ["Jan", "Feb", "March", "April", "May", "June", "July", "Aug", "Sept", "Oct", "Nov", "Dec"],
      templateType: 'popup',
      from: new Date(2012, 8, 1),
      to: new Date(2018, 8, 1),
      showTodayButton: true,
      dateFormat: 'dd MMMM yyyy',
      closeOnSelect: false,
      disableWeekdays: []
    };
    ionicDatePickerProvider.configDatePicker(datePickerObj);

    var timePickerObj = {
      inputTime: (((new Date()).getHours() * 60 * 60) + ((new Date()).getMinutes() * 60)),
      format: 12,
      step: 15,
      setLabel: 'Set',
      closeLabel: 'Close'
    };
    ionicTimePickerProvider.configTimePicker(timePickerObj);

  $stateProvider

  .state('app', {
    url: '/app',
    abstract: true,
    templateUrl: 'templates/menu.html',
    controller: 'AppCtrl'
  })

  .state('app.search', {
    url: '/search',
    views: {
      'menuContent': {
        templateUrl: 'templates/search.html'
      }
    }
  })

  .state('app.login', {
    url: '/login',
    views: {
      'menuContent': {
        templateUrl: 'templates/login.html',
        controller : 'loginCtrl'
      }
    }
  })
    

  .state('app.register', {
    url: '/register',
    views: {
      'menuContent': {
        templateUrl: 'templates/register.html'
      }
    },defaultBack: {
        state: 'app.login'
    }
  })


  .state('app.browse', {
      url: '/browse',
      cache : false,
      views: {
        'menuContent': {
          templateUrl: 'templates/browse.html'
        }
      }
    })

  .state('app.carpage', {
      url: '/carpage',
      views: {
        'menuContent': {
          templateUrl: 'templates/carpage.html',
          controller : 'carController'
        }
      },
      defaultBack: {
        state: 'app.car-booking'
    }
    })

  .state('app.carpage.cartype1', {
    url: '/cartype1',
    views: {
      'app-carpage-cartype1': {
        templateUrl: 'templates/carType1.html'
      }
    },
      defaultBack: {
        state: 'app.car-booking'
    }
  })

  .state('app.carpage.cartype2', {
    url: '/cartype2',
    views: {
      'app-carpage-cartype2': {
        templateUrl: 'templates/carType2.html'
      }
    },
      defaultBack: {
        state: 'app.car-booking'
    }
  })

  .state('app.carpage.cartype3', {
    url: '/cartype3',
    views: {
      'app-carpage-cartype3': {
        templateUrl: 'templates/carType3.html'
      }
    },
      defaultBack: {
        state: 'app.car-booking'
    }
  })

  .state('app.carpage.cartype4', {
    url: '/cartype4',
    views: {
      'app-carpage-cartype4': {
        templateUrl: 'templates/carType4.html'
      }
    },
      defaultBack: {
        state: 'app.car-booking'
    }
  })
    .state('app.carDetails', {
      url: '/carDetails/:carId',
      cache : false,
      views: {
        'menuContent': {
          templateUrl: 'templates/carDetails.html',
          controller : 'carDetailsCtrl'
        }
      },
      defaultBack: {
        state: 'app.carpage.cartype1'
      }
    })

    .state('app.carPayment', {
      url: '/carPayment/:carId',
      views: {
        'menuContent': {
          templateUrl: 'templates/carPayment.html',
          controller: 'carPaymentCtrl'
        }
      },defaultBack:{
        state : 'app.carDetails'
      }
    })

    .state('app.carPayment.debitCard', {
      url: '/debitCard',
      views: {
        'menuContent': {
          templateUrl: 'templates/debitCard.html'
        }
      }
    })
    .state('app.carPayment.creditCard', {
      url: '/creditCard',
      views: {
        'menuContent': {
          templateUrl: 'templates/creditCard.html'
        }
      }
    })

    .state('app.carPayment.netBanking', {
      url: '/netBanking',
      views: {
        'menuContent': {
          templateUrl: 'templates/netBanking.html'
        }
      }
    })

    .state('app.dateEdit', {
      url: '/dateEdit',
      views: {
        'menuContent': {
          templateUrl: 'templates/dateEdit.html',
          controller : 'ListCtr'

        }
      }
    })
  .state('app.car-booking', {
      url: '/car-booking',
      cache: true,
      views: {
        'menuContent': {
          templateUrl: 'templates/car-booking.html',
           controller : 'ListCtr'
        }
      },
      defaultBack: {
        state: 'app.browse'
    }
    })
       
    .state('app.my-booking', {
      url: '/my-booking',
      cache: true,
      views: {
        'menuContent': {
          templateUrl: 'templates/my-booking.html',
           controller : ''
        }
      },
      defaultBack: {
        state: 'app.browse'
    }
    })
     
     .state('app.booking-live', {
      url: '/booking-live',
      cache: true,
      views: {
        'menuContent': {
          templateUrl: 'templates/booking-live.html',
           controller : ''
        }
      },
      defaultBack: {
        state: 'app.browse'
    }
    })
      .state('app.profile', {
            url: '/profile',
            views: {
                'menuContent': {
                    templateUrl: 'templates/profile.html',
                    controller: 'carController'
                }
            }
        })
      .state('app.booking-future', {
      url: '/booking-future',
      cache: true,
      views: {
        'menuContent': {
          templateUrl: 'templates/booking-future.html',
           controller : ''
        }
      },
      defaultBack: {
        state: 'app.browse'
    }
    })
    
    .state('app.booking-completed', {
      url: '/booking-completed',
      cache: true,
      views: {
        'menuContent': {
          templateUrl: 'templates/booking-completed.html',
           controller : ''
        }
      },
      defaultBack: {
        state: 'app.browse'
    }
    })
    
     .state('app.booking-cancelled', {
      url: '/booking-cancelled',
      cache: true,
      views: {
        'menuContent': {
          templateUrl: 'templates/booking-cancelled.html',
           controller : ''
        }
      },
      defaultBack: {
        state: 'app.browse'
    }
    })


     .state('app.recent-searches', {
      url: '/booking-cancelled',
      cache: true,
      views: {
        'menuContent': {
          templateUrl: 'templates/recent-searches.html',
           controller : ''
        }
      },
      defaultBack: {
        state: 'app.browse'
    }
    })
     
     .state('app.contactus', {
      url: '/contactus',
      cache: true,
      views: {
        'menuContent': {
          templateUrl: 'templates/contactus.html',
           controller : 'loginCtrl'
        }
      },
      defaultBack: {
        state: 'app.browse'
    }
    })

     .state('app.offers-deals', {
      url: '/offers-deals',
      cache: true,
      views: {
        'menuContent': {
          templateUrl: 'templates/offers-deals.html',
           controller : ''
        }
      },
      defaultBack: {
        state: 'app.browse'
    }
    })
    
    .state('app.offers-deals.offers1', {
      url: '/offers1',
      cache: true,
      views: {
        'app.offers-deals.offers1': {
          templateUrl: 'templates/offers1.html',
           controller : ''
        }
      },
      defaultBack: {
        state: 'app.browse'
    }
    })
      
      .state('app.offers-deals.deals1', {
      url: '/deals1',
      cache: true,
      views: {
        'app.offers-deals.deals1': {
          templateUrl: 'templates/deals1.html',
           controller : ''
        }
      },
      defaultBack: {
        state: 'app.browse'
    }
    })
      

      .state('app.invite', {
      url: '/invite',
      cache: true,
      views: {
        'menuContent': {
          templateUrl: 'templates/invite.html',
           controller : 'profileCtrl'
        }
      },
      defaultBack: {
        state: 'app.browse'
    }
    })


      .state('app.policy', {
      url: '/policy',
      cache: true,
      views: {
        'menuContent': {
          templateUrl: 'templates/policy.html',
           controller : ''
        }
      },
      defaultBack: {
        state: 'app.browse'
    }
    })

      .state('app.member-agreement', {
      url: '/member-agreement',
      cache: true,
      views: {
        'menuContent': {
          templateUrl: 'templates/member-agreement.html',
           controller : ''
        }
      },
      defaultBack: {
        state: 'app.browse'
    }
    })
     

      .state('app.free-policy', {
      url: '/free-policy',
      cache: true,
      views: {
        'menuContent': {
          templateUrl: 'templates/free-policy.html',
           controller : ''
        }
      },
      defaultBack: {
        state: 'app.browse'
    }
    })


      .state('app.Eligibility', {
      url: '/Eligibility',
      cache: true,
      views: {
        'menuContent': {
          templateUrl: 'templates/Eligibility.html',
           controller : ''
        }
      },
      defaultBack: {
        state: 'app.browse'
    }
    })
     

      .state('app.Going-Outstation', {
      url: '/Going-Outstation',
      cache: true,
      views: {
        'menuContent': {
          templateUrl: 'templates/Going-Outstation.html',
           controller : ''
        }
      },
      defaultBack: {
        state: 'app.browse'
    }
    })


      .state('app.how-tigtagcar', {
      url: '/how-tigtagcar',
      cache: true,
      views: {
        'menuContent': {
          templateUrl: 'templates/how-tigtagcar.html',
           controller : ''
        }
      },
      defaultBack: {
        state: 'app.browse'
    }
    })
      

      .state('app.privacy-policy', {
      url: '/free-policy',
      cache: true,
      views: {
        'menuContent': {
          templateUrl: 'templates/privacy-policy.html',
           controller : ''
        }
      },
      defaultBack: {
        state: 'app.browse'
    }
    })


      .state('app.tigtag-safety', {
      url: '/tigtag-safety',
      cache: true,
      views: {
        'menuContent': {
          templateUrl: 'templates/tigtag-safety.html',
           controller : ''
        }
      },
      defaultBack: {
        state: 'app.browse'
    }
    })

      .state('app.upcoming-season', {
      url: '/upcoming-season',
      cache: true,
      views: {
        'menuContent': {
          templateUrl: 'templates/upcoming-season.html',
           controller : ''
        }
      },
      defaultBack: {
        state: 'app.browse'
    }
    })


    .state('NoConnection', {
      url: '/NoConnection',
      templateUrl: 'templates/noConnection.html',
      controller: 'AppCtrl'
    })

    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/app/browse'); 

})

.service('yearListService', function(){
  startYear = 2001;
  years = [];
  while ( startYear <= 2100 ) {
    years.push(startYear++);
  }
  this.list = years;
})

.service('monthListService', function(){
  startmonth = 1;
  months = [];
  while ( startmonth <= 12 ) {
    months.push(startmonth++);
  }
  this.list = months;
})

.directive('defaultNavBackButton', function ($ionicHistory, $state, $stateParams, $ionicConfig, $ionicViewSwitcher, $ionicPlatform) {

        return {
            link: link,
            restrict: 'AC',
            // Use a higher priority than the Ionic Framework menu-close
            priority: 1
        };

        function link(scope, element, attrs) {

            scope.goBack = function() {
                // if ($ionicHistory.backView()) {
                //     console.log($ionicHistory.backView());
                //     $ionicHistory.goBack();
                // } else {
                    goDefaultBack();
                // }
            };

            scope.$on('$stateChangeSuccess', function() {
                element.toggleClass('hide', !getDefaultBack());
            });

            $ionicPlatform.registerBackButtonAction(function (event) {
                event.preventDefault();
                console.log("registerBackButtonAction");
                if ($ionicHistory.backView()) {
                   console.log("History test ");
                    $ionicHistory.goBack();
                } else if( $ionicHistory.backView()) {
                    goDefaultBack();
                } else {
                    navigator.app.exitApp();
                }
            }, 100);

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
                console.log(getDefaultBack().getStateParams);
                params = getDefaultBack().getStateParams($stateParams);
            }

            $state.go(getDefaultBack().state, params);
        }
    })

.directive('focusMe', function ($timeout) {
  return {
    link: function (scope, element, attrs) {
      if (attrs.focusMeDisable === "true") {
        return;
      }
      $timeout(function () {
        element[0].focus();
        if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
          cordova.plugins.Keyboard.show(); //open keyboard manually
        }
      }, 350);
    }
  };
});