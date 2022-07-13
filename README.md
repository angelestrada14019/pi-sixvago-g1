# Bitacora del proyecto

**Acuerdos y compromisos**

Uno de los compromisos que asumimos como grupo y creemos que fue clave para la organización y los tiempos fue que cada integrante del grupo asumía un rol mas en cada sprint (además del rol principal)

1er sprint:

- Realizar commits y push contantes para mantener actualizadas las ramas de trabajo.
- Una reunion grupal por dia para mantenernos al tanto de los avances y/o obstaculos que estabamos teniendo como grupo


2do sprint:

- Seguimos con las actualizaciones en las ramas de trabajo y reuniones grupales
- Empezamos a rotar los roles y hacer uso del "rol secundario"
- Revisión de la parte del front end entre todos para detectar errores y mejorar la experiencia de usuario

3er sprint

- Seguimos con la misma dinámica de los primeros dos sprint
- Revisión de todo el código, tanto en front end como en back end 

4to sprint

En este ultimo sprint la organización fue clave: Teníamos una meta en común: 

terminar todas las issues para la primera semana, para que la próxima pudiéramos enfocarnos en:
- Revisar todo nuestro sistema y asegurarnos de brindar una buena experiencia de usuario
- Realizar el informe final

**Desafíos:** Unos de los primeros desafíos que se nos presento como grupo fue el uso de git lab y el repository. Lo primero que hicimos fue organizar una reunión y ver como se utilizaba esta herramienta entre todos para no cometer errores, durante todos los sprint los cambios no se pusheaban al branch principal, si no que armamos  un branch aparte llamado "desarrollo" y recién cuando verificamos que todo el sistema estaba en condiciones hicimos el cambio.

**Fortalezas:** Como grupo tratamos siempre de tener un flujo constante de comunicación, eso permitio que los bloqueos presentados fueran resueltos en muy poco tiempo.

**Debilidades:** Enfrentarnos directamente a un proyecto Integrador y no poseer la experiencia y los conocimientos necesarios para el desarrollo de las diferentes Issues; por lo que debíamos investigar como solucionar los diferentes requerimientos  y eso conllevo a demorar mas del tiempo estimado.

# Documentación tecnica del proyecto

**Ambiente de desarrollo:**

1) Descargar Visual Studio Code (https://code.visualstudio.com/download), verificar que sistema operativo tiene tu computadora y luego descargar la versión que corresponda. Una vez instalado, deberán correr en la terminal los comandos npm install (yarn install), npm start (yarn start) y verificar que se abra el proyecto del frontend en el navegador y puerto predeterminado
2) Descargar el IDE IntelliJ IDEA Community(https://www.jetbrains.com/idea/download/), una vez finalizada la descargar, abrir el archivo y seguir los pasos del instalador
3) Descargar MySQL Worbench para la base de datos, utilizar los scripts para la creacion de la base de datos y agregar los datos correspondientes. 
4)En el Intellij, una vez abierto el proyecto back end , ir a plication.properties y verificar que la contraseña de acceso local para la base de datos sea “root” o la que haya sido escogida al momento de  configurar el MySQL. Revisar en la opción “Modify run configuration” que la variable de entorno esté indicando el perfil correcto(local, aws, etc). Correr el “main” del proyecto de backend desde el IDE.

**Buenas prácticas / convenciones / acuerdos a la hora de desarrollar:**

Es muy importante realizar un análisis sobre los requerimientos de las issues, para así poder estimar el tiempo que nos llevara cada tarea.
Realizar reuniones grupales por dia, para estar al tanto del avance y/u obstáculos que esta teniendo cada integrante
Realizar pruebas en cada sprint tales como pruebas de regresión, suite de smoke, y la prueba exploratoria al finalizar el sprint para detectar defectos y poder solucionarlos.
Realizar un pull en la rama de desarrollo cada dia, para estar actualizados acerca del avance del proyecto.
Realizar un push cada vez que terminemos alguna tarea y verifiquemos que funciona correctamente

_Base de datos:_

Utilizar el DUMP para realizar copias de seguridad (backup) de nuestras bases de datos. Una vez realizada esta copia, importamos el dump a una carpeta y esta la podemos subir a nuestro repository, para facilitar nuestro trabajo en la BD a cualquier compañero que lo necesite.

Hicimos un diagrama de entidad-relacion para entender mejor las relaciones en nuestras tablas y como se comportan entre si

_Back end :_

Utilizar la variable de entorno apuntando al "aplicattion.properties", ya que esta configuracion es para el ambiente DEV y QA, asi evitamos modificar los registros de nuestra RDS.
Utilizar siempre nombre de clases descriptivos

Utilizar camelCase
Usar package standard para evitar conflictos de nombres y para escribir un código mejor mantenible.

_Frontend:_

Simplicidad de diseño, accesibilidad gracias al responsive para todos los dispositivos
Usar en la mayor parte context para estados generales y no ir haciendo fetch en cada uno

_Testing:_

Testear todas las tareas terminadas.
Utilizar postman para testear las operaciones crud del backend
Testar todas las funcionalidades y verificar que cumplan con los requisitos prestablecidos
Utilizamos SeleniumWebDriver para un mejor alcance de calidad
Link al informe final de testing: https://docs.google.com/document/d/1l4-6G0OOKJkEzD2X0KGBR5Wd55iVWve4TsogyIbw6xo/edit?usp=sharing

_Infraestructura:_

Aplicar infraestructura como código en terraform para poder ser replicable y tener documentación
Aplicar en el pipeline test tanto para el fronted como el backend  
Tener en cuenta los costos que generaba la creación en cada área
Se evito usar ec2 privadas por el nat gateway
link a estructura y diagrama: https://gl.deitech.online/ctd/proyecto-integrador-0522/0621-c2/grupo-01/-/wikis/Infraestructura



**Buenas prácticas respecto a los commits, merges y el uso de branches:**

Utilizar una única branch principal para desarrollo

El merge se realizará una vez todo el sistema este finalizado, funcional y verificado.

# Equipo

**Angel Jesús Estrada Anaya**
Tengo 23 años, Soy estudiante de ingeniería mecatrónica, asi que tenia algunos conocimientos en programación, como por ejemplo, java, c++ y c, además, durante la cursada fui realizando mas cursos con respecto  a esto mismo, como desarrollo web o ciencia de datos.


- sprint 1 rol: analista de infraestructura: diseño de la infraestructura necesaria para hacer funcionar el proyecto en AWS
- sprint 2 rol: front e infraestructura: Incluir calendario de reservas y botón para acceder,
- Implementar filtro por ciudad en controlador, mostrar productos aleatorios en el home, agregar bloque de imágenes y galería a témplate producto, en el pipeline crear stage de postman
- sprint 3: backend, infraestructura, base de datos, frontend.Deploy en la ec2 para backend y la s3 para frontend por medio de pipelines, agregar seguridad con token al endpoint de creación de reservas, crear endpoints de reservas en API con JPARepository, mapear las tablas “rol“, “usuarios” y ”reservas” con clases de nuestro modelo, crear tabla de “reservas” en la base de datos, implementar filtro por ciudad e intervalo de fechas en API, agregar autenticación con Spring Security a endpoint de usuarios, agregar registro de usuarios a la API, Crear la tabla de “usuarios” en la base de datos, Crear la tabla “roles” en la base de datos, ayudar en el formulario de reservas.
- sprint 4 rol: infraestructura, frontEnd, backend, base de datos: Crear la tabla “roles” en la base de datos, Crear url para acceder al sitio, verificación con email y envió de email cuando se crea la reserva, endpoint de crear imágenes, lógica para reserva por habitaciones entre rango de fecha, agregando datos en la base de datos y cambiando tipos de datos, agregar mapa, agregando botón para compartir en redes sociales, arreglando las políticas en el frontend, agregando lógica para la creación de varios atributos desde el frontend, añadiendo vista de favoritos y poder agregar productos a favoritos, dar puntuación en el front.

![image](uploads/bf7794e7750e7ea921d1590bae263190/image.png)


**Guido Michel Oudin**
Tengo 20 años y anteriormente, era alumno de la carrera de ingeniería biomédica, donde descubrí mi pasión por la programación aprendiendo C++. Gracias a esto, estuve muy interesado en la propuesta de CTD y desde ahí siempre fui aprendiendo lo mas que pude. 

Aunque no fue el único rol en el que me desempeñe, hice mayoritariamente testing todos los sprints (realizando los casos de prueba, ejecutandolos, completando la planilla de testing, haciendo las pruebas con Postman y fue mi iniciativa aplicar Selenium WebDriver para tener otro enfoque) excepto el segundo, aunque también me encontré trabajando en el lado del front end en el segundo sprint.

![image](uploads/394b96d4703eb31e8907461e309e44f0/image.png)


**Paiva Franco Ayelén Magali**

Tengo 23 años, comencé desde 0 sin ningún tipo de base en lo que es programación, todos los conocimientos IT los adquirí en esta carrera.
Durante los 4 sprint intente estar en casi todas las areas, ya que consideraba que tenia muchos puntos débiles asique me desafié a poder aprender un poco de todo. 
- En el primer sprint realice la lógica del back end, creación de clases model, DTOs,  implementación de operaciones CRUD a cada entidad, creación de la capa controller, trabaje con base de datos en mysql workbench, inserción de registros a las tablas y consultas a la BDD.
- En el segundo sprint estuve el área Frontend realice la parte lógica, componentes y estilos.
- En el tercer sprint realize testing, la parte manual y automático, con la herramienta de Postman.
- Cuarto sprint volví a estar en el área de back end y base de datos, terminando de mapear algunos requerimientos de las issues.

![image](uploads/97d5f78a83561e4d275aa15c24fbe706/image.png)

**Jenny Patricia Vargas**
Tengo 33 años, actualmente me encuentro cursando 4 semestre de Tecnología en Desarrollo de Software en la UNAD.
Cuando Tuve la oportunidad de ingresar a cursar esta carrera con Digital House la verdad mis conocimientos de programación eran casi nulos, pero tenía todo el entusiasmo por aprender.
En el trascurso del desarrollo de este proyecto Integrador pude afianzar mis conocimientos en programación.
Durante el primer sprint participe en la parte de Fronted en el proceso de maquetado de la pagina web, en el segundo sprint estuve en Infraestructura donde tuve la oportunidad de aprender un poco mas AWS, crear las instancias, RDS, y S3 para alojar el proyecto, en el tercer sprint estuve en el grupo de desarrollo fronted, y en el ultimo sprint colabore con base de Datos.

![image](uploads/20e42dd2d307a0bd7cd5db20b3c87718/image.png)


**Flavio Nicolás Bernachia:**

Tengo 24 años, estoy finalizando la carrera de Derecho, desde chico pasaba horas frente al pc y descubrí que mi pasión era programar, gracias a CTD pude confirmarlo. He tenido experiencias básicas como:  hobby en creacion de servidores en videojuegos con apache, sql, php y algunos cursos sobre HTML, CSS3 y Javascript en plataformas como udemy. Pero realmente esta carrera me dio las herramientas necesarias para programar y seguir aprendiendo sobre el mundo IT.

El rol que desempeñe durante los 4 Sprints fueron en el area de FrontEnd, Backend y Base de datos.

-  **Sprint 1.**
   Rol: _Frontend._
   He realizado tareas de implementación del bloque header, template en register y 
  login, evento login.

-  **Sprint 2.**
   Rol: _Backend y BDD._
   He realizado tareas como creación de nuevas entidades, con sus respectivos dtos, relaciones entre los mismos, implementaciones de CRUD, creación de excepciones y capa controller.
  En Bases de datos (BDD) realice la creación de tablas, con sus relaciones en MySql workbench.

-  **Sprint 3.**
   Rol: _Frontend._
   He realizado tareas de maquetado y creación de nuevos componentes.

-  **Sprint 4**.
   Rol: _Frontend._
   He realizado tareas de maquetado, correcciones en estilos e implementación de responsive, creación de nuevos componentes como pagina de "Mis Reservas" y "Creación de producto".

![image](uploads/d0942450c028587b1118953d2a674245/image.png)


**Gabriel Ruben Franke:**

Tengo 32 años, soy tecnico en reparacion de PC (autoproclamado), me desempeño de manera independiente y autodidacta, cuando comence esta carrera no tenia conocimientos previos en programacion, salvo html basico y una experiencia de desarrollo de un pequeño "mod" de un juego donde utilice variables y condiciones "if". 

Durante los 4 sprints estuve mayormente en el area del Frontend, tambien ocupe el rol de Testing durante un sprint, y en general ayude a mis compañeros en Frontend, en Backend y en Testing con Jest.

-  **Sprint 1.**
   Rol: _Frontend._
Desarrolle e implemente el bloque de busqueda con calendario y del body principal con las cards. Organice la estructura de archivos, propuse una convencion de nomenclatura y prepare la estructura de routing, ademas ayude a mis compañeros con React y logica funcional.
   

-  **Sprint 2.**!
   Rol: _Testing._
Aprendi a utilizar react-testing-library, lo implemente y desarrolle tests unitarios, se los enseñe a compañeros de otros equipos y los ayude a resolver inconvenientes e implementarlo, tambien realice testing con Postman, testing manual y exploratorio. Ademas ayude a mi compañero a resolver algunos problemas en Backend.
   

-  **Sprint 3.**
   Rol: _Frontend._
Durante este sprint conecte los formularios de login y registrer con la API (AuthContext), implemente proteccion de URLs, filtros de busqueda por ciudad y/o fecha con searchParams, refactorizacion del calendario para reutilizarlo condicionalmente en cada seccion y estilizacion del mismo, y correcciones en CSS para que el sitio sea mas responsive, y alertas personalizadas, entre otras cosas.


-  **Sprint 4**.
   Rol: _Frontend._
Desarrollo e implementacion de puntuacion y estrellas, logica y funcionalidad del formulario de creacion de producto y de mis reservas con conecciones a la API, validaciones y alertas, accesos condicionados para las secciones de administracion o mis reservas y proteccion de URLs de ambos. Ademas incorpore algunos queries (endpoints) en Backend.
   

![image](uploads/c8522e60c431d8e087f316699525f6aa/image.png)

# Informe final

**Integrantes:**
- Bernachia Flavio
- Estrada Angel
- Franke Gabriel
- Oudin Guido
- Paiva Franco Ayelen Magali
- Vargas Jenny

**Nuestro proyecto:**

SixVago es una plataforma digital dedicada a la oferta de alojamientos, donde el usuario podrá alquilar propiedades filtrando por categorías, fecha y ubicación.
También hemos añadido "roles" para poder dar ciertos accesos tanto a clientes como a administradores.

Desde el rol de usuario de la aplicación:
- Registrar un usuario nuevo y también poder loguearse con credenciales validas ya registradas
- Poder filtrar los alojamientos con 4 filtros de categoria: hoteles, hostels, departamentos, bed and breakfast.
- Poder filtrar por ciudades y un rango de fechas
- Cada producto contiene: imágenes, detalles sobre el alojamiento, listado de atributos del producto (wifi, aire acondicionado, etc.), calendario con sus fechas disponibles y políticas de la casa.

Desde el rol de administrador de la aplicación:
- Con el rol de administrador se puede acceder al área de administración de los productos donde se podrá crear nuevos alojamientos. Una vez que el usuario inicie sesión la plataforma detectará las credenciales predeterminadas de rol de administrador, redirigiendo al home y habilitando los permisos para acceder al área de administración donde el usuario podrá ingresar:
- Nombre y dirección
- Ciudad y categoría mediante un desplegable
- Descripción general del producto
- Atributos y sus respectivos íconos
- Url de imágenes del alojamiento
- Politicas de reserva

**Objetivos del proyecto:**

Poner en practica todos los conocimientos técnicos y soft skills que hemos adquirido durante este año de cursado, aprender a trabajar en equipo para lograr el objetivo en comun: Crear el sistema llamado "SixVago", mediante el cual podremos poner en practica las diferentes areas de estudio que hemos visto a lo largo de esta carrera.

# Metodologia de trabajo

_Metodología Scrum:_

Utilizando esta metodología, en el inicio de cada sprint teníamos un encuentro donde nos reuníamos todos los equipos con los Scrum Master, Tech Lead y Product Owner. Durante esta reunión se leía los requerimientos e historias de usuario, y se abría un espacio para despejar cualquier tipo de duda.
Posteriormente a la lectura del sprint contábamos con la validación del sprint que también consistía en una reunión grupal donde cada equipo procedía a la designación de tareas y estimación de tiempo de cada una.
Además, contábamos con la correspondiente Daily (excepto los días con eventos) junto a el Scrum Master. En este encuentro cada integrante del equipo exponía:
- Actividades que realizo el día anterior y el día presente
- Actividades que desarrollaría durante el resto del día
- Obstáculos o bloqueos presentados. 

Al finalizar la semana contabamos con el encuentro llamado "weekly" donde se hablaba del avance de las tareas de cada integrante, bloqueos y metas para la siguiente semana.

_Asignación de roles:_

En el comienzo del primer sprint, se realizo la designación de roles de acuerdo a las fortalezas  e intereses de cada integrante, luego en los sprint siguiente tratamos de ir rotando los roles para que cada integrante pueda aprender y estar en cada área.

![image](uploads/fe6169f3007883e6e7bcee7490cd1f7c/image.png)


![image](uploads/edd521c2981f7ed232e705551232a263/image.png)


![image](uploads/8d08d0aa8c8bc620ed77c2bfc4c30f7a/image.png)

![image](uploads/7341da00d33e201e566543a34b0c63b7/image.png)

# Tecnologias utilizadas

Tecnologias utilizadas: https://docs.google.com/spreadsheets/d/1dUwm029Oy4dMu_o0OwZnqFd8OlAJEJSxu0psuMuu71M/edit#gid=0
