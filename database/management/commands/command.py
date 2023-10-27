from database.models import Ips
from database.models import Triaje
from database.models import PerfilUsuario
from django.core.management.base import BaseCommand
import pandas as pd
import geopandas as gp

class Command(BaseCommand):
    help = 'Muestra los usuarios'
    
    def handle(self, *args, **kwargs):

        crs = 'EPSG:21897'

        # Obtenemos el último trije
        last_triage = pd.DataFrame(list((Triaje.objects.all()).values())).iloc[-1]

        #Seleccionamos el usuario y el triage
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
            coord_usuario, geometry = gp.points_from_xy(coord_usuario.longitud, coord_usuario.latitud), crs='EPSG:21897'
        )

        # Obtenemos todas las IPS
        df_ips = pd.DataFrame(list((Ips.objects.all()).values()))

        # Aplicamos el filtro, es decir, seleccionamos únicamente las IPS cuya nivel de complejidad sea mayor o igual al triage
        df_ips = df_ips[df_ips['complejidad'] >= triage]

        # Obtenemos el geoDataFrame
        geo_ips = gp.GeoDataFrame(
            df_ips, geometry = gp.points_from_xy(df_ips.longitud, df_ips.latitud), crs='EPSG:21897'
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

        print(ips_validas[['nombre_prestador', 'codigo', 'ponderado']])






