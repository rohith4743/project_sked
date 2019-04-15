<?php
    session_start();
    $username=$_SESSION['username'];
    $filename = 'data/contacts/'.$username.'.json';
    $data=file_get_contents($filename);
    if($data=="")
    {
        $data=$_REQUEST['data'];
        $data=json_decode($data);
        $writerdata=array();
        array_push($writerdata,$data);
        $writerdata=json_encode($writerdata, JSON_PRETTY_PRINT);
        if(file_put_contents($filename, $writerdata)){
        } 
        else{
            echo 'An error occured in creating the file';
        }
    }
    else{
        $newdata=$_REQUEST['data'];
        $jsonarray=json_decode($data);
        $newdata=json_decode($newdata);
        array_push($jsonarray,$newdata);
        $jsonarray=json_encode($jsonarray,JSON_PRETTY_PRINT);
        if(file_put_contents($filename, $jsonarray)){
        } 
        else{
            echo 'An error occured in creating the file';
        }
    }
    
?>