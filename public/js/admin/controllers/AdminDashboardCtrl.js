app.controller('AdminDashboardCtrl',
    ['$rootScope', '$scope', 'DataAccess', 'ENTITY',
        function($rootScope, $scope, DataAccess, ENTITY) {
        	
            /**
             * init vars
             **/
            var resources = [ // app resources
                ENTITY.user, ENTITY.post, ENTITY.qcm
            ];

            for (var i = 0; i < resources.length; i++) {
                _getDatasAndSetNumber(resources[i]);
            };

            /**
             * private methods
             **/
            function _getDatasAndSetNumber(resourceName) { // set datas dynamicly
                DataAccess.getAllData(resourceName).then( function(data) {
                    $scope[resourceName] = data;
                    var nameNumber = resourceName + 'Number';
                    $scope[nameNumber] = Object.keys(data).length - 2; // prop promises
                });
            };
            

            /**
             * stats
             **/
            $scope.qcmDiagram = {
                "type": "PieChart",
                "displayed": true,
                "data": {
                    "cols": [
                        {
                            "id": "month",
                            "label": "Month",
                            "type": "string",
                            "p": {}
                        },
                        {
                            "id": "laptop-id",
                            "label": "Laptop",
                            "type": "number",
                            "p": {}
                        },
                        {
                            "id": "desktop-id",
                            "label": "Desktop",
                            "type": "number",
                            "p": {}
                        },
                        {
                            "id": "server-id",
                            "label": "Server",
                            "type": "number",
                            "p": {}
                        },
                        {
                            "id": "cost-id",
                            "label": "Shipping",
                            "type": "number"
                        },
                        {
                            "id": "",
                            "role": "tooltip",
                            "type": "string",
                            "p": {
                                "role": "tooltip",
                                "html": true
                            }
                        }
                    ],
                    "rows": [
                        {
                            "c": [
                                {
                                    "v": "January"
                                },
                                {
                                    "v": 19,
                                    "f": "42 items"
                                },
                                {
                                    "v": 12,
                                    "f": "Ony 12 items"
                                },
                                {
                                    "v": 7,
                                    "f": "7 servers"
                                },
                                {
                                    "v": 4
                                },
                                {
                                    "v": " <b>Shipping 4</b><br /><img src=\"http://icons.iconarchive.com/icons/antrepo/container-4-cargo-vans/512/Google-Shipping-Box-icon.png\" style=\"height:85px\" />",
                                    "p": {}
                                }
                            ]
                        },
                        {
                            "c": [
                                {
                                    "v": "February"
                                },
                                {
                                    "v": 13
                                },
                                {
                                    "v": 1,
                                    "f": "1 unit (Out of stock this month)"
                                },
                                {
                                    "v": 10
                                },
                                {
                                    "v": 2
                                },
                                {
                                    "v": " <b>Shipping 2</b><br /><img src=\"http://icons.iconarchive.com/icons/antrepo/container-4-cargo-vans/512/Google-Shipping-Box-icon.png\" style=\"height:85px\" />",
                                    "p": {}
                                }
                            ]
                        },
                        {
                            "c": [
                                {
                                    "v": "March"
                                },
                                {
                                    "v": 24
                                },
                                {
                                    "v": 5
                                },
                                {
                                    "v": 11
                                },
                                {
                                    "v": 6
                                },
                                {
                                    "v": " <b>Shipping 6</b><br /><img src=\"http://icons.iconarchive.com/icons/antrepo/container-4-cargo-vans/512/Google-Shipping-Box-icon.png\" style=\"height:85px\" />",
                                    "p": {}
                                }
                            ]
                        }
                    ]
                },
                "options": {
                    "title": "Sales per month",
                    "isStacked": "true",
                    "fill": 20,
                    "displayExactValues": true,
                    "vAxis": {
                        "title": "Sales unit",
                        "gridlines": {
                            "count": 2
                        }
                    },
                    "hAxis": {
                        "title": "Date"
                    },
                    "tooltip": {
                        "isHtml": true
                    }
                },
                "formatters": {}
            };

            $scope.qcmDiagram2 = {
                "type": "BarChart",
                "displayed": true,
                "data": {
                    "cols": [
                        {
                            "id": "month",
                            "label": "Month",
                            "type": "string",
                            "p": {}
                        },
                        {
                            "id": "laptop-id",
                            "label": "Laptop",
                            "type": "number",
                            "p": {}
                        },
                        {
                            "id": "desktop-id",
                            "label": "Desktop",
                            "type": "number",
                            "p": {}
                        },
                        {
                            "id": "server-id",
                            "label": "Server",
                            "type": "number",
                            "p": {}
                        },
                        {
                            "id": "cost-id",
                            "label": "Shipping",
                            "type": "number"
                        },
                        {
                            "id": "",
                            "role": "tooltip",
                            "type": "string",
                            "p": {
                                "role": "tooltip",
                                "html": true
                            }
                        }
                    ],
                    "rows": [
                        {
                            "c": [
                                {
                                    "v": "January"
                                },
                                {
                                    "v": 19,
                                    "f": "42 items"
                                },
                                {
                                    "v": 12,
                                    "f": "Ony 12 items"
                                },
                                {
                                    "v": 7,
                                    "f": "7 servers"
                                },
                                {
                                    "v": 4
                                },
                                {
                                    "v": " <b>Shipping 4</b><br /><img src=\"http://icons.iconarchive.com/icons/antrepo/container-4-cargo-vans/512/Google-Shipping-Box-icon.png\" style=\"height:85px\" />",
                                    "p": {}
                                }
                            ]
                        },
                        {
                            "c": [
                                {
                                    "v": "February"
                                },
                                {
                                    "v": 13
                                },
                                {
                                    "v": 1,
                                    "f": "1 unit (Out of stock this month)"
                                },
                                {
                                    "v": 10
                                },
                                {
                                    "v": 2
                                },
                                {
                                    "v": " <b>Shipping 2</b><br /><img src=\"http://icons.iconarchive.com/icons/antrepo/container-4-cargo-vans/512/Google-Shipping-Box-icon.png\" style=\"height:85px\" />",
                                    "p": {}
                                }
                            ]
                        },
                        {
                            "c": [
                                {
                                    "v": "March"
                                },
                                {
                                    "v": 24
                                },
                                {
                                    "v": 5
                                },
                                {
                                    "v": 11
                                },
                                {
                                    "v": 6
                                },
                                {
                                    "v": " <b>Shipping 6</b><br /><img src=\"http://icons.iconarchive.com/icons/antrepo/container-4-cargo-vans/512/Google-Shipping-Box-icon.png\" style=\"height:85px\" />",
                                    "p": {}
                                }
                            ]
                        }
                    ]
                },
                "options": {
                    "title": "Sales per month",
                    "isStacked": "true",
                    "fill": 20,
                    "displayExactValues": true,
                    "vAxis": {
                        "title": "Sales unit",
                        "gridlines": {
                            "count": 2
                        }
                    },
                    "hAxis": {
                        "title": "Date"
                    },
                    "tooltip": {
                        "isHtml": true
                    }
                },
                "formatters": {}
            }
        }]);