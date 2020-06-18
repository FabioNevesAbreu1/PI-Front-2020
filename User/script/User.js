$(document).ready(function(){
    var user = {
        init: function(){
          this.setNome()
          this.filtro()
        },
        token: window.localStorage.getItem('token'),
        verifyToken: function(){

        },
        ListIntitution: function(){
            $.ajax({
                "url": "http://localhost:3000/FindInstitution",
                "method": "POST",
                "timeout": 0,
                "headers": {
                  "token": this.token,
                  "Content-Type": "application/json"
                },
                "data": JSON.stringify({"Option":"City"}),
                "success": (content) => {
                  this.preencheTabela(content)
                },
              })
        },
        setNome: function(){
            $.ajax({
                "url": "http://localhost:3000/getName",
                "method": "GET",
                "timeout": 0, 
                "headers": {
                  "token": this.token,
                  "Content-Type": "application/json"
                },
                "success": (content) => {
                    $('.col-md-3.a .nav p').html(`Bem vindo(a), ${content}`)
                },
              })
        },
        preencheTabela: function(instituicao){
          tpl = (i) => {
              var string = JSON.stringify(i)
              return `<div class='col-md-3 foto'>
                            <img style='width: 260px;height: 230px;border: 2px solid #562e6b;' src='http://localhost:3000/getFotoUser/${i['_id']}'>
                            <div class='teste' data-info='${string}'>
                              ${i.Name}
                            </div>
                          </div>`
          }
          $('.cards').html('')
          if(!instituicao.length){
            // TODO: tratar quando vier vazio
          }else{
            $('.cards').html('')
            instituicao.forEach((e,i) => {
              $('.cards').append(tpl(e))
            })
            this.instituicaoActive()
          }
        },
        instituicaoActive: function(){
          $('.cards .teste').on('click', (event) => {
            var info = $(event.target).attr('data-info')
            var infoParsed = JSON.parse(info)
            $('#myModal').modal()
            $('[name="descricao"]').attr('data-info', info)
            $('[name="enviar"]').on('click', () => {
              // COLOCAR LOADING
              var infoEmpresa = JSON.parse($('[name="descricao"]').attr('data-info'))
              var info = {
                Enterprise: infoEmpresa['Name'],
                DataDonation: $('[name="descricao"]').val(),
                DateDonation: moment().format('DD-MM-YYYY')
              }

              $.ajax({
                "url": "http://localhost:3000/Interest",
                "method": "POST",
                "timeout": 0,
                "headers": {
                  "token": this.token,
                  "Content-Type": "application/json"
                },
                "data": JSON.stringify(info),
                "success": (content) => {
                    // loading hide
                    $('[name="descricao"]').val('')
                    $('[data-dismiss="modal"]').trigger('click')

                },
                "error": (error) => {

                }
              })
            })

            $('.modal-title').html(`Instituição: ${infoParsed.Name}`)

          })
        },
        filtro: () => {

          $('.btn-radio').off('click').on('click', (e) => {

              var valor = $(e.target).find('input').val()

              var settings = {
                "url": "http://localhost:3000/filtro/" + valor,
                "method": "GET",
                "timeout": 0,
                "headers": {
                  "token": localStorage.getItem('token')
                },
              };

              $.ajax(settings).done((response) => {
                user.preencheTabela(response)
              });
          })

          $('.btn-radio.active').trigger('click')
        }

    }
    user.init()
    $('.btn-sair').on('click', () => {
      window.location = '/PI-Front-2020'
    })

})
