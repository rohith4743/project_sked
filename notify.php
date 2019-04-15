<?php
    session_start();
    $username=$_SESSION['username'];
    $db=mysqli_connect("localhost","root","","sked_users");
    $date=$_REQUEST['date'];
    $sql="SELECT * FROM $username where startdate='$date' ";
    $res=mysqli_query($db,$sql);
    if (mysqli_num_rows($res)!=0) {
        echo true;
    } else {
        echo false;
    }
?>