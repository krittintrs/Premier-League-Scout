package main

import (
    "fmt"
    "net/http"
	"database/sql"
	_ "github.com/go-sql-driver/mysql"
    "github.com/gorilla/mux"
    "back-end/internal/handler"
)

var db *sql.DB
var err error

func main() {
    Routers()
}

func Routers(){

    HTTPHandler = handler.NewHTTPHandler()

    // InitDB()
    // get all fixtures for a given gameweek
    r := mux.NewRouter()
    r.HandleFunc("/fixtures/{gw}", GetFixtures).Methods("GET")
    // get, post, and update match info
    r.HandleFunc("/matchinfo/{id}", PostMatchInfo).Methods("POST")
    r.HandleFunc("/matchinfo/{id}", GetMatchInfo).Methods("GET")
    r.HandleFunc("/matchinfo/{id}", UpdateMatchInfo).Methods("PUT")
    // get player available for a given gameweek
    r.HandleFunc("/players/{teamId}", GetPlayers).Methods("GET")
    // get and post player for each game lineup
    r.HandleFunc("/lineup/{gw}/{teamId}", PostLineup).Methods("POST")
    r.HandleFunc("/lineup/{gw}/{teamId}", GetLineup).Methods("GET")
    // get, post, update and delete match events
    r.HandleFunc("/matchevents/{matchinfoId}", GetMatchEvents).Methods("GET")
    r.HandleFunc("/matchevents/{matchinfoId}", PostMatchEvents).Methods("POST")
    r.HandleFunc("/matchevents/{matchinfoId}/{matcheventId}", UpdateMatchEvents).Methods("PUT")
    r.HandleFunc("/matchevents/{matchinfoId}/{matcheventId}", DeleteMatchEvents).Methods("DELETE")

    http.ListenAndServe(":80", r)
}


