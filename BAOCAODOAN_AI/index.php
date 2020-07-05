<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Math 3</title>
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css"
        integrity="sha384-9aIt2nRpC12Uk9gS9baDl411NQApFmC26EwAOH8WgZl5MYYxFfc+NcPb1dKGj7Sk" crossorigin="anonymous">
    <link rel="shortcut icon" href="./favicon1.png" type="image/x-icon">
    <script src="https://code.jquery.com/jquery-3.5.1.slim.min.js"
        integrity="sha384-DfXdz2htPH0lsSSs5nCTpuj/zy4C+OGpamoFVy38MVBnE+IbbVYUew+OrCXaRkfj"
        crossorigin="anonymous"></script>
    <script src="https://cdn.jsdelivr.net/npm/popper.js@1.16.0/dist/umd/popper.min.js"
        integrity="sha384-Q6E9RHvbIyZFJoft+2mJbHaEWldlvI9IOYy5n3zV9zzTtmI3UksdQRVvoxMfooAo"
        crossorigin="anonymous"></script>
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/js/bootstrap.min.js"
        integrity="sha384-OgVRvuATP1z7JjHLkuOU7Xw704+h835Lr+6QL9UvYjZE3Ipu6Tp75j7Bh/kR0JKI"
        crossorigin="anonymous"></script>
    <script src="./modules/handle.js"></script>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
    <script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.6.9/angular.min.js"></script>
    <script src="https://kit.fontawesome.com/6e914aa824.js" crossorigin="anonymous"></script>
    <script>

        var app = angular.module('myApp', []);
        app.controller('myCtrl', function ($scope) {
            $scope.start = 0;
            let getData = () => new Promise((resolve, reject) => {
                $.get('./data.txt', function (data) {
                    var x = data.split('\n');
                    x = x.filter(item => (item.trim() !== ""));
                    var dataLoop = x.map(item => {
                        return item.replace('.', ' FLAG').split('FLAG')[1].trim();
                    });
                    resolve(dataLoop);
                });
            });
            $scope.initData = () => {
                getData().then(result => {
                    $scope.BtnToogleValue = 'Xem Toàn Bộ Đề'
                    $scope.isShowModal = true;
                    $scope.dataInit = result;
                    $scope.dataAll = result.map((item,index) => {
                        return {
                            index : index + 1,
                            content : item
                        }
                    });
                    let subList = result.filter((item, index) => index < 7);
                    $scope.dataLoop = subList.map((item, index) => {
                        return {
                            id: index,
                            index: index + 1,
                            content: item,
                            toggle: false
                        }
                    });
                    $scope.currentPage = 1;
                    $scope.maxPage = (result.length % 7 == 0) ? Number.parseInt(result.length / 7) : Number.parseInt(result.length / 7 + 1);
                    $scope.$apply();
                })
            }
            $scope.BT = '';

            $scope.handleBT = () => {
                handleInput($scope.BT).then();
            }
            $scope.toggleCollapse = (id) => {
                $scope.dataLoop.forEach((item, index) => {
                    if (item.id !== (id)) {
                        $scope.dataLoop[index].toggle = false;
                    }
                })
                $scope.dataLoop[id].toggle = !$scope.dataLoop[id].toggle;
            }
            $scope.handleClickData = (content) => {
                $scope.BT = content;
                handleInput(content).then();
            }
            $scope.handleCloseDe = (id) => {
                $scope.dataLoop[id - 1].toggle = false;
            }
            $scope.nextPage = () => {
                if ($scope.currentPage < $scope.maxPage) {
                    let subData = $scope.dataInit.filter((item, index) => (index >= $scope.currentPage * 7 && index < ($scope.currentPage + 1) * 7));
                    $scope.dataLoop = subData.map((item, index) => {
                        return {
                            id: index,
                            index: $scope.dataInit.indexOf(item) + 1,
                            content: item,
                            toogle: false
                        }
                    });
                    $scope.currentPage++;
                }
            }
            $scope.handleViewAll = () => {
                $scope.isShowModal = !$scope.isShowModal;
                if($scope.isShowModal) {
                    $scope.BtnToogleValue = 'Xem Toàn Bộ Đề';
                }else{
                    $scope.BtnToogleValue = 'Giải Toán';
                }
            }
        });
    </script>
</head>

<body ng-app="myApp" ng-controller="myCtrl" ng-init="initData()">
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <a class="navbar-brand text-danger" href="#">AI PROJECT</a>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav mr-auto">
                <li class="nav-item active">
                    <!-- active -->
                </li>
            </ul>
            <form class="form-inline my-2 my-lg-0">
                <button class="btn btn-outline-success my-2 my-sm-0" ng-click="handleViewAll()" type="button">{{BtnToogleValue}}</button>
            </form>
        </div>
    </nav>
    <div class="d-flex">
        <div style="width: 20%;" class="p-2 order-1" ng-show="isShowModal">
            <div class="accordion" id="accordionExample">
                <div class="card" style="width: 18rem;">
                    <div class="card-body">
                        <h5 class="card-title text-center">ĐỀ MINH HỌA</h5>
                        <div style="width :100%;margin:0 auto;display:flex">
                            <div style="width: 25%;">
                                <button class="btn btn-light "><i class="fas fa-backward"></i></button>
                            </div>
                            <div style="width:50%;padding:10px">
                                <h6 style="line-height:18px;" class="text-center"> {{currentPage}} / {{maxPage}}</h6>
                            </div>
                            <div style="width: 25%;">
                                <button class="btn btn-light" ng-click="nextPage()"><i
                                        class="fas fa-forward"></i></button>
                            </div>

                        </div>
                    </div>
                </div>
                <div class="card" ng-repeat="item in dataLoop |limitTo : 7">
                    <div class="card-header" id="{{item.index}}">
                        <h2 class="mb-0">
                            <button class="btn btn-link btn-block text-left" ng-click="toggleCollapse(item.id)"
                                type="button" data-toggle="collapse" data-target="#collapseOne" aria-expanded="true"
                                aria-controls="{{item.index}}">
                                Đề {{item.index}}
                            </button>
                        </h2>
                    </div>

                    <div id="{{item.index}}" class="collapse show" ng-show="item.toggle"
                        aria-labelledby="{{item.index}}" data-parent="#accordionExample">
                        <div class="card-body">
                            <p>{{item.content}}</p>
                            <a href="#" ng-click="handleClickData(item.content)" class="card-link">XEM LỜI GIẢI</a>
                            <a href="#" class="card-link" ng-click="handleCloseDe(item.index)">ĐÓNG</a>
                        </div>

                    </div>
                </div>
            </div>
        </div>
        <div class="p-2 order-2 flex-fill bd-highlight">
            <div ng-show="isShowModal">
                <div class="card" style="min-height: 90vh;">
                    <!-- <img src="..." class="card-img-top" alt="..."> -->
                    <div class="card-body">
                        <h5 class="card-title">GIẢI TOÁN LỚP 3</h5>
                        <div class="form-group">
                            <label for="exampleFormControlTextarea1">Nhập Đề Bài :</label>
                            <textarea id="inputValue" class="form-control" id="exampleFormControlTextarea1" rows="3"
                                ng-model="BT"></textarea>
                        </div>
                        <a href="#" id="demo" class="btn btn-primary" ng-click="handleBT()">Kiểm Tra Bài Giải</a>
                        <div class="card mt-3" style="min-height: 50vh;">
                            <div class="card-body">
                                <p class="card-text">Bài Giải</p>
                                <div id="output"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div ng-show="!isShowModal">
                <table class="table">
                    <thead>
                        <tr>
                            <th scope="col">STT</th>
                            <th scope="col">Nội Dung Đề</th>
                        </tr>
                    </thead>
                    <tbody ng-repeat="item in dataAll">
                        <tr>
                            <th scope="row">{{item.index}}</th>
                            <td>{{item.content}}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>

</body>

</html>