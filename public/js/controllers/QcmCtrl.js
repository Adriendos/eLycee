app.controller('QcmCtrl',['QcmsFactory', '$scope', function(QcmsFactory, $scope) {
    var self = this;

    $scope.chartObject = {
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
                }
            ],
            "rows": [
                {
                    "c": [
                        {
                            "v": "Bonnes réponses"
                        },
                        {
                            "v": 19,
                            "f": "42 items"
                        }
                    ]
                },
                {
                    "c": [
                        {
                            "v": "Mauvaises réponses"
                        },
                        {
                            "v": 13
                        }
                    ]
                }
            ]
        },
        "options": {
            "title": "Taux de réussite",
            "isStacked": "true",
            "fill": 20,
            "displayExactValues": true,
            "vAxis": {
                "title": "Sales unit",
                "gridlines": {
                    "count": 10
                }
            },
            "hAxis": {
                "title": "Date"
            }
        },
        "formatters": {}
    }
}]);