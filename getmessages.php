<?php
    session_start();
    $username=$_SESSION['username'];
    $db=mysqli_connect("localhost","root","","sked");
    $sql="SELECT * from eventback where creator='$username'";
    $res=mysqli_query($db,$sql);
    $result=mysqli_fetch_all($res,MYSQLI_ASSOC);
    echo json_encode($result);
?>