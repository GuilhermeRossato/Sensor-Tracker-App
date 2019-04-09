angular.module('TemperatureWatcher')
.component(elementNameToCamelCase('measurement-view'), {
    templateUrl: 'app/components/measurement-view/template.html',
    controller: function($scope) {

        const maxValuesToWatch = 5;

        function onMeasurementUpdate(newMeasurement) {
            $scope.measurement = newMeasurement ? newMeasurement : {values:[]}

            if (!$scope.measurement.values) {
                $scope.error = "Missing values";
                return false;
            }

            updateGraph(newMeasurement);
        }

        function updateGraph(measurement) {
            let minValue;
            let maxValue;
            const measures = measurement.values.map(function (measure) {
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
            }).filter((element, index, array) => (array.length - index <= maxValuesToWatch));

            const isOutsideRange = (minValue < measurement.min_value || maxValue > measurement.max_value);

            const bgColor = isOutsideRange?"#EBA236":"#36A2EB";

            const title = measurement.name+(isOutsideRange?"*":"");
            $scope.title = title;
            $scope.graphData.labels = measures.map(m => m.label);
            $scope.graphData.datasets[0].data = measures.map(m => m.value);
            $scope.graphData.datasets[0].backgroundColor[0] = bgColor;
            $scope.order = (isOutsideRange?1:2);
            $scope.limitString = "Min: "+measurement.min_value+"ºC - Max: "+measurement.max_value+"ºC";
        }

        $scope.$watch('$ctrl.measurement', onMeasurementUpdate);
        $scope.$watch('$ctrl.measurements', (newList) => newList ? ($scope.measurements = newList) : false);

        $scope.graphData = {
            labels: ["1","2"],
            datasets: [
                {
                    label: "Temperature Readings",
                    lineTension: 0.1,
                    data: [3, 4],
                    backgroundColor: ["#36A2EB"],
                    hoverBackgroundColor: ["#36A2EB"]
                }
            ]
        };

        $scope.limitString = "";

        $scope.myOptions =  {
            legend: {
                display: true
            },
            scales: {
                yAxes: [{id: 'y-axis-1', type: 'linear', position: 'left', ticks: {min: 0, max:10}}]
            }
        };

        $scope.myPlugins = [{}];
    },
    bindings: {
        measurement: '<',
        measurements: '<'
    }
});