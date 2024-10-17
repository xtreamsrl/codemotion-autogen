FROM golang AS claat

RUN go install github.com/googlecodelabs/tools/claat@latest

WORKDIR /app
COPY . .
RUN claat export ./workshop.md
RUN cp -r ./assets ./autogen-assemble/assets
WORKDIR /app/autogen-assemble
RUN sed -i 's|<title>.*</title>|<title>Tutorial</title>|' index.html

CMD ["claat", "serve", "-addr", "0.0.0.0:9090"]