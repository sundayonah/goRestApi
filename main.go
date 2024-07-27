package main

import (
	"context"
	"fmt"
	"log"
	"net/http"
	"os"

	"github.com/gorilla/mux"
	"github.com/joho/godotenv"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
	"go.mongodb.org/mongo-driver/mongo/readpref"
)

var mongoClient *mongo.Client

func init() {
	// load .env file 

	err := godotenv.Load()

	if err != nil {
    log.Fatal("env load error", err)
	}

	log.Println("env file loaded")

	// create mongo client
	mongoClient, err = mongo.Connect(context.Background(), options.Client().ApplyURI(os.Getenv("MONGO_URI")))

	if err!= nil {
    log.Fatal("Connection error",err)
    }

	err = mongoClient.Ping(context.Background(), readpref.Primary())
	if err != nil {
		log.Fatal("ping failed", err)
	}

	log.Println("mongo connected")
}
func main() {

	// close the mongo connection
	defer mongoClient.Disconnect(context.Background())

	r := mux.NewRouter()

	r.HandleFunc("/health", healthHandler).Methods(http.MethodGet)

	log.Println("Server is running on port :4444")
	http.ListenAndServe(":4444", r)
}

func healthHandler(w http.ResponseWriter, r *http.Request) {
    w.WriteHeader(http.StatusOK)
	w.Write([]byte("running..."))
    fmt.Fprintln(w, "healthy")
}