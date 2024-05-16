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

    document.getElementById('formularioAnimal').addEventListener('submit', function(event) {

        event.preventDefault();

        cerrarFormulario();
    });

    fetch('http://localhost:3200/animal')
        .then(response => {
            if (!response.ok) {
                throw new Error('No se pudo obtener la lista de animales');
            }
            console.log(response);
            return response.json();
        })
        .then(data => {
            console.log(data);
            const animales = data;
            renderizarAnimales(animales);
        })
        .catch(error => {
            console.error('Error al obtener la lista de animales:', error);
        });

    function renderizarAnimales(animales) {
        const animalContainer= document.getElementById('animal-container');
        animalContainer.innerHTML = '';


        animales.forEach(animal => {
            const animalBox = document.createElement('div');
            animalBox.classList.add('animal-box');
            animalBox.innerHTML = `
            <p>Especie: ${animal.nombre}</p>
            <p>Registrado: ${formatDate(animal.fecha_ingreso)}</p>
            <button>Editar</button>
            <button>Procesar</button>`;
            animalContainer.appendChild(animalBox);
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
