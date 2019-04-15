<?php
    $db=mysqli_connect("localhost","root","","sked");
    $db2=mysqli_connect("localhost","root","","sked_users");
    $username=$_REQUEST['username'];
    $creator=$_REQUEST['creator'];
    $id=$_REQUEST['id'];
    $sql="SELECT * from event_buffer where eventid='$id'";
    $res=mysqli_query($db,$sql);
    $result=mysqli_fetch_assoc($res);
    $en=$result['ename'];
    $des=$result['description'];
    $sdt=$result['startdate'];
    $edt=$result['enddate'];
    $prio=$result['priority'];
    $venue=$result['venue'];
    $eid=intval($result["eventid"]);
    $sql2="INSERT into $creator(ename,eventtype,startdate,enddate,description,creator,counterpaert,visibility,venue,status,priority,meetingid) values('$en','meeting','$sdt','$edt','$des','$creator','$username','public','$venue','yet','$prio','$eid')";
    mysqli_query($db2,$sql2);
    if($username!=$creator)
    {
        $sql3="INSERT into $username(ename,eventtype,startdate,enddate,description,creator,counterpaert,visibility,venue,status,priority,meetingid) values('$en','meeting','$sdt','$edt','$des','$creator','$username','public','$venue','yet','$prio','$eid')";
        mysqli_query($db2,$sql3);
    }
    $sql4="DELETE from event_buffer where eventid='$id'";
    mysqli_query($db,$sql4);
    
?>