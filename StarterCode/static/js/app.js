
const dataURL = 'https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json'

// Fetch the JSON data 
d3.json(dataURL).then(function(data) {
  console.log(data);
});

// Initialize 
function init() {

    // Use D3 to select the dropdown menu
    let dropdownMenu = d3.select("#selDataset");


    d3.json(dataURL).then((data) => {
        
        // Setting a variable for the sample names
        let names = data.names;

        // Adding  samples to dropdown menu
        names.forEach((id) => {

            // Log the value of id for each iteration of the loop
            console.log(id);

            dropdownMenu.append("option")
            .text(id)
            .property("value",id);
        });

        
        let sample_one = names[0];

        
        console.log(sample_one);

   
        metaData(sample_one);
        barChart(sample_one);
        buildBubbleChart(sample_one);
        buildGaugeChart(sample_one);

    });
};


function metaData(sample) {

    // Use D3 to retrieve all of the data
    d3.json(dataURL).then((data) => {

       
        let metadata = data.metadata;

       
        let value = metadata.filter(result => result.id == sample);

      
        console.log(value)

        // Get the first index from the array
        let valueData = value[0];

       
        d3.select("#sample-metadata").html("");

       
        Object.entries(valueData).forEach(([key,value]) => {

          
            console.log(key,value);

            d3.select("#sample-metadata").append("h5").text(`${key}: ${value}`);
        });
    });

};

// Function for bar chart
function barChart(sample) {

    
    d3.json(dataURL).then((data) => {

        // Retrieve all sample data
        let sampleInfo = data.samples;

        // Filter based on the value of the sample
        let value = sampleInfo.filter(result => result.id == sample);

        // Get the first index from the array
        let valueData = value[0];

        // Get the otu_ids, lables, and sample values
        let otuIds = valueData.otu_ids;
        let otuLabels = valueData.otu_labels;
        let sampleValues = valueData.sample_values;

        // Log the data to the console
        console.log(otuIds,otuLabels,sampleValues);

        // Set top ten items to display in descending order
        let yticks = otuIds.slice(0,10).map(id => `OTU ${id}`).reverse();
        let xticks = sampleValues.slice(0,10).reverse();
        let labels = otuLabels.slice(0,10).reverse();
        
        // Set up the trace for the bar chart
        let trace = {
            x: xticks,
            y: yticks,
            text: labels,
            type: "bar",
            orientation: "h"
        };

        // Setup the layout
        let layout = {
            title: "Top 10 OTUs Present"
        };

        // Call Plotly to plot the bar chart
        Plotly.newPlot("bar", [trace], layout)
    });
};

// Function that builds the bubble chart
function buildBubbleChart(sample) {

    // Use D3 to retrieve all of the data
    d3.json(dataURL).then((data) => {
        
        // Retrieve all sample data
        let sampleInfo = data.samples;

      
        let value = sampleInfo.filter(result => result.id == sample);

        // Get the first index from the array
        let valueData = value[0];

        // Get the otu_ids, lables, and sample values
        let otuIds = valueData.otu_ids;
        let otuLabels = valueData.otu_labels;
        let sampleValues = valueData.sample_values;

        // Log the data to the console
        console.log(otuIds,otuLabels,sampleValues);
        
        // Set up the trace for bubble chart
        let trace1 = {
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
            xaxis: {title: "OTU ID"},
        };

        
        Plotly.newPlot("bubble", [trace1], layout)
    });
};


function optionChanged(value) { 

    // Log the new value
    console.log(value); 

    // Call all functions 
    metaData(value);
    barChart(value);
    buildBubbleChart(value);
    buildGaugeChart(value);
};

// Call the initialize function
init();
