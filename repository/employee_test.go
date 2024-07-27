package repository

import (
	"context"
	"go-rest-api/model"
	"log"
	"testing"

	"github.com/google/uuid"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
	"go.mongodb.org/mongo-driver/mongo/readpref"
)

func newMongoClient() *mongo.Client {
	mongoTestClient, err := mongo.Connect(context.Background(),
options.Client().ApplyURI("mongodb+srv://phindCode:phindCode@cluster0.kcfnncd.mongodb.net/phind-code"))

if err != nil {
	log.Fatal("error while connecting mongodb", err)
}
log.Println("mongodb successfully connected.")

err = mongoTestClient.Ping(context.Background(), readpref.Primary())

if err!= nil {
    log.Fatal("error while pinging mongodb", err)
}
log.Println("ping success")

return mongoTestClient
}


func TestMongoOperation(t *testing.T) {
	mongoTestingClient := newMongoClient()
	defer mongoTestingClient.Disconnect(context.Background())

	// dummy data
	emp1 := uuid.New().String()
	emp2 := uuid.New().String()

	// onnect to collection
	collection := mongoTestingClient.Database("companydb").Collection("employees")

	empRepo := EmployeeRepo{MongoCollection: collection}

	// insert employee 1 data
	t.Run("Insert Employee 1", func(t *testing.T) {
		emp := model.Employee{
			FirstName: "John",
			LastName: "Doe",
			Department: "Engineering",
			EmployeeID: emp1,
		}

		result, err := empRepo.InsertEmployee(&emp)

		if err != nil {
			t.Fatal("insert 1 operation falied", err)
		}
		t.Log("Inserted employee 1:", result)
	})

		// insert employee 2 data
	t.Run("Insert Employee 2", func(t *testing.T) {
		emp := model.Employee{
			FirstName: "Onah",
			LastName: "Sunday",
			Department: "Engineering",
			EmployeeID: emp2,
		}

		result, err := empRepo.InsertEmployee(&emp)

		if err != nil {
			t.Fatal("insert 2 operation falied", err)
		}
		t.Log("Inserted employee 2:", result)
	})

// 	// get employee 1 Data
// 	t.Run("Get Employee 1", func(t *testing.T) {
//         result, err := empRepo.FindEmployeeById(emp1)

//         if err!= nil {
//             t.Fatal("get 1 operation falied", err)
//         }
//         t.Log("Retrieved employee 1:", result.FirstName)
//     })

// // get all employee
//     t.Run("Get All Employees", func(t *testing.T) {
//         result, err := empRepo.FindAllEmployee()

//         if err!= nil {
//             t.Fatal("get all operation falied", err)
//         }
//         t.Log("Retrieved all employees:", result)
//     })

	// // update employee 1
	// t.Run("Update Employee 1", func(t *testing.T) {
    //     emp := model.Employee{
    //         FirstName: "John Doe Updated",
    //         Department: "Engineering",
    //         EmployeeID: emp1,
    //     }

    //     result, err := empRepo.UpdateEmployeeByID(emp1, &emp)

    //     if err!= nil {
    //         t.Fatal("update 1 operation falied", err)
    //     }
    //     t.Log("Updated employee 1:", result)
    // })

	// // find employee 1
	// t.Run("Find Employee 1", func(t *testing.T) {
    //     result, err := empRepo.FindEmployeeById(emp1)

    //     if err!= nil {
    //         t.Fatal("find 1 operation falied", err)
    //     }
    //     t.Log("Found employee 1:", result.FirstName)
    // })

    // // delete employee 1 data
    // t.Run("Delete Employee 2", func(t *testing.T) {
    //     result, err := empRepo.DeleteEmployeeByID(emp1)

    //     if err!= nil {
    //         t.Fatal("delete 1 operation falied", err)
    //     }
    //     t.Log("Deleted employee 1:", result)
    // })

	// // delete all employee
	t.Run("Delete All Employees", func(t *testing.T) {
        result, err := empRepo.DeleteAllEmployees()

        if err!= nil {
            t.Fatal("delete all operation falied", err)
        }
        t.Log("Deleted all employees:", result)
    })

    // // get employee 2 data
    // t.Run("Get Employee 2", func(t *testing.T) {
    //     result, err := empRepo.FindEmployeeById(emp2)

    //     if err!= nil {
    //         t.Fatal("get 2 operation falied", err)
    //     }
    //     t.Log("Retrieved employee 2:", result.FirstName)
    // })

    // // get all employee
    // t.Run("Get All Employees", func(t *testing.T) {
    //     result, err := empRepo.FindAllEmployees()

    //

    // // find employee 2
    // t.Run("Find Employee 2", func(t *testing.T) {
    //     result, err := empRepo.FindEmployeeById

    // // delete employee 1
    // t.Run("Delete Employee 1", func(t *testing.T) {
    //     result, err := empRepo.DeleteEmployee(emp1)

    //     if err!= nil {
    //         t.Fatal("delete 1 operation falied", err)
    //     }
    //     t.Log("Deleted employee 1:", result)
    // })

}