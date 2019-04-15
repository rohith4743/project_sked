<?php
    session_start();
    $username=$_SESSION['username'];
    $number=$_REQUEST['number'];
    $db=mysqli_connect("localhost","root","","sked");
    $sql="SELECT username from users where mobile=$number";
    $result=mysqli_query($db,$sql);
    if(mysqli_num_rows($result)>0)
    {
        $res=mysqli_fetch_assoc($result);
        echo $res['username'];
    } else {
        echo "No Account Yet";
    }

?>