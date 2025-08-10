let chart; // Biến lưu biểu đồ hiện tại
const color = [
    "rgba(123, 45, 200, 0.7)",
    "rgba(10, 150, 100, 0.7)",
    "rgba(255, 80, 90, 0.7)",
    "rgba(75, 200, 50, 0.7)",
    "rgba(30, 40, 220, 0.7)",
    "rgba(190, 60, 150, 0.7)",
    "rgba(0, 0, 0, 0.7)"
];
let colorIndex = 0;
function resetChart() {
    if (chart && typeof chart.destroy === "function") {
        chart.destroy();
        chart = null;
    }
    const canvas = document.getElementById("myChart");
    if (canvas) canvas.style.display = "none";
    const title = document.getElementById("chart");
    title.style.display = "none";
    document.getElementById("dataLabels").value = "";
    document.getElementById("yvalues").value = "";
    const enabledAdd = document.getElementById("add");
    enabledAdd.disabled = true;
    const disabledCreate = document.getElementById("create");
    disabledCreate.disabled = false;
    const enabledReset = document.getElementById("resetChart");
    enabledReset.disabled = true;
}

function veBieuDo() {
    // Lấy giá trị từ input
    const xValues = document.getElementById('xvalues').value.split(' ');//lay du lieu truc hoanh
    const yValues = document.getElementById('yvalues').value.split(' ');//lay du lieu truc tung
    const Xtext = document.getElementById("Xtext").value;
    const Ytext = document.getElementById("Ytext").value;
    const label = document.getElementById('dataLabels').value.trim();


    const ctx = document.getElementById('myChart').getContext('2d');// can de ve tren canvas
    const type = document.getElementById('chartType').value;// Nhan loai bieu do

    if (!label || yValues.some(isNaN)) {
        alert("Nhập không hợp lệ");
        return;
    }
    const chartContainer = document.getElementById("chart");
    chartContainer.style.display = "block";
    const canvas = document.getElementById('myChart');//Tao 1 bien canvas de ve bieu do
    canvas.style.display = "block";

    const title = document.getElementById("chartName").value;
    chartTitle.innerHTML = `${title}`;
    chart = new Chart(ctx, {
        type: type,
        data: {
            labels: xValues,
            datasets: [{
                label: label,
                data: yValues,
                backgroundColor: color[0],
                borderColor: 'black',
                borderWidth: 1,
                fill: true,
                tension: 0
            }]
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true,
                        min: 0
                    },
                    scaleLabel: {
                        display: true,
                        labelString: Ytext
                    }
                }],
                xAxes: [{
                    scaleLabel: {
                        display: true,
                        labelString: Xtext
                    }
                }]
            }
        }
    })
    document.getElementById("dataLabels").value = "";
    document.getElementById("yvalues").value = "";
    const enabledAdd = document.getElementById("add");
    enabledAdd.disabled = false;
    const disabledCreate = document.getElementById("create");
    disabledCreate.disabled = true;


}

function addDataset() {
    const label = document.getElementById("dataLabels").value.trim();
    const yValues = document.getElementById("yvalues").value.split(" ");//1 2 3 4
    const type = document.getElementById("chartType").value;
    if (!label || yValues.some(isNaN)) {
        alert("Nhập không hợp lệ");
        return;
    }

    chart.data.datasets.push({
        label: label,
        data: yValues,
        backgroundColor: color[++colorIndex],
        borderColor: 'black',
        borderWidth: 1,
        fill: true,
        tension: 0
    });

    chart.update();

    document.getElementById("dataLabels").value = "";
    document.getElementById("yvalues").value = "";


}


function showEnterChart() {
    const enFlag = document.getElementById('chartType').value;
    const enChart = document.getElementById('enterChart');

    if (enFlag === "") {
        enChart.innerHTML = ``;
    } else {
        enChart.innerHTML = `
        <hr>
      <h4 align="center" >Enter chart values</h4>
      <div>

        <div style="display: flex;">
        <div><label for="chartName">Labels (X axis)</label><div></div>
         <input style="width:300px;" class="inputbox" type="text" id="xvalues" placeholder="EX: 2000 2001 2002 2003"></input></div>
        <div><label for="chartName">Unit of labels </label><div></div>
         <input class="inputbox" type="text" id="Xtext" placeholder="EX: year, people,..."></input></div>
         </div>
        <br><hr>
        <label for="chartName">Data Labels</label><div></div>
        <div> <input style="width:300px;" class="inputbox" type="text" id="dataLabels" placeholder="EX:Book Pen Pencil"></input></div>
        <div style="display:flex;">
        <div><label for="chartName">Data (Y axis)</label><div></div>
        <input style="width:300px;" class="inputbox" type="text" id="yvalues" placeholder="EX:1 2 3 4.5 5"></input></div>
        <div><label for="chartName">Unit of data</label><div></div>
        <input class="inputbox" type="text" id="Ytext" placeholder="EX:%, VND, $,..."></input></div>
      </div>
      <div class="buttoncontainer">
        <button onclick="veBieuDo()" type="button" id="create" style="background-color: #0957a0;" enabled>Create Chart</button>
        <button onclick="addDataset()" type="button" id="add" style="background-color: #72ea16ff;" disabled >Add Data</button>
        <button onclick="resetChart()" type="button" style="background-color: #ff0d0dff;">RESET CHART</button>
        </div>
        
        `;

    }


}

