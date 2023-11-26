
# Se importan los modelos necesarios
from .models import Eps
from .models import Ips
from .models import Usuario
from .models import Triaje
from .models import PerfilUsuario
from .models import Citas

# Se importan los serializadores de cada modelo
from .serializers import EpsSerializer
from .serializers import IpsSerializer
from .serializers import UsuarioSerializer
from .serializers import TriajeSerializer
from .serializers import PerfilUsuarioSerializer
from .serializers import CitasSerializer

# Se importan las librerías necesarias
import base64
import numpy as np
import pandas as pd
import geopandas as gp
import matplotlib.pyplot as plt
from io import BytesIO
from rest_framework import viewsets, permissions
from rest_framework.response import Response
from rest_framework.decorators import action


# Se crea la vista de la relación EPS
class EpsViewSet(viewsets.ModelViewSet):
     """ Vista para la gestión de la entidad EPS.

    Esta vista permite realizar operaciones CRUD
    (Crear, Leer,Actualizar, Eliminar)
    sobre los objetos EPS (Entidades Promotoras de Salud).

    Atributos:
    - `queryset`: Conjunto de objetos EPS disponibles para la vista.
    - `permissions_classes`: Lista de clases de permisos aplicadas
       a la vista. En este caso, se permite el acceso a cualquier 
       usuario (permisos de AllowAny).
    - `serializer_class`: Clase utilizada para serializar y deserializar
       objetos EPS.
    """
     queryset = Eps.objects.all()
     permissions_classes = [permissions.AllowAny]
     serializer_class = EpsSerializer

# Se crea la vista de la relación IPS
class IpsViewSet(viewsets.ModelViewSet):
    """
    Vista para la gestión de la entidad IPS, con acciones adicionales.

    Atributos:
    - `queryset`: Conjunto de objetos IPS disponibles para la vista.
    - `permissions_classes`: Lista de clases de permisos aplicadas a la vista.
        En este caso, se permite el acceso a cualquier usuario (permisos de AllowAny).
    - `serializer_class`: Clase utilizada para serializar y deserializar objetos IPS.
    """

    queryset = Ips.objects.all()
    permissions_classes = [permissions.AllowAny]
    serializer_class = IpsSerializer

    @action(detail=False, methods=['post'], url_path='filtro')
    def filter_ips(self, request):
        """
        Filtra y devuelve las 3 mejores opciones de IPS
        para un usuario basándose en un cálculo ponderado
        entre distancia y tiempo de atención.

        Parámetros:
        - `request`: Objeto de solicitud HTTP.

        Retorna:
        - Respuesta HTTP con las 3 mejores opciones de IPS y
        un mensaje de éxito, o un mensaje de error en caso de excepción.
        """
        try:
            crs = 'EPSG:21897'

            # Obtenemos el último triaje
            last_triage = pd.DataFrame(list((Triaje.objects.all()).values())).iloc[-1]

            # Seleccionamos el usuario y el triaje
            usuario = last_triage['user_id']
            triage = last_triage['triage_calculado']

            # Obtenemos las coordenadas del usuario
            usuarios = pd.DataFrame(list((PerfilUsuario.objects.all()).values()))
            usuarios = usuarios[usuarios['user_id'] == usuario]

            latitud = usuarios['latitud']
            longitud = usuarios['longitud']

            coord_usuario = pd.DataFrame({
                "latitud": latitud,
                "longitud": longitud
            })

            coord_usuario = gp.GeoDataFrame(
                coord_usuario, geometry=gp.points_from_xy(coord_usuario.longitud, coord_usuario.latitud), crs='EPSG:21897'
            )

            # Obtenemos todas las IPS
            df_ips = pd.DataFrame(list((Ips.objects.all()).values()))

            # Aplicamos el filtro, es decir, seleccionamos únicamente las IPS cuyo nivel de complejidad sea mayor o igual al triaje
            df_ips = df_ips[df_ips['complejidad'] >= triage]

            # Obtenemos el GeoDataFrame
            geo_ips = gp.GeoDataFrame(
                df_ips, geometry=gp.points_from_xy(df_ips.longitud, df_ips.latitud), crs='EPSG:21897'
            )

            # Proyectamos las geometrías a un sistema de coordenadas proyectadas (por ejemplo, UTM)
            coord_usuario = coord_usuario.to_crs(crs)
            geo_ips = geo_ips.to_crs(crs)

            # Calculamos la distancia entre el usuario y los centros de atención
            geo_ips['distancia'] = geo_ips.distance(coord_usuario.iloc[0]['geometry'])

            # Asignamos los pesos a la distancia y al tiempo de atención
            geo_ips['ponderado'] = ((geo_ips['tiempo_urgencias'].astype(int)) * 0.6) + (geo_ips['distancia'] * 0.4)

            # Ordenamos y seleccionamos las 3 con el cálculo ponderado menor
            ips_validas = geo_ips.sort_values(by='ponderado').iloc[:3]

            # Convertimos a un diccionario
            ips_validas_data = ips_validas.to_dict(orient='records')

            # Serializamos el diccionario
            ips_validas_serializer = IpsSerializer(ips_validas_data, many=True).data

            # Devolvemos un mensaje de éxito y el objeto IPS serializado
            return Response({'message': 'Procesado correctamente', 'ips_validas': ips_validas_serializer})
        except Exception as e:
            # Devuelve un mensaje de error
            return {'message': str(e)}



# Se crea la vista de la relación Usuario
class UsuarioViewSet(viewsets.ModelViewSet):
     """ Vista para la gestión de la entidad Usuario.

    Esta vista permite realizar operaciones CRUD
    (Crear, Leer, Actualizar, Eliminar) sobre los objetos
    Usuario en el sistema.

    Atributos:
    - `queryset`: Conjunto de objetos Usuario disponibles para la vista.
    - `permissions_classes`: Lista de clases de permisos aplicadas a la vista.
        En este caso, se permite el acceso a cualquier usuario
        (permisos de AllowAny).
    - `serializer_class`: Clase utilizada para serializar y deserializar
        objetos Usuario.
    """
     queryset = Usuario.objects.all()
     permissions_classes = [permissions.AllowAny]
     serializer_class = UsuarioSerializer

def get_graph():
    """
    Genera y devuelve una representación gráfica en formato
    base64 de la figura actual de Matplotlib.

    Retorna:
    - Cadena de caracteres en formato base64 que representa
    la imagen gráfica en formato PNG.
    """
    buffer = BytesIO()
    plt.savefig(buffer, format='png')
    buffer.seek(0)
    image_png = buffer.getvalue()
    graph = base64.b64encode(image_png)
    graph = graph.decode('utf-8')
    buffer.close()
    return graph


# Se crea la vista de la relación Triage
class TriajeViewSet(viewsets.ModelViewSet):
    """ Vista para la gestión de la entidad Triaje, con
    acciones adicionales.

    Atributos:
    - `queryset`: Conjunto de objetos Triaje disponibles para la vista.
    - `permissions_classes`: Lista de clases de permisos aplicadas a la vista.
        En este caso, se permite el acceso a cualquier usuario
        (permisos de AllowAny).
    - `serializer_class`: Clase utilizada para serializar y deserializar
        objetos Triaje.
    """

    queryset = Triaje.objects.all()
    permissions_classes = [permissions.AllowAny]
    serializer_class = TriajeSerializer
    
    @action(detail=False, methods=['get'], url_path='estadisticas_triaje')
    def get_estadisticas_triaje(self, request):
        """Calcula y devuelve estadísticas sobre los triajes realizados.

        Parámetros:
        - `request`: Objeto de solicitud HTTP.

        Retorna:
        - Respuesta HTTP con las estadísticas calculadas
        (promedio y desviación estándar).
        """
        try:
            registros = Triaje.objects.values('triage_calculado')
            
            # Obtiene los triajes como un array de NumPy
            triajes = np.array([registro['triage_calculado'] for registro in registros])

            # Convierte los datos a numéricos utilizando NumPy
            triajes = np.array(triajes, dtype=np.float64)
            
            # Calcula el promedio y la desviación estándar
            promedio = round(np.mean(triajes), 3)
            desviacion_estandar = round(np.std(triajes), 3)

            return Response({'promedio': promedio, 'desviacion_estandar': desviacion_estandar})
        except Exception as e:
            return Response({'error': str(e)})
            
    @action(detail=False, methods=['get'], url_path='grafica')
    def grafica(self, request):
        """Genera y devuelve una gráfica de frecuencias de los triajes.

        Parámetros:
        - `request`: Objeto de solicitud HTTP.

        Retorna:
        - Respuesta HTTP con la gráfica generada y datos de frecuencia.
        """
        try:
            registros = Triaje.objects.values('triage_calculado')
            df = pd.DataFrame(registros)
            
            # Calcula la frecuencia y crea un nuevo DataFrame
            frecuencias = df['triage_calculado'].value_counts().reset_index()
            frecuencias.columns = ['triage_calculado', 'frecuencia']
            
            # Ordena el DataFrame en orden ascendente por 'triage_calculado'
            frecuencias = frecuencias.sort_values(by='triage_calculado')
            
            # Crea el gráfico con Matplotlib
            plt.switch_backend('AGG')
            plt.figure(figsize=(10, 5))
            plt.title('Frecuencia de triajes')
            plt.xlabel('Triage')
            plt.ylabel('Frecuencia')
            plt.bar(frecuencias['triage_calculado'], frecuencias['frecuencia'])
            plt.xticks(frecuencias['triage_calculado'])
            plt.tight_layout()
            graph = get_graph()

            return Response({
                'grafico': graph,
                "triage_calculado": frecuencias['triage_calculado'].tolist(),
                "frecuencia": frecuencias['frecuencia'].tolist()
            })
        except Exception as e:
            return {'message': str(e)}

            
    

class PerfilViewSet(viewsets.ModelViewSet):
    """
    Vista para la gestión de la entidad Perfil de Usuario.

    Esta vista permite realizar operaciones CRUD
    (Crear, Leer, Actualizar, Eliminar) sobre los objetos 
    Perfil de Usuario en el sistema.

    Atributos:
    - `queryset`: Conjunto de objetos Perfil de Usuario
    disponibles para la vista.
    - `permissions_classes`: Lista de clases de permisos
    aplicadas a la vista.
        En este caso, se permite el acceso a cualquier usuario
        (permisos de AllowAny).
    - `serializer_class`: Clase utilizada para serializar y
    deserializar objetos Perfil de Usuario.
    """

    queryset = PerfilUsuario.objects.all()
    permissions_classes = [permissions.AllowAny]
    serializer_class = PerfilUsuarioSerializer


class CitasViewSet(viewsets.ModelViewSet):
    """
    Vista para la gestión de la entidad Citas.

    Esta vista permite realizar operaciones CRUD (Crear, Leer, Actualizar, Eliminar)
    sobre los objetos Citas en el sistema.

    Atributos:
    - `queryset`: Conjunto de objetos Citas disponibles para la vista.
    - `permissions_classes`: Lista de clases de permisos aplicadas a la vista.
        En este caso, se permite el acceso a cualquier usuario (permisos de AllowAny).
    - `serializer_class`: Clase utilizada para serializar y deserializar objetos Citas.
    """

    queryset = Citas.objects.all()
    permissions_classes = [permissions.AllowAny]
    serializer_class = CitasSerializer
