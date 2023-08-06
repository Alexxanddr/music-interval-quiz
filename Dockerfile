# Usa un'immagine di base con Python
FROM python:3.8-slim

# Imposta la directory di lavoro all'interno del container
WORKDIR /app

# Copia il file dello script Python nella directory di lavoro del container
COPY interval.py interval.py 
COPY static static 
COPY templates templates

# Installa le dipendenze
RUN pip install Flask flask-cors musthe

# Esponi la porta 8080
EXPOSE 8080

# Esegui lo script Python quando il container viene avviato
CMD ["python", "interval.py"]
