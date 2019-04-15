<?php
	$db=mysqli_connect("localhost","root","","sked");
	if (isset($_POST['submit'])) {
		$file=$_FILES['addimage'];
		ini_set('upload_max_filesize','20M');
		ini_set('post_max_size','20M');
		ini_set('max_input_time', 300);
		ini_set('max_execution_time', 300);
		$filename=$_FILES['addimage']['name'];
		$fileerror=$_FILES['addimage']['error'];
		$fileTmpName=$_FILES['addimage']['tmp_name'];
		$filesize=$_FILES['addimage']['size'];
		$fileDestination="";
		$username=$_POST['username'];
		$sql="select count(*) from users where username='".$username."'";
		$res=mysqli_query($db,$sql);
		$result=mysqli_fetch_assoc($res);
		if($result['count(*)']==0)
		{
			if ($fileerror==4) {
				# code...
				echo "<script>document.getElementById('imageerror').innerHTML='*error uploading image'</script>";
	
			}elseif($fileerror==4){
				echo "upload a smaller image";
			}
			elseif ($fileerror==0) {
					$fileExt=explode('.',$filename);
					$fileAExt=strtolower(end($fileExt));
					$filenamenew=$username.'.'.$fileAExt;
					$fileDestination='img/profile_pictures/'.$filenamenew;
					move_uploaded_file($fileTmpName,$fileDestination);
			}
			else {
				echo "*error uploading image";
			}
			$fname=$_POST['fname'];
			$lname=$_POST['lname'];
			$password=$_POST['password'];
			$password=md5($password);
			$dob=date('Y-m-d', strtotime($_POST['dob']));
			$gender=$_POST['gender'];
			$email=$_POST['email'];
			$occupation=$_POST['occupation'];
			$designation=$_POST['designation'];
			$city=$_POST['city'];
			$mobile=$_POST['mobile'];
			$country=$_POST['mob_country'];
			if ($fileDestination=="") {
				$fileDestination="img/profile_pictures/emptypic.jpg";
			}
			$contacts="data/contacts/".$username.".json";
			$sql2="INSERT into users(username,fname,lname,dob,email,countrycode,mobile,password,gender,occupation,designation,profile,city,contactsURL) values('$username','$fname','$lname','$dob','$email','$country','$mobile','$password','$gender','$occupation','$designation','$fileDestination','$city','$contacts')";
			mysqli_query($db,$sql2);
			mysqli_close($db);
			$db=mysqli_connect("localhost","root","","sked_users");
			$sql3="create table ".$username."(
				eventid INT(20) UNSIGNED AUTO_INCREMENT PRIMARY KEY, 
				ename varchar(255) NOT NULL,
				eventtype varchar(30) NOT NULL,
				startdate datetime NOT NULL,
				enddate datetime NOT NULL,
				description varchar(255),
				creator varchar(255) DEFAULT NULL,
				counterpaert varchar(255) DEFAULT NULL,
				visibility varchar(30) NOT NULL,
				venue varchar(255),
				status varchar(30),
				repeating varchar(40),
				priority INT(4) NOT NULL,
				meetingid INT(6),
				qu varchar(6))";
			 mysqli_query($db,$sql3);
			 $myfil=fopen("data/contacts/$username.json","w");
			 fclose($myfil);
			 header("location:index.php");
		}
		else {
			echo "username exists please try again";
		}		

	}
?>
<html>
	<head>
		<title>REGISTER | SKED</title>
		<link rel="stylesheet" type="text/css" href="css/register.css">
	</head>
	<body>
		<script src="js/register.js"></script>
		<form action="register.php" method="POST" enctype="multipart/form-data" onsubmit="return validate()">
			<div class="container">

				<div class="profilepic">
					<img class="profilepicture" id="profilepicture" src="img/emptypic.jpg">
						<label for="addimage">
							<img class="ih" src="icons/addimage.png">
						</label>
						<input id="addimage" name="addimage" type="file" onchange="validation()" accept="image/*">
					<div id="imageerror" class="errormsg2"></div>
				</div>

				<div class="inputs1">
					<div class="in">
						<label>first name</label>
						<div class="ing">
								<input type="text" name="fname" onfocusout="checkempty(this)" onchange="checkempty(this)"><br>
								<div class="errormsg" id="fnamemsg"></div>
						</div>
					</div>
					<div class="in">
						<label>last name</label>
						<div class="ing">
								<input type="text" name="lname" onfocusout="checkempty(this)" onchange="checkempty(this)"><br>
								<div class="errormsg" id="lnamemsg"></div>
						</div>
					</div>
					<div class="in">
						<label>email</label>
						<div class="ing">
								<input type="email" name="email" onfocusout="checkempty(this)" onchange="checkempty(this)"><br>
								<div class="errormsg" id="emailmsg"></div>
						</div>
					</div>
					<div class="in">
						<label>user name</label>
						<div class="ing">
								<input type="text" name="username" onfocusout="checkempty(this)" onchange="checkempty(this)"><br>
								<div class="errormsg" id="usernamemsg"></div>
						</div>
					</div>
					<div class="in">
						<label>password</label>
						<div class="ing">
								<input type="password" name="password" onfocusout="validatepassword(this)"></label><br>
								<div class="errormsg" id="passwordmsg"></div>
						</div>
					</div>
					<div class="in">
						<label>confirm password</label>
						<div class="ing">
								<input type="password" name="cpassword" onfocusout="validatecpassword(this)"><br>
								<div class="errormsg" id="cpasswordmsg"></div>
						</div>
					</div>
					<div class="in">
						<label>gender</label>
						<div class="radio">
							<input type="radio" name="gender" value="M" checked><label>male</label>
							<input type="radio" name="gender" value="F"><label>female</label><br>
						</div>
					</div>
					<div class="in">
						<label>date of birth</label>
						<div class="ing">
							<input type="date" name="dob" onfocusout="checkempty(this)" onchange="checkempty(this)"><br>
							<div class="errormsg" id="dobmsg"></div>
						</div>
					</div>
					<div class="in">
						<label>mobile</label>
						<div class="ing">
							<select name="mob_country" class="cc">
								<option value="91">+91</option>
							</select>
							<input type="tel" name="mobile" onblur="phonevalidate(this)" onchange="phonevalidate(this)"><br>
							<div class="errormsg" id="telmsg"></div>
						</div>						
					</div>
					<div class="in">
						<label>occupation</label>
							<div class="ing">
									<input type="text" list="occupation" name="occupation" onfocusout="checkempty(this)"><br>
									<div class="errormsg" id="occupationmsg"></div>
							</div>
						<br>
					</div>
					<div class="in">
						<label>designation</label>
							<div class="ing">
									<input type="text" list="designation" name="designation" onfocusout="checkempty(this)"><br>
									<div class="errormsg" id="designationmsg"></div>
							</div>
						<br>
					</div>
					<div class="in">
						<label>city</label>
						<div class="ing">
								<input type="text" name="city" onfocusout="checkempty(this)" onchange="checkempty(this)"><br>
								<div class="errormsg" id="citymsg"></div>
						</div>
					</div>
					<div class="in">
						<div style="display: table-cell;"></div>
						<input type="submit" name="submit" value="register">
					</div>
				</div>

			</div>
		</form>
	</body>
</html>