$(document).ready(function(){
   var front = {
     Cadastro: function(){
       $('[name="Cadastrar"]').on('click', () => {
         var bool = false
         $('body input').each((event) => {
           if($(event.target).val()) bool = true
         })

         if(bool){
          alert('Preencha os campos corretamente')
        }else{
          var tipo = $('[name="tipo"]:checked').val()

          var obj = {
            "Name": $('[name="nome"]').val(),
            "Username": $('[name="username"]').val(),
            "Street": $('[name="Rua"]').val(),
            "City": $('[name="Cidade"]').val(),
            "Neighborhood": $('[name="Bairro"]').val(),
            "Complements": $('[name="Numero"]').val(),
            "Password": $('[name="Senha"]').val(),
            "Email": $('[name="Email"]').val(),

          }
           //cpf
          if(tipo == 'cliente'){
            obj['CPF'] = $('[name="CPF"]').val()
            //"CPF":"4465165165",
            var settings = {
               "url": "http://localhost:3000/User",
               "method": "POST",
               "timeout": 0,
               "headers": {
                 "Content-Type": "application/json"
               },
               "data": JSON.stringify(obj),
             };

             $.ajax(settings).done(function (response) {
               window.location = '/PI-Front'
             });
          }else{
             obj['CNPJ'] = $('[name="CPF"]').val()
             obj['Active'] = false
             var settings = {
               "url": "http://localhost:3000/Institution",
               "method": "POST",
               "timeout": 0,
               "headers": {
                 "Content-Type": "application/json"
               },
               "data": JSON.stringify(obj),
             };

             $.ajax(settings).done(function (response) {
               window.location = '/PI-Front'
             });
          }
        }

       })
     }

   }


   $('.btn-voltar').on('click', () => {
     window.location = '/PI-Front'
   })

   front.Cadastro()
});
