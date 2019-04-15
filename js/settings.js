var events;
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

function displayrepeats() {
    var str="";
    $.ajax({
        type: "get",
        url: "getrepeats.php",
        async:false,
        success: function (response) {

            var tasks=JSON.parse(response);
            $.each(tasks, function (i, v) { 
                var sdate = new Date(Date.parse(v.startdate.replace(/[-]/g,'/')));
				sdate=change_zone(sdate);
				var edate = new Date(Date.parse(v.enddate.replace(/[-]/g,'/')));
                edate=change_zone(edate);
                var repeatdays=v.repeating;
                repeatdays=repeatdays.split(".");
                str+='<div class="task" id="'+v.eventid+'" tid="'+v.eventid+'"><div class="taskdetails">';
                str+='<div class="taskdiv1"><div class="taskname">'+v.ename+'</div>';
                str+='<div class="taskdescription">'+v.description+'</div></div>';
                str+='<div class="taskdiv2"><div class="tasktimes"><div class="tasktime">'+sdate.getHours()+':'+sdate.getMinutes()+'</div>';
                str+='<div class="tasktime">'+edate.getHours()+':'+edate.getMinutes()+'</div></div><div class="taskdays">';
                str+='<button class="repeatday ';
                $.each(repeatdays, function (j,k) { 
                    if (k=="su") {
                        str+=' selectedday'
                    }
                });
                str+='" day="sun" tid="'+v.eventid+'">S</button>';
                str+='<button class="repeatday ';
                $.each(repeatdays, function (j,k) { 
                    if (k=="mo") {
                        str+=' selectedday'
                    }
               });
                str+='" day="mon" tid="'+v.eventid+'">M</button>';
                str+='<button class="repeatday ';
                $.each(repeatdays, function (j,k) { 
                    if (k=="tu") {
                        str+=' selectedday'
                    }
               });
                str+='" day="tue" tid="'+v.eventid+'">T</button>';
                str+='<button class="repeatday ';
                $.each(repeatdays, function (j,k) { 
                    if (k=="we") {
                        str+=' selectedday'
                    }
               });
                str+='" day="wed" tid="'+v.eventid+'">W</button>';
                str+='<button class="repeatday ';
                $.each(repeatdays, function (j,k) { 
                    if (k=="th") {
                        str+=' selectedday'
                    }
               });
                str+='" day="thu" tid="'+v.eventid+'">T</button>';
                str+='<button class="repeatday ';
                $.each(repeatdays, function (j,k) { 
                    if (k=="fr") {
                        str+=' selectedday'
                    }
               });
                str+='" day="fri" tid="'+v.eventid+'">F</button>';
                str+='<button class="repeatday ';
                $.each(repeatdays, function (j,k) { 
                    if (k=="sa") {
                        str+=' selectedday'
                    }
               });
                str+='" day="sat" tid="'+v.eventid+'">S</button>';
                str+='</div></div>';
                str+='<div class="taskdiv3"><button class="deletetask" tid="'+v.eventid+'"><i class="fas fa-calendar-times"></i></button></div>';
                str+='</div><div class="savebutton"><button class="save" tid="'+v.eventid+'" id="d'+v.eventid+'" disabled>save</button></div></div> ';
                
            });
        }
    });
    $('.settings_text').html(str);
    $(".repeatday").click(function (e) { 
        e.preventDefault();
        $(this).toggleClass("selectedday");
        var tid=$(this).attr("tid");
        var day=$(this).attr("day");
        var did="d"+tid;
        $("#"+did).removeAttr("disabled");
    });
    $(".save").click(function (e) { 
        e.preventDefault();
        $(this).attr("disabled", "true");
    });
}




function displayothers(params) {
    var str="";

    str+='<div class="dateline"><label>FROM</label><input type="text" name="from" id="from"><label>TO</label>';
    str+='<input type="text" name="to" id="to"><button id="getbutton">GET</button></div>';
    str+='<div class="tasktable"><table class="tabled"><thead><tr><td>EVENT NAME</td><td>EVENT DESCRIPTION</td>';
    str+='<td>START TIME</td><td>END TIME</td><td>INVITED BY</td><td>VENUE</td><td>VISIBILITY</td><td></td><td></td>';
    str+='</tr></thead><tbody id="tbody"></tbody></table></div>';
    $('.settings_text').html(str);
    fetching()


}








$(document).ready(function () {
    $('#from').datepicker({
        changeYear:true,
        changeMonth:true,
        minDate: -0  // comment this to get more dates
    })
    $( "#from" ).datepicker( "option", "dateFormat", "yy/mm/dd" );
    $('#to').datepicker({
        changeYear:true,
        changeMonth:true,
        minDate: -0
    })
    $( "#to" ).datepicker( "option", "dateFormat", "yy/mm/dd" );
    displayrepeats()

    
    $('#week').click(function (e) { 
        e.preventDefault();
        displayrepeats();
        $(".nav_items").removeClass("shadow");
        $(this).addClass("shadow");

    });
    $("#other").click(function (e) { 
        e.preventDefault();
        displayothers();
        $(".nav_items").removeClass("shadow");
        $(this).addClass("shadow");
        
    });
});