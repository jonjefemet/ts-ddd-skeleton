# Backend

![Serverless Framework](https://img.shields.io/badge/-Serverless_Framework-FD5750?style=flat-square&logo=serverless&logoColor=white)
![Node.js](https://img.shields.io/badge/-Node.js-339933?style=flat-square&logo=node.js&logoColor=white)
![TypeScript](https://img.shields.io/badge/-TypeScript-007ACC?style=flat-square&logo=typescript&logoColor=white)
![AWS](https://img.shields.io/badge/AWS-232F3E?style=flat-square&logo=amazon-aws&logoColor=white)
![AWS Lambda](https://img.shields.io/badge/AWS%20Lambda-FF9900?style=flat-square&logo=amazon-aws&logoColor=white)

# Contents

- [Instalación](#installation)
- [Set-Up Inicial](#set-up)
- [Arquitectura del proyecto](#architecture)
- [Levantar el proyecto](#run)
- [Convenciones de Código](#codingConvenctions)

# <a name="installation"></a>Instalación ⚙️

## Node 🟢

### Versión `>= 20.9.0`

Puedes instalar node con Node Version Manager _NVM_ para poder tener un mejor control de las distintas versiones de Node que emplees en tus ptoyectos. [Sigue las intrucciones para instalar NVM](https://github.com/nvm-sh/nvm)

Este proyecto usa la version de node `>=20.9.0`.
Instalar node con nvm.

```bash
nvm install node #node es el alias para la última versión
```

Instalar una versión específica de node

```bash
nvm install 20.9.0
```

Usar una versión instalada

```bash
nvm use 20.9.0
```

Comprobar la versión de node instalada

```bash
node --version
```

## pnpm 📦

pnpm es el gestor de paquetes utilizado. Deberás instalarlo de forma global.

```bash
npm install -g pnpm
```

Comprobar la instalación de pnpm

```bash
pnpm --version
```

```bash
npm install -g serverless@3.36.0 #IMPORTANTE instalar la versión específica
```

Comprobar instalación

```bash
sls --version
```

# <a name="set-up"></a>Set-up Inicial 🆙

Configuración inicial para el proyecto.

## ![ESLint](https://img.shields.io/badge/-ESLint-4B32C3?style=flat-square&logo=eslint&logoColor=white) ES Lint

### Instalar plugin de ESLint de Visual Studio Code

ESLint es nuestro formateador de código empleado para aplicar y mantener las convenciones de código del proyecto.
 [Puedes descargar el plugin aquí](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint).

### Configuración de Visual Studio Code

Agregar esta configuración en Visual Studio Code config `settings.json`.

```JSON
  "[typescript]": {
    "editor.defaultFormatter": "dbaeumer.vscode-eslint"
  },
  "eslint.format.enable": true,
  "editor.formatOnSave": true,
```

## ![Node Modules](https://img.shields.io/badge/-Node_Modules-43853D?style=flat-square&logo=node.js&logoColor=white) Instalar dependencias del proyecto

En la raíz del proyecto ejecutar. Esto descargará las dependencias del proyecto en la carpeta `node_modules`

```bash
pnpm install
```

## Husky 🐶

Husky es una herramienta que facilita la configuración y ejecución de ganchos (hooks) de Git en proyectos de desarrollo. Estos ganchos permiten automatizar tareas como pruebas, linting y otros controles antes de realizar acciones como confirmar o empujar cambios. Su objetivo es garantizar la calidad del código y la consistencia en el flujo de trabajo del equipo.

Para configurar husky hay que ejecutar el script desde la raiz

```bash
pnpm run prepare
```

## Variables de Entorno

En la raíz del proyecto crear un archivo llamdo `.env`. Configura los valores acorde a tus necesidades y proyecto.

.env

```bash
#.env File

STAGE="local"
VAR="dummy"
VAR2=3390
```

# <a name="architecture"></a>Arquitectura del Proyecto 🧠

```
project-root
│
├── service
│   └── module
│       └── functions
├── src
│   └── context
│       └── module
│           ├── domain
│           │   ├── model
│           │   └── repository
│           ├── application
│           │   ├── command
│           │   └── query
│           └── infrastructure
│               ├── persistence
│               └── service
├── tests
│   ├── domaintests
│   ├── applicationtests
│   └── infrastructuretests
└── config
```

La estructura de carpetas propuesta sigue los principios del Diseño Guiado por el Dominio (DDD) y SOLID. Estos principios ayudan a crear un código más limpio, modular y fácil de mantener.

- `Domain` 🌐: Esta carpeta contiene la lógica de negocio y las entidades del dominio. Aquí es donde se implementan los Value Objects y las entidades de DDD.

- `Application` 🚀: Esta carpeta contiene los servicios de aplicación, que orquestan el uso de los objetos de dominio y las operaciones de infraestructura.

- `Infrastructure`  🏗️: Esta carpeta contiene todo el código que interactúa con sistemas externos, como bases de datos, servicios web, etc.

- `tests` 🧪: Esta carpeta contiene todas las pruebas unitarias y de integración para el código de la aplicación.

## Principios SOLID 🌟

Los principios SOLID son un conjunto de cinco principios de diseño orientado a objetos que ayudan a crear sistemas de software más comprensibles, flexibles y mantenibles. Aquí está una breve descripción de cada uno:

- **S**ingle Responsibility Principle (SRP) 🎯: Una clase debe tener solo una razón para cambiar. Esto significa que una clase debe tener solo una tarea o responsabilidad.

- **O**pen/Closed Principle (OCP) 🔒: Las entidades de software (clases, módulos, funciones, etc.) deben estar abiertas para su extensión, pero cerradas para su modificación.

- **L**iskov Substitution Principle (LSP) 🔄: Las subclases deben ser sustituibles por sus clases base. Es decir, un objeto de una clase derivada debe poder reemplazar un objeto de la clase base sin afectar la corrección del programa.

- **I**nterface Segregation Principle (ISP) 📦: Los clientes no deben ser forzados a depender de interfaces que no utilizan. Esto significa que una clase no debe implementar métodos que no necesita.

- **D**ependency Inversion Principle (DIP) 🔄: Depender de abstracciones, no de concreciones. Es decir, las clases de alto nivel no deben depender de las clases de bajo nivel. Ambas deben depender de abstracciones.

## Diseño Guiado por el Dominio (DDD) 🏰

El Diseño Guiado por el Dominio (DDD) es un enfoque para el desarrollo de software que se centra en la creación de un modelo de dominio, una abstracción del problema que el software está diseñado para resolver.

Aquí están algunos de los conceptos clave de DDD:

- **Entidades** 🤖: Son objetos que tienen una identidad que no cambia a lo largo del tiempo (por ejemplo, un usuario o una cuenta bancaria).

- **Value Objects** 🧱: Son objetos que no tienen identidad y son inmutables. Se definen solo por sus atributos (por ejemplo, una dirección de correo electrónico o una fecha).

- **Agregados** 🌐: Son grupos de entidades y objetos de valor que se tratan como una unidad para la persistencia de datos.

- **Servicios de Dominio** ⚙️: Son operaciones que no pertenecen a ninguna entidad o valor objeto. Por ejemplo, una operación que requiere interactuar con múltiples agregados.

- **Eventos de Dominio** 🎉: Son eventos significativos que ocurren en el dominio. Por ejemplo, cuando se crea una nueva cuenta bancaria, podría emitirse un evento de dominio "CuentaCreada".

- **Repositorios** 🗃️: Son interfaces que permiten a las entidades y los agregados persistir y recuperar de la persistencia.

Implementar DDD puede ser complejo, pero puede resultar en un código más limpio y mantenible que refleja mejor el problema de negocio que el software está tratando de resolver.

# <a name="run"></a>Levantar el proyecto ✅

1. Deberás navegar hasta la ruta del servicio que te interese levantar.

```bash
cd ./service/[Nombre del servicio]
```

2. En la ruta del servicio deberás crear link simbolicos al archivo `.env` y `package.json` que se encuentran en la raiz del proyecto.

- Para MacOs / Linux (WSL) los link simbolicos se crean con el comando `ln -s [ruta-origen] [ruta-destino]`

```bash
ln -s ../../.env .
```

```bash
ln -s ../../package.json .
```

```bash
ln -s ../../esbuild-plugins.ts .
```

3. En el archivo `package.json` están definidos los scripts que se pueden ejecutar dentro del proyecto.

```json
{
  //package.json
  ...,
  "scripts": {
      "start": "sls offline --noTimeout --noAuth",
      "format": "eslint . --fix",
      "format-quiet": "eslint . --fix --quiet",
      "prepare": "husky"
    },
  ...
}
```

Actualmente hay _cuatro scripts_.

- `start` Te permite inicializar el proyecto en ambiente local. Habilita tu localhost y levanta las funciones relacionadas al servicio que deseas inicializar.
- `format` Inicializa el formateo de código acorde a las reglas establecidas en `.eslintrc.js`.
- `format-quiet` Igual que `format` pero sin alertar de warnings.

Para correr un script del `package.json` es necesario ejecutar el comando `pnpm run [Nombre del script]`.

Para correr el proyecto, una vez completados los requerientos anteriores deberás ejecutar

```bash
pnpm run start
```

# <a name="debug"></a>Habilitar modo debug 🪲

Para usar el modo debug, ya existe una configuración dentro del archivo `.vscode`. Al ejecutar el modo debug, Visual Studio Code te solicitará introducir el nombre del servicio que deseas correr.

# <a name="codingConvenctions"></a>Convenciones de Código 👨‍💻

## Commits 💾

- Los commit deberán seguir la siguiente estructura:

```
[type]: [commit message]
```

- Los `type` permitios son:
  - `feat`
  - `fix`
  - `merge-dev`
  - `merge-qa`
  - `merge-prod`
  - `refactor`
  - `revert`
  - `chore`
  - `docs`
- El `commit message` deberá estar en su totalidad en _**minusculas**_ y con una _**longitud máxima de 50 caracteres**_.
- Ejemplo

```
feat: store file in s3 usecase created
```

## Comentarios de Git Convencionales

### feat

```bash
⚡️feat: <mensaje>

Utilízalo para expresar que un nuevo feature para el usuario ha sido creado,
nunca para un cambio en el tooling, como en un script.  Ej:

feat: create login, authentication and authorization
```

### fix

```bash
🔨 fix: <mensaje>

Sirve para indicar que se hizo una reparación para el usuario.
No se usa expresar algún arreglo hecho al tooling. Ej:

fix: hover state of the CTA button in the product page
```

### docs

```bash
📝 docs: <mensaje>

Explica un cambio hecho a la documentación del proyecto. Ej:

docs: include FAQ section in the README
```

### style

```bash
✏️ style: <mensaje>

Se usa para explicar que se ha hecho un cambio de estilo en el código directamente.
No se utiliza para modificación en producción. Ej:

style: add a missing semi-colon
```

### refactor

```bash
👷‍♂️ refactor: <mensaje>

Sirve para explicar que se hizo una refactorización al código. Ej

refactor: rename css variables to match the convention
```

### test

```bash
🧪 test: <mensaje>

Indica que se ha hecho un cambio en los tests, pero no una modificación en código
de producción. Ej

test: fix E2E tests for the dashboard page
```

### chore

```bash
🪨 chore: <mensaje>

Explica cambios que se han hecho en los tools. Ej:

chore: update webpack version
```

### feat|fix|docs|style|refactor|test|chore

```bash
🤯 {feat|fix|docs|style|refactor|test|chore}(scope): <mensaje>

Si quisieras ser más explicito, puedes agregar el scope del cambio,
básicamente la sección que se esta modificando. Ej:

feat(home): add new hero section
```

## Integración de cambios

Toda integración a ramas principales se deberá hacer mediante pull request.

## Camel Case 🐪

Camel case es un estilo de escritura para identificadores de palabras compuestas en los que cada palabra, excepto la primera, comienza con una letra mayúscula y las palabras se escriben sin espacios ni caracteres de puntuación. La primera palabra comienza con una letra minúscula o mayúscula.

Ejemplo de camel case:

- `miVariable`
- `nombreDeUsuario`
- `estoEsCamelCase`

## Verbos HTTP 💬

Las operaciones HTTP más comunes utilizadas en una arquitectura RESTful son las siguientes:

1. **GET:**
   - **Descripción:** Solicita la representación de un recurso. No debe tener efectos secundarios en el servidor.
   - **Ejemplo:** `GET /usuarios` (obtener la lista de usuarios)

2. **POST:**
   - **Descripción:** Envia datos para que sean procesados a un recurso específico. Se utiliza para crear nuevos recursos.
   - **Ejemplo:** `POST /usuarios` (crear un nuevo usuario)

3. **PUT:**
   - **Descripción:** Actualiza completamente un recurso existente o crea uno nuevo si no existe.
   - **Ejemplo:** `PUT /usuarios/123` (actualizar el usuario con ID 123)

4. **PATCH:**
   - **Descripción:** Actualiza parcialmente un recurso existente. Se utiliza para modificar una parte específica del recurso.
   - **Ejemplo:** `PATCH /usuarios/123` (actualizar ciertos campos del usuario con ID 123)

5. **DELETE:**
   - **Descripción:** Elimina un recurso específico.
   - **Ejemplo:** `DELETE /usuarios/123` (eliminar el usuario con ID 123)

6. **OPTIONS:**
   - **Descripción:** Solicita información sobre las opciones de comunicación disponibles para un recurso o servidor.
   - **Ejemplo:** `OPTIONS /usuarios` (obtener opciones de comunicación para la colección de usuarios)

7. **HEAD:**
   - **Descripción:** Similar a GET, pero solicita solo los encabezados de respuesta, sin el cuerpo de la respuesta.
   - **Ejemplo:** `HEAD /usuarios` (obtener solo los encabezados de la lista de usuarios)

8. **TRACE:**
   - **Descripción:** Realiza una prueba de bucle de retorno de mensaje a lo largo de la ruta al recurso de destino.
   - **Ejemplo:** `TRACE /usuarios` (realizar un seguimiento de la ruta al recurso de usuarios)

Estas operaciones son estándar y se utilizan para realizar diversas acciones en los recursos de una API RESTful. Las operaciones GET, POST, PUT y DELETE son las más comunes y forman parte del conjunto CRUD (Crear, Leer, Actualizar, Eliminar).

## REST APIs 📬

REST (Representational State Transfer) es un estilo arquitectónico para el diseño de sistemas distribuidos, especialmente para servicios web en la World Wide Web. Fue propuesto por Roy Fielding en su tesis de doctorado en 2000.

Principales características de REST:

1. **Recursos Identificables:** Los recursos (datos o servicios) están identificados por URLs (Uniform Resource Locators).

2. **Operaciones sobre Recursos:** Las operaciones estándar de HTTP (GET, POST, PUT, DELETE) se utilizan para realizar acciones sobre los recursos.

3. **Representación de Recursos:** Los recursos pueden tener diferentes representaciones, como JSON o XML. Estas representaciones se transfieren entre cliente y servidor.

4. **Stateless (Sin Estado):** Cada solicitud del cliente al servidor contiene toda la información necesaria para entender y procesar la solicitud. No se mantiene un estado de sesión en el servidor entre solicitudes.

5. **Independencia Cliente-Servidor:** El cliente y el servidor son entidades independientes, y cada uno puede evolucionar por separado sin afectar al otro.

Las APIs RESTful permiten la comunicación eficiente y flexible entre aplicaciones en la web.

## Eventos de Dominio 📦

Si deseas establecer una regla escrita para la creación de prototipos de eventos de dominio y sus manejadores en tu sistema, podrías seguir una estructura como la siguiente:

### Regla para la Creación de Eventos de Dominio

1. **Nombre del Evento:**
   - Utiliza un nombre claro y descriptivo que indique el suceso que representa.
   - Ejemplo: `EntityActionOccurred` (puedes reemplazar "Entity" y "Action" según el contexto).

2. **Atributos del Evento:**
   - Define los atributos necesarios para capturar la información relevante del suceso.
   - Ejemplo:
     - `EntityId`: Identificador único de la entidad involucrada.
     - `ActionType`: Tipo de acción que ocurrió.
     - Otros campos según la necesidad.

3. **Manejo del Evento:**
   - Especifica qué acción o acciones deben llevarse a cabo cuando este evento se dispara.
   - Ejemplo: "Enviar notificación por correo electrónico cuando `EntityActionOccurred`".

```
Nunca es tarde para no hacer nada

⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡿⠿⠿⢿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿
⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⠿⠛⠁⠀⠀⠀⠀⠀⠀⠈⠉⠁⠀⠀⠀⠀⠀⠈⠛⠛⡿⠿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿
⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⠿⠿⠿⠿⠋⠀⠀⡀⠐⡈⠄⠡⠈⠄⡁⠂⠄⡀⢀⠈⠠⠁⢂⠡⠀⠄⡀⠀⠀⠋⠟⢿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿
⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⠿⠛⠋⠁⠀⠀⡀⢀⠀⢀⠐⠠⢀⠡⠀⢂⠁⠌⠠⠐⢈⠠⢀⠂⠠⠀⠄⠂⠠⢈⠐⢀⠁⢂⠀⡀⠀⠙⠻⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿
⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡿⠋⠁⠀⢀⠠⠐⠈⠄⡐⠠⠐⠠⢈⠐⠠⢀⠁⢂⠈⡐⠠⠁⢂⠀⠂⠄⠡⢈⠀⠂⠄⠠⠈⠠⢈⠠⠐⢀⠐⡀⠀⠂⠻⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿
⣿⣿⣿⣿⣿⣿⣿⣿⠿⠁⠀⠀⠄⡈⠄⡐⠈⡐⠠⠐⢀⠁⢂⠀⠐⢀⠂⡈⠄⡐⠠⢀⠁⢂⠈⠐⢈⠠⠀⠌⠐⡈⠄⠈⢀⠂⠄⡈⢀⠂⠠⢁⠀⠀⠈⢿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿
⣿⣿⣿⣿⣿⣿⣿⠏⠀⠀⡀⠀⠄⠠⠀⠀⠄⡀⠀⠠⠀⠄⡀⢀⠀⠀⠄⠰⣄⠀⠀⠄⡀⠀⡀⠀⢀⠀⠄⡀⠠⠀⠀⠀⠀⠠⠀⠀⠀⡀⠄⠀⡀⠠⢀⠠⠀⡀⠀⣹⣿⣿⣿⣿⣿⣿
⣿⣿⣿⣿⣿⣿⠫⠀⢀⠐⡀⢁⠂⠄⠡⠈⠄⠠⠁⢂⠡⠀⠀⠄⠂⠀⠄⠀⣬⣤⡀⠀⠐⡀⠀⠌⡀⠌⢀⠐⡀⠂⠀⠀⡀⠀⠄⡀⠀⠀⠠⠁⠠⢁⠠⠀⠄⠐⠀⠐⢻⣿⣿⣿⣿⣿
⣿⣿⣿⣿⣿⠃⠀⢀⠂⠄⡐⠀⠂⠌⢀⠡⠈⠄⢁⠂⠠⠁⠀⡀⠄⠀⢀⠂⣿⣟⣷⡀⠠⢀⠀⠀⡐⢀⠂⡐⠠⠐⠀⠀⠀⢁⠂⢀⠀⠐⠀⠀⠀⠂⡐⠈⡀⠀⢈⠀⠈⣿⣿⣿⣿⣿
⣿⣿⣿⣿⠃⠀⢀⠂⠄⢂⠠⠁⠈⠀⠂⠠⢈⠐⡀⢂⠀⠀⡐⠠⠀⠀⠠⠀⣿⣯⣟⣷⠀⠀⠄⠀⠀⠄⠂⠐⡀⢂⠀⡄⠀⠂⡈⠄⠀⡀⠈⠀⠠⠁⠄⢂⠐⡀⠀⠀⠀⣿⣿⣿⣿⣿
⣿⣿⣿⡇⠀⠀⠂⠄⡈⠀⠀⠠⢀⠡⠀⠐⡀⠂⠄⠂⠀⠠⠐⠠⢀⡇⠀⢠⣿⣷⣻⣯⡇⠀⠀⡀⠈⠠⠈⡐⠠⠀⢀⢃⠀⠀⠐⢀⣼⣇⠀⠁⠠⢈⠐⡀⠂⠄⡀⠄⠀⣿⣿⣿⣿⣿
⣿⣿⣿⠀⠀⢈⠐⠠⠀⠠⢈⠐⡀⢀⠀⠂⠄⡁⠂⠀⠄⡁⠂⢡⠾⠀⠀⠉⠉⠈⠉⠓⢿⠀⢀⡇⠀⢁⣤⣤⣀⢀⣾⣼⡠⠀⠀⠈⠙⠻⠀⠀⠐⡀⠂⠐⡈⠠⠀⠀⠀⣿⣿⣿⣿⣿
⣿⣿⡇⠀⠀⢂⠈⠀⢀⠂⠄⠂⡀⠂⡈⠐⠠⠐⠀⡐⠀⢀⠄⢀⠀⠀⠀⠀⠀⠰⠶⠶⢦⣠⣾⢷⣴⢿⣯⣟⡿⣟⣿⠊⡠⠀⠀⠀⠀⢀⡀⠀⢁⠠⠁⠂⠄⠁⠀⠀⢰⣿⣿⣿⣿⣿
⣿⣿⡇⠀⠀⠂⠌⠀⡀⠂⠌⠐⡀⠡⢀⠁⠀⠠⢐⣠⡶⠁⣰⡏⠀⠀⠀⠠⠀⠀⠀⠀⢸⢿⣽⡿⣾⣟⣷⢿⣻⡿⣽⡆⡇⠀⠀⠀⡀⠈⠉⠀⠀⠠⢈⠐⢈⠀⢀⣐⣼⣿⣿⣿⣿⣿
⣿⣿⡇⠀⠀⠡⢀⠀⠄⠁⢂⠁⠀⠂⠀⢀⠂⢀⣾⣿⡁⢰⣻⡇⠀⠀⠀⠁⡀⠁⠀⠀⢸⣿⢯⣿⢷⣻⣯⡿⣯⣿⢷⡇⡇⠀⠀⠀⠄⠀⠀⠸⠀⠐⡀⠈⠀⠀⠚⢿⣿⣿⣿⣿⣿⣿
⣿⣿⡇⠀⠀⠡⠀⠄⠀⠈⠀⠀⠠⠐⠈⡀⠄⢼⣿⣳⡇⢼⣿⡇⠀⢠⣤⣁⠀⣰⡿⠀⣼⣟⣯⡿⣯⣟⡾⣽⡷⣯⢿⣏⢿⠀⠸⣦⣤⣴⠂⣸⣄⠀⠠⠁⠂⠄⡀⠀⠙⣿⣿⣿⣿⣿
⣿⣿⣿⠀⠀⠁⠌⠠⠁⠌⠠⠁⠂⢁⠂⠄⠀⠀⠈⠻⣥⠘⢿⣿⣄⠈⠛⠿⠿⠛⢁⣴⢿⡽⣷⣟⡷⣯⢿⣽⠻⣯⣟⣯⣯⣳⣀⠈⠉⣁⣴⡿⣿⢦⠀⠈⡐⠠⠐⡀⠀⠸⣿⣿⣿⣿
⣿⣿⣿⠀⠀⠈⠄⡁⠂⠈⠄⠂⢁⠀⢂⠈⠄⢈⠐⠀⠘⣧⣾⢿⣭⡷⣦⣤⣤⣶⣟⣯⣿⣻⣽⡾⣽⣏⡿⣞⣦⢿⡽⣾⡽⣯⢿⣿⣻⣯⢷⣻⡽⣟⡆⠀⠐⠠⠁⡐⠀⠀⠙⠻⣿⣿
⣿⣿⡇⠀⠀⡁⢂⠐⠈⠄⢂⠈⠠⠐⡀⠌⢀⠂⡈⠐⡀⢸⣯⡿⣷⣻⢷⣯⣷⣻⡾⣯⢷⣟⣷⢿⣳⣯⢿⣽⡾⣿⣽⣳⡿⣽⡿⣞⣷⣯⢿⣳⣟⣯⣧⠀⠀⡁⢂⠐⠀⠀⢠⠀⠈⢿
⣿⣿⠁⠀⠠⠐⡀⠌⠐⡀⢂⠈⡐⠠⠐⢀⠂⡐⢀⠡⠀⠀⣿⣻⣽⣯⣿⣳⣿⣳⣟⣯⣿⣻⡾⡟⠯⠟⠿⠾⠽⠷⢿⡽⣟⣯⣿⢿⣽⡾⣟⣯⢿⣽⠯⠀⢀⠐⡀⠂⠄⠀⢿⠃⠀⠘
⣿⡟⠀⠀⠀⠁⠀⠂⠁⠀⠂⠐⠀⠂⠁⠂⠀⠐⠀⠀⠈⠀⣿⢏⣷⢿⡞⣿⢳⣿⣹⢻⢾⣇⠀⠀⠀⠀⠀⠀⠀⠀⣀⢿⢻⣹⡾⡟⣏⡿⣿⡹⡟⡏⠃⠀⠀⠐⠀⠂⠀⠀⠀⠀⠀⠀
⣿⠁⠀⠀⡀⠠⢀⠀⠀⠄⠀⡀⠄⠀⢀⠀⠄⡀⠄⢀⠀⢰⣿⣎⡿⣾⡼⣧⡿⣧⡿⣏⣾⣼⡀⠀⠀⠀⠄⠠⠀⢠⣿⡾⣏⣿⣱⣿⣹⢷⣧⣷⠿⠁⠀⢀⠀⠀⠀⠀⠀⠀⠀⠀⢀⣶
⡏⠀⠀⠂⠄⡁⠄⠂⡁⠌⠐⠀⠄⡁⠂⠀⠂⠄⠐⠀⢂⠀⠻⣾⢿⠍⣟⡷⣟⡿⣽⢿⣽⡾⣷⣤⡀⠁⠈⠄⣠⣿⢷⣿⣻⡽⣟⣾⡽⣿⠾⠙⠀⢀⠐⡀⢂⠐⠠⠀⠄⠀⣠⣾⣿⣿
⣧⠀⠀⡁⠂⠄⢂⠐⡀⠐⠈⡀⠂⢀⠂⠈⠐⢈⠠⠀⠂⠠⠀⠈⢁⣴⡾⣿⣽⣻⣽⣻⢾⡽⣟⣾⣻⢷⣶⣾⣟⣯⡿⣞⡷⣿⣻⡽⠛⠉⠀⢀⠐⡀⢂⠐⠠⠈⡀⠁⣠⣾⣿⣿⣿⣿
⡇⠀⠠⢀⠁⠐⡀⢂⠠⠁⢂⠀⠡⠀⠂⠄⠈⠠⠐⠀⠐⠀⠀⠀⠈⠛⠹⠟⣾⣳⣯⣟⣯⡿⣽⡷⣯⣿⢷⣻⣾⡽⠻⠙⠋⠁⠀⠀⡀⠄⠂⠄⠂⡐⠀⠀⠁⠀⢲⣿⣿⣿⣿⣿⣿⣿
⣿⡄⠀⠀⠀⠂⠀⠄⠂⡈⠄⡈⠄⠡⢈⠠⢀⠀⠈⠐⠠⠀⠄⠀⢀⣤⣶⣶⣦⡀⢩⣽⣳⣿⣻⣽⣩⠨⣭⣤⣤⡆⠀⠀⠄⠂⢁⠂⠐⠠⢈⠐⠠⠀⠐⣸⣶⣾⣿⣿⣿⣿⣿⣿⣿⣿
⣿⣿⣧⣤⡀⠀⠀⠀⠀⠐⠠⠀⠄⠁⡀⠂⠄⠂⠌⠀⠄⠀⠀⠀⠀⠙⢿⣿⣿⣿⣦⣈⠻⣞⣯⣟⠇⣼⣿⣿⡿⠁⠀⠀⠀⠈⠠⠈⠄⡁⠀⠂⢁⢀⣼⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿
⣿⣿⣿⣿⣿⣶⣶⣾⣶⣤⣤⣤⠂⠀⠀⠈⠀⠐⠈⠄⠀⣿⡀⠀⠀⠀⠀⠙⠿⣿⣿⣿⣷⣤⡉⠋⠰⢿⣿⡿⠃⠀⠀⠀⠀⣷⣄⠈⠀⠀⣠⣴⣾⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿
⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣧⣶⣷⣾⣷⠔⠀⢀⣴⣿⣧⡀⠀⠀⠀⠀⠀⠀⠙⠛⠿⢿⠃⣼⢳⠦⡉⠀⠀⠀⠀⠀⢠⣿⣿⣧⡀⢹⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿

No sabes lo que estoy apunto de hacer
porque ni siquiera yo lo sé
```
