<?php
	//connection
	$conn = new mysqli('localhost', 'root', '', 'sked_users');
	session_start();
	$username=$_SESSION['username'];
	$data = array();
	$dr=[];
	if ($_REQUEST['date']) {
		$date=$_REQUEST['date'];
		$dr=getdateformat($date);
	}
	$sql = "(SELECT * FROM $username where startdate BETWEEN '$dr[0]' AND '$dr[1]') union (SELECT * FROM $username where enddate BETWEEN '$dr[0]' AND '$dr[1]') ORDER BY startdate";


	$query = $conn->query($sql);
	while($row = $query->fetch_assoc()){
		$data[] = $row;
	}
	

	$sql2="SELECT * from $username where startdate LIKE '1970-01-01%' ";
	$sql4="SELECT * from $username where startdate LIKE '1969-12-31%' ";
	$result2=mysqli_query($conn,$sql2);
	$result4=mysqli_query($conn,$sql4);
	$res2=mysqli_fetch_all($result2,MYSQLI_ASSOC);
	$res4=mysqli_fetch_all($result4,MYSQLI_ASSOC);
	$res2=$res2+$res4;
	$res3=[];
	$match=$_REQUEST['day'];
	foreach($res2 as $i => $task)
	{
		$days=explode(".",$task["repeating"]);
		foreach ($days as $day) {
			if ($match==$day) {
				$res2[$i]["startdate"]=$date." ".substr($res2[$i]["startdate"],11,8);
				$res2[$i]["enddate"]=$date." ".substr($res2[$i]["enddate"],11,8);
				array_push($res3,$res2[$i]);
			}
		}
	}




	$data=array_merge($data,$res3);




	//convert to json
	$data = json_encode($data,JSON_PRETTY_PRINT);
 
	//create json file
	$filename = 'data/json/'.$username.'.json';
	if(file_put_contents($filename, $data)){
	} 
	else{
		echo 'An error occured in creating the file';
	}

	function getdateformat($dat)
	{
		// $dt=explode("-",$dat);
		$dt1=$dat." 00:00:00";
		$dt = new DateTime($dt1, new DateTimeZone('Asia/Kolkata'));
		$retdate=new DateTime($dt1, new DateTimeZone('Asia/Kolkata'));;
		$retdate->add(new DateInterval('P1D'));
		$retdate=date(DATE_ISO8601,$retdate->getTimestamp());
		$retdate=substr($retdate,0,19);
		$retdate=substr_replace($retdate," ",10,1);
		$x=date(DATE_ISO8601,$dt->getTimestamp());
		$x=substr($x,0,19);
		$x=substr_replace($x," ",10,1);
		return array($x,$retdate);
	}
?>