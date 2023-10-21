const tok = "";

const showLoadingPDF = () => {
    var load = document.createElement("div");
    load.setAttribute('id', 'loadingPDF')
    //load.style.display = 'block';
    //load.innerHTML = '<svg class="svg-loading" version="1.1" id="L6" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"viewBox="0 0 100 100" enable-background="new 0 0 100 100" xml:space="preserve"><rect fill="none" stroke="#fff" stroke-width="4" x="25" y="25" width="50" height="50">    <animateTransform       attributeName="transform"       dur="0.5s"       from="0 50 50"       to="180 50 50"       type="rotate"       id="strokeBox"       attributeType="XML"       begin="rectBox.end"/>    </rect>     <rect x="27" y="27" fill="#fff" width="46" height="50">    <animate       attributeName="height"       dur="1.3s"       attributeType="XML"       from="50"        to="0"       id="rectBox"     fill="freeze"begin="0s;strokeBox.end"/></rect></svg>'
    load.innerHTML = '<svg class="svg-loading" version="1.1" id="L7" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"  viewBox="0 0 100 100" enable-background="new 0 0 100 100" xml:space="preserve"> <path fill="#fff" d="M31.6,3.5C5.9,13.6-6.6,42.7,3.5,68.4c10.1,25.7,39.2,38.3,64.9,28.1l-3.1-7.9c-21.3,8.4-45.4-2-53.8-23.3  c-8.4-21.3,2-45.4,23.3-53.8L31.6,3.5z">      <animateTransform          attributeName="transform"          attributeType="XML"          type="rotate"         dur="2s"          from="0 50 50"         to="360 50 50"          repeatCount="indefinite" />  </path> <path fill="#fff" d="M42.3,39.6c5.7-4.3,13.9-3.1,18.1,2.7c4.3,5.7,3.1,13.9-2.7,18.1l4.1,5.5c8.8-6.5,10.6-19,4.1-27.7  c-6.5-8.8-19-10.6-27.7-4.1L42.3,39.6z">      <animateTransform          attributeName="transform"          attributeType="XML"          type="rotate"         dur="1s"          from="0 50 50"         to="-360 50 50"          repeatCount="indefinite" />  </path> <path fill="#fff" d="M82,35.7C74.1,18,53.4,10.1,35.7,18S10.1,46.6,18,64.3l7.6-3.4c-6-13.5,0-29.3,13.5-35.3s29.3,0,35.3,13.5  L82,35.7z">      <animateTransform          attributeName="transform"          attributeType="XML"          type="rotate"         dur="2s"          from="0 50 50"         to="360 50 50"          repeatCount="indefinite" /></path></svg>';
    document.body.prepend(load);
}
const hideLoadingPDF = () => {
    let load = document.getElementById('loadingPDF')
    if (load)
        load.remove()
}

const ajax = (url, sendData, fn = null, sendToken = true) => {
    return new Promise((ok, fail) => {
        //var token = obtenerUrl()
        var headers = {}
        /*if (token && sendToken)
            headers['token-faceticket'] = token*/
        $.ajax({
            type: "POST",
            url: url,
            data: JSON.stringify(sendData),
            timeout: 0,
            contentType: 'application/json',
            dataType: 'json',
            headers,
            success: function (data, a, b) {
                if (fn)
                    fn(data)
                ok(data)
            },
            error: function (error) {
                console.log('fail', error);
                var err = 'Error en la conexión con el servidor'
                if (error.responseJSON && error.responseJSON.error)
                    err = error.responseJSON.error
                fail(new Error(err))
                Swal.fire({
                    title: 'Error',
                    text: error.responseJSON.error,
                    icon: 'warning',
                });
            },
            fail: function (a, b, c) {
                console.log('fail', a, b, c);
                var err = 'Error en la conexión con el servidor'
                if (error.responseJSON && error.responseJSON.error)
                    err = error.responseJSON.error
                fail(new Error(err))
            }
        });
    })
}
