"use sctrict";

var generatorApp = angular.module('generatorApp', []);

generatorApp.controller('generatorAppCtrl', ['$scope', function ($scope) {

	$scope.checkboxOperations = {
		summation: true,
		subtraction: false,
		multiplication: true,
		division: false
	}

	$scope.quantity = 10;
	$scope.maxNumber = 100;
	
$scope.generate = function() {	

		$scope.result = [];

		operatorsArray =[];
		oper = $scope.checkboxOperations
		if (oper.summation) operatorsArray.push('summation');
		if (oper.subtraction) operatorsArray.push('subtraction');
		if (oper.multiplication) operatorsArray.push('multiplication');
		if (oper.division) operatorsArray.push('division');

		for (i = 1; i <= $scope.quantity; i++) {

			randNumber = Math.floor(Math.random()*operatorsArray.length + 1);
			operation = operatorsArray[randNumber - 1];
			console.log(operation);

			number1 = +randomNumber('number1');
			number2 = +randomNumber('number2');

			switch(operation) {
				case 'summation': 
					evalExpression = number1 + number2;
					$scope.result.push(number1 + ' + ' + number2 + ' = ' + evalExpression);
					break;

				case 'subtraction':
					evalExpression = number1 - number2;
					$scope.result.push(number1 + ' - ' + number2 + ' = ' + evalExpression);
					break;

				case 'multiplication':
					evalExpression = number1 * number2;
					$scope.result.push(number1 + ' * ' + number2 + ' = ' + evalExpression);
					break;

				case 'division':
					evalExpression = number1 / number2;
					if ((+evalExpression % 1 + '').length  > 5) evalExpression = evalExpression.toFixed(2);
					$scope.result.push(number1 + ' / ' + number2 + ' = ' + evalExpression);
					break;
			}
		}
	}

	randomNumber = function(number) {
		if (number === 'number1') {
			return Math.round(Math.random() * $scope.maxNumber);	
		} else {
			return Math.round(Math.random() * ($scope.maxNumber - 1) + 1);
		}
	}

}]);