const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
let inputQuartiles = document.getElementById('input-quartiles')
let submitQuartiles = document.getElementById('submit-quartiles')
let predictedAmount = 0
let predictedQuartiles = []

const containersAmountData = {
    "2005-1Q": 56.2,
    "2005-2Q": 61.4,
    "2005-3Q": 63.44,
    "2005-4Q": 69.32,
    "2006-1Q": 64.21,
    "2006-2Q": 65.52,
    "2006-3Q": 68.21,
    "2006-4Q": 73.43,
    "2007-1Q": 77.39,
    "2007-2Q": 72.58,
    "2007-3Q": 64.23,
    "2007-4Q": 67.05,
    "2008-1Q": 73.64,
    "2008-2Q": 76.92,
    "2008-3Q": 70.44,
    "2008-4Q": 68.05,
    "2009-1Q": 75.48,
    "2009-2Q": 82.92,
    "2009-3Q": 68.63,
    "2009-4Q": 65.59,
    "2010-1Q": 77.1,
    "2010-2Q": 73.2,
    "2010-3Q": 67.36,
    "2010-4Q": 72.83,
    "2011-1Q": 82.57,
    "2011-2Q": 83.98,
    "2011-3Q": 77.66,
    "2011-4Q": 80.14,
    "2012-1Q": 76.24,
    "2012-2Q": 85.05,
    "2012-3Q": 75.7,
    "2012-4Q": 93.25,
    "2013-1Q": 94.97,
    "2013-2Q": 92.46,
    "2013-3Q": 83.33,
    "2013-4Q": 69.91,
    "2014-1Q": 66.08,
    "2014-2Q": 69.64,
    "2014-3Q": 92.38,
    "2014-4Q": 77.67,
    "2015-1Q": 61.39,
    "2015-2Q": 67.62,
    "2015-3Q": 92.75,
    "2015-4Q": 65.23,
    "2016-1Q": 68.26,
    "2016-2Q": 59.98,
    "2016-3Q": 95.31,
    "2016-4Q": 76.85,
    "2017-1Q": 76.03,
    "2017-2Q": 80.52,
    "2017-3Q": 65.73,
    "2017-4Q": 70.78,
    "2018-1Q": 101.24,
    "2018-2Q": 95.78,
    "2018-3Q": 83.37,
    "2018-4Q": 114.25,
    "2019-1Q": 91.83,
    "2019-2Q": 74.08,
    "2019-3Q": 105.14,
    "2019-4Q": 103.08,
    "2020-1Q": 100.2,
    "2020-2Q": 99.57,
    "2020-3Q": 75.44,
    "2020-4Q": 100.93,
    "2021-1Q": 103.18,
    "2021-2Q": 86.11,
    "2021-3Q": 83.85,
    "2021-4Q": 88.97,
    "2022-1Q": 90.84,
    "2022-2Q": 93.30,
    "2022-3Q": 96.11,
    "2022-4Q": 92.68,
}

const gdpData = {
    "2005-1Q": 101.07,
    "2005-2Q": 102.03,
    "2005-3Q": 104.33,
    "2005-4Q": 105.1,
    "2006-1Q": 106.06,
    "2006-2Q": 104.62,
    "2006-3Q": 104.24,
    "2006-4Q": 104.04,
    "2007-1Q": 104.33,
    "2007-2Q": 105.68,
    "2007-3Q": 106.64,
    "2007-4Q": 102.41,
    "2008-1Q": 103.95,
    "2008-2Q": 99.24,
    "2008-3Q": 95.97,
    "2008-4Q": 92.8,
    "2009-1Q": 88.67,
    "2009-2Q": 94.92,
    "2009-3Q": 98.76,
    "2009-4Q": 102.6,
    "2010-1Q": 111.44,
    "2010-2Q": 113.94,
    "2010-3Q": 106.06,
    "2010-4Q": 108.94,
    "2011-1Q": 105.1,
    "2011-2Q": 99.05,
    "2011-3Q": 103.56,
    "2011-4Q": 101.16,
    "2012-1Q": 100.78,
    "2012-2Q": 102.03,
    "2012-3Q": 97.99,
    "2012-4Q": 100.68,
    "2013-1Q": 99.34,
    "2013-2Q": 100.49,
    "2013-3Q": 101.93,
    "2013-4Q": 100.97,
    "2014-1Q": 100.2,
    "2014-2Q": 99.24,
    "2014-3Q": 99.53,
    "2014-4Q": 100.39,
    "2015-1Q": 98.95,
    "2015-2Q": 99.05,
    "2015-3Q": 99.62,
    "2015-4Q": 98.18,
    "2016-1Q": 99.05,
    "2016-2Q": 98.66,
    "2016-3Q": 98.66,
    "2016-4Q": 100.3,
    "2017-1Q": 100.2,
    "2017-2Q": 99.34,
    "2017-3Q": 100.97,
    "2017-4Q": 100.39,
    "2018-1Q": 100.68,
    "2018-2Q": 100.78,
    "2018-3Q": 98.95,
    "2018-4Q": 97.13,
    "2019-1Q": 97.03,
    "2019-2Q": 96.26,
    "2019-3Q": 96.74,
    "2019-4Q": 97.03,
    "2020-1Q": 95.78,
    "2020-2Q": 83.39,
    "2020-3Q": 89.23,
    "2020-4Q": 87.09,
    "2021-1Q": 88.22,
    "2021-2Q": 100.84,
    "2021-3Q": 107.39,
    "2021-4Q": 113.08,
    "2022-1Q": 112.06,
    "2022-2Q": 105.41,
    "2022-3Q": 103.88,
    "2022-4Q": 98.74,
}

const erData = {
    "2005-1Q": 23.2,
    "2005-2Q": 22.9,
    "2005-3Q": 22.4,
    "2005-4Q": 22.4,
    "2006-1Q": 22.9,
    "2006-2Q": 23,
    "2006-3Q": 23.3,
    "2006-4Q": 23.3,
    "2007-1Q": 22.8,
    "2007-2Q": 22.4,
    "2007-3Q": 22.9,
    "2007-4Q": 23.1,
    "2008-1Q": 23,
    "2008-2Q": 23.7,
    "2008-3Q": 23.9,
    "2008-4Q": 24,
    "2009-1Q": 23.9,
    "2009-2Q": 24.2,
    "2009-3Q": 24.5,
    "2009-4Q": 24.4,
    "2010-1Q": 23.9,
    "2010-2Q": 23.2,
    "2010-3Q": 23.4,
    "2010-4Q": 24,
    "2011-1Q": 24,
    "2011-2Q": 24.4,
    "2011-3Q": 24.6,
    "2011-4Q": 24.5,
    "2012-1Q": 24.1,
    "2012-2Q": 24.7,
    "2012-3Q": 25,
    "2012-4Q": 25,
    "2013-1Q": 25,
    "2013-2Q": 24.7,
    "2013-3Q": 25.7,
    "2013-4Q": 25.7,
    "2014-1Q": 26,
    "2014-2Q": 25.8,
    "2014-3Q": 25.5,
    "2014-4Q": 25.9,
    "2015-1Q": 26.8,
    "2015-2Q": 27.4,
    "2015-3Q": 29.5,
    "2015-4Q": 30.3,
    "2016-1Q": 29.3,
    "2016-2Q": 29.6,
    "2016-3Q": 30.1,
    "2016-4Q": 30.7,
    "2017-1Q": 31.6,
    "2017-2Q": 31,
    "2017-3Q": 31.4,
    "2017-4Q": 30.5,
    "2018-1Q": 29.6,
    "2018-2Q": 29.6,
    "2018-3Q": 30,
    "2018-4Q": 30.3,
    "2019-1Q": 30.2,
    "2019-2Q": 30.5,
    "2019-3Q": 30.2,
    "2019-4Q": 30.5,
    "2020-1Q": 30.2,
    "2020-2Q": 30.6,
    "2020-3Q": 30.6,
    "2020-4Q": 30.4,
    "2021-1Q": 30.5,
    "2021-2Q": 30.9,
    "2021-3Q": 30.9,
    "2021-4Q": 30.8,
    "2022-1Q": 31,
    "2022-2Q": 31.7,
    "2022-3Q": 32.2,
    "2022-4Q": 32.9
}

// Disposable Income
const diData = {
    "2005-1Q": 42.79,
    "2005-2Q": 45.64,
    "2005-3Q": 46.88,
    "2005-4Q": 50.91,
    "2006-1Q": 52.53,
    "2006-2Q": 56.53,
    "2006-3Q": 60.19,
    "2006-4Q": 68.43,
    "2007-1Q": 65.79,
    "2007-2Q": 87.85,
    "2007-3Q": 59.83,
    "2007-4Q": 77.89,
    "2008-1Q": 60.63,
    "2008-2Q": 88.57,
    "2008-3Q": 79.23,
    "2008-4Q": 75.49,
    "2009-1Q": 80.3,
    "2009-2Q": 82.84,
    "2009-3Q": 72.68,
    "2009-4Q": 91.14,
    "2010-1Q": 87.74,
    "2010-2Q": 107.76,
    "2010-3Q": 76.64,
    "2010-4Q": 80.8,
    "2011-1Q": 101.47,
    "2011-2Q": 116.35,
    "2011-3Q": 121.17,
    "2011-4Q": 113.51,
    "2012-1Q": 119.45,
    "2012-2Q": 118.59,
    "2012-3Q": 132.53,
    "2012-4Q": 129.13,
    "2013-1Q": 130.68,
    "2013-2Q": 141.01,
    "2013-3Q": 122.78,
    "2013-4Q": 131.12,
    "2014-1Q": 147.18,
    "2014-2Q": 162,
    "2014-3Q": 154.62,
    "2014-4Q": 130.94,
    "2015-1Q": 175.03,
    "2015-2Q": 151.23,
    "2015-3Q": 152.09,
    "2015-4Q": 146.77,
    "2016-1Q": 160.1,
    "2016-2Q": 164.58,
    "2016-3Q": 164.22,
    "2016-4Q": 166.46,
    "2017-1Q": 167.48,
    "2017-2Q": 170.98,
    "2017-3Q": 162.68,
    "2017-4Q": 165.44,
    "2018-1Q": 214.16,
    "2018-2Q": 185.94,
    "2018-3Q": 207,
    "2018-4Q": 207.81,
    "2019-1Q": 215.37,
    "2019-2Q": 220.89,
    "2019-3Q": 210.46,
    "2019-4Q": 225.12,
    "2020-1Q": 230.78,
    "2020-2Q": 240.56,
    "2020-3Q": 235.91,
    "2020-4Q": 250.23,
    "2021-1Q": 255.97,
    "2021-2Q": 262.34,
    "2021-3Q": 270.09,
    "2021-4Q": 280.45,
    "2022-1Q": 285.67,
    "2022-2Q": 292.84,
    "2022-3Q": 300.12,
    "2022-4Q": 310.59
  }




let currentTime = Object.keys(containersAmountData)[Object.keys(containersAmountData).length - 1]

function transpose(matrix) {
    return matrix[0].map((_, colIndex) => matrix.map((row) => row[colIndex]));
}

function multiply(matrixA, matrixB) {
    const result = Array(matrixA.length)
        .fill(0)
        .map(() => Array(matrixB[0].length).fill(0));

    for (let i = 0; i < matrixA.length; i++) {
        for (let j = 0; j < matrixB[0].length; j++) {
            for (let k = 0; k < matrixA[0].length; k++) {
                result[i][j] += matrixA[i][k] * matrixB[k][j];
            }
        }
    }

    return result;
}

function inverse(matrix) {
    const size = matrix.length;
    const augmentedMatrix = matrix.map((row, rowIndex) => [
        ...row,
        ...Array(size)
            .fill(0)
            .map((_, colIndex) => (rowIndex === colIndex ? 1 : 0)),
    ]);

    for (let i = 0; i < size; i++) {
        let maxElementIndex = i;
        for (let j = i + 1; j < size; j++) {
            if (
                Math.abs(augmentedMatrix[j][i]) >
                Math.abs(augmentedMatrix[maxElementIndex][i])
            ) {
                maxElementIndex = j;
            }
        }

        if (augmentedMatrix[maxElementIndex][i] === 0) {
            throw new Error("Matrix is singular and cannot be inverted");
        }

        [augmentedMatrix[i], augmentedMatrix[maxElementIndex]] = [
            augmentedMatrix[maxElementIndex],
            augmentedMatrix[i],
        ];

        for (let j = i + 1; j < size * 2; j++) {
            augmentedMatrix[i][j] /= augmentedMatrix[i][i];
        }

        for (let j = 0; j < size; j++) {
            if (j !== i) {
                const factor = augmentedMatrix[j][i];
                for (let k = i; k < size * 2; k++) {
                    augmentedMatrix[j][k] -= factor * augmentedMatrix[i][k];
                }
            }
        }

    }

    return augmentedMatrix.map((row) => row.slice(size));
}

function multipleLinearRegression(X, y) {
    X.forEach(x => {
        x.unshift(1)
    })
    const XT = transpose(X);
    const XT_X = multiply(XT, X);
    const XT_X_inv = inverse(XT_X);
    const XT_y = multiply(XT, y);
    const beta = multiply(XT_X_inv, XT_y);

    return beta;
}

function checkData(X, y) {
    // Check if y has no variation
    const uniqueY = [...new Set(y)];
    if (uniqueY.length === 1) {
        console.log("Dependent variable y has no variation.");
        return false;
    }

    // Check if any x has no variation
    for (let i = 0; i < X[0].length; i++) {
        const uniqueX = [...new Set(X.map((x) => x[i]))];
        if (uniqueX.length === 1) {
            console.log(`Independent variable x${i + 1} has no variation.`);
            return false;
        }
    }

    // TODO: Check for multicollinearity

    return true;
}

function predict(b, x) {
    let y = Number(b[0]);
    for (let i = 0; i < x.length; i++) {
        y += Number(b[i + 1] * x[i]);
    }
    return y;
}

function updatePredictedValues() {
    let newQuartiles = Number(inputQuartiles.value)
    let inputValuesDiv = document.getElementById('input-values')
    inputValuesDiv.innerHTML = `<div>
    <b>Current GDP:</b> ${Object.values(gdpData)[Object.keys(gdpData).length - 1]}<br>
    <b>Current Exchange Rate:</b> ${Object.values(erData)[Object.keys(erData).length - 1]}<br>
    <b>Current Disposable Income:</b> ${Object.values(diData)[Object.keys(diData).length - 1]}<br>
    </div>`
    predictedQuartiles = []

    console.log(newQuartiles)

    if (newQuartiles > 0 && !isNaN(newQuartiles)) {
        predictedAmount = newQuartiles
    }

    for (let i = 0; i < predictedAmount; i++) {
        let currentTimeArray = currentTime.split('')
        let currentYear = Number(currentTimeArray.slice(0, 4).join(''))
        let currentQuartile = Number((currentTimeArray.slice(5, 6).join('')))

        currentQuartile += i + 1
        while (currentQuartile > 4) {
            currentQuartile -= 4
            currentYear++
        }

        console.log(currentQuartile, currentYear)

        let newCurrentTime = `${currentYear}-${currentQuartile}Q`
        predictedQuartiles.push(newCurrentTime)

        let div = document.createElement('div')
        div.innerHTML += `<b>${newCurrentTime}</b><br>
        GDP: <input id="gdp-predict" class="predict-${newCurrentTime} input-predict-value"></input>
        Exchange Rate: <input id="er-predict" class="predict-${newCurrentTime} input-predict-value"></input>
        Disposable Income: <input id="di-predict" class="predict-${newCurrentTime} input-predict-value"></input>`

        inputValuesDiv.appendChild(div)
    }


}

function updatePredictedQuartiles() {
    let proceed = true
    predictedQuartiles.forEach(time => {
        let inputs = document.getElementsByClassName(`predict-${time}`)
        for (let i = 0; i < inputs.length; i++) {
            let input = inputs[i]
            if (!(input.value > 0 && !isNaN(input.value) && input.value.length > 0)) {
                proceed = false
            }
            if (input.id == 'gdp-predict') {
                gdpData[time] = Number(input.value)
            }
            if (input.id == 'er-predict') {
                erData[time] = Number(input.value)
            }
            if (input.id == 'di-predict') {
                diData[time] = Number(input.value)
            }
        }
    })

    applyLinearRegression()

}

function inputPredictedValues() {

}

function applyLinearRegression() {
    function updateGraph() {
        // Sample data
        const yData0 = X.map(data => data[data.length - 1])
        const yData1 = X.map(data => data[1])
        const yData2 = X.map(data => data[2])
        const yData3 = X.map(data => data[3])

        // Create a trace for the reference line
        const trace0 = {
            x: xAxis,
            y: yData0,
            mode: 'lines',  // 'lines' for a line chart
            name: 'TEU [100M]',  // Name for the first line
            line: {
                width: 4, // Set the line thickness (adjust as needed)
            }
        };

        // Create a trace for the first line
        const trace1 = {
            x: xAxis,
            y: yData1,
            mode: 'lines',  // 'lines' for a line chart
            name: 'GDP [1B]',  // Name for the first line
            line: {
                width: 4, // Set the line thickness (adjust as needed)
            }
        };

        const trace2 = {
            x: xAxis,
            y: yData2,
            mode: 'lines',  // 'lines' for a line chart
            name: 'Exchange Rate [10¢]',  // Name for the first line
            line: {
                width: 4, // Set the line thickness (adjust as needed)
            }
        }

        const trace3 = {
            x: xAxis,
            y: yData3,
            mode: 'lines',  // 'lines' for a line chart
            name: 'Disposable Income [100]',  // Name for the first line
            line: {
                width: 4, // Set the line thickness (adjust as needed)
            }
        }

        const shapes = [
            {
                type: 'rect',
                xref: 'x',
                yref: 'paper', // Use 'paper' for relative positioning on the y-axis
                x0: xAxis[0], // The start x-value (minimum x-value in your data)
                x1: currentTime, // The end x-value for the first half
                y0: 0, // Start y-value (0%)
                y1: 1, // End y-value (100%)
                fillcolor: 'green', // Background color for the first half
                opacity: 0.5, // Opacity of the background color
                layer: 'below', // Place the background below the chart
            },
            {
                type: 'rect',
                xref: 'x',
                yref: 'paper', // Use 'paper' for relative positioning on the y-axis
                x0: currentTime, // The start x-value for the second half
                x1: xAxis[xAxis.length - 1], // The end x-value (maximum x-value in your data)
                y0: 0, // Start y-value (0%)
                y1: 1, // End y-value (100%)
                fillcolor: 'yellow', // Background color for the second half
                opacity: 0.5, // Opacity of the background color
                layer: 'below', // Place the background below the chart
            },
        ];

        // Create the layout for the chart
        const layout = {
            title: 'Line Chart of provided variables.',
            xaxis: {
                title: 'Quartiles',
                showgrid: false,
            },
            yaxis: {
                title: 'Values',
                showgrid: false,
            },
            shapes: shapes
        };

        // Combine the traces and layout, and plot the chart
        const data = [trace0, trace1, trace2, trace3];
        Plotly.newPlot('chart-container', data, layout);
    }

    const X = []
    const y = []

    let xAxis = []

    Object.keys(containersAmountData).forEach(key => {
        xAxis.push(key)
        y.push([containersAmountData[key]])
    })

    xAxis.forEach(time => {
        let data = [gdpData[time], erData[time], diData[time]]
        for (let i = 0; i < data.length; i++) {
            if (data[i] == undefined) {
                return
            }
        }
        X.push(data)
    })

    console.log(X, y)

    const b = multipleLinearRegression(X, y);

    predictedQuartiles.forEach(time => {
        X.push(([1, gdpData[time], erData[time], diData[time]]))
        y.push([predict(b, [gdpData[time], erData[time], diData[time]])])
        xAxis.push(time)
    })

    X.forEach((data, index) => {
        data.push(y[index][0])
    })

    updateGraph()

}

document.addEventListener("DOMContentLoaded", () => {
    applyLinearRegression()
})


