$(document).ready(function(){
    $('#btn_registro').click(function(){
    
        var email = $('#email').val();
        var password = $('#password').val();
        
        if ($('#isAlumn').val() == 'on') {
            var isAlumn = 1;
        } else {
            var isAlumn = 0;
        }

        var paquete = {'email':email,'password':password, 'isAlumn':isAlumn};

        $.post( "http://127.0.0.1:5000/API_2/uRegister/", paquete, function(data){
        if(data['status'] == 'OK'){
            $("#login_div").html(data);
            console.log(data);
        }else if(data['status'] == 'ERROR'){
            $("#login_div").html(data['message']);
        }else{
            console.log("ERROR EN EL SERVIDOR")
            $("#login_div").html("ERRROR EN EL SERVIDOR");
        }
        console.log(data)
        });

    });
});