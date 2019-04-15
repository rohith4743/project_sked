<?php
    $db=mysqli_connect("localhost","root","","sked");
    $id=$_REQUEST['id'];
    $creator=$_REQUEST['creator'];
    $counterpart=$_REQUEST['username'];
    $message=$_REQUEST['message'];
    $sql="INSERT into eventback(eventid,creator,counterpart,status,message) values ('$id','$creator','$counterpart','reject','$message')";
    mysqli_query($db,$sql);
    $sql4="DELETE from event_buffer where eventid='$id'";
    mysqli_query($db,$sql4);
?>