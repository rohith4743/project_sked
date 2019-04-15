$( function() {
	  


		function addUser(){
			var name=$('#name').val();
			var mobile=$('#mobile').val();
			var email=$('#email').val();
			var groups=$('#groups').val();
			groups=groups.split(',');
			if (groups.length>1) {
				var temp=groups.pop();
				if (temp!=" ") {
					groups.push(temp);
				}
			}
			for (let i = 0; i < groups.length; i++) {
				groups[i]=groups[i].trim();
				
			}
			var err=""
			if(name==""){
				err+="enter a name<br>";
			}
			if(mobile==""){
				err+="enter mobile number<br>";
			}
			if(email==""){
				err+="enter email Id<br>";
			}
			if(err=="")
			{
				var data={
					"name":name,
					"mobile":mobile,
					"email":email,
					"groups":groups
				}
				var jsondata=JSON.stringify(data);
				$.post("addcontact.php",{
					"data":jsondata
				} ,
					function (data, textStatus, jqXHR) {
					},
				);
				dialog.dialog( "close" );
			} else {
				$('#contacterrors').html(err);
			}
		}









	var form,dialog;
	dialog = $( "#contact_dialog" ).dialog({
		autoOpen: false,
		height: 400,
		width: 350,
		modal: true,
		buttons: {
			"Create an account": addUser,
			Cancel: function() {
				dialog.dialog( "close" );
			}
		},
		close: function() {
			 form[ 0 ].reset();
			// allFields.removeClass( "ui-state-error" );
		}
	});

	form = dialog.find( "form" ).on( "submit", function( event ) {
		event.preventDefault();
	});

	$( "#addcont" ).button().on( "click", function() {
		dialog.dialog( "open" );
	});









	var availableTags = [
		"ActionScript",
		"AppleScript",
		"Asp",
		"BASIC",
		"C",
		"C++",
		"Clojure",
		"COBOL",
		"ColdFusion",
		"Erlang",
		"Fortran",
		"Groovy",
		"Haskell",
		"Java",
		"JavaScript",
		"Lisp",
		"Perl",
		"PHP",
		"Python",
		"Ruby",
		"Scala",
		"Scheme"
	  ];
	  function split( val ) {
		return val.split( /,\s*/ );
	  }
	  function extractLast( term ) {
		return split( term ).pop();
	  }
   
	  $( "#groups" )
		// don't navigate away from the field on tab when selecting an item
		.on( "keydown", function( event ) {
		  if ( event.keyCode === $.ui.keyCode.TAB &&
			  $( this ).autocomplete( "instance" ).menu.active ) {
			event.preventDefault();
		  }
		})
		.autocomplete({
		  minLength: 0,
		  source: function( request, response ) {
			// delegate back to autocomplete, but extract the last term
			response( $.ui.autocomplete.filter(
			  availableTags, extractLast( request.term ) ) );
		  },
		  focus: function() {
			// prevent value inserted on focus
			return false;
		  },
		  select: function( event, ui ) {
			var terms = split( this.value );
			// remove the current input
			terms.pop();
			// add the selected item
			terms.push( ui.item.value );
			// add placeholder to get the comma-and-space at the end
			terms.push( "" );
			this.value = terms.join( ", " );
			return false;
		  }
		});
})