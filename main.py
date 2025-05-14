from datetime import datetime, timedelta
from js import document

hoy = datetime.now()
dia_actual = hoy.weekday()  # Lunes=0 ... Sábado=5

# Si es sábado pero aún no pasó medianoche
if dia_actual < 5:
    faltan = 5 - dia_actual
else:
    faltan = 7 - dia_actual + 5

sabado = hoy + timedelta(days=faltan)
diferencia = sabado.replace(hour=0, minute=0, second=0, microsecond=0) - hoy

texto = f"Faltan {diferencia.days} días y {diferencia.seconds // 3600} horas para el sábado"
document.getElementById("contador").innerText = texto
