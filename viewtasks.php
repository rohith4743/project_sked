<?php
    session_start();
    $username=$_SESSION['username'];
    $from=$_REQUEST['from'];
    $db=mysqli_connect("localhost","root","","sked_users");
    $sql="";
    if (isset($_REQUEST['to'])) {
        $to=$_REQUEST['to'];
        $sql="SELECT * from $username where startdate >= '$from' AND enddate <= '$to' ORDER BY startdate ";

    } else {
        $sql="SELECT * from $username where startdate >= '$from' ORDER BY startdate";
    }
    $res=mysqli_query($db,$sql);
    $result=mysqli_fetch_all($res,MYSQLI_ASSOC);
    echo mysqli_error($db);
    echo json_encode($result);
?>
