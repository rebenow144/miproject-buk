function loadTable() {
    const xhttp = new XMLHttpRequest();
    const uri = "http://localhost:3000/slist";
    xhttp.open("GET", uri);
    xhttp.send();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var trHTML = "";
            var num = 1;  // เริ่มต้นตัวนับที่ 1
            const objects = JSON.parse(this.responseText);
            console.log(objects);
    
            for (let object of objects) {
                trHTML += "<tr>";
                trHTML += "<td>" + num + "</td>";
                trHTML += "<td>" + object["Age"] + "</td>";
                trHTML += "<td>" + object["Sex"] + "</td>";
                trHTML += "<td>" + object["Chest pain type"] + "</td>";
                trHTML += "<td>" + object["BP"] + "</td>";
                trHTML += "<td>" + object["Cholesterol"] + "</td>";
                trHTML += "<td>" + object["FBS over 120"] + "</td>";
                trHTML += "<td>" + object["EKG results"] + "</td>";
                trHTML += "<td>" + object["Max HR"] + "</td>";
                trHTML += "<td>" + object["Exercise angina"] + "</td>";
                trHTML += "<td>" + object["ST depression"] + "</td>";
                trHTML += "<td>" + object["Slope of ST"] + "</td>";
                trHTML += "<td>" + object["Number of vessels fluro"] + "</td>";
                trHTML += "<td>" + object["Thallium"] + "</td>";
                trHTML += "<td>" + object["Heart Disease"] + "</td>";
                
                trHTML += "<td>";
                trHTML += '<a type="button" class="btn btn-outline-secondary me-2" onclick="UpdateBox(\'' + object["_id"] + '\')"><i class="fas fa-edit"></i></a>';
                trHTML += '<a type="button" class="btn btn-outline-danger" onclick="showStudentDeleteBox(\'' + object["_id"] + '\')"><i class="fas fa-trash"></i></a>';
                trHTML += "</td>";
                trHTML += "</tr>";
                num++;
            }
            document.getElementById("mytable").innerHTML = trHTML;
            loadGraph(objects);
        }
    };
}

loadTable();

function CreateBox() {
    Swal.fire({
      title: "Create Heart Disease Record",
      html: `
        <div class="container">
  <div class="form-group mb-3">
    <label for="age">AGE</label>
    <input id="age" class="form-control" placeholder="Enter age" type="number">
  </div>
  <div class="form-group mb-3">
    <label for="sex">SEX (0: Female, 1: Male)</label>
    <select id="sex" class="form-control">
      <option value="0">0 - Female</option>
      <option value="1">1 - Male</option>
    </select>
  </div>
  <div class="form-group mb-3">
    <label for="chest_pain">CHEST PAIN TYPE (1-4)</label>
    <select id="chest_pain" class="form-control">
      <option value="1">1</option>
      <option value="2">2</option>
      <option value="3">3</option>
      <option value="4">4</option>
    </select>
  </div>
  <div class="form-group mb-3">
    <label for="bp">BP</label>
    <input id="bp" class="form-control" placeholder="Enter blood pressure" type="number">
  </div>
  <div class="form-group mb-3">
    <label for="cholesterol">CHOLESTEROL</label>
    <input id="cholesterol" class="form-control" placeholder="Enter cholesterol" type="number">
  </div>
  <div class="form-group mb-3">
    <label for="fbs">FBS OVER 120 (0: No, 1: Yes)</label>
    <select id="fbs" class="form-control">
      <option value="0">0 - No</option>
      <option value="1">1 - Yes</option>
    </select>
  </div>
  <div class="form-group mb-3">
    <label for="ekg">EKG RESULTS (0-2)</label>
    <select id="ekg" class="form-control">
      <option value="0">0</option>
      <option value="1">1</option>
      <option value="2">2</option>
    </select>
  </div>
  <div class="form-group mb-3">
    <label for="max_hr">MAX HR</label>
    <input id="max_hr" class="form-control" placeholder="Enter maximum heart rate" type="number">
  </div>
  <div class="form-group mb-3">
    <label for="exercise_angina">EXERCISE ANGINA (0: No, 1: Yes)</label>
    <select id="exercise_angina" class="form-control">
      <option value="0">0 - No</option>
      <option value="1">1 - Yes</option>
    </select>
  </div>
  <div class="form-group mb-3">
    <label for="st_depression">ST DEPRESSION</label>
    <input id="st_depression" class="form-control" placeholder="Enter ST depression" type="number" step="0.1">
  </div>
  <div class="form-group mb-3">
    <label for="slope_of_st">SLOPE OF ST (1-3)</label>
    <select id="slope_of_st" class="form-control">
      <option value="1">1</option>
      <option value="2">2</option>
      <option value="3">3</option>
    </select>
  </div>
  <div class="form-group mb-3">
    <label for="vessels_fluro">NUMBER OF VESSELS FLURO (0-3)</label>
    <select id="vessels_fluro" class="form-control">
      <option value="0">0</option>
      <option value="1">1</option>
      <option value="2">2</option>
      <option value="3">3</option>
    </select>
  </div>
  <div class="form-group mb-3">
    <label for="thallium">THALLIUM (3, 6, 7)</label>
    <select id="thallium" class="form-control">
      <option value="3">3</option>
      <option value="6">6</option>
      <option value="7">7</option>
    </select>
  </div>
  <div class="form-group mb-3">
    <label for="heart_disease">HEART DISEASE</label>
    <select id="heart_disease" class="form-control">
      <option value="Absence">Absence</option>
      <option value="Presence">Presence</option>
    </select>
  </div>
</div>

      `,
      focusConfirm: false,
      preConfirm: () => {
        heartDiseaseCreate();
      }
    });
}

function heartDiseaseCreate() {
    const age = document.getElementById("age").value;
    const sex = document.getElementById("sex").value;
    const chestPain = document.getElementById("chest_pain").value;
    const bp = document.getElementById("bp").value;
    const cholesterol = document.getElementById("cholesterol").value;
    const fbs = document.getElementById("fbs").value;
    const ekg = document.getElementById("ekg").value;
    const maxHr = document.getElementById("max_hr").value;
    const exerciseAngina = document.getElementById("exercise_angina").value;
    const stDepression = document.getElementById("st_depression").value;
    const slopeOfST = document.getElementById("slope_of_st").value;
    const vesselsFluro = document.getElementById("vessels_fluro").value;
    const thallium = document.getElementById("thallium").value;
    const heartDisease = document.getElementById("heart_disease").value;

    console.log(
        JSON.stringify({
            "Age": age,
            "Sex": sex,
            "Chest pain type": chestPain,
            "BP": bp,
            "Cholesterol": cholesterol,
            "FBS over 120": fbs,
            "EKG results": ekg,
            "Max HR": maxHr,
            "Exercise angina": exerciseAngina,
            "ST depression": stDepression,
            "Slope of ST": slopeOfST,
            "Number of vessels fluro": vesselsFluro,
            "Thallium": thallium,
            "Heart Disease": heartDisease
        })
    );

    const xhttp = new XMLHttpRequest();
    xhttp.open("POST", "http://localhost:3000/slist/create");
    xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhttp.send(
        JSON.stringify({
            "Age": age,
            "Sex": sex,
            "Chest pain type": chestPain,
            "BP": bp,
            "Cholesterol": cholesterol,
            "FBS over 120": fbs,
            "EKG results": ekg,
            "Max HR": maxHr,
            "Exercise angina": exerciseAngina,
            "ST depression": stDepression,
            "Slope of ST": slopeOfST,
            "Number of vessels fluro": vesselsFluro,
            "Thallium": thallium,
            "Heart Disease": heartDisease
        })
    );

    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            Swal.fire(
                "Good job!",
                "Heart disease record created successfully!",
                "success"
            );
            loadTable();  // This assumes you have a function to refresh the data table
        }
    };
}

function UpdateBox(id) {
  console.log("edit", id);
  const xhttp = new XMLHttpRequest();
  xhttp.open("GET", "http://localhost:3000/slist/" + id);
  xhttp.send();
  xhttp.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {
          const object = JSON.parse(this.responseText).Complaint;
          console.log("UpdateBox", object);
          Swal.fire({
              title: "Update Heart Disease Record",
              html: `
                  <div class="container">
                      <input id="id" type="hidden" value="${object["_id"]}">
                      <div class="form-group mb-3">
                          <label for="age">AGE</label>
                          <input id="age" class="form-control" placeholder="Enter age" type="number" value="${object["Age"]}">
                      </div>
                      <div class="form-group mb-3">
                          <label for="sex">SEX (0: Female, 1: Male)</label>
                          <select id="sex" class="form-control">
                              <option value="0" ${object["Sex"] == "0" ? "selected" : ""}>0 - Female</option>
                              <option value="1" ${object["Sex"] == "1" ? "selected" : ""}>1 - Male</option>
                          </select>
                      </div>
                      <div class="form-group mb-3">
                          <label for="chest_pain">CHEST PAIN TYPE (1-4)</label>
                          <select id="chest_pain" class="form-control">
                              <option value="1" ${object["Chest pain type"] == "1" ? "selected" : ""}>1</option>
                              <option value="2" ${object["Chest pain type"] == "2" ? "selected" : ""}>2</option>
                              <option value="3" ${object["Chest pain type"] == "3" ? "selected" : ""}>3</option>
                              <option value="4" ${object["Chest pain type"] == "4" ? "selected" : ""}>4</option>
                          </select>
                      </div>
                      <div class="form-group mb-3">
                          <label for="bp">BP</label>
                          <input id="bp" class="form-control" placeholder="Enter blood pressure" type="number" value="${object["BP"]}">
                      </div>
                      <div class="form-group mb-3">
                          <label for="cholesterol">CHOLESTEROL</label>
                          <input id="cholesterol" class="form-control" placeholder="Enter cholesterol" type="number" value="${object["Cholesterol"]}">
                      </div>
                      <div class="form-group mb-3">
                          <label for="fbs">FBS OVER 120 (0: No, 1: Yes)</label>
                          <select id="fbs" class="form-control">
                              <option value="0" ${object["FBS over 120"] == "0" ? "selected" : ""}>0 - No</option>
                              <option value="1" ${object["FBS over 120"] == "1" ? "selected" : ""}>1 - Yes</option>
                          </select>
                      </div>
                      <div class="form-group mb-3">
                          <label for="ekg">EKG RESULTS (0-2)</label>
                          <select id="ekg" class="form-control">
                              <option value="0" ${object["EKG results"] == "0" ? "selected" : ""}>0</option>
                              <option value="1" ${object["EKG results"] == "1" ? "selected" : ""}>1</option>
                              <option value="2" ${object["EKG results"] == "2" ? "selected" : ""}>2</option>
                          </select>
                      </div>
                      <div class="form-group mb-3">
                          <label for="max_hr">MAX HR</label>
                          <input id="max_hr" class="form-control" placeholder="Enter maximum heart rate" type="number" value="${object["Max HR"]}">
                      </div>
                      <div class="form-group mb-3">
                          <label for="exercise_angina">EXERCISE ANGINA (0: No, 1: Yes)</label>
                          <select id="exercise_angina" class="form-control">
                              <option value="0" ${object["Exercise angina"] == "0" ? "selected" : ""}>0 - No</option>
                              <option value="1" ${object["Exercise angina"] == "1" ? "selected" : ""}>1 - Yes</option>
                          </select>
                      </div>
                      <div class="form-group mb-3">
                          <label for="st_depression">ST DEPRESSION</label>
                          <input id="st_depression" class="form-control" placeholder="Enter ST depression" type="number" step="0.1" value="${object["ST depression"]}">
                      </div>
                      <div class="form-group mb-3">
                          <label for="slope_of_st">SLOPE OF ST (1-3)</label>
                          <select id="slope_of_st" class="form-control">
                              <option value="1" ${object["Slope of ST"] == "1" ? "selected" : ""}>1</option>
                              <option value="2" ${object["Slope of ST"] == "2" ? "selected" : ""}>2</option>
                              <option value="3" ${object["Slope of ST"] == "3" ? "selected" : ""}>3</option>
                          </select>
                      </div>
                      <div class="form-group mb-3">
                          <label for="vessels_fluro">NUMBER OF VESSELS FLURO (0-3)</label>
                          <select id="vessels_fluro" class="form-control">
                              <option value="0" ${object["Number of vessels fluro"] == "0" ? "selected" : ""}>0</option>
                              <option value="1" ${object["Number of vessels fluro"] == "1" ? "selected" : ""}>1</option>
                              <option value="2" ${object["Number of vessels fluro"] == "2" ? "selected" : ""}>2</option>
                              <option value="3" ${object["Number of vessels fluro"] == "3" ? "selected" : ""}>3</option>
                          </select>
                      </div>
                      <div class="form-group mb-3">
                          <label for="thallium">THALLIUM (3, 6, 7)</label>
                          <select id="thallium" class="form-control">
                              <option value="3" ${object["Thallium"] == "3" ? "selected" : ""}>3</option>
                              <option value="6" ${object["Thallium"] == "6" ? "selected" : ""}>6</option>
                              <option value="7" ${object["Thallium"] == "7" ? "selected" : ""}>7</option>
                          </select>
                      </div>
                      <div class="form-group mb-3">
                          <label for="heart_disease">HEART DISEASE</label>
                          <select id="heart_disease" class="form-control">
                              <option value="Absence" ${object["Heart Disease"] == "Absence" ? "selected" : ""}>Absence</option>
                              <option value="Presence" ${object["Heart Disease"] == "Presence" ? "selected" : ""}>Presence</option>
                          </select>
                      </div>
                  </div>
              `,
              focusConfirm: false,
              preConfirm: () => {
                  heartDiseaseUpdate();
              }
          });
      }
  };
}

function heartDiseaseUpdate() {
  const id = document.getElementById("id").value;
  const age = document.getElementById("age").value;
  const sex = document.getElementById("sex").value;
  const chestPain = document.getElementById("chest_pain").value;
  const bp = document.getElementById("bp").value;
  const cholesterol = document.getElementById("cholesterol").value;
  const fbs = document.getElementById("fbs").value;
  const ekg = document.getElementById("ekg").value;
  const maxHr = document.getElementById("max_hr").value;
  const exerciseAngina = document.getElementById("exercise_angina").value;
  const stDepression = document.getElementById("st_depression").value;
  const slopeOfST = document.getElementById("slope_of_st").value;
  const vesselsFluro = document.getElementById("vessels_fluro").value;
  const thallium = document.getElementById("thallium").value;
  const heartDisease = document.getElementById("heart_disease").value;

  console.log(
      JSON.stringify({
          "_id": id,
          "Age": age,
          "Sex": sex,
          "Chest pain type": chestPain,
          "BP": bp,
          "Cholesterol": cholesterol,
          "FBS over 120": fbs,
          "EKG results": ekg,
          "Max HR": maxHr,
          "Exercise angina": exerciseAngina,
          "ST depression": stDepression,
          "Slope of ST": slopeOfST,
          "Number of vessels fluro": vesselsFluro,
          "Thallium": thallium,
          "Heart Disease": heartDisease
      })
  );

  const xhttp = new XMLHttpRequest();
  xhttp.open("PUT", "http://localhost:3000/slist/update");
  xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
  xhttp.send(
      JSON.stringify({
          "_id": id,
          "Age": age,
          "Sex": sex,
          "Chest pain type": chestPain,
          "BP": bp,
          "Cholesterol": cholesterol,
          "FBS over 120": fbs,
          "EKG results": ekg,
          "Max HR": maxHr,
          "Exercise angina": exerciseAngina,
          "ST depression": stDepression,
          "Slope of ST": slopeOfST,
          "Number of vessels fluro": vesselsFluro,
          "Thallium": thallium,
          "Heart Disease": heartDisease
      })
  );

  xhttp.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {
          Swal.fire(
              "Good job!",
              "Heart disease record updated successfully!",
              "success"
          );
          loadTable();  // This assumes you have a function to refresh the data table
      }
  };
}

function showStudentDeleteBox(id) {
  Swal.fire({
    title: 'Are you sure?',
    text: "You won't be able to revert this!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes, delete it!'
  }).then((result) => {
    if (result.isConfirmed) {
      studentDelete(id);
      Swal.fire(
        'Deleted!',
        'Your file has been deleted.',
        'success'
      )
    }
  })

}

function studentDelete(id) {
  console.log("Delete: ", id);
  const xhttp = new XMLHttpRequest();
  xhttp.open("DELETE", "http://localhost:3000/slist/delete");
  xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
  xhttp.send(
    JSON.stringify({
      _id: id,
    })
  );
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4) {
      const objects = JSON.parse(this.responseText);
      Swal.fire(
        "Good job!",
        "Delete Student Information Successfully!",
        "success"
      );
      loadTable();
    }
  };
}

function loadQueryTable() {
  document.getElementById("mytable").innerHTML = '<tr><th scope="row" colspan="5">Loading...</th></tr>';
  const searchText = document.getElementById("searchTextBox").value;
  const xhttp = new XMLHttpRequest();
  const uri = "http://localhost:3000/slist/field/" + searchText;
  xhttp.open("GET", uri);

  xhttp.send();
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      var trHTML = "";
      var num = 1;
      const objects = JSON.parse(this.responseText).Complaint;
      console.log(this.responseText);
      for (let object of objects) {
        trHTML += "<tr>";
        trHTML += "<td>" + num + "</td>";
        trHTML += "<td>" + (object["Age"] || "N/A") + "</td>";
        trHTML += "<td>" + (object["Sex"] || "N/A") + "</td>";
        trHTML += "<td>" + (object["Chest pain type"] || "N/A") + "</td>";
        trHTML += "<td>" + (object["BP"] || "N/A") + "</td>";
        trHTML += "<td>" + (object["Cholesterol"] || "N/A") + "</td>";
        trHTML += "<td>" + (object["FBS over 120"] || "N/A") + "</td>";
        trHTML += "<td>" + (object["EKG results"] || "N/A") + "</td>";
        trHTML += "<td>" + (object["Max HR"] || "N/A") + "</td>";
        trHTML += "<td>" + (object["Exercise angina"] || "N/A") + "</td>";
        trHTML += "<td>" + (object["ST depression"] || "N/A") + "</td>";
        trHTML += "<td>" + (object["Slope of ST"] || "N/A") + "</td>";
        trHTML += "<td>" + (object["Number of vessels fluro"] || "N/A") + "</td>";
        trHTML += "<td>" + (object["Thallium"] || "N/A") + "</td>";
        trHTML += "<td>" + (object["Heart Disease"] || "N/A") + "</td>";
        trHTML += "<td>";
        trHTML += '<a type="button" class="btn btn-outline-secondary me-2" onclick="showPatientUpdateBox(\'' + object["_id"] + '\')"><i class="fas fa-edit"></i></a>';
        trHTML += '<a type="button" class="btn btn-outline-danger" onclick="showPatientDeleteBox(\'' + object["_id"] + '\')"><i class="fas fa-trash"></i></a>';
        trHTML += "</td>";
        trHTML += "</tr>";
        num++;
      }
      console.log(trHTML);
      document.getElementById("mytable").innerHTML = trHTML;
    }
  };
}
