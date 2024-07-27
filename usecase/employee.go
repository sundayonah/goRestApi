package usecase

import (
	"encoding/json"
	"go-rest-api/model"
	"go-rest-api/repository"
	"log"
	"net/http"

	"github.com/google/uuid"
	"github.com/gorilla/mux"
	"go.mongodb.org/mongo-driver/mongo"
)

type EmployeeService struct {
	MongoCollection *mongo.Collection
}

type Response struct {
	Data interface{} `json:"data,omitempty"`
	Error string `json:"error,omitempty"`
}

func (svc *EmployeeService) CreateEmployee(w http.ResponseWriter, r *http.Request) {
	w.Header().Add("Content-Type", "application/json")

	res := &Response{}
	defer json.NewEncoder(w).Encode(res)

	var emp model.Employee

	err := json.NewDecoder(r.Body).Decode(&emp)
	if err != nil {
        w.WriteHeader(http.StatusBadRequest)
		log.Println("Invalid body", err)
		res.Error = err.Error()
        return
    }

	// assign new employee id
	emp.EmployeeID = uuid.NewString()

	repo := repository.EmployeeRepo{MongoCollection: svc.MongoCollection}

	// insert employee
	insertID, err := repo.InsertEmployee(&emp)
		if err != nil {
        w.WriteHeader(http.StatusBadRequest)
		log.Println("insert error", err)
		res.Error = err.Error()
        return
    }

	res.Data = emp.EmployeeID
	w.WriteHeader(http.StatusOK)

	log.Println("employee inserted with id ", insertID, emp)
}


func (svc *EmployeeService) GetEmployeeByID(w http.ResponseWriter, r *http.Request) {
		w.Header().Add("Content-Type", "application/json")

	res := &Response{}
	defer json.NewEncoder(w).Encode(res)

	// get employee id
	empID := mux.Vars(r)["id"]
	log.Println("employee id", empID)

    repo := repository.EmployeeRepo{MongoCollection: svc.MongoCollection}

    // find employee by id
    emp, err := repo.FindEmployeeByID(empID)
    if err!= nil {
        w.WriteHeader(http.StatusBadRequest)
        log.Println("employee not found", err)
        res.Error = err.Error()
        return
    }

    res.Data = emp
    w.WriteHeader(http.StatusOK)

    log.Println("employee retrieved ", emp)
}
func (svc *EmployeeService) GetAllEmployees(w http.ResponseWriter, r *http.Request) {
			w.Header().Add("Content-Type", "application/json")

	res := &Response{}
	defer json.NewEncoder(w).Encode(res)

    repo := repository.EmployeeRepo{MongoCollection: svc.MongoCollection}

    // find employee by id
    emp, err := repo.FindAllEmployee()
    if err!= nil {
        w.WriteHeader(http.StatusBadRequest)
        log.Println("employee not found", err)
        res.Error = err.Error()
        return
    }

    res.Data = emp
    w.WriteHeader(http.StatusOK)

    log.Println("employee retrieved ", emp)
}
func (svc *EmployeeService) UpdateEmployeeByID(w http.ResponseWriter, r *http.Request) {
	w.Header().Add("Content-Type", "application/json")

	res := &Response{}
	defer json.NewEncoder(w).Encode(res)

	// get employee id
	empID := mux.Vars(r)["id"]
	log.Println("employee id", empID)

	if empID == "" {
		w.WriteHeader(http.StatusBadRequest)
        log.Println("Invalid employee id")
        res.Error = "Invalid employee id"
        return
	}
	var emp model.Employee
	err := json.NewDecoder(r.Body).Decode(&emp)

	    if err!= nil {
        w.WriteHeader(http.StatusBadRequest)
        log.Println("invalid body", err)
        res.Error = err.Error()
        return
    }
	emp.EmployeeID = empID
	repo := repository.EmployeeRepo{MongoCollection: svc.MongoCollection}
	// update employee
	updatedCount, err := repo.UpdateEmployeeByID(empID, &emp)
    if err!= nil {
        w.WriteHeader(http.StatusBadRequest)
        log.Println("update error", err)
        res.Error = err.Error()
        return
    }

    res.Data = updatedCount
    w.WriteHeader(http.StatusOK)

    log.Println("employee updated with id ", empID, "count:", updatedCount)
}
func (svc *EmployeeService) DeleteEmployeeByID(w http.ResponseWriter, r *http.Request) {
	w.Header().Add("Content-Type", "application/json")

    res := &Response{}
    defer json.NewEncoder(w).Encode(res)

    // get employee id
    empID := mux.Vars(r)["id"]
    log.Println("employee id", empID)

    if empID == "" {
        w.WriteHeader(http.StatusBadRequest)
        log.Println("Invalid employee id")
        res.Error = "Invalid employee id"
        return
    }

    repo := repository.EmployeeRepo{MongoCollection: svc.MongoCollection}

    // delete employee
    deletedCount, err := repo.DeleteEmployeeByID(empID)
    if err!= nil {
        w.WriteHeader(http.StatusBadRequest)
        log.Println("delete error", err)
        res.Error = err.Error()
        return
    }

    res.Data = deletedCount
    w.WriteHeader(http.StatusOK)
}
func (svc *EmployeeService) DeleteAllEmployees(w http.ResponseWriter, r *http.Request) {
	w.Header().Add("Content-Type", "application/json")

    res := &Response{}
    defer json.NewEncoder(w).Encode(res)

    repo := repository.EmployeeRepo{MongoCollection: svc.MongoCollection}

    // delete all employee
    deletedCount, err := repo.DeleteAllEmployee()
    if err!= nil {
        w.WriteHeader(http.StatusBadRequest)
        log.Println("delete error", err)
        res.Error = err.Error()
        return
    }

    res.Data = deletedCount
    w.WriteHeader(http.StatusOK)
}