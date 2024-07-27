// package main

// import (
// 	"context"
// 	"fmt"
// 	"go-rest-api/usecase"
// 	"log"
// 	"net/http"
// 	"os"

// 	"github.com/gorilla/handlers"
// 	"github.com/gorilla/mux"
// 	"github.com/joho/godotenv"
// 	"go.mongodb.org/mongo-driver/mongo"
// 	"go.mongodb.org/mongo-driver/mongo/options"
// 	"go.mongodb.org/mongo-driver/mongo/readpref"
// )

// var mongoClient *mongo.Client

// func init() {
// 	// load .env file

// 	err := godotenv.Load()

// 	if err != nil {
//     log.Fatal("env load error", err)
// 	}

// 	log.Println("env file loaded")

// 	// create mongo client
// 	mongoClient, err = mongo.Connect(context.Background(), options.Client().ApplyURI(os.Getenv("MONGO_URI")))

// 	if err!= nil {
//     log.Fatal("Connection error",err)
//     }

// 	err = mongoClient.Ping(context.Background(), readpref.Primary())
// 	if err != nil {
// 		log.Fatal("ping failed", err)
// 	}

// 	log.Println("mongo connected")
// }
// func main() {

// 	// close the mongo connection
// 	defer mongoClient.Disconnect(context.Background())

// 	coll := mongoClient.Database(os.Getenv("DB_NAME")).Collection(os.Getenv("COLLECTION_NAME"))

// 	// create employee service
// 	empService := usecase.EmployeeService{MongoCollection: coll}

// 	// Initialize CORS middleware
// 	headersOk := handlers.AllowedHeaders([]string{"X-Requested-With", "Content-Type"})
// 	originsOk := handlers.AllowedOrigins([]string{"http://localhost:3000"}) // Adjust as necessary
// 	methodsOk := handlers.AllowedMethods([]string{"GET", "HEAD", "POST", "OPTIONS"})

// 	// Wrap your router with CORS middleware
// 	r := mux.NewRouter()
// 	r.Use(handlers.CORS(originsOk, headersOk, methodsOk))

// 	r.HandleFunc("/health", healthHandler).Methods(http.MethodGet)
// 	r.HandleFunc("/employee", empService.CreateEmployee).Methods(http.MethodPost)
// 	r.HandleFunc("/employee/{id}", empService.GetEmployeeByID).Methods(http.MethodGet)
// 	r.HandleFunc("/employees", empService.GetAllEmployees).Methods(http.MethodGet)
// 	r.HandleFunc("/employee/{id}", empService.UpdateEmployeeByID).Methods(http.MethodPut)
// 	r.HandleFunc("/employee/{id}", empService.DeleteEmployeeByID).Methods(http.MethodDelete)
// 	r.HandleFunc("/employees", empService.DeleteAllEmployees).Methods(http.MethodDelete)

// 	log.Println("Server is running on port :4444")
// 	http.ListenAndServe(":4444", r)
// }

// func healthHandler(w http.ResponseWriter, r *http.Request) {
//     w.WriteHeader(http.StatusOK)
// 	w.Write([]byte("running..."))
//     fmt.Fprintln(w, "healthy")
// }

package main

import (
	"context"
	"fmt"
	"go-rest-api/usecase"
	"log"
	"net/http"
	"os"

	"github.com/gorilla/handlers"
	"github.com/gorilla/mux"
	"github.com/joho/godotenv"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
	"go.mongodb.org/mongo-driver/mongo/readpref"
)

var mongoClient *mongo.Client

func init() {
	// Load .env file
	err := godotenv.Load()
	if err != nil {
		log.Fatal("env load error", err)
	}

	log.Println("env file loaded")

	// Create MongoDB client
	mongoClient, err = mongo.Connect(context.Background(), options.Client().ApplyURI(os.Getenv("MONGO_URI")))
	if err != nil {
		log.Fatal("Connection error", err)
	}

	err = mongoClient.Ping(context.Background(), readpref.Primary())
	if err != nil {
		log.Fatal("ping failed", err)
	}

	log.Println("mongo connected")
}



func main() {
	// Close the MongoDB connection
	defer mongoClient.Disconnect(context.Background())

	coll := mongoClient.Database(os.Getenv("DB_NAME")).Collection(os.Getenv("COLLECTION_NAME"))

	// Create employee service
	empService := usecase.EmployeeService{MongoCollection: coll}
	r := mux.NewRouter()


	// // Initialize CORS middleware
	// headersOk := handlers.AllowedHeaders([]string{"X-Requested-With", "Content-Type", "Authorization"})
	// originsOk := handlers.AllowedOrigins([]string{"http://localhost:3000"})
	// methodsOk := handlers.AllowedMethods([]string{"POST","GET", "HEAD", "OPTIONS", "PUT", "DELETE"})

	// 	// w.Header().Set("Access-Control-Allow-Origin", "*")
	// // w.Header().Set("Access-Control-Allow-Methods", "GET, POST, OPTIONS")
	// // w.Header().Set("Access-Control-Allow-Headers", "Content-Type") 

	// Wrap your router with CORS middleware
	// r.Use(handlers.CORS(originsOk, headersOk, methodsOk))

	r.HandleFunc("/health", healthHandler).Methods(http.MethodGet)
	r.HandleFunc("/employee", empService.CreateEmployee).Methods(http.MethodPost)
	r.HandleFunc("/employee/{id}", empService.GetEmployeeByID).Methods(http.MethodGet)
	r.HandleFunc("/employees", empService.GetAllEmployees).Methods(http.MethodGet)
	r.HandleFunc("/employee/{id}", empService.UpdateEmployeeByID).Methods(http.MethodPut)
	r.HandleFunc("/employee/{id}", empService.DeleteEmployeeByID).Methods(http.MethodDelete)
	r.HandleFunc("/employees", empService.DeleteAllEmployees).Methods(http.MethodDelete)

		// Set up CORS
	corsOptions := handlers.CORS(
		handlers.AllowedOrigins([]string{"http://localhost:3000"}),
		handlers.AllowedMethods([]string{"GET", "POST", "PUT", "DELETE"}),
		handlers.AllowedHeaders([]string{"Content-Type", "Authorization"}),
	)

	// Start the server
	log.Println("Server is running on port 4444")
	log.Fatal(http.ListenAndServe(":4444", corsOptions(r)))

	// log.Println("Server is running on port :4444")
	// http.ListenAndServe(":4444", r)
}

func healthHandler(w http.ResponseWriter, r *http.Request) {
	w.WriteHeader(http.StatusOK)
	w.Write([]byte("running..."))
	fmt.Fprintln(w, "healthy")
}