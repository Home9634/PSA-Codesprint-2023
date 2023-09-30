const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
let inputQuartiles = document.getElementById('input-quartiles')
let submitQuartiles = document.getElementById('submit-quartiles')
let predictedAmount = 0
let predictedQuartiles = []

const containersAmountData = {
    "2021-1Q": 20,
    "2021-2Q": 40,
    "2021-3Q": 60,
    "2021-4Q": 80,
    "2022-1Q": 100,
}

const gdpData = {
    "2021-1Q": 2,
    "2021-2Q": 4,
    "2021-3Q": 7,
    "2021-4Q": 11,
    "2022-1Q": 18,
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
    inputValuesDiv.innerHTML = ''
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
        GDP: <input id="gdp-predict" class="predict-${newCurrentTime} input-predict-value"></input>`

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

        // Create a trace for the reference line
        const trace0 = {
            x: xAxis,
            y: yData0,
            mode: 'lines',  // 'lines' for a line chart
            name: 'Amount Of Cargo',  // Name for the first line
            line: {
                width: 4, // Set the line thickness (adjust as needed)
            }
        };

        // Create a trace for the first line
        const trace1 = {
            x: xAxis,
            y: yData1,
            mode: 'lines',  // 'lines' for a line chart
            name: 'GDP',  // Name for the first line
            line: {
                width: 4, // Set the line thickness (adjust as needed)
            }
        };

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
            title: 'Simple Line Chart with Two Variables on X-Axis',
            xaxis: {
                title: 'Quartiles',
                showgrid: false,
            },
            yaxis: {
                title: 'Y-Axis Label',
                showgrid: false,
            },
            shapes: shapes
        };

        // Combine the traces and layout, and plot the chart
        const data = [trace0, trace1];
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
        let data = [gdpData[time]]
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
        X.push(([1, gdpData[time]]))
        console.log(X)
        console.log(predict(b, [gdpData[time]]))
        y.push([predict(b, [gdpData[time]])])
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


