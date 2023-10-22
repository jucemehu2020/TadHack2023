const main = () => {
    $('.logOut_btn').addClass('d-none')
    events()
}
const events = () => {
    $("#template1").click(() => {window.location.href = "./"} )
    $("#template").click(() => {window.location.href = "./"} )

    const allSideMenu = document.querySelectorAll('#sidebar .side-menu.top li a');

    allSideMenu.forEach(item => {
        const li = item.parentElement;

        item.addEventListener('click', function () {
            allSideMenu.forEach(i => {
                i.parentElement.classList.remove('active');
            })
            li.classList.add('active');
        })
    });




    // TOGGLE SIDEBAR
    const menuBar = document.querySelector('#content nav .bx.bx-menu');
    const sidebar = document.getElementById('sidebar');

    menuBar.addEventListener('click', function () {
        sidebar.classList.toggle('hide');
    })


    const searchButton = document.querySelector('#content nav form .form-input button');
    const searchButtonIcon = document.querySelector('#content nav form .form-input button .bx');
    const searchForm = document.querySelector('#content nav form');

    searchButton.addEventListener('click', function (e) {
        if (window.innerWidth < 576) {
            e.preventDefault();
            searchForm.classList.toggle('show');
            if (searchForm.classList.contains('show')) {
                searchButtonIcon.classList.replace('bx-search', 'bx-x');
            } else {
                searchButtonIcon.classList.replace('bx-x', 'bx-search');
            }
        }
    })





    if (window.innerWidth < 768) {
        sidebar.classList.add('hide');
    } else if (window.innerWidth > 576) {
        searchButtonIcon.classList.replace('bx-x', 'bx-search');
        searchForm.classList.remove('show');
    }


    window.addEventListener('resize', function () {
        if (this.innerWidth > 576) {
            searchButtonIcon.classList.replace('bx-x', 'bx-search');
            searchForm.classList.remove('show');
        }
    })

    const switchMode = document.getElementById('switch-mode');

    switchMode.addEventListener('change', function () {
        if (this.checked) {
            document.body.classList.add('dark');
        } else {
            document.body.classList.remove('dark');
        }
    })

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