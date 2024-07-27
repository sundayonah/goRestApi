package model

type Employee struct {
	EmployeeID string `json:"employee_id,omitempty" bson:"employee_id"`
	FirstName  string `json:"firstname,omitempty" bson:"firstname"`
	LastName   string `json:"lastname,omitempty" bson:"lastname"`
	Department string `json:"department,omitempty" bson:"department"`
}