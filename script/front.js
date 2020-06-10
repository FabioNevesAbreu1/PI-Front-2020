$(document).ready(function(){
   var front = {
       Entrar: function(){
           $('[name="Entrar"]').on('click', () => {
                // cria objeto para enviar para a requisição com usuario e senha
                var content = {
                    Username: $('[name="Username"]').val(),
                    Password: $('[name="Password"]').val()
                }

                // faz a configuração e envio da requisição
                $.ajax({
                    "url": "http://localhost:3000/Login", // define se a rota vai ser para usuario ou não
                    "method": "POST",
                    "timeout": 0,
                    "headers": {
                      "Content-Type": "application/json"
                    },
                    "data": JSON.stringify(content),
                    "success": (result) => { // quando a requisição retornar
                        if(result.code == '1001'){
                            //TODO: tratar o erro no front
                        }else{
                            window.localStorage.setItem('token', result.token) // passa o token recebido para o local storage
                            if(result.type == 'User'){// decide se envia para a rota de usuario ou de instituição
                                window.location = '/PI-Front/User/User.html'
                            }else{
                                window.location = '/PI-Front/Instituicao/Instituicao.html'
                            }

                        }

                    },
                    "error": (result) => {
                        console.error(result)
                    }
                  });
           })
       },
       cadastrar: function(){
          $('[name="Cadastro"]').on('click', () => {
              window.location = '/PI-Front/cadastro2.html'
          })
       }


   }




   front.Entrar()
   front.cadastrar()
});
