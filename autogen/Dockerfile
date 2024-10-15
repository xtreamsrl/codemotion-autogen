FROM python:3.11

RUN mkdir /workflows \
    mkdir /app_data

RUN pip install -U autogenstudio
ENV PATH=/home/app/.local/bin:$PATH

ENTRYPOINT ["autogenstudio"]