angular.module('starter.controllers').controller('loginCtrl', ['$scope', '$rootScope', '$http', '$state', '$stateParams','$cordovaEmailComposer', '$cordovaOauth', 'store', 'ionicDatePicker', 'ionicTimePicker', 'ionicToast', '$filter', '$timeout', '$ionicHistory', function($scope, $rootScope, $http, $state, $stateParams,$cordovaEmailComposer,$cordovaOauth, store, ionicDatePicker, ionicTimePicker, ionicToast, $filter, $timeout, $ionicHistory, $ionicViewSwitcher) {
    $scope.register_init = function() {
        $rootScope.$root.showMenuButton = true;
    }
    $scope.Login_init = function() {
        $rootScope.$root.showMenuButton = false;
    }
    $scope.init = function() {
        $rootScope.islogin = store.get('userdata') || false;
        $scope.mailLink = "mailto:" + "info@digitalfives.com" + "?subject=" + "test" + '&body=' + "Test";
    }
        // Perform the login action when the user submits the login form
    $scope.doLogin = function(loginData) {
        $http.post(baseURL + 'login', loginData).success(function(res, req) {
            var user = res.record;
            if (res.status == 1) {
                userdata = {
                    user_login: true,
                    user_id: user._id,
                    user_email: user.email,
                    firstname: user.firstname,
                    lastname: user.lastname,
                    mobile: user.mobile
                }
                store.set('userdata', userdata);
                $rootScope.islogin = store.get('userdata');
                $state.go('app.browse');
            } else {
                $scope.errMsgLogin = res.message;
            }
        }).error(function(err) {
            console.log('Internet Connection Is Not Available.');
        })
    }
    $scope.adduser = function(userData) {
        $http.post(baseURL + 'signup', userData).success(function(res, req) {
            console.log(res.status);
            if (res.status == 2) {
                $scope.errMsg = res.message + "Please Login.";
                $timeout(function() {
                    $state.go('app.login');
                }, 3000);
            } else if (res.status == 1) {
                $scope.successMsg = res.message;
                $timeout(function() {
                    $state.go('app.login');
                }, 3000);
            } else {
                $scope.errMsg = res.message;
            }
        }).error(function(err) {
            console.log('Internet Connection Is Not Available.');
        })
    }
    $scope.facebookLogin = function() {
        $cordovaOauth.facebook("227183420967954", ["email"]).then(function(result) {
            $http.get("https://graph.facebook.com/v2.2/me", {
                params: {
                    access_token: result.access_token,
                    fields: "name,gender,location,picture.type(large),email,first_name,last_name,verified",
                    format: "json"
                }
            }).then(function(userdata) {
                $http.post(baseURL + 'FacebookLogin', userdata.data).success(function(res, req) {
                    if (res.status == 1) {
                        var user = res.record;
                        userdata = {
                            user_login: true,
                            user_id: user._id,
                            user_email: user.email,
                            firstname: user.firstname,
                            lastname: user.lastname,
                            profileimage : user.profile_image
                        }
                        store.set('userdata', userdata);
                        $rootScope.islogin = store.get('userdata');
                        $state.go('app.browse');
                    } else {
                    $scope.errMsgLogin = res.message;
                    }
                }).error(function(err) {
                    console.log('Internet Connection Is Not Available.');
                })
            }, function(error) {
                alert("Error: " + error);
            });
        }, function(error) {
            console.log(error);
        });
    }

    $scope.googleLogin = function(){
        console.log("googleLogin");
        $cordovaOauth.google("773558235993-1jmqo0sor1lkg32smcbd9rs6purr4qfa.apps.googleusercontent.com", ["https://www.googleapis.com/auth/urlshortener", "https://www.googleapis.com/auth/userinfo.email"]).then(function(result) {
        
        $http.get("https://www.googleapis.com/oauth2/v1/userinfo", { 
            params: { 
                access_token: result.access_token, format: "json",
                //fields: "name,gender,location,picture.type(large),email,first_name,last_name,verified",            
             }
             }).then(function(userdata) {
                
            //console.log(response);
            console.log(userdata);
            $http.post(baseURL + 'googleLogin', userdata.data).success(function(res, req) {
                if (res.status == 1) {
                var user = res.record;
                         userdata = {
                            user_login: true,
                            user_id: user._id,
                            user_email: user.email,
                            firstname: user.firstname,
                            lastname: user.lastname,
                            profileimage : user.profile_image
                        }
                        store.set('userdata', userdata);
                        $rootScope.islogin = store.get('userdata');
                        $state.go('app.browse');
                     } else {
                    $scope.errMsgLogin = res.message;
                     }
                }).error(function(err) {
                  console.log('Internet Connection Is Not Available.');
                })
            
        }, function(error) {
                alert("Error: " + error);
            });   

        // $http.get("https://accounts.google.com/o/oauth2/token", {
        //         params: {
        //             access_token: result.access_token,
        //             fields: "name,gender,location,picture.type(large),email,first_name,last_name,verified",
        //             format: "json"
        //         }
        //     }).then(function(userdata) {
        //         console.log(userdata);
        //         // $http.post(baseURL + 'googleLogin', userdata.data).success(function(res, req) {
        //         //     if (res.status == 1) {
        //         //         var user = res.record;
        //         //         userdata = {
        //         //             user_login: true,
        //         //             user_id: user._id,
        //         //             user_email: user.email,
        //         //             firstname: user.firstname,
        //         //             lastname: user.lastname,
        //         //             profileimage : user.profile_image
        //         //         }
        //         //         store.set('userdata', userdata);
        //         //         $rootScope.islogin = store.get('userdata');
        //         //         $state.go('app.browse');
        //         //     } else {
        //         //     $scope.errMsgLogin = res.message;
        //         //     }
        //         }).error(function(err) {
        //             console.log('Internet Connection Is Not Available.');
        //         })
        //     }, function(error) {
        //         alert("Error: " + error);
        //     });
        
           
         console.log(JSON.stringify(result));
        }, function(error) {
            console.log(error);
        });
    }   
        
    }]);