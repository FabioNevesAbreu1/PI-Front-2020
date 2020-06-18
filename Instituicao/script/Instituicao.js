$(document).ready(function(){

    var instituicao = {
        token: window.localStorage.getItem('token'),
        init: function(){
            this.buscarDados()
            this.carregarDoadores()
        },
        buscarDados: function(){
            $.ajax({
                "url": "http://localhost:3000/GetInfo",
                "method": "GET",
                "timeout": 0,
                "headers": {
                  "token": this.token,
                  "Content-Type": "application/json"
                },
                "success": (content) => {
                    $('[name="info"]').val(JSON.stringify(content))
                    this.preencheDados()
                },
            })
        },
        renderUserModal: function(dados){
            var final = ''
            dados.forEach(element => {
                final += `
                    <tr dataid='${element.Doacao._id}'>
                      <td>${element.Usuario.Name}</td>
                      <td>${element.Doacao.DataDonation}</td>
                      <td><a href="mailto:${element.Usuario.Email}"><svg class="bi bi-envelope-fill" width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M.05 3.555A2 2 0 0 1 2 2h12a2 2 0 0 1 1.95 1.555L8 8.414.05 3.555zM0 4.697v7.104l5.803-3.558L0 4.697zM6.761 8.83l-6.57 4.027A2 2 0 0 0 2 14h12a2 2 0 0 0 1.808-1.144l-6.57-4.027L8 9.586l-1.239-.757zm3.436-.586L16 11.801V4.697l-5.803 3.546z"/></svg></a></td>
                    </tr>

                    `
            });

            return final
        },
        carregarDoadores: function(){
          $.ajax({
              "url": "http://localhost:3000/GetUsers",
              "method": "GET",
              "timeout": 0,
              "headers": {
                "token": this.token,
                "Content-Type": "application/json"
              },
              "success": (content) => {

                  $('.tbody-doacao').append(this.renderUserModal(content))

              },
              "error": (err) => {
                console.log(err)
              }
          })

        },
        preencheDados: function(){
          var info = JSON.parse( $('[name="info"]').val() )
          $('.nav-item .nav-link').html(`Bem vindo(a), ${info[0].Name}`)

        }
    }

    instituicao.init()

    $('.btn-sair').on('click', () => {
        window.location = '/PI-Front-2020'
    })

})
