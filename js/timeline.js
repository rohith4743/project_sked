var ev=new dayevents(1)
var events=ev.events;
var username;
function calc() {
	username=$("#username").val();
	var x=new Date();
	var z=x.getFullYear()+"-";
	if (x.getMonth()<9) {
		z+="0"
	}
	z=z+(x.getMonth()+1)+"-";
	if (x.getDate()<10) {
		z+="0"
	}
	z=z+x.getDate();
	var y=x.getDay();
	switch (y) {
		case 0:y="su";break;
		case 1:y="mo";break;
		case 2:y="tu";break;
		case 3:y="we";break;
		case 4:y="th";break;
		case 5:y="fr";break;
		case 6:y="sa";break;
	}
	setInterval(changetdate,1000);
	setInterval(notify,1000);
	$("#dateinput").val(z);
	fetchtask(z,y)
	ev.freeevents();
	add_events()
	fa();
}
function fetchtask(z,y)
{
	switch (y) {
		case 0:y="su";break;
		case 1:y="mo";break;
		case 2:y="tu";break;
		case 3:y="we";break;
		case 4:y="th";break;
		case 5:y="fr";break;
		case 6:y="sa";break;
	}
	$.ajax({
		type: "post",
		url: "fetchtasks.php",
		data: {date:z,day:y},
		async:false,
		success: function (response) {
		}
	});
}
function notify() {
	var x=new Date();
	var y=x.toISOString().slice(0, 19).replace('T', ' ');
	$.ajax({
		type: "post",
		url: "notify.php",
		data: {date:y},
		async:false,
		success: function (response) {
			if(response==true)
			{
				alert("you have a new event starting now");
			}
		}
	});
}
function changetdate() {
	var dat=$("#dateinput").val();
	dat=dat.split("-");
	var x=new Date(dat[0],dat[1]-1,dat[2]);
	var z=x.getFullYear()+"-";
	if (x.getMonth()<9) {
		z+="0"
	}
	z=z+(x.getMonth()+1)+"-";
	if (x.getDate()<10) {
		z+="0"
	}
	z=z+x.getDate();
	fetchtask(z,x.getDay());
	ev=new dayevents(1)
	ev.freeevents();
	add_events()
	events=ev.events;
	fa();	
}
function change_zone(dat) {
	var d=new Date();
	var temp=d.getTimezoneOffset()
	if (temp>0) {
		dat.setDate(dat.getDate()-1)
		temp=1440-temp;	
	}
	var min=dat.getMinutes()-temp;
	var temp2=min/60;
	dat.setMinutes(min%60);
	var hour=dat.getHours()+temp2;
	dat.setHours(hour%24);
	if (hour>24) {
		dat.setDate(dat.getDate()+1)
	}
	return dat;
}
function add_events(){
	var url="data/json/"+username+".json";
		$.ajax({
			url: url,
			dataType: "json",
			async:false,
			success: function (data) {
				$.each(data, function (key, value) {
					var sdate = new Date(Date.parse(value.startdate.replace(/[-]/g,'/')));
					sdate=change_zone(sdate);
					var edate = new Date(Date.parse(value.enddate.replace(/[-]/g,'/')));
					edate=change_zone(edate);
					var x=new event(value.eventid,
									value.ename,
									value.eventtype,
									sdate,
									edate,
									value.description,
									value.creator,
									value.counterpart,
									value.visibility,
									value.venue,
									value.repeating,
									value.priority,
									false	);
					ev.add_events(x)
				});
				
			}
		});
}
function fa() {
	str="";
	for (var i = 0; i < events.length; i++) {
		
		x=events[i].start_time;
		y=events[i].end_time;
		xx=events[i].start_time_min;
		yy=events[i].end_time_min;
		z=events[i].empty_event;
		evv=events[i].ename;
		de=events[i].description;
		if (z==false) {
			str+='<div class="an_event"><div class="e_bar">';
			
			if (x==y) {
				str+='<div class="t_hour"><div class="t_time"><p>'+x+':'+xx+'</p></div><div class="t_points">';
				str+=drawlines(xx/5,yy/5)
				str+='</div></div>';
			}else{
				if (xx!=0) {
				str+='<div class="t_hour"><div class="t_time"><p>'+x+':'+xx+'</p></div><div class="t_points">';
				str+=drawlines(xx/5,12)
				str+='</div></div>';
				x=x+1;
			}
			for (var j = x; j < y; j++)
			{
				str+='<div class="t_hour"><div class="t_time">'+j+':00</div><div class="t_points">';
				str+=drawlines(0,12)
				str+='</div></div>';
			}
			if (yy!=0) {
				str+='<div class="t_hour"><div class="t_time">'+y+':00</div><div class="t_points">';
				str+=drawlines(0,yy/5)
				str+='</div></div>';
				x=x+1;
			}
			}
			str+='</div><div class="e_details">'
			str+='<p class="vline"><span class="s1"></span><span class="s2"></span></p><div class="etext"><label>'+evv+'<label><label class="ld">'+de+'<label></div>'
			str+='</div></div>'
		}
		else
		{
			str+='<div class="an_event"><div class="e_bar">';
			if (x==y) {
				str+='<div class="t_hour_free"><div class="t_time">'+x+':'+xx+'</div><div class="t_points">';
				str+=drawlines(xx/5,yy/5)
				str+='</div></div>';
			}else{
				if (xx!=0) {
				str+='<div class="t_hour_free"><div class="t_time">'+x+':'+xx+'</div><div class="t_points">';
				str+=drawlines(xx/5,12)
				str+='</div></div>';
				x=x+1;
			}
			for (var j = x; j < y; j++)
			{
				str+='<div class="t_hour_free"><div class="t_time">'+j+':00</div><div class="t_points">';
				str+=drawlines(0,12)
				str+='</div></div>';
			}
			if (yy!=0) {
				str+='<div class="t_hour_free"><div class="t_time">'+y+':00</div><div class="t_points">';
				str+=drawlines(0,yy/5)
				str+='</div> </div>';
				x=x+1;
			}
			}
			str+='</div><div class="e_details_empty"></div></div>'
		}		
	}
	document.getElementById('c1').innerHTML=str;
}
function drawlines(start,end){
	str="";
	for(var k=start;k<end;k++)
	{
		str+="<hr id=w"+Math.floor(k)+" align='left'>"
	}
	return str;
}