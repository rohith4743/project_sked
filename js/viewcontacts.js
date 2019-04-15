class Contacts
{
	constructor(name,mobile,email,groups)
	{
		this.name=name;
		this.mobile=mobile;
		this.email=email;
		this.groups=groups;
	}
	show(){
		alert(this.groups);
	}
}
class Ck{
	constructor()
	{
		this.x=new Array();
	}
	add(y)
	{
		this.x.push(y)
		this.x.sort(function(a,b){
			return a.name.localeCompare(b.name)
		})
	}
	show()
	{
		alert(this.x.length)
	}
}
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
	var username=$('#username').val();
	var url="data/contacts/"+username+".json";
	var ck=new Ck()

$(document).ready(function () {
	var username=$("#username").val();
	var url="data/contacts/"+username+".json";
	var ck=new Ck()
	$.getJSON(url,function (data) {
		$.each(data, function (key, value) { 
			var x=new Contacts(value.name,value.mobile,value.email,value.groups);
			ck.add(x);
		});

		var str='<div class="eachletter row"><div class="letter col-2">';
		str+=ck.x[0].name.toUpperCase().charAt(0);
		str+='</div><div class="namesrow row col-9">';
		var present=ck.x[0].name.toLowerCase().charAt(0);
		var presentcount=0;
		var uname="";
		
		$.each(ck.x, function (k, v) { 
			
			
			 if (v.name.toLowerCase().charAt(0)==present) {
				 str+='<div class=" col col-md-4"><div id="'+k+'" class="names">';
				 str+='<img src="img/emptypic.jpg"><label class="cname">'+v.name+'</label>';
				 str+='<label class="cuser" id="u'+k+'" ></label>';
				 str+='<button class="meet" id="i'+k+'"></button></div>';
				 str+='<div id="d'+k+'" class="names details">'+v.mobile+'<br>'+v.email+'<button class="closebutton" id="'+v.name+'"><i class="fas fa-user-times"></i></button><button class="editbutton" id="'+v.name+'"><i class="fas fa-user-edit"></i></button></div></div>';
				 presentcount=presentcount+1;
				 if(presentcount==3)
				 {
					 str+='</div><div class="col-2"></div><div class="namesrow row col-9">';
					 presentcount=0;
				 }
			 }
			 else
			 {
				str+='</div></div><div class="eachletter row"><div class="letter col-2">';
				str+=v.name.toUpperCase().charAt(0);
				str+='</div><div class="namesrow row col-9">';
				present=v.name.toLowerCase().charAt(0);
				presentcount=0;
				str+='<div class="col col-md-4"><div id="'+k+'" class="names">';
				 str+='<img src="img/emptypic.jpg"><label class="cname">'+v.name+'</label>';
				 str+='<label class="cuser" id="u'+k+'"></label>';
				 str+='<button class="meet" id="i'+k+'"></button></div>';
				 str+='<div id="d'+k+'" class="names details">'+v.mobile+'<br>'+v.email+'<button class="closebutton" id="'+v.name+'"><i class="fas fa-user-times"></i></button><button class="editbutton" id="'+v.name+'"><i class="fas fa-user-edit"></i></button></div></div>';
				 presentcount=presentcount+1;
			 }
			 $.post("getusernamebymobile.php", {
				"number":v.mobile
			},
				function (data, textStatus, jqXHR) {
					uname=data;
					
					if (uname=="No Account Yet") {
						$('#i'+k).text("Invite")
						$('#u'+k).text(uname)
					} else {
						$('#u'+k).text("@"+uname)
						$('#i'+k).text("Add Meeting")
						$('#i'+k).attr("un", uname);					
					}
				}
			);
		});
		str+='</div><div>';
		$('#showing').html(str);

		$.each(ck.x, function (k, v) { 
			 $('#d'+k).hide();
		});

		$('.names').click(function (e) { 
			e.preventDefault();
			var idd=$(this).attr("id");
			$('#d'+idd).slideToggle();
		});
		
		$('.meet').click(function (e) { 
			e.preventDefault();
			if($(this).text()=="Add Meeting")
			{
				var user=$(this).attr("un");			
				document.cookie="counterpart="+user+";";
				window.location="addmeeting.php";
			}
		});


		$('.closebutton').click(function (e) { 
			e.preventDefault();
			var id=$(this).attr("id");
			var i;
			$('#deletecontact').modal('show');
			for ( i = 0; i < data.length; i++) {
				if(data[i].name==id)
				{
					$('#delvals').html(
						'Name:  '+data[i].name+
						'<br>Mobile:  '+data[i].mobile+
						'<br>Email:  '+data[i].email+
						'<br>Groups:  '+data[i].groups.toString()
					);
					break;
				}			
			}
			$('#yesbut').click(function () {
				data.splice(i,1)
				var jxt=JSON.stringify(data);
				$('#deletecontact').modal('hide');
				$.post("editcontacts.php", {
					"data":jxt
				},
					function (data, textStatus, jqXHR) {	
					},
				);
				document.location.reload() 
			  })
			
		});

		$('.editbutton').click(function (e) {
			var i; 
			e.preventDefault();
			var id=$(this).attr("id");
			$(this).attr("data-toggle", "modal");
			$(this).attr("data-target", "#edcontact");
			for ( i = 0; i < data.length; i++) {
				if(data[i].name==id)
				{
					$('#name').val(data[i].name);
					$('#mobile').val(data[i].mobile);
					$('#email').val(data[i].email);
					$('#groups').val(data[i].groups.toString());
					break;
				}			
			}




			$('#savechange').click(function (e) { 
				e.preventDefault();

				var newname=$('#name').val();
				var newmail=$('#email').val();
				var newno=$('#mobile').val();
				var groups=$('#groups').val();
				var er="";
				var err=false;
				if (newname=="") {
					er+="*enter a name<br>";
					err=true;
				}
				if (newno=="") {
					er+="*enter a mobile no<br>";
					err=true;
				}
				if (newmail=="") {
					er+="*enter a email<br>";
					err=true;
				}
				groups=groups.split(',');
				if (groups.length>1) {
					var temp=groups.pop();
				if (temp!=" ") {
					groups.push(temp);
				}
				}
				for (let j = 0; j < groups.length; j++) {
					groups[j]=groups[j].trim();
				
				}
				if (err==true) {
					$('.modalerrors').html(er);
				} else {
					$('#edcontact').modal('hide');
					data[i].name=newname;
					data[i].mobile=newno;
					data[i].email=newmail;
					data[i].groups=groups;
					var jsstr=JSON.stringify(data);
					$.post("editcontacts.php", {
						"data":jsstr
					},
						function (data, textStatus, jqXHR) {	
						},
					);
					document.location.reload() 
				}

				
			});
			
		});	



		
		 
	   
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

	});
	
});