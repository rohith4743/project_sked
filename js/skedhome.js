function drawtime()
{
    var now=new Date();
    var time=now.getHours()+" : "+now.getMinutes()+" : "+now.getSeconds();
    $('.clocktime').text(time);
    var date=now.toDateString();
    $('.clockdate').text(date);
    var utc=now.toUTCString()
    $('.utc_time').text(utc);
}
function ismeeting(creator)
{
    var url="data/contacts/"+username+".json";
    var dt=false;
    $.ajax({
        dataType: "json",
        async:false,
        url: url,
        success: function (contacts) {
            $.each(contacts, function (i, x) { 
            $.ajax({
                method: "POST",
                url: "getusernamebymobile.php",
                data: {number:x.mobile},
                async:false,
                success: function (data) { 
                    if(data==creator)
                    {
                         dt=true;                       
                    }
                }
            })
        
            });
            
        }
      }); 


    
    return dt;  
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
function findname(user) {
    var dt=""
    $.ajax({
        method: "Post",
        url: "findname.php",
        data: {user:user},
        async:false,
        success: function (data) { 
            dt=data;
         }
    })
    return dt;
}
function getmessages() {
    $.post("getmessages.php", {},
        function (data, textStatus, jqXHR) {
            var messages=JSON.parse(data);
            var str="";
            $.each(messages, function (i, v) { 
                 
                str+='<div class="messag"><div class="d1"><div class="d2"><span>@'+v.counterpart+'</span> has rejected your meeting request</div>';
                str+='<div class="d3">message: '+v.message+'</div></div><div class="d4"><button class="dm" id="'+v.id+'"><i class="fas fa-trash-alt"></i></button></div></div>';

            });
            $('#showingmessages').html(str);
            $('.dm').click(function (e) { 
                e.preventDefault();
                var id=$(this).attr("id");
                $.post("deletemessage.php", {
                    "id":id
                },
                    function (data, textStatus, jqXHR) {
                    }
                );
                
            });
        }
    );
}
$(document).ready(function () {
    drawtime()
    setInterval(drawtime, 1000);
    getmessages()
    setInterval(getmessages, 1000);
    var username=$('#username').val();
    $('#contact_dialog').removeAttr("hidden");
    // setInterval(calc,1000)

    var meeting=[];
    var tab="meeting";
    
    $('#viewc').click(function (e) { 
        e.preventDefault();
        window.location="viewcontacts.php";
    });
    $('#viewt').click(function (e) { 
        e.preventDefault();
        window.location="viewevent.php";
    });
    $('#atask').click(function (e) { 
        e.preventDefault();
        window.location="add_task.php";
    });
    $('#ameeting').click(function (e) { 
        e.preventDefault();
        window.location="addmeeting.php";
    });
    $('#settings').click(function (e) { 
        e.preventDefault();
        window.location="settings.php";
    });
    $.post("meetingnotifications.php", {},
        function (data, textStatus, jqXHR) {   
                var events=JSON.parse(data);
                $.each(events, function (k, v) { 
                    if(v.isadd=="no" && v.eventtag==null && ismeeting(v.creator)){
                        meeting.push(v);
                    } 
                }); 
                
                if(tab=="meeting")
                {
                    var str="";
                    for(var i=0;i<meeting.length;i++)
                    {
                        str+='<div class="meeting" id="'+meeting[i].eventid+'"><div class="evname"><label class="row" id="mn_name">'+meeting[i].ename+'</label><label id="mn_description">'+meeting[i].description+'</label></div>';
                        var sdate = new Date(Date.parse(meeting[i].startdate.replace(/[-]/g,'/')));
                        str+='<div class="edetails"><div class="rowr"><label class="c1">Start Time</label><label class="c2">'+change_zone(sdate).toLocaleString()+'</label></div>';
                        var edate = new Date(Date.parse(meeting[i].enddate.replace(/[-]/g,'/')));
                        str+='<div class="rowr"><label class="c1">End Time</label><label class="c2">'+change_zone(edate).toLocaleString()+'</label></div>';
                        str+='<div class="rowr"><label class="c1">Venue</label><label class="c2">'+meeting[i].venue+'</label></div>';
                        str+='<div class="rowr"><label class="c1">Username</label><label class="c2">'+meeting[i].creator+'</label></div>';
                        str+='<div class="rowr"><label class="c1">Name</label><label class="c2">'+findname(meeting[i].creator)+'</label></div></div>';
                        str+='<div class="footer"><button mid="'+meeting[i].eventid+'" creator="'+meeting[i].creator+'" class="mbaccept btn btn-outline-primary">Accept</button>';
                        str+='<button mid="'+meeting[i].eventid+'" isadd="no" creator="'+meeting[i].creator+'" class="mbreject btn btn-outline-primary">Reject</button>';
                        str+='<button mid="'+meeting[i].eventid+'" isadd="no" creator="'+meeting[i].creator+'" class="mbrejectm btn btn-outline-primary">Reject with message</button></div></div>';
                    }
                    if(meeting.length==0)
                    {
                        str='<div class="meeting"> nothing to show</div>'
                    }
                    $('.tabdata').html(str)
                } 
                $('.mbaccept').click(function (e) { 
                    e.preventDefault();
                    var id=$(this).attr("mid");
                    $('#'+id).hide(300);
                    var creator=$(this).attr("creator")
                    $.post("acceptevent.php", {
                        "creator":creator,
                        "username":username,
                        "id":id,
                    }
                    );
                    changetdate();
                });
                $('.mbreject').click(function (e) { 
                    e.preventDefault();
                    var isadd=$(this).attr("isadd");
                    var id=$(this).attr("mid");
                    var creator=$(this).attr("creator")
                    if(isadd=="no")
                    {
                        $('#deleteevent').modal('show');			
                    }
                    $('#yesbut').click(function () {
                        $('#'+id).hide(300);

                        $.post("rejectevent.php", {
                            "creator":creator,
                            "username":username,
                            "id":id
                    });
                        

                        $('#deleteevent').modal('hide');
                        		
                    })
                });

                $('.mbrejectm').click(function (e) { 
                    e.preventDefault();
                    var isadd=$(this).attr("isadd");
                    var id=$(this).attr("mid");
                    var message="";
                    var creator=$(this).attr("creator")
                    if(isadd=="no")
                    {
                        $('#rejectmessage').modal('show');			
                    }
                    $('#subbut').click(function () {
                        $('#'+id).hide(300);
                        message=$('#rmessage').val();
                        $.post("rejecteventmessage.php", {
                            "creator":creator,
                            "username":username,
                            "id":id,
                            "message":message
                        });
                        $('#rejectmessage').modal('hide');
                    })
                    
                });






            }
            
        );   
    $('.tab-n').click(function (e) { 
        var meeting=[];
        var event=[];
        var meetingevent=[];
        var ad=[];
        e.preventDefault();
        $('.tab-n').removeClass("active");
        $(this).addClass("active");
        var tab=$(this).attr("tab");
        $.post("meetingnotifications.php", {},
            function (data, textStatus, jqXHR) {
                
                var events=JSON.parse(data);
                $.each(events, function (k, v) { 
                    if(v.isadd=="yes"){
                        ad.push(v);
                    } else if(v.eventtag!=null){
                        event.push(v)
                    } else if(ismeeting(v.creator)) {
                        meeting.push(v)      

                    } else {
                        meetingevent.push(v)         
                    } 
                }); 
                
                if(tab=="meeting")
                {
                    var str="";
                    for(var i=0;i<meeting.length;i++)
                    {
                        str+='<div class="meeting" id="'+meeting[i].eventid+'"><div class="evname"><label class="row" id="mn_name">'+meeting[i].ename+'</label><label id="mn_description">'+meeting[i].description+'</label></div>';
                        var sdate = new Date(Date.parse(meeting[i].startdate.replace(/[-]/g,'/')));
                        str+='<div class="edetails"><div class="rowr"><label class="c1">Start Time</label><label class="c2">'+change_zone(sdate).toLocaleString()+'</label></div>';
                        var edate = new Date(Date.parse(meeting[i].enddate.replace(/[-]/g,'/')));
                        str+='<div class="rowr"><label class="c1">End Time</label><label class="c2">'+change_zone(edate).toLocaleString()+'</label></div>';
                        str+='<div class="rowr"><label class="c1">Venue</label><label class="c2">'+meeting[i].venue+'</label></div>';
                        str+='<div class="rowr"><label class="c1">Username</label><label class="c2">'+meeting[i].creator+'</label></div>';
                        str+='<div class="rowr"><label class="c1">Name</label><label class="c2">'+findname(meeting[i].creator)+'</label></div></div>';
                        str+='<div class="footer"><button mid="'+meeting[i].eventid+'" creator="'+meeting[i].creator+'" class="mbaccept btn btn-outline-primary">Accept</button>';
                        str+='<button mid="'+meeting[i].eventid+'" isadd="no" creator="'+meeting[i].creator+'" class="mbreject btn btn-outline-primary">Reject</button>';
                        str+='<button mid="'+meeting[i].eventid+'" isadd="no" creator="'+meeting[i].creator+'" class="mbrejectm btn btn-outline-primary">Reject with message</button></div></div>';
                    }
                    if(meeting.length==0)
                    {
                        str='<div class="meeting"> nothing to show</div>'
                    }
                    $('.tabdata').html(str)
                } else if(tab=="event"){

                    var str="";
                    for(var i=0;i<meetingevent.length;i++)
                    {

                        str+='<div class="meeting" id="'+meetingevent[i].eventid+'"><div class="evname"><label class="row" id="mn_name">'+meetingevent[i].ename+'</label><label id="mn_description">'+meetingevent[i].description+'</label></div>';
                        var sdate = new Date(Date.parse(meetingevent[i].startdate.replace(/[-]/g,'/')));
                        str+='<div class="edetails"><div class="rowr"><label class="c1">Start Time</label><label class="c2">'+change_zone(sdate).toLocaleString()+'</label></div>';
                        var edate = new Date(Date.parse(meetingevent[i].enddate.replace(/[-]/g,'/')));
                        str+='<div class="rowr"><label class="c1">End Time</label><label class="c2">'+change_zone(edate).toLocaleString()+'</label></div>';
                        str+='<div class="rowr"><label class="c1">Venue</label><label class="c2">'+meetingevent[i].venue+'</label></div>';
                        str+='<div class="rowr"><label class="c1">Username</label><label class="c2">'+meetingevent[i].creator+'</label></div>';
                        str+='<div class="rowr"><label class="c1">Name</label><label class="c2">'+findname(meetingevent[i].creator)+'</label></div></div>';
                        str+='<div class="footer"><button mid="'+meetingevent[i].eventid+'" creator="'+meetingevent[i].creator+'" class="mbaccept btn btn-outline-primary">Accept</button>';
                        str+='<button mid="'+meetingevent[i].eventid+'" isadd="no" creator="'+meetingevent[i].creator+'" class="mbreject btn btn-outline-primary">Reject</button>';
                        str+='<button mid="'+meetingevent[i].eventid+'" isadd="no" creator="'+meetingevent[i].creator+'" class="mbrejectm btn btn-outline-primary">Reject with message</button></div></div>';

                    }
                    if(meetingevent.length==0)
                    {
                        str='<div class="meeting"> nothing to show</div>'
                    }
                    $('.tabdata').html(str)

                } else {
                    str="";
                    if(ad.length==0)
                    {
                        str='<div class="meeting"> nothing to show</div>'
                    }
                    $('.tabdata').html(str)
                }

                $('.mbaccept').click(function (e) { 
                    e.preventDefault();
                    var id=$(this).attr("mid");
                    $('#'+id).hide(300);
                    var creator=$(this).attr("creator")
                    $.post("acceptevent.php", {
                        "creator":creator,
                        "username":username,
                        "id":id,
                    }
                    );
                    changetdate();

                });
                $('.mbreject').click(function (e) { 
                    e.preventDefault();
                    var isadd=$(this).attr("isadd");
                    var id=$(this).attr("mid");
                    var creator=$(this).attr("creator")
                    if(isadd=="no")
                    {
                        $('#deleteevent').modal('show');			
                    }
                    $('#yesbut').click(function () {
                        $('#'+id).hide(300);

                        $.post("rejectevent.php", {
                            "creator":creator,
                            "username":username,
                            "id":id
                    });


                        $('#deleteevent').modal('hide');		
                    })
                });
                
                $('.mbrejectm').click(function (e) { 
                    e.preventDefault();
                    var isadd=$(this).attr("isadd");
                    var id=$(this).attr("mid");
                    var message="";
                    var creator=$(this).attr("creator")
                    if(isadd=="no")
                    {
                        $('#rejectmessage').modal('show');			
                    }
                    $('#subbut').click(function () {
                        $('#'+id).hide(300);
                        message=$('#rmessage').val();
                        $.post("rejecteventmessage.php", {
                            "creator":creator,
                            "username":username,
                            "id":id,
                            "message":message
                        });
                        $('#rejectmessage').modal('hide');
                    })
                    
                });
            }
        );
    });
    
});