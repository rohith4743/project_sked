<?php
    session_start();
    $username=$_SESSION['username'];
    $filename = 'data/contacts/'.$username.'.json';
    $newdata=$_REQUEST['data'];
    $newdata=json_decode($newdata);
    $jsonarray=json_encode($newdata,JSON_PRETTY_PRINT);
    if(file_put_contents($filename, $jsonarray)){
    } 
    else{
        echo 'An error occured in creating the file';
    }
?>