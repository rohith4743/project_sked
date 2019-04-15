<?php
    session_start();
    $username=$_SESSION['username'];
    $db=mysqli_connect("localhost","root","","sked_users");
    $eid=$_REQUEST['eid'];
    $repeating=$_REQUEST["repeating"];
    if($repeating=="")
    // {
    //     $sql=""
    // }
?>