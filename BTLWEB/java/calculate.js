//university
const universities = [
    "Foreign Trade University",
    "National Economics University",
    "Hanoi University of Science and Technology",
    "University of Languages and International Studies",
    "Hanoi University of Science",
    "University of Social Sciences and Humanities (Hanoi)",
    "Banking Academy",
    "Academy of Finance",
    "Diplomatic Academy of Vietnam",
    "University of Transport and Communications",
    "University of Danang - University of Science and Technology",
    "University of Da Nang - University of Economics",
    "Hue University - College of Education",
    "University of Economics Ho Chi Minh City",
    "University of Technology (HCMUT)",
    "University of Information Technology - VNU HCM",
    "University of Social Sciences and Humanities (HCM)",
    "University of Science - VNU HCM",
    "Ho Chi Minh City Open University",
    "RMIT University Vietnam",
    "Ho Chi Minh City University of Technology and Education (HCMUTE)",
    "Saigon University",
    "Can Tho University",
    "Nha Trang University",
    "Ho Chi Minh City University of Education",
    "Ho Chi Minh City University of Industry (IUH)"
];

function changeform() {

    const selected = document.getElementById('selectlevel').value;
    const form = document.getElementById('form');
    const key1 = document.getElementById("keyhighschool");
    const key2 = document.getElementById("keyuniversity");
    if (selected === "highschool") {
        key1.style.display = "block";
        key2.style.display = "none";
    } else if (selected === "college") {
        key2.style.display = "block";
        key1.style.display = "none";
        const select = document.getElementById("university");
        select.innerHTML = '<option value="null">====Choose your university====</option>';
        universities.forEach((name, index) => {
            const option = document.createElement("option");
            option.value = index;
            option.text = name;
            select.appendChild(option);
        })
    } else {
        key1.style.display = "none";
        key2.style.display = "none";
    }
}
function calscores() {
    //Tao bien lay diem
    const math = parseFloat(document.getElementById("math").value) || null;
    const literature = parseFloat(document.getElementById("literature").value) || null;
    const foreign = parseFloat(document.getElementById("foreign").value) || null;
    const physics = parseFloat(document.getElementById("physics").value) || null;
    const chemistry = parseFloat(document.getElementById("chemistry").value) || null;
    const biology = parseFloat(document.getElementById("biology").value) || null;
    const history = parseFloat(document.getElementById("history").value) || null;
    const geography = parseFloat(document.getElementById("geography").value) || null;
    const economic = parseFloat(document.getElementById("economic").value) || null;
    const computer = parseFloat(document.getElementById("computer").value) || null;

    //Tao bien lay diem cong
    const priority1 = parseFloat(document.getElementById("area").value) || 0;
    const priority2 = parseFloat(document.getElementById("priority").value) || 0;

    //Tinh tong diem cong
    const total = priority1 + priority2;

    document.getElementById("keybutton").disabled = true
    document.getElementById("table").style.display = "none"

    const labels = ["A00", "A01", "B00", "B01", "C00", "C01", "C19", "D01", "D05", "X53"];
    const scores = [
        (math + physics + chemistry + total),       // A00
        (math + physics + foreign + total),         // A01
        (math + chemistry + biology + total),       // B00
        (math + biology + foreign + total),         // B01
        (literature + history + geography + total), // C00
        (literature + math + physics + total),// C01
        (literature + economic + history + total),
        (math + literature + foreign + total),      // D01
        (math + foreign + chemistry + total),        // D05
        (math + economic + computer + total)//X53
    ];

    const output = document.getElementById("output");
    document.getElementById("output").style.display = "block";
    output.innerHTML = `
        <h3>Your Scores</h3>
        <table border="1" cellpadding="8" cellspacing="0"
        style="border-collapse: collapse; width: 100%; text-align: left; background-color: white;">
        <tr>
            <th>Code</th>
            <th>Score</th>
        </tr>
        <tr>
            <td>${labels[0]}</td>
            <td>${scores[0].toFixed(2)}</td>
        </tr>
        <tr>
            <td>${labels[1]}</td>
            <td>${scores[1].toFixed(2)}</td>
        </tr>
        <tr>
            <td>${labels[2]}</td>
            <td>${scores[2].toFixed(2)}</td>
        </tr>
        <tr>
            <td>${labels[3]}</td>
            <td>${scores[3].toFixed(2)}</td>
        </tr>
        <tr>
            <td>${labels[4]}</td>
            <td>${scores[4].toFixed(2)}</td>
        </tr>
        <tr>
            <td>${labels[5]}</td>
            <td>${scores[5].toFixed(2)}</td>
        </tr>
        <tr>
            <td>${labels[6]}</td>
            <td>${scores[6].toFixed(2)}</td>
        </tr>
        <tr>
            <td>${labels[7]}</td>
            <td>${scores[7].toFixed(2)}</td>
        </tr>
        <tr>
            <td>${labels[8]}</td>
            <td>${scores[8].toFixed(2)}</td>
        </tr>
        <tr>
            <td>${labels[9]}</td>
            <td>${scores[9].toFixed(2)}</td>
        </tr>
    </table>
        <div>
            
            <iframe style="width: 100%; height: 300px;"src="https://diemthi.tuyensinh247.com/diem-chuan.html"></iframe>
        </div>
        <div class="note">
                <b>!NOTE!</b>
                <span class="text">The score columns colored <b style="color: green;">GREEN</b> indicate that your score is within the good range.<br> If the score column is <b style="color: blue;">BLUE</b>,
                 it means your score is in the fairly good range.<br> If the score column is <b style="color: red;">RED</b>,
                 it indicates that your score is critical or that you should not use that combination.
                 </span>
            </div>
        
        <canvas id="chart" style="width: 100PX; height: 50px;"></canvas>
        <button style="background-color: blue;" type="button" id="reset" onclick="resetData()">Reset</button>
      `;
    document.getElementById("form").style.display = "none";
    veBieuDo(labels, scores);
}

function calGPA() {
    const totalCredits = parseFloat(document.getElementById("total").value);
    const creditsEarned = parseFloat(document.getElementById("credits").value);
    const currentlyGPA = parseFloat(document.getElementById("gpa").value);
    const index = document.getElementById("university").value;
    if (index == "null") {
        alert("Hãy chọn trường của bạn"); return;
    }
    if (!totalCredits || !creditsEarned || !currentlyGPA) {
        alert("Hãy Nhập Điểm"); return;
    }
    if (currentlyGPA <= 4.0 && currentlyGPA >= 0 && !isNaN(totalCredits) && !isNaN(creditsEarned)) {
        //calulate

        const credits = totalCredits - creditsEarned;

        //calculate gpa
        const gpa32value = (3.2 * totalCredits - creditsEarned * currentlyGPA) / credits;
        const gpa36value = (3.6 * totalCredits - creditsEarned * currentlyGPA) / credits;

        let gpa32text, gpa36text;

        gpa32text = gpa32value > 4.0 ? "Not able to achieve this type of graduation" : gpa32value.toFixed(2);
        gpa36text = gpa36value > 4.0 ? "Not able to achieve this type of graduation" : gpa36value.toFixed(2);
        //inner

        const output = document.getElementById("output");
        document.getElementById("output").style.display = "block";
        output.innerHTML = `
    <hr>
    <h2>${universities[index]}</h2>
    <p>The GPA required for graduating with <i style="color: red;"> excellent </i>is:${gpa36text}</p>
    <p>The GPA required for graduating with <i style="color: red;"> proficient </i>is:${gpa32text}</p>
    <button style="background-color: blue;" type="button" id="reset" onclick="resetData()">Reset</button>
    `; document.getElementById("formGpa").style.display = "none";
    }

}


function resetData() {
    const flag = document.getElementById("reset");
    if (flag) {
        document.getElementById("output").style.display = "none";
        document.getElementById("form").style.display = "";
        document.getElementById("keybutton").disabled = false;
        document.getElementById("table").style.display = ""
        document.getElementById("formGpa").style.display = "";
    }



}

function veBieuDo(labelsScores, scores) {
    const ctx = document.getElementById("chart").getContext("2d");
    const groupScores1 = [];//<15==>Diem khong an toan

    const groupScores2 = [];//<=24==>Diem kha an toan

    const groupScores3 = [];//>24==>Diem an toan

    for (i = 0; i < scores.length; i++) {
        if (scores[i] <= 15) {
            groupScores1.push(scores[i]);
            groupScores2.push(null);
            groupScores3.push(null);
        } else if (scores[i] <= 24) {
            groupScores2.push(scores[i]);
            groupScores1.push(null);
            groupScores3.push(null);
        } else if (scores[i] > 24) {
            groupScores3.push(scores[i]);
            groupScores2.push(null);
            groupScores1.push(null);
        }
    }

    new Chart(ctx, {
        type: "bar",
        data: {
            labels: labelsScores,
            datasets: [
                {
                    label: "<15",
                    data: groupScores1,
                    backgroundColor: "red"
                },
                {
                    label: "<= 24",
                    data: groupScores2,
                    backgroundColor: "blue"
                },
                {
                    label: ">24",
                    data: groupScores3,
                    backgroundColor: "green"
                }
            ]
        },
        options: {
            responsive: true,
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true,
                        min: 0
                    }
                }]
            }
        }
    });
}