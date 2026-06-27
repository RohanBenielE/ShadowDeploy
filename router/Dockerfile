FROM python:3.11

WORKDIR /app

COPY wheels /wheels
COPY router/requirements.txt .

RUN pip install --no-index --find-links=/wheels -r requirements.txt

COPY router/ .

CMD ["uvicorn","main:app","--host","0.0.0.0","--port","8000"]