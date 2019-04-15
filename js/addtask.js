function writename(para) {
    var par = para.toUpperCase()
    document.getElementsByName('tname')[0].value = par;
}
$('document').ready(function(){
    $('#sdate').datepicker({
        changeYear:true,
        changeMonth:true,
        minDate: -0
    })
    $('#edate').datepicker({
        changeYear:true,
        changeMonth:true,
        minDate: -0
    })
})
function validatetask() {
    var tname = $('#tname').val()
    var descripton = $('#Description').val()
    var sdate = $('#sdate').val()
    var stime = $('#stime').val()
    var edate = $('#edate').val()
    var etime = $('#etime').val()
    var priority = $('#priority').val()
    var visibility = $('#visibility').val()
    var n=$("input:checked").length;
    var an=true;
    if(tname==""){
        $('#tnamehelp').text('*Please enter a value')
        an=false
    }
    var dateerror="";
    var today=new Date();
    var sdateNew="";
    var edateNew="";

    if (n>0) {

        if(stime==""){
            dateerror="*please choose the start time<br>";
            an=false;
        } else {
            var st=stime.split(':');
            sdateNew=new Date(parseInt(1970),0,1,st[0],st[1],0,0);
            var sdateNewstr=sdateNew.toISOString().slice(0, 19).replace('T', ' ');
            
             $('#start').val(sdateNewstr)
        }
        $('#sdateerror').html(dateerror)
        dateerror=""
        if(etime==""){
            dateerror="*please choose the end time<br>";
            an=false;
        } else {
            var et=etime.split(':');
            edateNew=new Date(1970,0,1,et[0],et[1],0,0);
            if(edateNew<sdateNew)
            {
                dateerror+="*task should only end after its start time<br>";
                an=false;
            } else {
                edateNew=edateNew.toISOString().slice(0, 19).replace('T', ' ');
                $('#end').val(edateNew)
            }
        }
        $('#edateerror').html(dateerror)
    } else {

        an=an && validatedates()

    }
    if(an==true){
        $.ajaxSetup({
            async:false
          });
        $.post("gettasks.php", {
            "start":sdate,
            "end":edate
        },
            function (data, textStatus, jqXHR) {
                var tasks=JSON.parse(data);
                $.each(tasks, function (i, v) { 

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
                    
                    
                    var sdat = new Date(Date.parse(v.startdate.replace(/[-]/g,'/')));
                    sdat=change_zone(sdat);
                    var edat = new Date(Date.parse(v.enddate.replace(/[-]/g,'/')));
                    edat=change_zone(edat);                    
                    var sd=sdate.split('/');
                    var st=stime.split(':');
                    var ed=edate.split('/');
                    var et=etime.split(':');
                    sdateNew=new Date(parseInt(sd[2]),parseInt(sd[0])-1,sd[1],st[0],st[1],0,0);
                    edateNew=new Date(ed[2],parseInt(ed[0])-1,ed[1],et[0],et[1],0,0);
                    if((sdateNew<sdat && edateNew>sdat) || (sdateNew>sdat && edateNew<edat) || (sdateNew<edat && edateNew>edat)){
                        an=false;
                        alert("there is no free time in that period. please choose other timings")
                    } else {
                        
                    }


                });
            }
        );
    }
    return an;
}

function validatedates() {
    var sdate = $('#sdate').val()
    var stime = $('#stime').val()
    var edate = $('#edate').val()
    var etime = $('#etime').val()
    var an=true;
    var today=new Date();
    var sdateNew="";
    var edateNew="";
    var dateerror=""
    if(sdate=="")
    {
        dateerror="*please choose the start date<br>"
        an=false;
        if(stime==""){
            dateerror+="*please choose the start time<br>";
            an=false;
        }
    }
    else{
        var sd=sdate.split('/');
        if(stime==""){
            dateerror="*please choose the start time<br>";
            an=false;
        } else {
            var st=stime.split(':');
            sdateNew=new Date(parseInt(sd[2]),parseInt(sd[0])-1,sd[1],st[0],st[1],0,0)
            if (today>sdateNew) {
                dateerror="*please choose a start time not in past<br>";
                an=false;
            } else {
                sdateNew=sdateNew.toISOString().slice(0, 19).replace('T', ' ');
                $('#start').val(sdateNew)
            }
        }
    }
    $('#sdateerror').html(dateerror)
    dateerror=""
    if(edate=="")
    {
        dateerror="*please choose the end date<br>"
        an=false;
        if(etime==""){
            dateerror+="*please choose the end time<br>";
            an=false;
        }
    } else {
        var ed=edate.split('/')
        if(etime==""){
            dateerror+="*please choose the end time<br>";
            an=false;
        } else {
            var et=etime.split(':');
            edateNew=new Date(ed[2],parseInt(ed[0])-1,ed[1],et[0],et[1],0,0)
            if(edateNew<sdateNew)
            {
                dateerror+="*task should only end after its start time<br>";
                an=false;
            } else {
                edateNew=edateNew.toISOString().slice(0, 19).replace('T', ' ');
                $('#end').val(edateNew)
            }
        }
    }
    $('#edateerror').html(dateerror)
    return an;
}