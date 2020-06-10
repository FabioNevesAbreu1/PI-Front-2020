$(document).ready(function(){

    


    var instituicao = {
        token: window.localStorage.getItem('token'),
        init: function(){
            this.buscarDados()
            this.abrirModal()
            
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
                },
            })
        },
        renderUserModal: function(dados){
            var final = ''
            dados.forEach(element => {
                final += `
                    <div name='tr' class='row' dataid='${element.Doacao._id}' style='background-color: #ccc; display: inline-flex; width: 100%; margin-top:10px;'>
                    <div>${element.Usuario.Name}</div>, <div style='color:#0008ff'>Mensagem de doação: </div><div style='margin-left:6px'> ${element.Doacao.DataDonation}</div>
                    <div style='margin-left: auto;'><a href="mailto:${element.Usuario.Email}">BTN</a></div>
                    </div>
                `
            });


            return final
        },
        abrirModal: function(){
            $('[name="btnUser"]').on('click', () => {
                $('#myModal').modal()
                $('#myModal').on('hidden.bs.modal', function () {
                    $('.modal-body').html('')
                });
                $.ajax({
                    "url": "http://localhost:3000/GetUsers",
                    "method": "GET",
                    "timeout": 0,
                    "headers": {
                      "token": this.token,
                      "Content-Type": "application/json"
                    },
                    "success": (content) => {
                        $('#myModal').modal()

                        $('.modal-body').append(this.renderUserModal(content))

                    },
                })


            })
        },
        showimage: function(){

        }
    }

    instituicao.init()


})
