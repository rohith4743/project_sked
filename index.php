<?php
	$db=mysqli_connect("localhost","root","","sked");
	$error="";
	if (isset($_POST['submit'])) {
		# code...
		$username=$_POST['uname'];
		$password=md5($_POST['password']);
		$sql="select password from users where username='$username'";
		$res=mysqli_query($db,$sql);
		$result=mysqli_fetch_assoc($res);
		$actpassword=$result['password'];
		if ($password==$actpassword) {
			session_start();
			$_SESSION['username']=$username;
			header('Location:skedhome.php');
		}
		else {
			$error="*The Username or Password is incorrect";
		}

	}
?>
<!DOCTYPE html>
<html>
<head>
	<title>login | sked</title>
	<link rel="stylesheet" type="text/css" href="css/login.css">
</head>
<body background="img/bg.jpg">
	<div class="logindiv" align="left">
		<fieldset>
			<legend><span>LOGIN</span>LOGIN</legend>
			<form action="index.php" method="post">
				<div class="errors"><?php echo $error; ?></div><br>
				<div class="inputer">
					<img src="icons/user.png">
					<input type="text" name="uname">
				</div>
				<div class="inputer">
					<img src="icons/password.png">
					<input type="password" name="password">
				</div>
				<div class="inputer">
					<a href="#">forget password?</a>
					<button type="submit" name="submit"><img src="icons/login.png"></button>
				</div>
			</form>
		</fieldset>
	</div>
	<div class="registerdiv" align="left">
		<fieldset>
			<legend><span>REGISTER HERE</span>REGISTER HERE</legend>
			<div class="inputer">
				<ul>
					<li><a href="register.php">INDIVIDUAL</a></li>
				</ul>
			</div>
		</fieldset>
	</div>
</body>
</html>