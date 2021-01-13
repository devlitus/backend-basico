# Backend con Node Express
## Documentación
Este repo es una api rest básico para una aplicación de mensajería instantane


### Implentación 
*   Autenticación Login
    *   Con correo y contraseña enviado en la petición un token
*   Mensajeria
    *   Enviar y recibir mensajes
*   usuarios
    *   Obtener los usuarios 


### Puntos de entrada de la api
| metodo | url | Descripción |
| -- | -- | -- |
| GET | /api/renew | Genera un nuevo token si esta caducado |
| GET | /api/user | Obtener los usuarios registrados |
| POST | /api/login | Identifica a un usuario registrado |
| POST | /api/login/new | Crea un usuario nuevo |

