<?php
    session_start();
    $username=$_SESSION['username'];
    $db=mysqli_connect("localhost","root","","sked_users");
    $db2=mysqli_connect('localhost',"root","","sked");
	$sql3="SELECT profile,fname,lname,email,occupation from users where username='$username'";
	$res=mysqli_query($db2,$sql3);
	$result=mysqli_fetch_assoc($res);
	$profile=$result['profile'];
    if (isset($_POST['submit'])) {
        $tname=$_POST['tname'];
        $description=$_POST['Description'];
        $start=$_POST['start'];
        $end=$_POST['end'];
        $priority=intval($_POST['priority']);
        $visibility=$_POST['visibility'];
        $rep=NULL;
        if (isset($_POST['repeat'])) {
            $repeat=$_POST['repeat'];
            $rep="";
            foreach ($repeat as $day) {
            $rep=$rep.$day.".";
        }
        }
        $sql="insert into $username (ename,eventtype,startdate,enddate,description,creator,visibility,status,repeating,priority) values('$tname','task','$start','$end','$description','$username','$visibility','yet','$rep','$priority')";
        mysqli_query($db,$sql);
        header("location:skedhome.php");
    }
    
?>
<html>

<head>
    <title>ADD TASK | SKED</title>
    <link rel="stylesheet" type="text/css" href="css/bootstrap.min.css">
    <link rel="stylesheet" type="text/css" href="css/all.min.css">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="stylesheet" type="text/css" href="css/addtask.css">
    <link rel="stylesheet" type="text/css" href="css/title.css">
    <link rel="stylesheet" type="text/css" href="jqueryui/jquery-ui.min.css">
</head>

<body>
    <script src="js/jquery.min.js"></script>
    <script src="jqueryui/jquery-ui.min.js"></script>
    <script src="js/bootstrap.bundle.min.js"></script>
    <script src="js/addtask.js"></script>





        <div class="modal fade" id="timesuggestions" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered" role="document">
            <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="exampleModalCenterTitle">Modal title</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                ...
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                <button type="button" class="btn btn-primary">Save changes</button>
            </div>
            </div>
        </div>
        </div>



    	<div class="title">
		<div class="blocka">
			<div class="ppic"><img src="<?php echo $profile?>"></div>
			<div class="somes">

			<div class="somed">@<?php echo $username?></div>
			<div class="somed"><?php echo $result['fname'] ?> <?php echo $result['lname'] ?></div>
			<div class="somed"><?php echo $result['email'] ?></div>
			<div class="somed"><?php echo $result['occupation'] ?></div>

			</div>
		</div>
		<div class="blockb">SKED</div>
		<div class="blockc"><a href="skedhome.php">BACK</a></div>
	</div>


    <div class="container">
        <fieldset>
            <form method="post" action="add_task.php" onsubmit="return validatetask()">
                <div class="form-group">
                    <label for="tname">Task Name</label>
                    <input id="tname" name="tname" type="text" class="form-control" autocomplete="off">
                    <small id="tnamehelp" class="form-text error"></small>
                    <div class="ttype">
                        <div onclick="writename('gym')"><img src="icons/gym-color.png"><br>GYM</div>
                        <div onclick="writename('party')"><img src="icons/birthday-color.png"><br>PARTY</div>
                        <div onclick="writename('coffee')"><img src="icons/coffee-color.png"><br>COFFEE</div>
                        <div onclick="writename('movie')"><img src="icons/movie-color.png"><br>MOVIE</div>
                        <div onclick="writename('office')"><img src="icons/office-doodle.png"><br>OFFICE</div>
                        <div onclick="writename('breakfast')"><img src="icons/breakfast-color.png"><br>BREAKFAST</div>
                        <div onclick="writename('lunch')"><img src="icons/lunch-doodle.png"><br>LUNCH</div>
                        <div onclick="writename('dinner')"><img src="icons/dinner-color.png"><br>DINNER</div>
                        <div onclick="writename('sleep')"><img src="icons/sleep-color.png"><br>SLEEP</div>
                        <div onclick="writename('bath')"><img src="icons/bath-color.png"><br>BATH</div>
                        <div onclick="writename('sports')"><img src="icons/sports-color.png"><br>SPORTS</div>
                        <div onclick="writename('yoga')"><img src="icons/yoga-color.png"><br>YOGA</div>
                        <div onclick="writename('jogging')"><img src="icons/jogging-color.png"><br>JOGGING</div>
                        <div onclick="writename('study')"><img src="icons/study-color.png"><br>STUDY</div>
                        <div onclick="writename('shopping')"><img src="icons/shopping-color.png"><br>SHOPPING</div>
                        <div onclick="writename('travel')"><img src="icons/travel-color.png"><br>TRAVEL</div>
                    </div>
                </div>
                <input type="text" class="hidden" name="start" id="start" hidden>
                <input type="text" class="hidden" name="end" id="end" hidden>
                <div class="form-group">
                    <label for="description">Description</label>
                    <textarea class="form-control" name="Description" id="Description"></textarea>
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
				
                <div class="row">
                    <label class="col-12 col-md-2">Repeat</label>
                    <div class="form-check col-12 col-md-1">
                        <input type="checkbox" class="form-check-input" id="sunday" name="repeat[]" value="su">
                        <label class="form-check-label" for="sunday">Sunday</label>
                    </div>
                    <div class="form-check col-12 col-md-1">
                        <input type="checkbox" class="form-check-input" id="monday" name="repeat[]" value="mo">
                        <label class="form-check-label" for="monday">Monday</label>
                    </div>
                    <div class="form-check col-12 col-md-1">
                        <input type="checkbox" class="form-check-input" id="tuesday" name="repeat[]" value="tu">
                        <label class="form-check-label" for="tuesday">Tuesday</label>
                    </div>
                    <div class="form-check col-12 col-md-1">
                        <input type="checkbox" class="form-check-input" id="wednesday" name="repeat[]" value="we">
                        <label class="form-check-label" for="wednesday"><span id="wed">Wednesday</span></label>
                    </div>
                    <div class="form-check col-12 col-md-1">
                        <input type="checkbox" class="form-check-input" id="thursday" name="repeat[]" value="th">
                        <label class="form-check-label" for="thursday">Thursday</label>
                    </div>
                    <div class="form-check col-12 col-md-1">
                        <input type="checkbox" class="form-check-input" id="friday" name="repeat[]" value="fr">
                        <label class="form-check-label" for="friday">Friday</label>
                    </div>
                    <div class="form-check col-12 col-md-1">
                        <input type="checkbox" class="form-check-input" id="saturday" name="repeat[]" value="sa">
                        <label class="form-check-label" for="saturday">Saturday</label>
                    </div>
                </div>
                <input type="submit" name="submit" value="submit" class="form-control btn btn-primary">
            </form>
        </fieldset>
    </div>
</body>

</html>