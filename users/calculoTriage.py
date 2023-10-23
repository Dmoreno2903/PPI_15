from .models import Triage

# Obtener todos los registros de Triage
registros = Triage.objects.all()

# Recorrer y mostrar los registros en la consola
for registro in registros:
    print(f"ID: {registro.id}")
    print(f"Temperatura: {registro.temperatura}")
    print(f"Presión: {registro.presion}")
    # Agrega aquí otros campos que desees mostrar
    print("----------")  # Separador entre registros
