function drawDataChart() {
	$.ajax({
		url: '../v1.0/id/1/ch/1/dp',
		type: 'GET',
		async: true,
		dataType: 'json',
		success: function(data, textStatus)
		{
			var dataJSON = JSON.parse(data);
			var dataArray = new Array();
			for (var i=0; i<dataJSON.length; i++) {
				dataArray[i] = parseFloat(dataJSON[i].val);
			}

			$('#container').highcharts('StockChart', {

            rangeSelector : {
                selected : 1,
                inputEnabled: $('#container').width() > 480
            },

            title : {
                text : 'iot-pro test page'
            },

            series : [{
                name : 'AAPL',
                data : dataArray,
                tooltip: {
                    valueDecimals: 2
                }
            }]
        	});
		},
		error: function(data, textStatus)
		{
			console.log("Net Error");
		}
	});
};