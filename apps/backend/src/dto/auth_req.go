package dto

type LoginRequest struct{
	Email string `json:"email"`
	Phone string `json:"phone"`
	Password string `json:"password"`
}

type RegisterRequest struct{
	Email string `json:"email"`
	Phone string `json:"phone"`
	First_Name string `json:"first_name"`
	Last_Name string `json:"last_name"`
	Role string `json:"role"`
	Password string `json:"password"`
}