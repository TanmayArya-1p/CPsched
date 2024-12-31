FROM python:latest
COPY . .
WORKDIR /code
RUN pip install -r requirements.txt
EXPOSE 5000
CMD ["fastapi", "run", "main.py" , "--port" , "5000" ]