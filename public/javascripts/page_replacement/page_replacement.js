$(document).ready(function() {
	var topic = "Page Replacement";
    $('#side_top_navbar').load('../base.html', function () {
    	$('.left').html(topic);
    })
    $('#continue_button').click(function()
    {
    	$('#input').fadeIn();
    	document.getElementById("input_boxes").innerHTML="";
    	var n=$('#number_of_requests').val();
    	var i=0;
	    for(i=0;i<n;i+=1)
	    {
    		$('#input_boxes').append("<input style='width:5%;' class='ref col-sm-1'>");
	    }
    });

	$('#action').click(function()
	{
		inp="";
		inp+=$('#number_of_frames').val()+' '+$('#number_of_requests').val()+' ';
		inputs=document.getElementsByClassName("ref");
		for(var i in inputs)
		{
			if(inputs[i].value>='0' && inputs[i].value<='9')
				inp+=inputs[i].value+' '; 
		}
		 $.ajax({
	            type: 'POST',
	            data: {inp},
	            url: 'http://localhost:3000/page_replacement',                     
	            success: function(data) {
	            	document.getElementById("lru_table").innerHTML="<tr></tr>";
	            	document.getElementById("fifo_table").innerHTML="<tr></tr>";
	            	document.getElementById("optimal_table").innerHTML="<tr></tr>";
	            	document.getElementById("lru_hit").innerHTML="Hit Percentage : ";
	            	document.getElementById("fifo_hit").innerHTML="Hit Percentage : ";
	            	document.getElementById("optimal_hit").innerHTML="Hit Percentage : ";
	            	lru=data.split("LRU")[1];
	            	lru=lru.split("FIFO")[0];
	            	fifo=data.split("OPTIMAL")[0];
	            	fifo=fifo.split("FIFO")[1];
	            	optimal=data.split("OPTIMAL")[1];

	            	var regex = /\|(.*?)\|/g;
	            	var lru_vals=[];
					var lru_results=[];
	            	var fifo_vals=[];
					var fifo_results=[];
	            	var optimal_vals=[];
					var optimal_results=[];

	            	do {
					    m = regex.exec(lru);
					    if (m) {
					        lru_vals.push(m[1]);
					    }
					} while (m);

	            	regex = /\*(.*?)\|/g;
	            	do {
					    m = regex.exec(lru);
					    if (m) {
					        lru_results.push(m[1]);
					    }
					} while (m);

					regex = /\|(.*?)\|/g;
	            	do {
					    m = regex.exec(fifo);
					    if (m) {
					        fifo_vals.push(m[1]);
					    }
					} while (m);

	            	regex = /\*(.*?)\|/g;
	            	do {
					    m = regex.exec(fifo);
					    if (m) {
					        fifo_results.push(m[1]);
					    }
					} while (m);

					regex = /\|(.*?)\|/g;
	            	do {
					    m = regex.exec(optimal);
					    if (m) {
					        optimal_vals.push(m[1]);
					    }
					} while (m);

	            	regex = /\*(.*?)\|/g;
	            	do {
					    m = regex.exec(optimal);
					    if (m) {
					        optimal_results.push(m[1]);
					    }
					} while (m);
	            	var nr=$('#number_of_requests').val();
	            	var nf=$('#number_of_frames').val();
	            	optimal_hits = optimal.split("hits:")[1];
	            	optimal_hits=parseInt(optimal_hits);

	            	lru_hits = lru.split("hits:")[1];
	            	lru_hits=parseInt(lru_hits);

	            	fifo_hits = fifo.split("hits:")[1];
	            	fifo_hits=parseInt(fifo_hits);


	            	$('#lru_hit').append((lru_hits/nr)*100);
	            	$('#optimal_hit').append((optimal_hits/nr)*100);
	            	$('#fifo_hit').append((fifo_hits/nr)*100);

	            	$('#lru_hit').append("%");
	            	$('#optimal_hit').append("%");
	            	$('#fifo_hit').append("%");

	            	var i=0,j=0;
	            	$('#lru_table').append('<tr  style="font-size:25px;"  id="lruh"><td>Request Number</td></tr>');
	            	for(j=0;j<nf;j+=1)
	            		$('#lruh').append('<td>Frame'+j+'</td>');
	            	$('#lruh').append('<td>Hit/Miss</td>');
            		for(j=0;j<nr;j+=1)
            		{
	            		$('#lru_table').append('<tr id="lru'+j+'"><td>Request'+j+'</td></tr>');
	            		for(i in lru_vals[j])
	            		{
	            			if((lru_vals[j][i]>='0' && lru_vals[j][i]<='9') || lru_vals[j][i]=='-')
	            				$('#lru'+j).append('<td>'+lru_vals[j][i]+'</td>')
	            		}
	            		if(lru_results[j][0]=='F')
	            			$('#lru'+j).append('<td style="background-color:red">'+lru_results[j]+'</td>')
	            		if(lru_results[j][0]=='H')
	            			$('#lru'+j).append('<td style="background-color:green">'+lru_results[j]+'</td>')
	            	}

	            	$('#fifo_table').append('<tr  style="font-size:25px;"  id="fifoh"><td>Request Number</td></tr>');
	            	for(j=0;j<nf;j+=1)
	            		$('#fifoh').append('<td>Frame'+j+'</td>');
	            	$('#fifoh').append('<td>Hit/Miss</td>');
            		for(j=0;j<nr;j+=1)
            		{
	            		$('#fifo_table').append('<tr id="fifo'+j+'"><td>Request'+j+'</td></tr>');
	            		for(i in fifo_vals[j])
	            		{
	            			if((fifo_vals[j][i]>='0' && fifo_vals[j][i]<='9') || fifo_vals[j][i]=='-')
	            				$('#fifo'+j).append('<td>'+fifo_vals[j][i]+'</td>')
	            		}
	            		if(fifo_results[j][0]=='F')
	            			$('#fifo'+j).append('<td style="background-color:red">'+fifo_results[j]+'</td>')
	            		if(fifo_results[j][0]=='H')
	            			$('#fifo'+j).append('<td style="background-color:green">'+fifo_results[j]+'</td>')
	            	}


	            	$('#optimal_table').append('<tr  style="font-size:25px;"  id="optimalh"><td>Request Number</td></tr>');
	            	for(j=0;j<nf;j+=1)
	            		$('#optimalh').append('<td>Frame'+j+'</td>');
	            	$('#optimalh').append('<td>Hit/Miss</td>');
            		for(j=0;j<nr;j+=1)
            		{
	            		$('#optimal_table').append('<tr id="optimal'+j+'"><td>Request'+j+'</td></tr>');
	            		for(i in optimal_vals[j])
	            		{
	            			if((optimal_vals[j][i]>='0' && optimal_vals[j][i]<='9') || optimal_vals[j][i]=='-')
	            				$('#optimal'+j).append('<td>'+optimal_vals[j][i]+'</td>')
	            		}
	            		if(optimal_results[j][0]=='F')
	            			$('#optimal'+j).append('<td style="background-color:red">'+optimal_results[j]+'</td>')
	            		if(optimal_results[j][0]=='H')
	            			$('#optimal'+j).append('<td style="background-color:green">'+optimal_results[j]+'</td>')
	            	}
	            	$("#result").fadeIn();

	            }
	        });
	});



});

