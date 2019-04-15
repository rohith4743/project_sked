<?php
    session_start();
    $username=$_SESSION['username'];
    $db=mysqli_connect("localhost","root","","sked_users");

    $start=$_REQUEST['start'];
    $end=$_REQUEST['end'];
    $sdate=explode('/',$start);
    $edate=explode("/",$end);
    $start=$sdate[2]."-".$sdate[0]."-".$sdate[1]." 00:00:00";
    $end=$edate[2]."-".$edate[0]."-".$edate[1]." 23:59:00";
    $sdate=getdateformat($start);
    $edate=getdateformat($end);
    $sql="SELECT * from $username where startdate BETWEEN '$sdate' AND '$edate'";
    $res=mysqli_query($db,$sql);
    $result=mysqli_fetch_all($res,MYSQLI_ASSOC);
    echo json_encode($result);
    















    function getdateformat($dat)
	{
		$dt = new DateTime($dat, new DateTimeZone('Asia/Kolkata'));
		$x=date(DATE_ISO8601,$dt->getTimestamp());
		$x=substr($x,0,19);
		$x=substr_replace($x," ",10,1);
		return $x;
	}
?>