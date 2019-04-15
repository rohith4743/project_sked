function fetching() {
    
    function getdefaults(d) {
        var sd,st,t;
        sd=d.getFullYear()+"-";
        t=d.getMonth()+1;
        sd+=t>9?t:"0"+t;
        sd+="-"
        t=d.getDate();
        sd+=t>9?t:"0"+t;
        t=d.getHours();
        st=t>9?t:"0"+t;
        st+=":"
        t=d.getMinutes();
        st+=t>9?t:"0"+t;
        return [sd,st];      
    }
    function drawtable() {
        var str="";
        $.each(events, function (k, v) {
            var sdate = new Date(Date.parse(v.startdate.replace(/[-]/g,'/')));
            sdate=change_zone(sdate);
            var edate = new Date(Date.parse(v.enddate.replace(/[-]/g,'/')));
            edate=change_zone(edate);
             if(v.eventtype=="task"){
                str+='<tr>'
                str+='<td>'+v.ename+'</td>'
                str+='<td>'+v.description+'</td>'
                str+='<td>'+sdate.toString().substr(4,20)+'</td>'
                str+='<td>'+edate.toString().substr(4,20)+'</td>'
                str+='<td></td>'
                str+='<td></td>'
                str+='<td>'+v.visibility+'</td>'
                str+='<td><button class="taskedit" eid="'+v.eventid+'"><i class="fas fa-edit"></i></button></td>'
                str+='<td><button class="taskdelete" eid="'+v.eventid+'"><i class="fas fa-trash-alt"></i></button></td>'
                str+='</tr>'
             } else if(v.eventtype=="meeting"){
                str+='<tr>'
                str+='<td>'+v.ename+'</td>'
                str+='<td>'+v.description+'</td>'
                str+='<td>'+sdate.toString().substr(4,20)+'</td>'
                str+='<td>'+edate.toString().substr(4,20)+'</td>'
                str+='<td>'+v.creator+'</td>'
                str+='<td>'+v.venue+'</td>'
                str+='<td>'+v.visibility+'</td>'
                str+='<td></td>'
                str+='<td><button class="meetingdelete" eid="'+v.eventid+'"><i class="fas fa-trash-alt"></i></button></td>'
                str+='</tr>'
             } else {
                str+='<tr>'
                str+='<td>'+v.ename+'</td>'
                str+='<td>'+v.description+'</td>'
                str+='<td>'+sdate.toString().substr(4,20)+'</td>'
                str+='<td>'+edate.toString().substr(4,20)+'</td>'
                str+='<td>'+v.creator+'</td>'
                str+='<td>'+v.venue+'</td>'
                str+='<td>'+v.visibility+'</td>'
                str+='<td><button><i class="fas fa-edit"></i></button></td>'
                str+='<td><button><i class="fas fa-trash-alt"></i></button></td>'
                str+='</tr>'
             }
        });
        $('#tbody').html(str);
    }
    
    

    

    function taskedit(eid) {
        var event;
        $.ajax({
            type: "post",
            url: "gettaskdetails.php",
            data: {
                "id":eid
            },
            async:false,
            success: function (response) {
                event=JSON.parse(response);
                $('#et_ename').val(event.ename);
                $('#et_description').val(event.description);
                $('#eid').val(event.eventid);
                var sdate = new Date(Date.parse(event.startdate.replace(/[-]/g,'/')));
                sdate=change_zone(sdate);
                var sd=getdefaults(sdate)
    
                var edate = new Date(Date.parse(event.enddate.replace(/[-]/g,'/')));
                edate=change_zone(edate);
                var ed=getdefaults(edate)
    
                $('#et_sdate').val(sd[0]);
                $('#et_edate').val(ed[0]);
                $('#stime').val(sd[1]);
                $('#etime').val(ed[1]);
    
            }
        });
    
        $('#taskeditmodal').modal('show');        
    }

    function taskdelete(eid) {
        var event;
        $.ajax({
            type: "post",
            url: "gettaskdetails.php",
            data: {
                "id":eid
            },
            async:false,
            success: function (response) {
                event=JSON.parse(response);
                
                var sdate = new Date(Date.parse(event.startdate.replace(/[-]/g,'/')));
                sdate=change_zone(sdate);
                var edate = new Date(Date.parse(event.enddate.replace(/[-]/g,'/')));
                edate=change_zone(edate);
                var str2="event name :"+event.ename+"<br>";
                str2+="start time :"+sdate+"<br>";
                str2+="end time   :"+edate+"<br>";
                $('#dt_body').html(str2);
                $('#deid').val(eid);
               
            }
        });
        $('#taskdeletemodal').modal('show');
    }
    function meetingdelete(eid) {
        var event;
        $.ajax({
            type: "post",
            url: "gettaskdetails.php",
            data: {
                "id":eid
            },
            async:false,
            success: function (response) {
                event=JSON.parse(response);
                
                var sdate = new Date(Date.parse(event.startdate.replace(/[-]/g,'/')));
                sdate=change_zone(sdate);
                var edate = new Date(Date.parse(event.enddate.replace(/[-]/g,'/')));
                edate=change_zone(edate);
                var str2="event name :"+event.ename+"<br>";
                str2+="start time :"+sdate+"<br>";
                str2+="end time   :"+edate+"<br>";
                str2+="creator    :"+event.creator+"<br>";
                str2+="counterpart :"+event.counterpaert+"<br>";
                str2+="venue    :"+event.venue+"<br>";
                $('#dm_body').html(str2);
                $('#dmeid').val(eid);
                var str3=event.creator+";"+event.counterpaert;
                $('#dmtext').val(str3);
               
            }
        });
        $('#meetingdeletemodal').modal('show');
    }


    var fromdate;
    var fromd=new Date();
    fromdate=fromd.toISOString().slice(0, 19).replace('T', ' ');
    $.ajax({
        type: "post",
        url: "viewtasks.php",
        data: {
            "from":fromdate
        },
        async: false,
        success: function (data) {

            events=JSON.parse(data);
            drawtable();
            
        }
    });


    $('#getbutton').click(function (e) { 
        e.preventDefault();
        var fromd=$('#from').val();
        var tod=$('#to').val();
        var fromdate,todate;
        if (fromd!="") {
            fromd=fromd.split('/');
            fromd=new Date(fromd[0],parseInt(fromd[1])-1,fromd[2]);
            fromdate=fromd.toISOString().slice(0, 19).replace('T', ' ');           
        } else {
            fromd=new Date();
            fromdate=fromd.toISOString().slice(0, 19).replace('T', ' ');
        }

        if (tod!="") {
            tod=tod.split('/');
            tod=new Date(tod[0],parseInt(tod[1])-1,tod[2],23,59,59);
            todate=tod.toISOString().slice(0, 19).replace('T', ' ');

            $.ajax({
                type: "post",
                url: "viewtasks.php",
                data: {
                    "from":fromdate,
                    "to":todate
                },
                async: false,
                success: function (data) {
        
                    events=JSON.parse(data);
                    drawtable();
                    
                }
            });
        } else {
            $.ajax({
                type: "post",
                url: "viewtasks.php",
                data: {
                    "from":fromdate
                },
                async: false,
                success: function (data) {
        
                    events=JSON.parse(data);
                    drawtable();
                    
                }
            });
        }


        $('.taskedit').click(function (e) { 
            e.preventDefault();
            taskedit($(this).attr("eid"))
        });

        $('.taskdelete').click(function (e) { 
            e.preventDefault();
            taskdelete($(this).attr("eid"))
        });
        $('.meetingdelete').click(function (e) { 
            e.preventDefault();
            meetingdelete($(this).attr("eid"))
        });
        
    });
    $('.taskedit').click(function (e) { 
        e.preventDefault();
        taskedit($(this).attr("eid"))
    });
    $('.taskdelete').click(function (e) { 
        e.preventDefault();
        taskdelete($(this).attr("eid"))
    });
    $('.meetingdelete').click(function (e) { 
        e.preventDefault();
        meetingdelete($(this).attr("eid"))
    });
    $('#et_save').click(function (e) { 
        e.preventDefault();
        var sd=$('#et_sdate').val().split('-');
        var st=$('#stime').val().split(":");
        var sdateNew=new Date(sd[0],sd[1]-1,sd[2],st[0],st[1],0,0);
        var sdateNewstr=sdateNew.toISOString().slice(0, 19).replace('T', ' ');
        var ed=$('#et_edate').val().split('-');
        var et=$('#etime').val().split(":");
        var edateNew=new Date(ed[0],parseInt(ed[1])-1,ed[2],et[0],et[1],0,0);
        var edateNewstr=edateNew.toISOString().slice(0, 19).replace('T', ' ');
        $.post("edittask.php", {
            "ename":$('#et_ename').val(),
            "description":$('#et_description').val(),
            "id":$('#eid').val(),
            "sdate":sdateNewstr,
            "edate":edateNewstr
        }
        );


        $('#taskeditmodal').modal('hide');  
        var fromdate;
        var fromd=new Date();
        fromdate=fromd.toISOString().slice(0, 19).replace('T', ' ');
            $.ajax({
                type: "post",
                url: "viewtasks.php",
                data: {
                    "from":fromdate
                },
                async: false,
                success: function (data) {

                    events=JSON.parse(data);
                    drawtable();
                    
                }
            });                    
    });
    $('#dt_yes').click(function (e) { 
        e.preventDefault();
        $.post("deletetask.php", {
            "id":$('#deid').val()
        },
            function (data, textStatus, jqXHR) {
                alert(data);
            }
        );
        $('#taskdeletemodal').modal('hide');

    });
    $('#dm_yes').click(function (e) { 
        e.preventDefault();
        var ssr=$('#dmtext').val();
        ssr=ssr.split(";");
        $.post("deletemeeting.php", {
            "id":$('#dmeid').val(),
            "creator":ssr[0],
            "counterpart":ssr[1],
            "message":$('#dm_message').val()
        }
        );
        $('#taskdeletemodal').modal('hide');

    });
}