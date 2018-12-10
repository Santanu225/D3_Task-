
 
var xScale,yScale,global_data, xAxis,yAxis,h,w;

var draw = function(data){

  var body = d3.select('body');
  
  var datakey = Object.keys(data[0]);
  
  var selectData = [ ];
  
  global_data = data;
  
  data.forEach(function(d,i){
	  
	  console.log(d);
	  
  });
  
  datakey.forEach(function(d,i){
	  if(i!=0){
		  
		 var temp = { "text" : d };
			selectData.push(temp); 
	  }
	  
	  
  });
 
  
  var xSelection = datakey[1];
  var ySelection = datakey[2];
  
	var headerText = body.append('span')
    .text('Scatter Plot Chart in D3 Js for Deloitte. ')
	 body.append('br')
	  body.append('br')
	   body.append('br')

  // Select X-axis Variable
  var span = body.append('span')
    .text('Select ')
  var yInput = body.append('select')
      .attr('id','xSelect')
      .on('change',xChange)
    .selectAll('option')
	  
      .data(selectData)
      .enter()
    .append('option')
	.attr("class",function(d,i){
		return "xoption"+d.text.replace(/ /g,"");
		
	})
	  .attr('value', function (d) { return d.text })
	  
	  .text(function (d) { return d.text.replace(/_/g," ");})
	  
	 

		 $(".xoption"+xSelection.replace(/ /g,"")).attr("selected","true");
		 
	var span = body.append('span')
    .text('  in Horizontal-Axis.')

	
	  
	  
	  
  body.append('br')

  // Select Y-axis Variable
  var span = body.append('span')
      .text('Select ')
  var yInput = body.append('select')
      .attr('id','ySelect')
      .on('change',yChange)
    .selectAll('option')
      .data(selectData)
      .enter()
    .append('option')
	.attr("class",function(d,i){
		return "yoption"+d.text.replace(/ /g,"");
		
	})
      .attr('value', function (d) { return d.text })
      .text(function (d) { return d.text.replace(/_/g," ");})
	  
	  
		 $(".yoption"+ySelection.replace(/ /g,"")).attr("selected","true");
		 
		 var span = body.append('span')
    .text('  in Vertical-Axis.')
	
	  
  body.append('br')

  // Variables
  var body = d3.select('body')
  var margin = { top: 50, right: 50, bottom: 50, left: 50 }
	h = window.innerHeight - margin.top - margin.bottom-200
	w = window.innerWidth - margin.left - margin.right

  // Scales
  var colorScale = d3.scale.category20()
   xScale = d3.scale.linear()
    .domain([
      d3.min([0,d3.min(data,function (d) { return parseFloat(d[xSelection]) })]),
      d3.max([0,d3.max(data,function (d) { return parseFloat(d[xSelection])+3 })])
      ])
    .range([0,w])
  yScale = d3.scale.linear()
    .domain([
      d3.min([0,d3.min(data,function (d) { return parseFloat(d[ySelection]) })]),
      d3.max([0,d3.max(data,function (d) { return parseFloat(d[ySelection])+3 })])
      ])
    .range([h,0])
  // SVG
  var svg = body.append('svg')
      .attr('height',h + margin.top + margin.bottom)
      .attr('width',w + margin.left + margin.right)
    .append('g')
      .attr('transform','translate(' + margin.left + ',' + margin.top + ')')
  // X-axis
  xAxis = d3.svg.axis()
    .scale(xScale)
    
    .ticks(5)
    .orient('bottom')
  // Y-axis
  yAxis = d3.svg.axis()
    .scale(yScale)
   
    .ticks(5)
    .orient('left')
  // Circles
  var circles = svg.selectAll('circle')
	  .data(data)
	  .enter()
	  .append('circle')
	  .attr("class",function(d,i){return "cir "+d.Region.replace(/ /g,"")})
	  .attr('cx',function (d) { return xScale(parseFloat(d[xSelection])) })
	  .attr('cy',function (d) { return yScale(parseFloat(d[ySelection])) })
	  .attr('r','5')
	 
	  .attr('stroke-width',1)
	  .attr('fill',function (d,i) { return colorScale(i) })
	  .attr('fill-opacity',0.8)
	  .on('mouseover', function (d,i) {
		d3.select(this)
		  .transition()
		  .duration(500)
		  .attr('r',10)
		  .attr('stroke-width',6)
		  
		 var coordinates= d3.mouse(this);
			var x_cor = coordinates[0];
			var y_cor = coordinates[1];
			
		d3.select("svg").append("line")
			.attr("class","hoverline")
			.attr("x1",x_cor)
			.attr("y1",y_cor)
			.attr("x2",x_cor)
			.attr("y2",yScale(0))
			.style("fill","none")
			.style("stroke",function (d) { return colorScale(i) })
			.attr('transform','translate(' + margin.left + ',' + margin.top + ')')
			
		d3.select("svg").append("line")
			.attr("class","hoverline")
			.attr("x1",x_cor)
			.attr("y1",y_cor)
			.attr("x2",xScale(0))
			.attr("y2",y_cor)
			.style("fill","none")
			.style("stroke",function (d) { return colorScale(i) })
			.attr('transform','translate(' + margin.left + ',' + margin.top + ')')
			
			
      })
      .on('mouseout', function () {
        d3.select(this)
          .transition()
          .duration(500)
          .attr('r',5)
          .attr('stroke-width',1)
		  
		d3.selectAll(".hoverline").remove();
      })
    .append('title') // Tooltip
      .text(function (d) { return d["Region"] +
                           '\n(' + d[xSelection] +',' + d[ySelection] +")" })
  // X-axis
  svg.append('g')
      .attr('class','axis')
      .attr('id','xAxis')
      .attr('transform', 'translate(0,' + h + ')')
      .call(xAxis)
    .append('text') // X-axis Label
      .attr('id','xAxisLabel')
      .attr('y',-10)
      .attr('x',w)
      .attr('dy','.71em')
      .style('text-anchor','end')
      .text(xSelection.replace(/_/g," "))
  // Y-axis
  svg.append('g')
      .attr('class','axis')
      .attr('id','yAxis')
      .call(yAxis)
    .append('text') // y-axis Label
      .attr('id', 'yAxisLabel')
      .attr('transform','rotate(-90)')
      .attr('x',0)
      .attr('y',5)
      .attr('dy','.71em')
      .style('text-anchor','end')
      .text(ySelection.replace(/_/g," "))
	  
	  


	  
  
var groups = d3.select("body").append("div").attr("class","ow").style("width",w+"px").style("height","auto").selectAll('legend')
 .data(data)
 .enter()
 
 

 


var text = groups.append('text')
.attr("class",function(d,i){return "legend "+d.Region.replace(" ","")})
  .attr('y', 20)
  .attr('x', 35)
  .style("color",function(d,i) { return colorScale(i); })
  .text(function(d) { return d.Region; })
  .style("margin-left","10px")
  .style("font-weight","400")
  .on("mouseover",function(d,i){
	  
	  $(this).css("font-weight","800");
	  
	  d3.selectAll(".cir."+d.Region.replace(/ /g,"")).attr("r","10");
  })
   .on("mouseout",function(d,i){
	  
	  $(this).css("font-weight","400");
	  d3.selectAll(".cir."+d.Region.replace(/ /g,"")).attr("r","5");
  })
  
  


}
function yChange() {
    var value = this.value // get the new y value
    yScale // change the yScale
      .domain([
        d3.min([0,d3.min(global_data,function (d) { return parseFloat(d[value]) })]),
        d3.max([0,d3.max(global_data,function (d) { return parseFloat(d[value]) })+3])
        ])
    yAxis.scale(yScale) // change the yScale
    d3.select('#yAxis') // redraw the yAxis
      .transition().duration(1000)
      .call(yAxis)
    d3.select('#yAxisLabel') // change the yAxisLabel
      .text(value.replace(/_/g," "))    
    d3.selectAll('circle') // move the circles
      .transition().duration(1000)
      .delay(function (d,i) { return i*100})
        .attr('cy',function (d) { return yScale( parseFloat(d[value])) })
  }


 function xChange() {
    var value = this.value // get the new x value
    xScale // change the xScale
      .domain([
        d3.min([0,d3.min(global_data,function (d) { return parseFloat(d[value]) })]),
        d3.max([0,d3.max(global_data,function (d) { return parseFloat(d[value]) })+3])
        ])
    xAxis.scale(xScale) // change the xScale
    d3.select('#xAxis') // redraw the xAxis
      .transition().duration(1000)
      .call(xAxis)
    d3.select('#xAxisLabel') // change the xAxisLabel
      .transition().duration(1000)
      .text(value.replace(/_/g," "))
    d3.selectAll('circle') // move the circles
      .transition().duration(1000)
      .delay(function (d,i) { return i*100})
        .attr('cx',function (d) { return xScale(parseFloat(d[value])) })
  }
  
  d3.json('bea_fdi_employment.json',function (data) {
		  
		  draw(data);
	})
  
  // To make Responsive 
  $(window).resize(function(){
	  $("span").remove();
	  $("select").remove();
	  $("br").remove();
	  d3.selectAll("svg").remove();
	  $(".legend").remove();
		  d3.json('bea_fdi_employment.json',function (data) {
		  
		  draw(data);
	  })
	  
	  
  });