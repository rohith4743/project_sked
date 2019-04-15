<?php
    session_start();
    $username=$_SESSION['username'];
    $db=mysqli_connect("localhost","root","","sked_users");
    $id=$_REQUEST['id'];
    $sql="SELECT * from $username where eventid='$id'";
    $res=mysqli_query($db,$sql);
    $result=mysqli_fetch_assoc($res);
    echo json_encode($result);
?>