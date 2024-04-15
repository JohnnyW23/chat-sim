$(() => {

    var botao = $('.nickname button');
    var nick = $('.nickname input');
    var msg = $('.message input');
    var scr = $('.screen');
    var globalcor;
    var emojiAberto;

    // Escolhendo cor para o Nickname
    $('#cor').change(() => {
        var cor = $('#cor').val();
        nick.css('color', cor);
        globalcor = cor;
    })

    function apenasEspacos(str) {
        return /^\s*$/.test(str);
    }

    function contemEspaco(str) {
        return /\s/.test(str);
    }

    // Função para enviar mensagens
    var enviarMsg = function(){
        // Se o apelido tiver mais de 20 caracteres
        if(nick.val().length > 20){
            scr.append('<div class="aviso">Seu nickname só pode conter no máximo 20 caracteres!</div>');
            nick.val('');

        // Se a mensagem ou apelido só tiverem espaços em branco
        }else if(apenasEspacos(nick.val()) == true | apenasEspacos(msg.val()) == true){
            scr.append('<div class="aviso">Escolha um nickname e não deixe sua mensagem em branco!</div>');

            // Se o apelido tiver qualquer espaço em branco
        }else if(contemEspaco(nick.val()) == true){
            scr.append('<div class="aviso">Seu nickname não pode conter espaços!</div>');

        // Se o apelido ou a mensagem estiverem vazios
        }else if(nick.val() == '' && msg.val() == ''){
            scr.append('<div class="aviso">Escolha um nickname e não deixe sua mensagem vazia!</div>');

        // Se o apelido ou a mensagem passarem em todas as validações
        }else{
            var hora = new Date().getHours();
            var minuto = new Date().getMinutes();
            if(hora < 10){
                hora = '0' + hora;
            }
            if(minuto < 10){
                minuto = '0' + minuto;
            }
            scr.append('<div class="entrada-msg"><span>[' + hora + ':' + minuto + '] </span><h4 style="color:' + globalcor + '">' + nick.val().trim() + ':</h4><span> ' + msg.val().trim() + '</span></div>');
            msg.val('');
        };
        scr.scrollTop(scr.get(0).scrollHeight);
    }

    // Ao clicar no botão de enviar
    enviarBotao = function(){
        botao.click(() => {
            enviarMsg();
        });
    }

    // Ao pressionar enter enquanto se escreve a mensagem
    enviarEnter = function(){
        msg.keypress(function(event){
            var keycode = (event.keyCode ? event.keyCode : event.which);
            if(keycode == '13'){
                enviarMsg();
            };
        })
    }

    janelaEmojis = function(){
        $('.emojis').click(function(){
            if(emojiAberto == true){
                $('.emoji-window').css('display','none')
                emojiAberto = false;
            }else{
                $('.emoji-window').css('display','block');
                emojiAberto = true;
            };
        });
    }

    escolherEmoji = function(){
        $('.emoji-window, .emojis').on("mousedown", function(event) {
            // Evita a seleção de texto quando o elemento é clicado
            event.preventDefault();
        });
        $('.emoji-window span').click(function(){
            var emoji = $(this).html()
            msg.val(msg.val() + emoji);
        })
    }

    enviarBotao();
    enviarEnter();
    janelaEmojis();
    escolherEmoji();
})