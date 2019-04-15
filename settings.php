<?php
    session_start();
    $username=$_SESSION['username'];
?>
<html>
    <head>
        <title>SETTINGS | SKED</title>
        <link rel="stylesheet" href="css/bootstrap.min.css" type="text/css">
        <link rel="stylesheet" href="css/settings.css" type="text/css">
        <link rel="stylesheet" href="css/all.min.css" type="text/css">
        <link rel="stylesheet" type="text/css" href="jqueryui/jquery-ui.min.css">

    </head>
    <body>
        <script src="js/jquery.min.js"></script>
        <script src="js/bootstrap.bundle.min.js"></script>

        <script src="js/settings.js"></script>
        <script src="js/viewevent.js"></script>

        <script src="jqueryui/jquery-ui.min.js"></script>






        <!-- task edit modal -->
        <div class="modal fade" id="taskeditmodal" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered" role="document">
                <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalCenterTitle">EDIT TASK</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <div>
                        <div>EVENT NAME</div>
                        <div><input type="text" id="et_ename"></div>
                        <div><input type="text" id="eid" hidden></div>
                    </div>
                    <div>
                        <div>DESCRIPTION</div>
                        <div><input type="text" id="et_description"></div>
                    </div>
                    <div>
                        <div>STARTDATE</div>
                        <div><input type="date" name="sdate" id="et_sdate"><input type="time" name="stime" id="stime"></div>
                    </div>
                    <div>
                        <div>END DATE</div>
                        <div><input type="date" name="edate" id="et_edate"><input type="time" name="etime" id="etime"></div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                    <button type="button" class="btn btn-primary" id="et_save">Save changes</button>
                </div>
                </div>
            </div>
        </div>        



    <!-- delete task modal -->
        <div class="modal fade" id="taskdeletemodal" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered" role="document">
                <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalCenterTitle">DO YOU REALLY WANT TO DELETE THIS EVENT</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                    </button>
                    <div><input type="text" id="deid" hidden></div>                    
                </div>
                <div class="modal-body" id="dt_body">

                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-primary" id="dt_yes">Yes</button>
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">No</button>
                </div>
                </div>
            </div>
        </div> 
         <!-- delete meeting modal -->
         <div class="modal fade" id="meetingdeletemodal" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered" role="document">
                <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalCenterTitle">DO YOU REALLY WANT TO DELETE THIS EVENT</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                    </button>
                    <div><input type="text" id="dmeid" hidden></div>                    
                    <div><input type="text" id="dmtext" hidden></div>                    
                </div>
                <div class="modal-body">
                    <div id="dm_body"></div>
                    <div>
                        <div>MESSAGE</div>
                        <div><input type="text" id="dm_message" size="50"></div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-primary" id="dm_yes">Yes</button>
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">No</button>
                </div>
                </div>
            </div>
        </div>


        <div class="title">
            <label>SKED | SETTINGS</label>
            <a href="skedhome.php">back</a>
        </div>
        <div class="bodypart">
            <div class="settings_navigation">
                <button class="nav_items shadow" id="week"><i class="fas fa-tasks"></i>Weekly tasks</button>
                <button class="nav_items" id="other"><i class="fas fa-calendar-alt"></i>Other tasks</button>
            </div>
            <div class="settings_text">
                
                <!-- <div class="task" id="1" tid="1">
                    <div class="taskdetails">
                        <div class="taskdiv1">
                            <div class="taskname">task1</div>
                            <div class="taskdescription">some task description</div>
                        </div>
                        <div class="taskdiv2">
                            <div class="tasktimes">
                                <div class="tasktime">19:00</div>
                                <div class="tasktime">20:00</div>                            
                            </div>
                            <div class="taskdays">
                                <button class="repeatday" day="sun" tid="1">S</button>
                                <button class="repeatday" day="mon" tid="1">M</button>
                                <button class="repeatday" day="tue" tid="1">T</button>
                                <button class="repeatday" day="wed" tid="1">W</button>
                                <button class="repeatday" day="thu" tid="1">T</button>
                                <button class="repeatday" day="fri" tid="1">F</button>
                                <button class="repeatday" day="sat" tid="1">S</button>
                            </div>
                         </div>
                        <div class="taskdiv3"><button class="deletetask"><i class="fas fa-calendar-times"></i></button></div>
                    </div>
                    <div class="savebutton"><button class="save" tid="1" id="d1" disabled>save</button></div>
                </div> -->







                <!-- <div class="dateline">
                    <label>FROM</label>
                    <input type="text" name="from" id="from">
                    <label>TO</label>
                    <input type="text" name="to" id="to">
                    <button id="getbutton">GET</button>
                </div>

                <div class="tasktable">
                    <table class="tabled">
                        <thead>
                            <tr>
                                <td>EVENT NAME</td>
                                <td>EVENT DESCRIPTION</td>
                                <td>START TIME</td>
                                <td>END TIME</td>
                                <td>INVITED BY</td>
                                <td>VENUE</td>
                                <td>VISIBILITY</td>
                                <td></td>
                                <td></td>
                            </tr>
                        </thead>
                        <tbody id="tbody">
                    
                        </tbody>
                    </table>
                </div> -->
               
            </div>
        </div>
    </body>
</html>