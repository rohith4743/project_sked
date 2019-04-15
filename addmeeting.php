<?php
    session_start();
    $username=$_SESSION['username'];
    $db=mysqli_connect("localhost","root","","sked");
    $un="";
    if(isset($_COOKIE['counterpart']))
    {
        $un=$_COOKIE['counterpart'];
        setcookie("counterpart", "", time() - 3600);
    }
    if (isset($_POST['submit'])) {
        $tname=$_POST['tname'];
        $description=$_POST['Description'];
        $start=$_POST['start'];
        $end=$_POST['end'];
        $priority=intval($_POST['priority']);
        $visibility=$_POST['visibility'];
        $venue=$_POST['venue'];
        $counterpart=$_POST['counterpart'];
        
        $sql="INSERT into event_buffer(ename,eventtype,startdate,enddate,description,creator,visibility,status,repeating,priority,venue,counterpart) values('$tname','meeting','$start','$end','$description','$username','$visibility','PENDING','$rep','$priority','$venue','$counterpart')";
        mysqli_query($db,$sql);
        header("location:skedhome.php");
    }
    
?>
<html>

<head>
    <title>ADD MEETING | SKED</title>
    <link rel="stylesheet" type="text/css" href="css/bootstrap.min.css">
    <link rel="stylesheet" type="text/css" href="css/all.min.css">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="stylesheet" type="text/css" href="css/addtask.css">
    <link rel="stylesheet" type="text/css" href="jqueryui/jquery-ui.min.css">
</head>

<body>
    <script src="js/jquery.min.js"></script>
    <script src="jqueryui/jquery-ui.min.js"></script>
    <script src="js/addmeeting.js"></script>
    <script>
    
    function validatetask() {
        var tname = $('#tname').val()
        var description = $('#Description').val()
        var sdate = $('#sdate').val()
        var stime = $('#stime').val()
        var edate = $('#edate').val()
        var etime = $('#etime').val()
        var venue = $('#venue').val();
        var counterpart=$('#counterpart').val();
        var priority = $('#priority').val()
        var visibility = $('#visibility').val()
        var an=true;
        if(tname==""){
            $('#tnamehelp').text('*Please enter a value')
            an=false
        }
        if(counterpart==""){
            $('#counterparthelp').text('*Please choose the counterpart')
            an=false
        }
        if(description==""){
            $('#descriptionhelp').text('*Please enter the description')
            an=false
        }
        if(venue==""){
            $('#venuehelp').text('*Please enter a venue')
            an=false
        }

        var aa=validatedates()
        an=aa && an;
        
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

    </script>
    <div class="container">
        <fieldset>
            <form method="post" action="addmeeting.php" onsubmit="return validatetask()">
                <div class="form-group">
                    <label for="tname">Task Name</label>
                    <input id="tname" name="tname" type="text" class="form-control" autocomplete="off">
                    <small id="tnamehelp" class="form-text error"></small>                    
                </div>
                <div class="form-group">
                    <label for="counterpart">Counterpart Username</label>
                    <input id="counterpart" name="counterpart" type="text" class="form-control" value="<?php echo $un; ?>" autocomplete="off">
                    <small id="counterparthelp" class="form-text error"></small>                    
                </div>
                <div class="form-group">
                    <label for="venue">Venue</label>
                    <input id="venue" name="venue" type="text" class="form-control" autocomplete="off">
                    <small id="venuehelp" class="form-text error"></small>                    
                </div>
                <input type="text" class="hidden" name="start" id="start" hidden>
                <input type="text" class="hidden" name="end" id="end" hidden>
                <div class="form-group">
                    <label for="description">Description</label>
                    <textarea class="form-control" name="Description" id="Description"></textarea>
                    <small id="descriptionhelp" class="form-text error"></small> 
                </div>
                <div class="form-group">
                    <div class="row">
                        <label for="sdate" class="col-2 dater">Start Time</label>
                        <input class="col-3 form-control" type="text" name="sdate" id="sdate" placeholder="mm/dd/yyyy" autocomplete="off">
                        <input class="col-2 form-control" name="stime" id="stime" type="time">
                        <small id="sdateerror" class="form-text error col"></small>
                    </div>
                </div>
                <div class="form-group">
                    <div class="row">
                        <label for="edate" class="col-2 dater">End Time</label>
                        <input class="col-3 form-control" type="text" name="edate" id="edate" placeholder="mm/dd/yyyy" autocomplete="off">
                        <input class="col-2 form-control" type="time" name="etime" id="etime">
                        <small id="edateerror" class="form-text error col"></small>
                    </div>
                </div>
                <div class="form-group">
                    <div class="row">
                        <label for="priority" class="col-2 dater">priority</label>
                        <select name="priority" id="priority" class="form-control col-6">
                            <option value='1'>urgent</option>
                            <option value='2'>important</option>
                            <option value='3' selected>normal</option>
                            <option value='4'>today</option>
                            <option value='5'>time pass</option>
                        </select>
                    </div>
                </div>
                <div class="form-group">
                    <div class="row">
                        <label for="visibility" class="col-2 dater">Visibility</label>
                        <select name="visibility" id="visibility" class="form-control col-6">
                            <option>public</option>
                            <option>private</option>
                            <option>friends</option>
                        </select>
                    </div>
                </div>
				
                
                <input type="submit" name="submit" value="submit" class="form-control btn btn-primary">
            </form>
        </fieldset>
    </div>
</body>

</html>