class event{
	constructor(eventid,ename,eventtype,startdate,enddate,description,creator,counterpart,visibility,venue,repeating,priority,empty_event){
		this.eventid=eventid;
		this.ename=ename;
		this.eventtype=eventtype;
		this.startdate=startdate;
		this.enddate=enddate;
		this.description=description;
		this.creator=creator;
		this.counterpart=counterpart;
		this.visibility=visibility;
		this.venue=venue;
		this.repeating=repeating;
		this.priority=priority;
		this.empty_event=empty_event;
		this.break=false;
		this.start_time=0;
		this.end_time=0;
		this.start_time_min=0;
		this.end_time_min=0;
		this.calculate()
	}
	calculate()
	{
		this.sdate=this.startdate.getDate();
		this.edate=this.enddate.getDate();
		this.start_time=this.startdate.getHours();
		this.start_time_min=this.startdate.getMinutes();
		this.end_time=this.enddate.getHours();
		this.end_time_min=this.enddate.getMinutes();
	} 
	display()
	{
		alert(this.startdate);
	}

}
class dayevents{
	constructor(x){
		this.events=new Array()
		this.fevents=new Array()
		this.uevents=new Array()
	}
	add_events(somevent)
	{		
		this.uevents.push(somevent)
		this.uevents.sort(function (a,b) { 
			a = new Date(a.startdate);
    		b = new Date(b.startdate);
    		return a<b ? -1 : a>b ? 1 : 0;
		 })
		this.freeevents()
		fa()
		
	}
	freeevents() {
		var ecount=0
		this.events.length=0;
		this.fevents.length=0;
		var dat=$("#dateinput").val();
		dat=dat.split("-");
		var xsd=new Date(dat[0],dat[1]-1,dat[2]);
		var xed=new Date(dat[0],dat[1]-1,dat[2]);


		
		if(this.uevents.length==0){
			xed.setHours(23);
			xed.setMinutes(59);

			var x=new event(0,"","",xsd,xed,"","","","","","",0,true)
			this.events.push(x)
			this.fevents.push(x)
			ecount++;
		}
		else{
			x=this.uevents[0];
			if(x.start_time!=0)
			{
				if(x.startdate<xsd)
				{
					x.startdate=xsd;
					x.calculate()
				}
				xed.setHours(x.start_time);
				xed.setMinutes(x.start_time_min)
				var y=new event(0,"","",xsd,xed,"","","","","","",0,true)
				this.fevents.push(y)
				this.events.push(this.fevents[0])
				ecount++;
			}
			for (var i = 0; i < this.uevents.length; i++) {
				var xssd=new Date(dat[0],dat[1]-1,dat[2]);
				var xeed=new Date(dat[0],dat[1]-1,dat[2]);
				if(i==this.uevents.length-1)
				{	
					xeed.setHours(23);
					xeed.setMinutes(59)
					if(this.uevents[i].enddate>xeed)
					{
						this.uevents[i].enddate=xeed;
						this.uevents[i].calculate()
					}
				}
				this.events.push(this.uevents[i])
				ecount++;
				if(i<this.uevents.length-1&&!(this.uevents[i].end_time==this.uevents[i+1].start_time && this.uevents[i].end_time_min==this.uevents[i+1].start_time_min))
				{
					xssd.setHours(this.uevents[i].end_time);
					xssd.setMinutes(this.uevents[i].end_time_min)
					xeed.setHours(this.uevents[i+1].start_time);
					xeed.setMinutes(this.uevents[i+1].start_time_min)
					var u=new event(0,"","",xssd,xeed,"","","","","","",0,true)
					this.fevents.push(u)
					this.events.push(u)
					ecount++;
				}
			}



			if(this.events[ecount-1].end_time!=24)
			{
				y=this.events[ecount-1]
				var xssd=new Date(dat[0],dat[1]-1,dat[2]);
				var xeed=new Date(dat[0],dat[1]-1,dat[2]);
				xssd.setHours(y.end_time);
				xssd.setMinutes(y.end_time_min)
				xeed.setHours(23);
				xeed.setMinutes(59)
				var x=new event(0,"","",xssd,xeed,"","","","","","",0,true)
				this.fevents.push(x)
				this.events.push(x)
				ecount++;				
			}
		}
	}
}