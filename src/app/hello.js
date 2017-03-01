angular
  .module('app')
  .component('app', {
    templateUrl: 'app/hello.html',
    controller: function ($websocket) {
      this.hello = 'Hello World!';

      var maxElement = 30;

      var countSuccessData = [];
      var countFailureData = [];
      var countTimeoutsData = [];
      var countBreakerOpenData = [];
      var labels = [];

      var averageSuccessData = [];
      var averageFailureData = [];

      var countOpenData = [];
      var countCloseData = [];
      var countHalfOpenData = [];

      const websocket = $websocket('ws://localhost:8080/stats');
      websocket.onMessage(function (message) {
        var data = JSON.parse(message.data);

        countSuccessData.push(data.callSuccesses.count);
        countFailureData.push(data.callFailures.count);
        countTimeoutsData.push(data.callTimeouts.count);
        countBreakerOpenData.push(data.callBreakerOpens.count);

        averageSuccessData.push(data.callSuccesses.elapsedTotal / data.callSuccesses.count);
        averageFailureData.push(data.callFailures.elapsedTotal / data.callFailures.count);

        countOpenData.push(data.opens.length);
        countCloseData.push(data.closes.length);
        countHalfOpenData.push(data.halfOpens.length);

        labels.push(moment(data.stop).format('HH:mm:ss'));

        if (countSuccessData.length == maxElement) {
          countSuccessData.splice(0, 1);
          countFailureData.splice(0, 1);
          countTimeoutsData.splice(0, 1);
          countBreakerOpenData.splice(0, 1);

          averageSuccessData.splice(0, 1);
          averageFailureData.splice(0, 1);

          countOpenData.splice(0, 1);
          countCloseData.splice(0, 1);
          countHalfOpenData.splice(0, 1);

          labels.splice(0, 1);
        }
      });


      this.labels = labels;
      this.countSeries = ['Success', 'Failures', 'Timeouts', "Breaker Open"];
      this.averageSeries = ['Success', 'Failures'];
      this.statusSeries = ['Open', 'Close', 'HalfClose'];

      this.countData = [countSuccessData, countFailureData, countTimeoutsData, countBreakerOpenData];
      this.averageData = [averageSuccessData, averageFailureData];
      this.statusData = [countOpenData, countHalfOpenData, countCloseData];

      this.countDataset = [{
        fill: false,
        borderColor: "#099600",
        pointBorderColor: "#099600",
        pointBackgroundColor: "#099600"
      }, {
        fill: false,
        borderColor: "#E8001C",
        pointBorderColor: "#E8001C",
        pointBackgroundColor: "#E8001C"
      }, {
        fill: false,
        borderColor: "#0058FF",
        pointBorderColor: "#0058FF",
        pointBackgroundColor: "#0058FF"
      }, {
        fill: false,
        borderColor: "#E8A100",
        pointBorderColor: "#E8A100",
        pointBackgroundColor: "#E8A100"
      }];

      this.averageDataset = [{
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        borderColor: "rgba(75, 192, 192, 0.2)"
      }, {
        backgroundColor: "rgba(255, 99, 132, 0.2)",
        borderColor: "rgba(255, 99, 132, 0.2)"
      }];

      this.statusDataset = [{
        backgroundColor: "rgba(255, 99, 132, 0.2)",
        borderColor: "rgba(255, 99, 132, 0.2)"
      }, {
        backgroundColor: "rgba(255, 159, 64, 0.2)",
        borderColor: "rgba(255, 159, 64, 0.2)"
      }, {
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        borderColor: "rgba(75, 192, 192, 0.2)"
      }];

      this.countOptions = {
        animation: false,
        maintainAspectRatio: false
      };

      this.averageOptions = {
        animation: false,
        maintainAspectRatio: false
      };
      this.statusOptions = {
        animation: false,
        maintainAspectRatio: false
      };


    }
  });
