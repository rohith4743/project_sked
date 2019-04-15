<?php
    session_start();
    $username=$_SESSION['username'];
    $db=mysqli_connect("localhost","root","","sked");
    $sql="SELECT username,fname,lname,occupation,designation,city from users";
    $result=mysqli_query($db,$sql);
    $res=mysqli_fetch_all($result,MYSQLI_ASSOC);
    echo json_encode($res);
   
?>