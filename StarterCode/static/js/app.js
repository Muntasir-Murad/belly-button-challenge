const dataURL = 'https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json';

// Fetch the JSON data and console log it
d3.json(dataURL).then(function(data) {
  console.log(data);
});

// Initialize the visualization
function initialize() {

  // Select the dropdown menu element
  let dropdownMenu = d3.select("#selDataset");

  // Fetch the JSON data
  d3.json(dataURL).then((data) => {

    // Get the sample names from the data
    let sampleNames = data.names;

    // Add samples to the dropdown menu
    sampleNames.forEach((sample) => {

      console.log(sample);

      // Append an option element for each sample
      dropdownMenu.append("option")
        .text(sample)
        .property("value", sample);
    });

    // Set the initial sample
    let initialSample = sampleNames[0];

    console.log(initialSample);

    // Build the initial metadata, bar chart, bubble chart, and gauge chart
    buildMetadata(initialSample);
    buildBarChart(initialSample);
    buildBubbleChart(initialSample);
    buildGaugeChart(initialSample);

  });
};

// Build the metadata panel
function buildMetadata(sample) {

  // Use D3 to retrieve the data
  d3.json(dataURL).then((data) => {

    // Retrieve the metadata
    let metadata = data.metadata;

    // Filter the metadata based on the sample
    let filteredMetadata = metadata.filter(result => result.id == sample);

    // Log the filtered metadata to the console
    console.log(filteredMetadata);

    // Get the first item from the filtered metadata array
    let sampleMetadata = filteredMetadata[0];

    // Clear the metadata panel
    d3.select("#sample-metadata").html("");

    // Append each key/value pair to the metadata panel
    Object.entries(sampleMetadata).forEach(([key, value]) => {

      // Log the key/value pairs as they are appended to the metadata panel
      console.log(key, value);

      d3.select("#sample-metadata").append("h5").text(`${key}: ${value}`);
    });
  });

};

// Build the bar chart
function buildBarChart(sample) {

  // Use D3 to retrieve the data
  d3.json(dataURL).then((data) => {

    // Retrieve the sample data
    let samples = data.samples;

    // Filter the sample data based on the sample
    let filteredSample = samples.filter(result => result.id == sample);

    // Get the first item from the filtered sample array
    let sampleData = filteredSample[0];

    // Extract the necessary data
    let otuIds = sampleData.otu_ids;
    let otuLabels = sampleData.otu_labels;
    let sampleValues = sampleData.sample_values;

    // Log the data to the console
    console.log(otuIds, otuLabels, sampleValues);

    // Set the top ten items to display in descending order
    let yTicks = otuIds.slice(0, 10).map(id => `OTU ${id}`).reverse();
    let xTicks = sampleValues.slice(0, 10).reverse();
    let labels = otuLabels.slice(0, 10).reverse();

    // Set up the trace for the bar chart
    let trace = {
      x: xTicks,
      y: yTicks,
      text: labels,
      type: "bar",
      orientation: "h"
    };

    // Set up the layout
    let layout = {
      title: "Top 10 OTUs Present"
    };

    // Call Plotly to plot the bar chart
    Plotly.newPlot("bar", [trace], layout)
  });
};

// Build the bubble chart
function buildBubbleChart(sample) {

  // Use D3 to retrieve the data
  d3.json(dataURL).then((data) => {

    // Retrieve the sample data
    let samples = data.samples;

    // Filter the sample data based on the sample
    let filteredSample = samples.filter(result => result.id == sample);

    // Get the first item from the filtered sample array
    let sampleData = filteredSample[0];

    // Extract the necessary data
    let otuIds = sampleData.otu_ids;
    let otuLabels = sampleData.otu_labels;
    let sampleValues = sampleData.sample_values;

    // Log the data to the console
    console.log(otuIds, otuLabels, sampleValues);

    // Set up the trace for the bubble chart
    let trace = {
      x: otuIds,
      y: sampleValues,
      text: otuLabels,
      mode: "markers",
      marker: {
        size: sampleValues,
        color: otuIds,
        colorscale: "Earth"
      }
    };

    // Set up the layout
    let layout = {
     
      hovermode: "closest",
      xaxis: { title: "OTU ID" },
    };

    // Call Plotly to plot the bubble chart
    Plotly.newPlot("bubble", [trace], layout)
  });
};

// Update the dashboard when the sample is changed
function updateDashboard(sample) {

  // Log the new sample value
  console.log(sample);

  // Call the necessary functions to update the visualization
  buildMetadata(sample);
  buildBarChart(sample);
  buildBubbleChart(sample);
  buildGaugeChart(sample);
};

// Call the initialize() function to initialize the visualization
initialize();
