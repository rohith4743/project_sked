<?php
    session_start();
    $username=$_SESSION['username'];
    $db=mysqli_connect("localhost","root","","sked_users");
    $sql="SELECT * from $username where startdate LIKE '1970-01-01%' ";
    $sql2="SELECT * from $username where startdate LIKE '1969-12-31%' ";
	$result=mysqli_query($db,$sql);
	$result2=mysqli_query($db,$sql2);
	$res=mysqli_fetch_all($result,MYSQLI_ASSOC);
    $res2=mysqli_fetch_all($result2,MYSQLI_ASSOC);
    $res=$res+$res2;
	echo json_encode($res);
?>