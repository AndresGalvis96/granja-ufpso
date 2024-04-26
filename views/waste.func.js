document.addEventListener('DOMContentLoaded', function() {
    var btnMostrarFormulario = document.getElementById('btnMostrarFormulario');
    if (btnMostrarFormulario) {
        btnMostrarFormulario.addEventListener('click', function() {
            mostrarFormulario();
        });
    }

    var btnCerrarFormulario = document.getElementById('cerrar-formulario');
    if (btnCerrarFormulario) {
        btnCerrarFormulario.addEventListener('click', function() {
            cerrarFormulario();
        });
    }

    function mostrarFormulario() {
        var formularioContainer = document.getElementById('formulario-container');
        formularioContainer.style.display = 'block';
    }

    function cerrarFormulario() {
        var formularioContainer = document.getElementById('formulario-container');
        formularioContainer.style.display = 'none';
    }

    document.getElementById('formulario').addEventListener('submit', function(event) {
        event.preventDefault();
        cerrarFormulario();
    });

    fetch('http://localhost:3200/residuos')
        .then(response => {
            if (!response.ok) {
                throw new Error('No se pudo obtener la lista de residuos');
            }
            console.log(response);
            return response.json();
        })
        .then(data => {
            console.log("DATOS RESIDUOS",data);
            const residuos = data;
            renderizarResiduos(residuos);
        })
        .catch(error => {
            console.error('Error al obtener la lista de residuos:', error);
        });

    function renderizarResiduos(residuos) {
        const wasteContainer= document.getElementById('residuo-container');
        wasteContainer.innerHTML = '';


        residuos.forEach(residuo => {
            const residuoBox = document.createElement('div');
            residuoBox.classList.add('residuo-box');
            residuoBox.innerHTML = `
            <p>Especie: ${residuo.descripción}</p>
            <p>Registrado: ${formatDate(residuo.fecha_generaion)}</p>
            <button>Editar</button>
            <button>Procesar</button>`;
            wasteContainer.appendChild(residuoBox);
        });
    }

    function formatDate(dateString) {
        const date = new Date(dateString);
        const day = date.getDate();
        const month = date.getMonth() + 1;
        const year = date.getFullYear();
        const formattedDay = day < 10 ? '0' + day : day;
        const formattedMonth = month < 10 ? '0' + month : month;
        return `${formattedDay}/${formattedMonth}/${year}`;
    }
});
