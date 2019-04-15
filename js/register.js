var validata={
    file:true,
    fname:false,
    lname:false,
    email:false,
    password:false,
    cpassword:false,
    dob:false,
    mobile:false,
    occupation:false,
    designation:false,
    city:false
}
function validation() {
    var x=document.getElementById("addimage");
    var text=""
    if ("files" in x) {
        if (x.files.length==0) {
            text +=" select a file";
        }
        else{
            var filename=x.files[0].name;
            var ext=filename.substring(filename.lastIndexOf('.')+1).toLowerCase();
            if (ext=="jpg" || ext=="jpeg" || ext=="png") {
                var fReader=new FileReader()
                fReader.onloadend = function(event){
                    var img = document.getElementById("profilepicture");
                    img.src = event.target.result;
                    }
                    fReader.readAsDataURL(x.files[0]);
                    document.getElementById("imageerror").innerHTML=""
                    validata.file=true;
            } else{
                document.getElementById("imageerror").innerHTML="*chooose from .jpg, .jpeg, .png"
                validata.file=false;
            }
        }
    }
}
function validate() {
    var res=true;
    for (const x in validata) {
        const element = validata[x];
        if (element==false) {
            res=false;
        }
    }
    return res;
}
function checkempty(thisone){
    var x=thisone.name;
    var err="";
    var val=document.getElementsByName(x)[0].value;
    if (val=="") {
        err="*please enter the value";
    } 
    else{
        validata[x]=true;
    }
    x+="msg";  
    document.getElementById(x).innerHTML=err; 
}
function validatepassword(thisfield) {
    var x=thisfield.name;
    var val=document.getElementsByName(x)[0].value;
    var passw = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;
    x+="msg";
    var err="";
    if (val.length<8) {
        err+="*password should contain minimum 8 letters";
    }
    if (val.length>20) {
        err+="*password should contain maximum 20 letters";
    }
    if (!val.match(passw)) {
        if (val.length<8 || val.length>20) {
            err+="<br>"
        }
        err+="*password should contain atleast<br>&nbsp;1 lowercase letter<br>&nbsp;1 uppercase letter<br>&nbsp;1 digit"
    }
    else if(val.length>7 && val.length<21){
        validata.password=true;
    }
    document.getElementById(x).innerHTML=err;
}
function validatecpassword(thisfield) {
    var pw=document.getElementsByName("password")[0].value;
    var cpw=document.getElementsByName("cpassword")[0].value;
    var err="";
    if (pw!=cpw) {
        err="*passwords do not match";
    }
    else{
        validata.cpassword=true;
    }
    document.getElementById("cpasswordmsg").innerHTML=err;
}
function phonevalidate(inputtxt)
{
  var phoneno = /^\d{10}$/;
  var x=inputtxt.name;
  var no=document.getElementsByName(x)[0].value;
  var err=""
  if (!no.match(phoneno)) {
      err+="*enter a valid phone number"
  }
  else{
      validata.mobile=true;
  }
  document.getElementById("telmsg").innerHTML=err;
}
