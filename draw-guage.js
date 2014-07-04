$(function () {

    var Band = {
        RED : {
            rps : 100,
            color : '#DF5353'
        },
        YELLOW : {
            rps : 300,
            color: '#DDDF0D'
        },
        GREEN : {
            rps : 500,
            color: '#55BF3B'
        }
    };

    $('#container').highcharts({

                chart: {
                    type               : 'gauge',
                    plotBackgroundColor: null,
                    plotBackgroundImage: null,
                    plotBorderWidth    : 0,
                    plotShadow         : false
                },

                title: {
                    text: 'Requests per seconds'
                },

                exporting: {
                    enabled: false
                },

                credits: {
                    enabled: false
                },

                pane : {
                    startAngle: -150,
                    endAngle  : 150,
                    background: [
                        {
                            backgroundColor: {
                                linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
                                stops         : [
                                    [0, '#FFF'],
                                    [1, '#333']
                                ]
                            },
                            borderWidth    : 0,
                            outerRadius    : '109%'
                        },
                        {
                            backgroundColor: {
                                linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
                                stops         : [
                                    [0, '#333'],
                                    [1, '#FFF']
                                ]
                            },
                            borderWidth    : 1,
                            outerRadius    : '107%'
                        },
                        {
                            // default background
                        },
                        {
                            backgroundColor: '#DDD',
                            borderWidth    : 0,
                            outerRadius    : '105%',
                            innerRadius    : '103%'
                        }
                    ]
                },

                // the value axis
                yAxis: {
                    min: 0,
                    max: Band.GREEN.rps,

                    minorTickInterval: 'auto',
                    minorTickWidth   : 1,
                    minorTickLength  : 10,
                    minorTickPosition: 'inside',
                    minorTickColor   : '#666',

                    tickPixelInterval: 30,
                    tickWidth        : 2,
                    tickPosition     : 'inside',
                    tickLength       : 10,
                    tickColor        : '#666',
                    labels           : {
                        step    : 2,
                        rotation: 'auto'
                    },
                    title            : {
                        text: 'rps'
                    },
                    plotBands        : [
                        {
                            from : 0,
                            to   : Band.RED.rps,
                            color: Band.RED.color
                        },
                        {
                            from : Band.RED.rps,
                            to   : Band.YELLOW.rps,
                            color: Band.YELLOW.color
                        },
                        {
                            from : Band.YELLOW.rps,
                            to   : Band.GREEN.rps,
                            color: Band.GREEN.color
                        }
                    ]
                },

                series: [
                    {
                        name   : 'Speed',
                        data   : [0],
                        tooltip: {
                            valueSuffix: ' rps'
                        }
                    }
                ]

            },

            function (chart) {
                if (!chart.renderer.forExport) {
                    $(window).on('UpdateRPS', function (evt, value) {
                        console.log("Updating RPS value to " + value);
                        var point = chart.series[0].points[0];
                        point.update(parseInt(value));
                    });
                }
            });
});
