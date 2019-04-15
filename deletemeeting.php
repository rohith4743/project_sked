<?php
    session_start();
    $username=$_SESSION['username'];
    $db=mysqli_connect("localhost","root","","sked_users");
    $id=$_REQUEST['id'];
    $creator=$_REQUEST['creator'];
    $counterpart=$_REQUEST['counterpart'];
    $other=$counterpart;
    $message=$_REQUEST['message'];
    $sql="SELECT ename,startdate,enddate from $username where eventid='$id' ";
    $res=mysqli_query($db,$sql);
    $result=mysqli_fetch_array($res);
    
    if($username==$counterpart)
    {
        $other=$creator;   
    }
    echo $other;
    $sql3="DELETE from $other where startdate='$result[1]' AND ( enddate='$result[2]' AND ename='$result[0]' ) ";
    mysqli_query($db,$sql3);
    echo mysqli_error($db);

    $sql2="DELETE from $username where eventid='$id' ";
    mysqli_query($db,$sql2);
    // $db2=mysqli_connect("localhost","root","","sked");
    // $sql4="INSERT into eventback(eventid,creator,counterpart,status,message) values ('$id','$creator','$counterpart','meeting deleted','$message')";
    // mysqli_query($db2,$sql4);

?>
