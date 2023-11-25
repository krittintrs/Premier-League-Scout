package main

import (
    "fmt"
    "net/http"
	"database/sql"
	_ "github.com/go-sql-driver/mysql"
    // "github.com/gorilla/mux"
    handler "backend/internal/handlers"
)

var db *sql.DB
var err error

func main() {
    Routers()
}

func Routers(){

    plscoutHandler := handler.NewHTTPHandler()
    plscoutHandler.SetupRoutes()

    http.ListenAndServe(":80", plscoutHandler)
    fmt.Println("Server is running on :80")

}


