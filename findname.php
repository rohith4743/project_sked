<?php
    $db=mysqli_connect("localhost","root","","sked");
    $uname=$_REQUEST['user'];
    $sql="SELECT fname,lname from users where username='$uname'";
    $res=mysqli_query($db,$sql);
    $result=mysqli_fetch_assoc($res);
    echo $result['fname'].' '.$result['lname'];
?>