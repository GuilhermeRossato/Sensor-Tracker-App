angular.module('TemperatureWatcher')
.component(elementNameToCamelCase('measurement-view'), {
    templateUrl: 'app/components/measurement-view/template.html',
    controller: function($scope) {
        $scope.$watch('$ctrl.measurement', (newVal) => {
            if (!newVal) {
                $scope.measurement = {values:[]};
            } else {
                $scope.measurement = newVal;
            }
            if (!$scope.measurement.values) {
                $scope.graphData.labels = ["Missing values"];
                $scope.graphData.datasets[0].data = [0];
                return false;
            }
            let minValue;
            let maxValue;
            const measures = $scope.measurement.values.map(function (measure) {
                if (typeof measure.date === "string") {
                    measure.date = new Date(measure.date);
                }
                if (minValue === undefined || minValue > measure.value) {
                    minValue = measure.value;
                }
                if (maxValue === undefined || maxValue > measure.value) {
                    maxValue = measure.value;
                }
                return {
                    "label": formatDateString(measure.date).substr(11),
                    "value": measure.value.toFixed(2)
                }
            }).filter((element, index, array) => (array.length - index <= 4));

            const isOutsideRange = (minValue < $scope.measurement.min_value || maxValue > $scope.measurement.max_value);

            const bgColor = isOutsideRange?"#EBA236":"#36A2EB";

            const title = $scope.measurement.name+(isOutsideRange?"*":"");
            $scope.title = title;
            $scope.graphData.labels = measures.map(m => m.label);
            $scope.graphData.datasets[0].data = measures.map(m => m.value);
            $scope.graphData.datasets[0].backgroundColor[0] = bgColor;
            $scope.order = (isOutsideRange?1:2);
            $scope.limits = "Min: "+$scope.measurement.min_value+"ºC - Max: "+$scope.measurement.max_value+"ºC";
        });

        $scope.$watch('$ctrl.measurements', (newVal) => newVal ? ($scope.measurements = newVal) : false);

        $scope.graphData = {
            labels: ["1","2","3","4"],
            datasets: [
                {
                    label: "Temperature Readings",
                    lineTension: 0.1,
                    data: [3, 4, 5, 3],
                    backgroundColor: ["#36A2EB"],
                    hoverBackgroundColor: ["#36A2EB"]
                }
            ]
        };

        $scope.order = 2;
        $scope.limits = "";

        $scope.myOptions =  {
            legend: {
                display: true
            },
            scales: {
                yAxes: [{id: 'y-axis-1', type: 'linear', position: 'left', ticks: {min: 0, max:10}}]
            }
        };

        $scope.myPlugins = [{}];

        $scope.onChartClick = function (event) {
          console.log(event);
        };
    },
    bindings: {
        measurement: '<',
        measurements: '<'
    }
});