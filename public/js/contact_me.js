$(function() {

    $('form[name="sentMessage"]').find("input,textarea").jqBootstrapValidation({
        preventSubmit: true,
        submitError: function($form, event, errors) {
            // additional error messages or events
            console.log('deu erro aqui');
        },
        submitSuccess: function($form, event) {
            event.preventDefault(); // prevent default submit behaviour
            // get values from FORM
            var name = $("input#name").val();
            var email = $("input#email").val();
            var phone = $("input#phone").val();
            var message = $("textarea#message").val();
            var firstName = name; // For Success/Failure Message
            // Check for white space in name for Success/Fail message
            if (firstName.indexOf(' ') >= 0) {
                firstName = name.split(' ').slice(0, -1).join(' ');
            }
            console.log('antes do ajax!');
            $.ajax({
                url: "/salvaDesafio",
                type: "POST",
                data: {
                    name: name,
                    phone: phone,
                    email: email,
                    message: message
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
                url: "/salvaParticipante",
                type: "POST",
                data: {
                    name: name,
                    phone: phone,
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


    $("a[data-toggle=\"tab\"]").click(function(e) {
        e.preventDefault();
        $(this).tab("show");
    });
});


/*When clicking on Full hide fail/success boxes */
$('#name').focus(function() {
    $('#success').html('');
});

/*When clicking on Full hide fail/success boxes */
$('#namep').focus(function() {
    $('#successp').html('');
});
