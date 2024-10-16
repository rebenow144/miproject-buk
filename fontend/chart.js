google.charts.load("current", {
  packages: ["corechart", "bar"]
});

google.charts.setOnLoadCallback(loadCharts);

function loadCharts() {
  fetch("http://localhost:3000/slist")
    .then(response => {
      if (!response.ok) {
        throw new Error("Network response was not ok: " + response.statusText);
      }
      return response.json();
    })
    .then(objects => {
      console.log(objects);
      drawCharts(objects);
    })
    .catch(error => console.error('There was a problem fetching the data:', error));
}

function drawCharts(objects) {
  drawSexDistribution(objects);
  drawChestPainDistribution(objects);
  drawAgeDistribution(objects);
  drawCholesterolDistribution(objects);
  drawMaxHRDistribution(objects);
  drawHeartDiseaseDistribution(objects);
}

function drawSexDistribution(objects) {
  var maleCount = objects.filter(obj => obj["Sex"] == 0).length;
  var femaleCount = objects.filter(obj => obj["Sex"] == 1).length;

  var data = google.visualization.arrayToDataTable([
    ["Sex", "Count"],
    ["Male", maleCount],
    ["Female", femaleCount],
  ]);

  var options = {
    title: "Sex Distribution",
    pieHole: 0.4,
    chartArea: {width: '80%', height: '80%'},
  };

  var chart = new google.visualization.PieChart(document.getElementById("sexDistribution"));
  chart.draw(data, options);
}

function drawChestPainDistribution(objects) {
  var cpTypes = [0, 0, 0, 0];
  objects.forEach(obj => cpTypes[obj["Chest pain type"] - 1]++);

  var data = google.visualization.arrayToDataTable([
    ["Chest Pain Type", "Count"],
    ["Type 1", cpTypes[0]],
    ["Type 2", cpTypes[1]],
    ["Type 3", cpTypes[2]],
    ["Type 4", cpTypes[3]],
  ]);

  var options = {
    title: "Chest Pain Type Distribution",
    legend: { position: "none" },
    chart: {
      title: "Chest Pain Type Distribution",
    },
    bars: "horizontal",
    axes: {
      x: {
        0: { side: "top", label: "Count" }
      }
    },
    bar: { groupWidth: "90%" }
  };

  var chart = new google.visualization.BarChart(document.getElementById("chestPainDistribution"));
  chart.draw(data, options);
}

function drawAgeDistribution(objects) {
  var ageGroups = [0, 0, 0, 0, 0];
  objects.forEach(obj => {
    if (obj["Age"] < 40) ageGroups[0]++;
    else if (obj["Age"] < 50) ageGroups[1]++;
    else if (obj["Age"] < 60) ageGroups[2]++;
    else if (obj["Age"] < 70) ageGroups[3]++;
    else ageGroups[4]++;
  });

  var data = google.visualization.arrayToDataTable([
    ["Age Group", "Count"],
    ["<40", ageGroups[0]],
    ["40-49", ageGroups[1]],
    ["50-59", ageGroups[2]],
    ["60-69", ageGroups[3]],
    ["70+", ageGroups[4]],
  ]);

  var options = {
    title: "Age Distribution",
    legend: { position: "none" },
    chart: {
      title: "Age Distribution",
    },
    bars: "vertical",
    vAxis: {title: "Count"},
    hAxis: {title: "Age Group"},
    bar: { groupWidth: "90%" }
  };

  var chart = new google.visualization.ColumnChart(document.getElementById("ageDistribution"));
  chart.draw(data, options);
}

function drawCholesterolDistribution(objects) {
  var cholesterolGroups = [0, 0, 0, 0];
  objects.forEach(obj => {
    if (obj["Cholesterol"] < 200) cholesterolGroups[0]++;
    else if (obj["Cholesterol"] < 240) cholesterolGroups[1]++;
    else if (obj["Cholesterol"] < 280) cholesterolGroups[2]++;
    else cholesterolGroups[3]++;
  });

  var data = google.visualization.arrayToDataTable([
    ["Cholesterol Level", "Count"],
    ["<200", cholesterolGroups[0]],
    ["200-239", cholesterolGroups[1]],
    ["240-279", cholesterolGroups[2]],
    ["280+", cholesterolGroups[3]],
  ]);

  var options = {
    title: "Cholesterol Distribution",
    legend: { position: "none" },
    chart: {
      title: "Cholesterol Distribution",
    },
    bars: "vertical",
    vAxis: {title: "Count"},
    hAxis: {title: "Cholesterol Level"},
    bar: { groupWidth: "90%" }
  };

  var chart = new google.visualization.ColumnChart(document.getElementById("cholesterolDistribution"));
  chart.draw(data, options);
}

function drawMaxHRDistribution(objects) {
  var hrGroups = [0, 0, 0, 0];
  objects.forEach(obj => {
    if (obj["Max HR"] < 100) hrGroups[0]++;
    else if (obj["Max HR"] < 120) hrGroups[1]++;
    else if (obj["Max HR"] < 140) hrGroups[2]++;
    else hrGroups[3]++;
  });

  var data = google.visualization.arrayToDataTable([
    ["Max HR", "Count"],
    ["<100", hrGroups[0]],
    ["100-119", hrGroups[1]],
    ["120-139", hrGroups[2]],
    ["140+", hrGroups[3]],
  ]);

  var options = {
    title: "Max Heart Rate Distribution",
    legend: { position: "none" },
    chart: {
      title: "Max Heart Rate Distribution",
    },
    bars: "vertical",
    vAxis: {title: "Count"},
    hAxis: {title: "Max Heart Rate"},
    bar: { groupWidth: "90%" }
  };

  var chart = new google.visualization.ColumnChart(document.getElementById("maxHRDistribution"));
  chart.draw(data, options);
}

function drawHeartDiseaseDistribution(objects) {
  var presenceCount = objects.filter(obj => obj["Heart Disease"] === "Presence").length;
  var absenceCount = objects.filter(obj => obj["Heart Disease"] === "Absence").length;

  var data = google.visualization.arrayToDataTable([
    ["Heart Disease", "Count"],
    ["Presence", presenceCount],
    ["Absence", absenceCount],
  ]);

  var options = {
    title: "Heart Disease Distribution",
    pieHole: 0.4,
    chartArea: {width: '80%', height: '80%'},
    slices: {
      0: { color: 'red' },
      1: { color: 'green' }
    }
  };

  var chart = new google.visualization.PieChart(document.getElementById("heartDiseaseDistribution"));
  chart.draw(data, options);
}