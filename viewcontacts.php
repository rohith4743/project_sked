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
	<title>view contacts</title>
	<script type="text/javascript" src="js/jquery.min.js"></script>
	<script type="text/javascript" src="js/viewcontacts.js"></script>
	<script type="text/javascript" src="jqueryui/jquery-ui.min.js"></script>
	<script type="text/javascript" src="js/bootstrap.bundle.min.js"></script>
	
	<link rel="stylesheet" href="css/bootstrap.min.css" type="text/css">
	<link rel="stylesheet" href="jqueryui/jquery-ui.min.css" type="text/css">
	<link rel="stylesheet" href="css/viewcontacts.css" type="text/css">
	<link rel="stylesheet" href="css/all.min.css" type="text/css">
	<link rel="stylesheet" href="css/title.css" type="text/css">
	
	
	
</head>
<body>

	<div class="modal fade" id="edcontact" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
		<div class="modal-dialog modal-dialog-centered" role="document">
    	<div class="modal-content">
     		<div class="modal-header">
        		<h5 class="modal-title" id="exampleModalCenterTitle">EDIT CONTACT</h5>
        		<button type="button" class="close" data-dismiss="modal" aria-label="Close">
          			<span aria-hidden="true">&times;</span>
        		</button>
      		</div>
      		<div class="modal-body">
				<div class="modalerrors"></div>
				<div class="row">
					<label class="col-3">NAME</label>
					<input type="text" name="name" id="name" class="col-8">
				</div>
				<div class="row">
					<label class="col-3">MOBILE</label>
					<select name="mob_country" id="mob_country" class="col-2 cc">
						<option value="91">+91</option>
					</select>
					<input type="tel" name="mobile" id="mobile" class="col-6">
				</div>
				<div class="row">
					<label class="col-3">EMAIL</label>
					<input type="email" name="email" id="email" class="col-8">
				</div>
				<div class="row">
					<label class="col-3">GROUPS</label>
					<input type="text" name="groups" id="groups" class="col-8" multiple>
				</div>
            </div>
      		<div class="modal-footer">
        		<button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
        		<button type="button" id="savechange" class="btn btn-primary">Save changes</button>
      		</div>
    		</div>
  		</div>
	</div>



<div class="modal fade" id="deletecontact" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">Do you really want to delete this Contact?</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body" id="delvals">

      </div>
      <div class="modal-footer">
        <button type="button" class="btn" data-dismiss="modal">No</button>
        <button type="button" class="btn" id="yesbut">Yes</button>
      </div>
    </div>
  </div>
</div>



	




	<input id="username" value=<?php echo $username ?> hidden>
	<div class="fullbody">
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
		<div class="innerbody">
			<!-- <div class="searching">
				
			</div> -->
			<div id="showing" class="container-fluid">
				
			</div>
		</div>
	</div>
</body>
</html>


