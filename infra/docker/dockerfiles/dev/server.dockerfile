FROM python:3.10.0-alpine

WORKDIR /usr/app

COPY rent-app-server/requirements.txt .

RUN apk add --no-cache postgresql-libs && \
    apk add --no-cache --virtual .build-deps gcc musl-dev postgresql-dev && \
    pip install -r requirements.txt --no-cache-dir && \
    apk --purge del .build-deps

COPY rent-app-server/ .

CMD [ "python", "manage.py", "runserver", "0.0.0.0:8000" ]
