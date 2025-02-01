let history = [];
let scores = [];
let ragStatuses = [];

// Initialize Chart.js
const ctx = document.getElementById('ragChart').getContext('2d');
const ragChart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: [],
        datasets: [{
            label: 'RAG Status Over Time',
            data: [],
            borderColor: 'rgba(75, 192, 192, 1)',
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderWidth: 1,
        }]
    },
    options: {
        scales: {
            y: {
                beginAtZero: true,
                ticks: {
                    callback: function(value) {
                        if (value < 40) return 'Red';
                        else if (value < 70) return 'Amber';
                        else return 'Green';
                    }
                }
            }
        }
    }
});

function calculateRAG() {
    const score = parseInt(document.getElementById('score').value);
    const redThreshold = parseInt(document.getElementById('redThreshold').value);
    const amberThreshold = parseInt(document.getElementById('amberThreshold').value);
    const resultDiv = document.getElementById('result');
    const historyList = document.getElementById('history');

    let ragStatus = '';
    let color = '';

    if (score < 0 || score > 100) {
        ragStatus = 'Invalid score! Please enter a score between 0 and 100.';
        color = 'black';
    } else if (score < redThreshold) {
        ragStatus = 'RAG Status: Red';
        color = 'red';
    } else if (score < amberThreshold) {
        ragStatus = 'RAG Status: Amber';
        color = 'orange';
    } else {
        ragStatus = 'RAG Status: Green';
        color = 'green';
    }

    resultDiv.textContent = ragStatus;
    resultDiv.style.color = color;

    // Store history
    history.push({ score, ragStatus });
    updateHistory(score, ragStatus);
}

function updateHistory(score, ragStatus) {
    const historyList = document.getElementById('history');
    const listItem = document.createElement('li');
    listItem.textContent = `Score: ${score}, Status: ${ragStatus}`;
    historyList.appendChild(listItem);

    // Update chart data
    scores.push(score);
    ragStatuses.push(score < document.getElementById('redThreshold').value ? 'Red' :
                    score < document.getElementById('amberThreshold').value ? 'Amber' : 'Green');

    // Update chart labels and data
    ragChart.data.labels.push(`Score ${scores.length}`);
    ragChart.data.datasets[0].data.push(score);
    ragChart.update();
}