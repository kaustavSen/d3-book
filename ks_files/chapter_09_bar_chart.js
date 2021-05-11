//width and height
var w = 600;
var h = 250;

var dataset = [5, 10, 13, 19, 21, 25, 22, 18, 15, 13,
    11, 12, 15, 20, 18, 17, 16, 18, 23, 25];

var xScale = d3.scaleBand()
    .domain(d3.range(dataset.length))
    .rangeRound([0, w])
    .paddingInner(0.05);

var yScale = d3.scaleLinear()
    .domain([0, d3.max(dataset)])
    .range([0, h]);

//Create SVG element
var svg = d3.select("body")
    .append("svg")
    .attr("width", w)
    .attr("height", h);

//Create bars
svg.selectAll("rect")
    .data(dataset)
    .enter()
    .append("rect")
    .attr("x", function (d, i) {
        return xScale(i);
    })
    .attr("y", function (d) {
        return h - yScale(d);
    })
    .attr("width", xScale.bandwidth())
    .attr("height", function (d) {
        return yScale(d);
    })
    .attr("fill", function (d) {
        return "rgb(0, 0, " + Math.round(d * 10) + ")";
    })

//Create labels
svg.selectAll("text")
    .data(dataset)
    .enter()
    .append("text")
    .text(function (d) { return d; })
    .attr("text-anchor", "middle")
    .attr("x", function (d, i) {
        return xScale(i) + xScale.bandwidth() / 2;
    })
    .attr("y", function (d) {
        return h - yScale(d) + 14;
    })
    .attr("font-family", "Fira Code Retina")
    .attr("font-size", "11px")
    .attr("fill", "white")
    .attr("font-weight", "bold");

//Let's animate!
d3.select(".button5")
    .on("click", function () {
        //Create new random dataset
        var numValues = dataset.length;
        var maxValue = 25;

        dataset_new = [];

        for (var i = 1; i <= numValues; i++) {
            var newNumber = Math.floor(Math.random() * maxValue);
            dataset_new.push(newNumber);
        }

        svg.selectAll("rect")
            .data(dataset_new)
            .transition()
            .delay(function(d, i) {
                return i / dataset_new.length * 1000;
            })
            .duration(500)
            .attr("y", function (d) {
                return h - yScale(d);
            })
            .attr("height", function (d) {
                return yScale(d);
            }).
            attr("fill", function(d) {
                return "rgb(0, 0, " + Math.round(d * 10) + ")";
            });

        svg.selectAll("text")
            .data(dataset_new)
            .transition()
            .delay(function(d, i) {
                return i / dataset_new.length * 1000;
            })
            .duration(500)
            .text(function (d) { return d; })
            .attr("x", function (d, i) {
                return xScale(i) + xScale.bandwidth() / 2;
            })
            .attr("y", function (d) {
                if (d <= 1) {
                    return h - yScale(d) - 5;
                } else {
                    return h - yScale(d) + 14;
                }
            })
            .attr("fill", function(d) {
                if (d <= 1) {
                    return "black";
                } else {
                    return "white";
                }
            });
    })