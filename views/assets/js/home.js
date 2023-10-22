const main = () => {
    $('.logOut_btn').addClass('d-none')
    events()
}
const events = () => {
    $("#torredelreloj").click(() => { window.location.href = "./torredelreloj" })
    $("#puentedelhumilladero").click(() => { window.location.href = "./puentedelhumilladero" })
    $("#iglesiasafrancisco").click(() => { window.location.href = "./iglesiasafrancisco" })
    $("#belen").click(() => { window.location.href = "./belen" })
    $("#elmorro").click(() => { window.location.href = "./elmorro" })
    $("#pueblitopatojo").click(() => { window.location.href = "./pueblitopatojo" })
    


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

    const searchButtonIcon = document.querySelector('#content nav form .form-input button .bx');
    const searchForm = document.getElementById('search-form');
    const searchInput = document.getElementById('search-input');
    const allCardTitles = document.querySelectorAll('#content main .card-title');

    searchForm.addEventListener('submit', function (e) {
        $('li').show();
        e.preventDefault(); // Evita que el formulario se envíe y la página se recargue.
        const searchTerm = searchInput.value.toLowerCase(); // Obtén el valor de búsqueda en minúsculas.

        allCardTitles.forEach(cardTitle => {
            const title = cardTitle.textContent.toLowerCase(); // Obtén el título del elemento en minúsculas.
            const parentLi = cardTitle.parentElement.parentElement; // Obtiene el elemento li que contiene el título.

            // Comprueba si el título coincide con el término de búsqueda.
            if (title.includes(searchTerm)) {
                parentLi.style.display = 'block'; // Muestra el elemento.
            } else {
                parentLi.style.display = 'none'; // Oculta el elemento.
            }
        });

        $('.card-container:visible').closest('li').show();
        $('.card-container:hidden').closest('li').hide();

    });

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
    const container_home = document.getElementById('contenedor_informarcion');

    switchMode.addEventListener('change', function () {
        if (this.checked) {
            document.body.classList.add('dark');
            container_home.style.color = 'white'
        } else {
            document.body.classList.remove('dark');
            container_home.style.color = 'black'
        }
    })












}

$(main);