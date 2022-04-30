$(document).ready(function(){
  
  $("#btn_logout").hide();
  var access_token = $.cookie('access_token');

  if(access_token!=null){
    // Si el usuario ya está logeado pide la informacion de este
    
    $.get("http://127.0.0.1:5000/api/login/getUser", {'jwt':access_token}, function(data){
      if(data['status']=='OK'){
        $("#h1_name").html("Bienvenido, " + data['nombre_completo']);
        $("#btn_logout").show();
      }
    });
    
  }

  $("#btn_logout").click(function(){
    $.removeCookie('access_token');
    window.location.href = "index.html";
  });

  $('#btn_login').click(function(){
    var email = $('#login_email').val();
    var password = $('#login_password').val();
    $.post( "http://127.0.0.1:5000/api/login/", {'email':email,'password':password} ,function( data ) {
        
      if(data['status'] == 'OK'){
        $.cookie('access_token', data['access_token']);
        access_token = data['access_token'];
        $("#h1_name").html("Bienvenido, " + data['nombre_completo']);
        $("#btn_logout").show();
        console.log(data);
      }else if(data['status'] == 'ERROR'){
        $("#login_div").html(data['message']);
      }else{
        console.log("ERROR EN EL SERVIDOR")
      }
      
      //$( "#h1_name" ).html( data['message'] );
      console.log(data)
    });
  });


  $('#btn_registro').click(function(){
  
    var nombre_completo = $('#nombre_completo').val();
    var email = $('#email').val();
    var password = $('#password').val();
    var matriculacion = $('#matriculacion').val();

    var paquete = {'nombre_completo':nombre_completo,'email':email,'password':password,'matriculacion':matriculacion};

    $.post( "http://127.0.0.1:5000/api/registro/", paquete, function(data){
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

  $("#btn_crear_evento").click(function(){

    var max_participantes = $('#max_participantes').val();
    var deporte = $('#deporte').val();
    var nombre_evento = $('#nombre_evento').val();
    var descripcion_evento = $('#descripcion_evento').val();
    var fecha_inicio = $('#fecha_inicio').val();
    var fecha_fin = $('#fecha_fin').val();
    var hora_inicio = $('#hora_inicio').val();
    var hora_fin = $('#hora_fin').val();

    var paquete = {'jwt':access_token,'id_deporte':deporte,'max_participantes':max_participantes,'nombre_evento':nombre_evento,'descripcion_evento':descripcion_evento,'fecha_inicio':fecha_inicio,'fecha_fin':fecha_fin,'hora_inicio':hora_inicio,'hora_fin':hora_fin}; 
    console.log(paquete);
    $.get("http://127.0.0.1:5000/api/eventos/crearEvento", paquete, function(data){
      if(data['status'] == 'OK'){
        $("#crear_evento_div").html("Evento creado con éxito");
        console.log(data);
      }else if(data['status'] == 'ERROR'){
        $("#crear_evento_div").html(data['message']);
      }else{
        console.log("ERROR EN EL SERVIDOR")
        $("#crear_evento").html("ERRROR EN EL SERVIDOR");
      }
      console.log(data)
    });

  });

  $("#btn_ver_eventos").click(function(){
  
    var paquete = {'jwt':access_token};
    $.get("http://localhost:5000/api/eventos/getEventos", paquete, function(data){
    
      console.log(data)
      // For each evento in data jquery
      $.each(data, function(index, value){

        var deporte = value['id_deporte'];
        console.log(deporte);

        switch (deporte) {
          case 1:
            deporte = 'Fútbol';
            break;
          case 2:
            deporte = 'Baloncesto';
            break;
          case 3:
            deporte = 'Tenis';
            break;
          default:
            deporte = 'ERROR';
        }

        // Create a new div
        var div = $("<div>");        div.addClass("evento");
        
        div.append("<h2>" + value['nombre_evento'] + "</h2>");
        div.append("<p>" + value['descripcion_evento'] + "</p>");
        div.append("<p>Fecha de inicio: " + value['fecha_inicio'] + "</p>");
        div.append("<p>Fecha de fin: " + value['fecha_fin'] + "</p>");
        div.append("<p>Hora de inicio: " + value['hora_inicio'] + "</p>");
        div.append("<p>Hora de fin: " + value['hora_fin'] + "</p>");
        div.append("<p>Deporte: " + deporte + "</p>");
        div.append("<p>Maximo de participantes: " + value['max_participantes'] + "</p>");
        // Append the div to the div with id "eventos"
        $("#eventos_div").append(div);

      });

    });
  
  });
  
}); 