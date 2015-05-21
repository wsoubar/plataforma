$(function() {

    var angularScope = angular.element('#page-top').scope();
    
    /*
     * FORMULARIO DE DESAFIOS
     */
    $('form[name="sentMessage"]').find("input,textarea").jqBootstrapValidation({
        preventSubmit: true,
        submitError: function($form, event, errors) {
            // additional error messages or events
            console.log('deu erro aqui');
        },
        submitSuccess: function($form, event) {
            event.preventDefault(); // prevent default submit behaviour
            // get values from FORM
            var nome = $("input#name").val();
            var email = $("input#email").val();
            var fone = $("input#phone").val();
            var desafio = $("textarea#message").val();
            var firstName = nome; // For Success/Failure Message
            // Check for white space in name for Success/Fail message
            if (firstName.indexOf(' ') >= 0) {
                firstName = nome.split(' ').slice(0, -1).join(' ');
            }
            console.log('antes do ajax!');
            $.ajax({
                url: "/desafio",
                type: "POST",
                data: {desafio: {
                    nome: nome,
                    email: email,
                    telefone: fone,
                    desafio: desafio }
                },
                cache: false,
                success: function(data) {
                    console.log('Sucesso');
                    if (data.sucesso) {
                        // Success message
                        $('#success').html("<div class='alert alert-success'>");
                        $('#success > .alert-success').html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;")
                            .append("</button>");
                        $('#success > .alert-success')
                            .append("<strong>Muito obrigado, entraremos em contato em breve. </strong>");
                        $('#success > .alert-success')
                            .append('</div>');

                        //clear all fields
                        $('#contactForm').trigger("reset");
                    }
                },
                error: function(err) {
                    console.log('Erro: ' + err);
                    // Fail message
                    $('#success').html("<div class='alert alert-danger'>");
                    $('#success > .alert-danger').html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;")
                        .append("</button>");
                    $('#success > .alert-danger').append("<strong>Desculpe-nos pelo transtorno " + firstName + ", não foi possível realizar seu cadastro. Por favor tente de novo mais tarde!");
                    $('#success > .alert-danger').append('</div>');
                    //clear all fields
                    $('#contactForm').trigger("reset");
                },
            })
        },
        filter: function() {
            return $(this).is(":visible");
        },
    });


    /*
     * FORMULARIO DE PARTICIPANTES
     */
    $('form[name="sentParticipante"]').find("input,textarea").jqBootstrapValidation({
        preventSubmit: true,
        submitError: function($form, event, errors) {
            // additional error messages or events
            console.log('deu erro aqui');
            console.log('erros : ' + JSON.stringify(errors));
        },
        submitSuccess: function($form, event) {
            event.preventDefault(); // prevent default submit behaviour
            // get values from FORM
            var name = $("input#namep").val();
            var email = $("input#emailp").val();
            var phone = $("input#phonep").val();
            var senha = $("input#senhap").val();

            var confirmarSenha = $("input#confirmarSenhap").val();

            /*
            console.log('name:', name);
            console.log('email:', email);
            console.log('phone', phone);
            console.log('senha', $("input#senhap").val());
            console.log('senha', senha);
            */
            //return;
            //var message = $("textarea#message").val();
            var firstName = name; // For Success/Failure Message
            // Check for white space in name for Success/Fail message
            if (firstName.indexOf(' ') >= 0) {
                firstName = name.split(' ').slice(0, -1).join(' ');
            }
            console.log('antes do ajax!');
            $.ajax({
                url: "/usuario",
                type: "POST",
                data: {
                    nome: name,
                    telefone: phone,
                    email: email,
                    senha: senha
                },
                cache: false,
                success: function(data) {
                    console.log('Sucesso');
                    // Success message
                    $('#successp').html("<div class='alert alert-success'>");
                    $('#successp > .alert-success').html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;")
                        .append("</button>");
                    $('#successp > .alert-success')
                        .append("<strong>Seu cadastro foi feito com sucesso. </strong>");
                    $('#successp > .alert-success')
                        .append('</div>');

                    //clear all fields
                    $('#participanteForm').trigger("reset");
                },
                error: function(err) {
                    console.log(err);
                    // Fail message
                    $('#successp').html("<div class='alert alert-danger'>");
                    $('#successp > .alert-danger').html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;")
                        .append("</button>");
                    $('#successp > .alert-danger').append("<strong>Desculpe-nos pelo transtorno " + firstName + ", não foi possível realizar seu cadastro. Por favor tente de novo mais tarde!");
                    $('#successp > .alert-danger').append('</div>');
                    //clear all fields
                    $('#participanteForm').trigger("reset");
                },
            })
        },
        filter: function() {
            return $(this).is(":visible");
        },
    });


    /*
     * FORMULARIO DE LOGIN
     */
    $('form[name="sendLogin"]').find("input").jqBootstrapValidation({
        preventSubmit: true,
        submitError: function($form, event, errors) {
            // additional error messages or events
            console.log('deu erro aqui');
            console.log('erros : ' + JSON.stringify(errors));
        },
        submitSuccess: function($form, event) {
            event.preventDefault(); // prevent default submit behaviour
            // get values from FORM
            //alert('teste!!!');
            var email = $("input#username").val();
            var senha = $("input#password").val();

            //alert('email: '+ email + ' senha: '+ senha);

            console.log('ajax de login!');
            $.ajax({
                url: "/login",
                type: "POST",
                data: {
                    email: email,
                    senha: senha
                },
                cache: false,
                success: function(data) {
                    //console.log('Sucesso');
                    if (data.sucesso) {
                        doLogin(data.usuario);
                    } else {
                        $('#login-alert').html(data.mensagem);
                        $('#login-alert').show();
                    }
                },
                error: function(err) {
                    console.log(err);
                    // Fail message
                    $('#successp').html("<div class='alert alert-danger'>");
                    $('#successp > .alert-danger').html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;")
                        .append("</button>");
                    $('#successp > .alert-danger').append("<strong>Desculpe-nos pelo transtorno " + firstName + ", não foi possível realizar seu cadastro. Por favor tente de novo mais tarde!");
                    $('#successp > .alert-danger').append('</div>');
                    //clear all fields
                    $('#participanteForm').trigger("reset");
                },
            });
        }, 

        filter: function() {
            return $(this).is(":visible");
        },
    });


    $("a[data-toggle=\"tab\"]").click(function(e) {
        e.preventDefault();
        $(this).tab("show");
    });

    function doLogin(user) {
        //alert(JSON.stringify(data));
        //localStorage.setItem("isAuth", "1");
        //localStorage.setItem("usuario", JSON.stringify(user));

        $.cookie('iAuth', 1);
        $.cookie('usuario', user);
        $('#loginModal').modal('hide');

        $('#li-login').hide();
        $('#li-logout').show();

        $('#li-feed').hide();
        $('#li-perfil>a').html(firstName(user.nome));
        $('#li-perfil').show();

        $('#feed-div').removeClass('col-md-12').addClass('col-md-8');

        $('#perfil-div').show();

        console.log('angularScope', angularScope);
        // atualiza angularJS
        angularScope.doLogin(user);
        angularScope.$apply();
        console.log('angularScope sssss');
    }


    function doLogout() {

        //localStorage.setItem("isAuth", "0");
        //localStorage.removeItem("usuario");
        //$('#loginModal').modal('hide');
        //console.log('usuario', $.cookie('usuario'));
        $('#li-logout').hide();
        $('#li-login').show();

        $('#li-perfil>a').html('');
        $('#li-perfil').hide();
        $('#li-feed').show();

        $('#feed-div').removeClass('col-md-8').addClass('col-md-12');
        $('#perfil-div').hide();
        
        console.log('angularScope', angularScope);

        // atualiza angularJS
        angularScope.doLogout();
        angularScope.$apply();
                console.log('doLogout 5');

    }

    function firstName(name) {
        var firstName = name; // For Success/Failure Message
        // Check for white space in name for Success/Fail message
        if (firstName.indexOf(' ') >= 0) {
            firstName = name.split(' ').slice(0, -1);
        }
        return firstName;
    }


    //alert('loaded!!');

 //   if (localStorage.getItem("isaAuth") == "1") {
 //       doLogin(localStorage.getItem("usuario"));
 //   }
 //   alert('fora');
 //  if ($.cookie('isAuth')) {
 //       alert('dentro');
 //       doLogin($.cookie('usuario'));
 //   }

    /*When clicking on Full hide fail/success boxes */
    $('#name').focus(function() {
        $('#success').html('');
    });

    /*When clicking on Full hide fail/success boxes */
    $('#namep').focus(function() {
        $('#successp').html('');
    });

    $('#mn-logout').click(function(ev){
        doLogout();
    });

    // show.bs.modal (before modal show) // shown.bs.modal (after show modal)
    $('#loginModal').on('show.bs.modal', function (e) {
        console.log('show modal login');
        $('form[name="sendLogin"]').find("input").val('');
        $('form[name="sendLogin"]').find(".help-block").html('');
        //$('form[name="sendLogin"]').reset();

    });

    

    for (var i = 0; i < 3; i++) {
        console.log('passou aqui '+ i);
    };
//    $('').html
//    <li data-target="#quote-carousel" data-slide-to="0" class="active"></li>

});
