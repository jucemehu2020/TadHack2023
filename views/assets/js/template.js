

const main = () => {
    $('.logOut_btn').addClass('d-none')
    events()
}
const events = () => {
    $("#btnLogin").click(login)

    $('#btnPrueba').click(() => {
        window.location.href = "./prueba";
    })
}
const login = () => {
    window.location.href = "./";
}

$(main);

/*await ajax("/consultarEstadoEvento", { idEvento }, function (data) {
    if (data.result.error === "Se acabo el tiempo de la sesión") {
        Swal.fire({
            title: 'Error',
            text: data.result.error,
            icon: 'error',
        }).then((result) => {
            if (result.isConfirmed) {
                window.location.href = urlBase + "=" + encodeURIComponent(parametros);
            }
        });
    } else if (data.result === false) {
        Swal.fire({
            title: 'Error',
            text: "El evento esta desactivado",
            icon: 'error',
        }).then((result) => {
            if (result.isConfirmed) {
                window.location.href = urlBase + "=" + encodeURIComponent(parametros);
            }
        });
    } else {
        console.log("sigue");
    }
});*/
