const fs = require('fs');
const path = require('path');

// Plantilla base para todas las páginas
const getPageTemplate = (title, sections) => `<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${title} - CodeLearn</title>
    <link rel="stylesheet" href="../learn-code.css">
    <link href="https://fonts.googleapis.com/css2?family=Fira+Code:wght@400;600&family=Inter:wght@400;600;800&display=swap" rel="stylesheet">
</head>
<body>
    <!-- Toggle modo oscuro -->
    <input type="checkbox" id="theme-toggle" class="theme-toggle">
    <label for="theme-toggle" class="theme-toggle-label">🌙</label>

    <!-- Botón menú móvil -->
    <button id="menu-toggle" class="menu-toggle">
        <span class="menu-icon"></span>
    </button>

    <!-- Navegación lateral -->
    <nav class="sidebar">
        <div class="logo">
            <a href="../index.html" class="home-link">CodeLearn</a>
        </div>
        ${sections}
    </nav>

    <main class="concept-content">
        <section id="introduccion" class="concept-section">
            <h1 class="concept-title">${title}</h1>
            
            <div class="example-container">
                <h2 class="example-title">¿Qué es ${title}?</h2>
                <p class="example-description">[Descripción de la tecnología]</p>
                <ul class="concept-list">
                    <li>Característica 1</li>
                    <li>Característica 2</li>
                    <li>Característica 3</li>
                    <li>Característica 4</li>
                </ul>
            </div>

            <div class="example-container">
                <h2 class="example-title">Ejemplo Básico</h2>
                <div class="code-block" data-language="${title.toLowerCase()}">
                    <code>// Código de ejemplo básico
[Tu código aquí]</code>
                </div>
            </div>

            <div class="note-box">
                <p>💡 Nota importante sobre ${title}</p>
            </div>
        </section>

        <div class="concept-navigation">
            <a href="../index.html" class="nav-button prev">Volver al Inicio</a>
            <a href="#siguiente" class="nav-button next">Siguiente: [Siguiente Tema]</a>
        </div>
    </main>

    <script>
        // Script para el toggle del tema
        const themeToggle = document.getElementById('theme-toggle');
        themeToggle.addEventListener('change', () => {
            document.body.classList.toggle('dark-theme');
        });

        // Script para el menú móvil
        const menuToggle = document.getElementById('menu-toggle');
        const sidebar = document.querySelector('.sidebar');
        
        menuToggle.addEventListener('click', () => {
            sidebar.classList.toggle('active');
            menuToggle.classList.toggle('active');
        });

        // Cerrar menú al hacer clic en un enlace (móvil)
        document.querySelectorAll('.sidebar a').forEach(link => {
            link.addEventListener('click', () => {
                if (window.innerWidth <= 768) {
                    sidebar.classList.remove('active');
                    menuToggle.classList.remove('active');
                }
            });
        });

        // Navegación suave
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                document.querySelector(this.getAttribute('href')).scrollIntoView({
                    behavior: 'smooth'
                });
            });
        });
    </script>
</body>
</html>`;

// Configuración de las secciones para cada tecnología
const pagesConfig = {
    'react': {
        title: 'React',
        sections: `
        <div class="nav-section">
            <h3>Fundamentos React</h3>
            <a href="#introduccion">Introducción</a>
            <a href="#componentes">Componentes</a>
            <a href="#props">Props</a>
            <a href="#estado">Estado</a>
        </div>
        
        <div class="nav-section">
            <h3>Hooks</h3>
            <a href="#useState">useState</a>
            <a href="#useEffect">useEffect</a>
            <a href="#useContext">useContext</a>
            <a href="#customHooks">Custom Hooks</a>
        </div>
        
        <div class="nav-section">
            <h3>Conceptos Avanzados</h3>
            <a href="#routing">Routing</a>
            <a href="#forms">Formularios</a>
            <a href="#context">Context API</a>
            <a href="#redux">Redux</a>
        </div>
        
        <div class="nav-section">
            <h3>Optimización</h3>
            <a href="#performance">Performance</a>
            <a href="#memoization">Memoization</a>
            <a href="#suspense">Suspense</a>
        </div>`
    },
    'vue': {
        title: 'Vue.js',
        sections: `
        <div class="nav-section">
            <h3>Fundamentos Vue</h3>
            <a href="#introduccion">Introducción</a>
            <a href="#template">Template Syntax</a>
            <a href="#componentes">Componentes</a>
            <a href="#props">Props</a>
        </div>
        
        <div class="nav-section">
            <h3>Reactividad</h3>
            <a href="#composition">Composition API</a>
            <a href="#refs">Refs y Reactive</a>
            <a href="#computed">Computed</a>
            <a href="#watch">Watch</a>
        </div>
        
        <div class="nav-section">
            <h3>Conceptos Avanzados</h3>
            <a href="#routing">Vue Router</a>
            <a href="#vuex">Vuex</a>
            <a href="#pinia">Pinia</a>
            <a href="#lifecycle">Lifecycle Hooks</a>
        </div>`
    },
    'angular': {
        title: 'Angular',
        sections: `
        <div class="nav-section">
            <h3>Fundamentos Angular</h3>
            <a href="#introduccion">Introducción</a>
            <a href="#componentes">Componentes</a>
            <a href="#templates">Templates</a>
            <a href="#directivas">Directivas</a>
        </div>
        
        <div class="nav-section">
            <h3>Servicios y DI</h3>
            <a href="#servicios">Servicios</a>
            <a href="#di">Inyección de Dependencias</a>
            <a href="#http">HTTP Client</a>
            <a href="#rxjs">RxJS</a>
        </div>
        
        <div class="nav-section">
            <h3>Routing y Forms</h3>
            <a href="#routing">Routing</a>
            <a href="#guards">Guards</a>
            <a href="#forms">Formularios</a>
            <a href="#validacion">Validación</a>
        </div>
        
        <div class="nav-section">
            <h3>Estado y Optimización</h3>
            <a href="#ngrx">NgRx</a>
            <a href="#signals">Signals</a>
            <a href="#performance">Performance</a>
            <a href="#testing">Testing</a>
        </div>`
    },
    'react-native': {
        title: 'React Native',
        sections: `
        <div class="nav-section">
            <h3>Fundamentos</h3>
            <a href="#introduccion">Introducción</a>
            <a href="#componentes">Componentes</a>
            <a href="#estilos">Estilos</a>
            <a href="#flexbox">Flexbox</a>
        </div>
        
        <div class="nav-section">
            <h3>Navegación</h3>
            <a href="#navigation">React Navigation</a>
            <a href="#stack">Stack Navigator</a>
            <a href="#tab">Tab Navigator</a>
            <a href="#drawer">Drawer Navigator</a>
        </div>
        
        <div class="nav-section">
            <h3>APIs Nativas</h3>
            <a href="#camera">Cámara</a>
            <a href="#location">Geolocalización</a>
            <a href="#storage">AsyncStorage</a>
            <a href="#notifications">Notificaciones</a>
        </div>
        
        <div class="nav-section">
            <h3>Optimización</h3>
            <a href="#performance">Performance</a>
            <a href="#debugging">Debugging</a>
            <a href="#testing">Testing</a>
            <a href="#deployment">Deployment</a>
        </div>`
    },
    'flutter': {
        title: 'Flutter',
        sections: `
        <div class="nav-section">
            <h3>Fundamentos Flutter</h3>
            <a href="#introduccion">Introducción</a>
            <a href="#widgets">Widgets</a>
            <a href="#layout">Layout</a>
            <a href="#material">Material Design</a>
        </div>
        
        <div class="nav-section">
            <h3>Estado</h3>
            <a href="#stateful">StatefulWidget</a>
            <a href="#provider">Provider</a>
            <a href="#bloc">BLoC Pattern</a>
            <a href="#riverpod">Riverpod</a>
        </div>
        
        <div class="nav-section">
            <h3>Navegación y UI</h3>
            <a href="#routing">Navegación</a>
            <a href="#animations">Animaciones</a>
            <a href="#themes">Temas</a>
            <a href="#responsive">Diseño Responsive</a>
        </div>
        
        <div class="nav-section">
            <h3>Plataforma</h3>
            <a href="#platform">Servicios de Plataforma</a>
            <a href="#plugins">Plugins</a>
            <a href="#native">Código Nativo</a>
            <a href="#deployment">Deployment</a>
        </div>`
    },
    'nodejs': {
        title: 'Node.js',
        sections: `
        <div class="nav-section">
            <h3>Fundamentos Node.js</h3>
            <a href="#introduccion">Introducción</a>
            <a href="#modulos">Módulos</a>
            <a href="#npm">NPM</a>
            <a href="#eventos">Event Loop</a>
        </div>
        
        <div class="nav-section">
            <h3>Express.js</h3>
            <a href="#express">Express Básico</a>
            <a href="#routing">Routing</a>
            <a href="#middleware">Middleware</a>
            <a href="#templates">Templates</a>
        </div>
        
        <div class="nav-section">
            <h3>Bases de Datos</h3>
            <a href="#mongodb">MongoDB</a>
            <a href="#mongoose">Mongoose</a>
            <a href="#sql">SQL</a>
            <a href="#orm">Sequelize</a>
        </div>
        
        <div class="nav-section">
            <h3>Avanzado</h3>
            <a href="#auth">Autenticación</a>
            <a href="#testing">Testing</a>
            <a href="#websockets">WebSockets</a>
            <a href="#deployment">Deployment</a>
        </div>`
    },
    'python': {
        title: 'Python',
        sections: `
        <div class="nav-section">
            <h3>Fundamentos Python</h3>
            <a href="#introduccion">Introducción</a>
            <a href="#tipos">Tipos de Datos</a>
            <a href="#control">Control de Flujo</a>
            <a href="#funciones">Funciones</a>
        </div>
        
        <div class="nav-section">
            <h3>POO</h3>
            <a href="#clases">Clases</a>
            <a href="#herencia">Herencia</a>
            <a href="#decoradores">Decoradores</a>
            <a href="#magic">Magic Methods</a>
        </div>
        
        <div class="nav-section">
            <h3>Frameworks Web</h3>
            <a href="#django">Django</a>
            <a href="#flask">Flask</a>
            <a href="#fastapi">FastAPI</a>
            <a href="#rest">REST APIs</a>
        </div>
        
        <div class="nav-section">
            <h3>Data Science</h3>
            <a href="#numpy">NumPy</a>
            <a href="#pandas">Pandas</a>
            <a href="#matplotlib">Matplotlib</a>
            <a href="#scikit">Scikit-learn</a>
        </div>`
    },
    'java': {
        title: 'Java',
        sections: `
        <div class="nav-section">
            <h3>Fundamentos Java</h3>
            <a href="#introduccion">Introducción</a>
            <a href="#tipos">Tipos de Datos</a>
            <a href="#control">Control de Flujo</a>
            <a href="#poo">POO</a>
        </div>
        
        <div class="nav-section">
            <h3>Características Avanzadas</h3>
            <a href="#collections">Collections</a>
            <a href="#generics">Generics</a>
            <a href="#streams">Streams</a>
            <a href="#lambda">Expresiones Lambda</a>
        </div>
        
        <div class="nav-section">
            <h3>Spring Framework</h3>
            <a href="#spring-core">Spring Core</a>
            <a href="#spring-boot">Spring Boot</a>
            <a href="#spring-mvc">Spring MVC</a>
            <a href="#spring-data">Spring Data</a>
        </div>
        
        <div class="nav-section">
            <h3>Enterprise</h3>
            <a href="#jpa">JPA/Hibernate</a>
            <a href="#security">Spring Security</a>
            <a href="#testing">Testing</a>
            <a href="#microservices">Microservicios</a>
        </div>`
    },
    'sql': {
        title: 'SQL',
        sections: `
        <div class="nav-section">
            <h3>Fundamentos SQL</h3>
            <a href="#introduccion">Introducción</a>
            <a href="#select">SELECT</a>
            <a href="#where">WHERE</a>
            <a href="#joins">JOINS</a>
        </div>
        
        <div class="nav-section">
            <h3>Manipulación de Datos</h3>
            <a href="#insert">INSERT</a>
            <a href="#update">UPDATE</a>
            <a href="#delete">DELETE</a>
            <a href="#transactions">Transacciones</a>
        </div>
        
        <div class="nav-section">
            <h3>Diseño de BD</h3>
            <a href="#tables">Tablas</a>
            <a href="#relations">Relaciones</a>
            <a href="#normalization">Normalización</a>
            <a href="#indexes">Índices</a>
        </div>
        
        <div class="nav-section">
            <h3>Optimización</h3>
            <a href="#performance">Performance</a>
            <a href="#explain">EXPLAIN</a>
            <a href="#tuning">Query Tuning</a>
            <a href="#best-practices">Mejores Prácticas</a>
        </div>`
    },
    'mongodb': {
        title: 'MongoDB',
        sections: `
        <div class="nav-section">
            <h3>Fundamentos MongoDB</h3>
            <a href="#introduccion">Introducción</a>
            <a href="#documentos">Documentos</a>
            <a href="#colecciones">Colecciones</a>
            <a href="#crud">Operaciones CRUD</a>
        </div>
        
        <div class="nav-section">
            <h3>Consultas</h3>
            <a href="#queries">Queries</a>
            <a href="#agregacion">Agregación</a>
            <a href="#indices">Índices</a>
            <a href="#text-search">Búsqueda de Texto</a>
        </div>
        
        <div class="nav-section">
            <h3>Modelado de Datos</h3>
            <a href="#schema">Schema Design</a>
            <a href="#relaciones">Relaciones</a>
            <a href="#embedded">Documentos Embebidos</a>
            <a href="#referencias">Referencias</a>
        </div>
        
        <div class="nav-section">
            <h3>Administración</h3>
            <a href="#replication">Replicación</a>
            <a href="#sharding">Sharding</a>
            <a href="#backup">Backup</a>
            <a href="#security">Seguridad</a>
        </div>`
    }
};

// Función para actualizar las páginas
const updatePages = () => {
    Object.entries(pagesConfig).forEach(([page, config]) => {
        const filePath = path.join(__dirname, 'pages', `${page}.html`);
        const content = getPageTemplate(config.title, config.sections);
        fs.writeFileSync(filePath, content, 'utf8');
        console.log(`Updated ${page}.html`);
    });
};

// Ejecutar la actualización
updatePages(); 