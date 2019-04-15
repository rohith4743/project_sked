<?php
    session_start();
    $username=$_SESSION['username'];
    $db=mysqli_connect("localhost","root","","sked");
    $id=$_REQUEST['id'];
    $sql="DELETE from eventback where id='$id'";
    mysqli_query($db,$sql);
    
?>