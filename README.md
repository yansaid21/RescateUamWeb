 # Rescate UAM

## Descripción
Rescate UAM es una herramienta diseñada para la identificación de los usuarios y de los brigadistas en una emergencia. Permite a los usuarios llevar un control en una Empresa o Institución, nos da la información sobre los usuarios que se encuentran a salvo, en peligro, sin reporte. También nos permite conocer sobre el cuerpo de la brigada, en donde se encuentra cada uno de ellos, e incluso si también se encuentran en peligro.

## Instalación

### Requisitos Previos
- Node.js (versión 20.17.0)
- npm (versión 10.9.0)

### Instrucciones
1. Clona el repositorio:
   ```bash
   git clone https://github.com/yansaid21/RescateUamWeb.git

2. Navega al directorio del proyecto
   ```bash
   cd ./RescateUam
3. Instala las dependencias:
   ```bash
   npm install 
## Uso
Para iniciar la aplicación, ejecuta:
   ```bash
   npm run dev
```

## Despliegue 

Para desplegar la aplicación, ejecuta:
   ```bash
   npm run build
 ```

Una vez ejecutado el comando anterior, se creará una carpeta llamada `dist` en la raíz del proyecto. Esta carpeta contiene los archivos necesarios para desplegar la aplicación en un servidor web.

como servidor web recomendamos usar nginx, para ello, copie el contenido de la carpeta `dist` en la carpeta root configurada en el archivo de configuración de nginx como se muestra a continuación:

```nginx
server {
        listen 80;
        listen [::]:80;
        server_name www.rescateuam.just2devs.click;

        root /var/www/rescateuamweb;
        index index.html index.htm index.nginx-debian.html;


        location / {
		try_files $uri /index.html;
        }
}
```

Es importante la sentencia try_files $uri /index.html; ya que esta permite que la aplicación funcione correctamente con las rutas de react.

## A USAR LA APLICACIÓN!
Luego, abre tu navegador y ve a http://localhost:5173.

Una vez que está listo para entrar a la aplicación, y teniendo en cuenta que también ha clonado el backend, puede acceder a la aplicación en 3 roles distintos:
 admin ->
 correo: johndoe@autonoma.edu.co
 password: password123
 
 brigadista ->
 correo: janesmith@autonoma.edu.co
 password: password123

 usuario ->
 correo: finaluser@autonoma.edu.co
 password: password123

