$(document).ready(function(){
    $('#sdate').datepicker({
        changeYear:true,
        changeMonth:true,
        minDate: -0
    })
    $('#edate').datepicker({
        changeYear:true,
        changeMonth:true,
        minDate: -0
    })
    $.get("getusernames.php",
        function (data, textStatus, jqXHR) {
            var users=JSON.parse(data);
            for (let i = 0; i < users.length; i++) {
                users[i].label=users[i].username;
                users[i].value=users[i].username;
                users[i].category="online";                
            }
            // alert(JSON.stringify(users))
            $('#counterpart').on().autocomplete({
                minLength: 0,
                source: users,
                
                select: function( event, ui ) {
                    $( "#counterpart" ).val( ui.item.username );                
                    return false;
                }
                
            })
            .autocomplete( "instance" )._renderItem = function( ul, item ) {
                return $( "<li>" )
                  .append( "<div>@" + item.username + "<br>" + item.fname +"  "+item.lname + "</div>" )
                  .appendTo( ul );
            };



        }
    );
})