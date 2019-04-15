<?php
    $db=mysqli_connect("localhost","root","","sked");
    $id=$_REQUEST['id'];
    $creator=$_REQUEST['creator'];
    $counterpart=$_REQUEST['username'];
    $sql="INSERT into eventback(eventid,creator,counterpart,status) values ('$id','$creator','$counterpart','reject')";
    mysqli_query($db,$sql);
    $sql4="DELETE from event_buffer where eventid='$id'";
    mysqli_query($db,$sql4);
?>