<?php
    session_start();
    $username=$_SESSION['username'];
    $db=mysqli_connect("localhost","root","","sked_users");
    $id=$_REQUEST['id'];
    $ename=$_REQUEST['ename'];
    $description=$_REQUEST['description'];
    $sdate=$_REQUEST['sdate'];
    $edate=$_REQUEST['edate'];
    $sql="UPDATE $username SET ename='$ename', description='$description', startdate='$sdate', enddate='$edate' where eventid='$id' ";
    mysqli_query($db,$sql);
    echo mysqli_error($db);
?>
