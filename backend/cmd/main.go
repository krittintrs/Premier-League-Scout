package main

import (
    "fmt"
    "net/http"
	"database/sql"
	_ "github.com/go-sql-driver/mysql"
    "github.com/gorilla/mux"
    handler "backend/internal/handlers"
)

var db *sql.DB
var err error

func main() {
    Routers()
}

func Routers(){

    plscoutHandler := handler.NewHTTPHandler()
    fmt.Println(plscoutHandler)
    fmt.Println("test")

    // InitDB()
    // get all fixtures for a given gameweek
    r := mux.NewRouter()
    r.HandleFunc("/fixtures/{gw}", plscoutHandler.GetFixtures).Methods("GET")
    // get, post, and update match info
    r.HandleFunc("/matchinfo/{id}", plscoutHandler.PostMatchInfo).Methods("POST")
    r.HandleFunc("/matchinfo/{id}", plscoutHandler.GetMatchInfo).Methods("GET")
    r.HandleFunc("/matchinfo/{id}", plscoutHandler.UpdateMatchInfo).Methods("PUT")
    // get player available for a given gameweek
    r.HandleFunc("/players/{teamId}", plscoutHandler.GetPlayers).Methods("GET")
    // get and post player for each game lineup
    r.HandleFunc("/lineup/{gw}/{teamId}", plscoutHandler.PostLineup).Methods("POST")
    r.HandleFunc("/lineup/{gw}/{teamId}", plscoutHandler.GetLineup).Methods("GET")
    // get, post, update and delete match events
    r.HandleFunc("/matchevents/{matchinfoId}", plscoutHandler.GetMatchEvents).Methods("GET")
    r.HandleFunc("/matchevents/{matchinfoId}", plscoutHandler.PostMatchEvents).Methods("POST")
    r.HandleFunc("/matchevents/{matchinfoId}/{matcheventId}", plscoutHandler.UpdateMatchEvents).Methods("PUT")
    r.HandleFunc("/matchevents/{matchinfoId}/{matcheventId}", plscoutHandler.DeleteMatchEvents).Methods("DELETE")

    http.ListenAndServe(":80", r)
}


