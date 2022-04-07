FROM golang:latest

WORKDIR /go/src
COPY ./main.go ./
RUN go mod init fullcycle
RUN go build -o fullcycle
ENTRYPOINT ["./fullcycle"]
