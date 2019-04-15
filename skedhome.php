<?php
	session_start();
	$username=$_SESSION['username'];
	$db=mysqli_connect('localhost',"root","","sked");
	$sql="SELECT profile,fname,lname,email,occupation from users where username='$username'";
	$res=mysqli_query($db,$sql);
	$result=mysqli_fetch_assoc($res);
	$profile=$result['profile'];
?>
<!DOCTYPE html>
<html>

<head>
	<title>timeline</title>
	<link rel="stylesheet" href="css/timeline.css" type="text/css">
	<link rel="stylesheet" href="css/bootstrap.min.css" type="text/css">
	<link rel="stylesheet" href="jqueryui/jquery-ui.min.css" type="text/css">
	<link rel="stylesheet" href="jqueryui/jquery-ui.structure.css" type="text/css">
	<link rel="stylesheet" href="jqueryui/jquery-ui.theme.css" type="text/css">
	<link rel="stylesheet" type="text/css" href="css/skedhome.css">
	<link rel="stylesheet" type="text/css" href="css/all.min.css">

	<script type="text/javascript" src="js/jquery.min.js"></script>
	<script type="text/javascript" src="js/classes.js"></script>
	<script type="text/javascript" src="js/timeline.js"></script>
	<script type="text/javascript" src="jqueryui/jquery-ui.min.js"></script>
  <script type="text/javascript" src="js/skedhome.js"></script>
	<script type="text/javascript" src="js/contact.js"></script>
	<script type="text/javascript" src="js/bootstrap.bundle.min.js"></script>

</head>

<body>

	<div id="contact_dialog" title="ADD CONTACT" hidden>
		<form>
			<p id="contacterrors"></p>
			
				<div class="inp">
					<label>NAME</label>
					<input type="text" name="name" id="name" placeholder="enter name">
				</div>
				<div class="inp">
					<label>MOBILE</label>
					<select name="mob_country" id="mob_country" class="cc">
						<option value="91">+91</option>
					</select>
					<input type="tel" name="mobile" id="mobile" placeholder="000 000 0000">
				</div>
				<div class="inp">
					<label>EMAIL</label>
					<input type="email" name="email" id="email" placeholder="someone@something.com">
				</div>
				<div class="inp">
					<label>GROUPS</label>
					<input type="text" name="groups" id="groups" multiple>
				</div>
				<input type="submit" tabindex="-1" style="position:absolute; top:-1000px">
		</form>
	</div>

	<div class="modal fade" id="deleteevent" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">Do you really want to Reject this Event?</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn" data-dismiss="modal">No</button>
        <button type="button" class="btn" id="yesbut">Yes</button>
      </div>
    </div>
  </div>
</div>


<div class="modal fade" id="rejectmessage" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">Reject this event with message</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
		<label>Message: <input type="text" id="rmessage" size="40"></label>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn" data-dismiss="modal">Cancel</button>
        <button type="button" class="btn" id="subbut">submit</button>
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
		<div class="blockc"><a href="logout.php">LOGOUT</a></div>
	</div>
		
	<div class="demo">
		
		<div class="column1">
			<div class="skedclock">
            	<div class="clocktime">00:00:00</div>
            	<div class="clockdate">24-07-1998,Monday</div>
            	<div class="utc_time">19:00:00 utc</div>
        	</div>
			<input type="text" id="username" value=<?php echo $username?> hidden>
			<div class="adbr">
				<button class="adb" id="atask">Add task</button>
				<button class="adb" id="ameeting">Add meeting</button>
				<button class="adb" id="settings">settings</button>
			</div>
			<div class="adbr">
				<button class="adb" id="addcont">Add Contact</button>
				<button class="adb sm" id="viewc">view contacts</button>		
				<button class="adb sm" id="viewt">view Tasks</button>		
			</div>
			<div class="messages">
				<label>Messages</label>
				<hr>
				<div id="showingmessages">
				</div>				
			</div>
		</div>
		<div class="meetingnotification">
			<div class="panel">
				<button class="tab-n active" tab="meeting">MEETINGS FROM CONTACTS</button>
				<button class="tab-n" tab="event">EVENTS AND OTHER MEETINGS</button>
				<button class="tab-n" tab="ads">ADS</button>
			</div>
			<div class="tabdata">
	 			
			</div>
		</div>		
		<div class="timeline">
			<div id="dateselect">
				<input type="date" name="dateinput" id="dateinput" onchange="changetdate()">
			</div>
			<div id="c1">
				<script type="text/javascript">
					window.onload=calc();
				</script>
			</div>
		</div>
	</div>
</body>
</html>