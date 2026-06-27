FROM python:3.11

WORKDIR /app

COPY wheels /wheels
COPY model-v1/requirements.txt .

RUN pip install --no-index --find-links=/wheels -r requirements.txt

COPY model-v1/ .

CMD ["uvicorn","main:app","--host","0.0.0.0","--port","8001"]