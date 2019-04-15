<?php
    session_start();
    $username=$_SESSION['username'];
    $db=mysqli_connect("localhost","root","","sked_users");
    $id=$_REQUEST['id'];
    $sql="DELETE from $username where eventid='$id' ";
    mysqli_query($db,$sql);
    echo mysqli_error($db);
?>