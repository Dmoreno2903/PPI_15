from django.apps import AppConfig

class DatabaseConfig(AppConfig):
    """
    Configuración de la aplicación Django 'database'.

    Esta clase define la configuración específica de la aplicación
    'database' en el proyecto Django.

    Atributos:
    - `default_auto_field`: Especifica el tipo de campo automático
    predeterminado para los modelos.
        En este caso, se utiliza 'django.db.models.BigAutoField'.
    - `name`: Nombre de la aplicación 'database'.
    """
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'database'

