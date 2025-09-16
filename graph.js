        // Data for different periods
        const data1Month = {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
            incomeData: [3500, 4800, 6700, 3200, 5200, 0],
            momGrowth: [0, 40, 50, -50, 50, -100]
        };

        const data3Month = {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
            incomeData: [3500, 4800, 6700, 3200, 5200, 0],
            momGrowth: [0, 35, 45, -45, 45, -95]
        };

        let currentPeriod = '1m';
        let incomeChart;

        function initChart() {
            const ctx = document.getElementById('incomeChart').getContext('2d');
            const currentData = currentPeriod === '1m' ? data1Month : data3Month;

            incomeChart = new Chart(ctx, {
                data: {
                    labels: currentData.labels,
                    datasets: [
                        {
                            type: 'bar',
                            label: 'Income',
                            data: currentData.incomeData,
                            backgroundColor: 'rgba(123,43,212,0.9)',
                            borderRadius: 7,
                            barPercentage: 0.8,  // controls the bar width inside category
                            yAxisID: 'y',

                        },
                        {
                            type: 'line',
                            label: 'MoM Growth',
                            data: currentData.momGrowth,
                            borderColor: '#8b2b2b',
                            backgroundColor: 'rgba(139,43,43,0.06)',
                            tension: 0.35,
                            pointRadius: 0,
                            borderWidth: 3,
                            fill: false,
                            yAxisID: 'yPercent'
                        }
                    ]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    interaction: { mode: 'index', intersect: false },
                    stacked: false,
                    scales: {
                        y: {
                            beginAtZero: true,
                            position: 'left',
                            max: 8000,
                            ticks: {
                                stepSize: 2000,
                                callback: function (v) { return '$' + (v / 1000) + 'k'; }
                            },
                            grid: { color: 'rgba(0,0,0,0.03)' }
                        },
                        yPercent: {
                            type: 'linear',
                            position: 'right',
                            min: -100,
                            max: 100,
                            border: {
                                color: '#8b2b2b',        // line color of the axis
                                width: 2             // optional, thickness
                            },
                            ticks: {
                                stepSize: 50,
                                callback: function (v) { return v + '%'; },
                            },
                            grid: {
                                drawOnChartArea: false,
                                tickColor: '#8b2b2b',
                                color: '#8b2b2b'

                            }
                        },
                        x: {
                            categoryPercentage: 1,
                            grid: {
                                display: false
                            }
                        }
                    },
                    plugins: {
                        // legend: {
                        //     display: true,
                        //     labels: {
                        //         usePointStyle: true,
                        //         padding: 20
                        //     }
                        // },
                        legend: {
                            display: true,
                            position: 'bottom',
                            labels: {
                                usePointStyle: true, // enable point in legend
                                pointStyle: 'circle', // circle marker
                                color: '#8b2b2b'     // legend text color
                            }
                        },
                        // 
                        tooltip: {
                            callbacks: {
                                label: function (context) {
                                    if (context.dataset.type === 'bar') {
                                        return context.dataset.label + ': $' + context.parsed.y.toLocaleString();
                                    } else {
                                        return context.dataset.label + ': ' + context.parsed.y + '%';
                                    }
                                }
                            }
                        }
                    }
                }
            });
        }

        function switchPeriod(period) {
            currentPeriod = period;
            document.getElementById('btn1m').classList.toggle('active', period === '1m');
            document.getElementById('btn3m').classList.toggle('active', period === '3m');

            const currentData = period === '1m' ? data1Month : data3Month;
            incomeChart.data.labels = currentData.labels;
            incomeChart.data.datasets[0].data = currentData.incomeData;
            incomeChart.data.datasets[1].data = currentData.momGrowth;
            incomeChart.update();
            updateStats(currentData);
        }



        window.onload = function () {
            initChart();
            updateStats(data1Month);
        };