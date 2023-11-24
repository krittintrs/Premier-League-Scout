package main

import (
    "fmt"
    "net/http"
	"database/sql"
	_ "github.com/go-sql-driver/mysql"
    "github.com/gorilla/mux"
)

var db *sql.DB
var err error

func main() {
    Routers()
}

func Routers(){
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

func GetFixtures(w http.ResponseWriter, r *http.Request) {
    // get all fixtures for a given gameweek
    vars := mux.Vars(r)
    gw := vars["gw"]
    db, err := sql.Open("mysql", "root:root@tcp(localhost:3306)/eplscout")
    if err != nil {
        panic(err.Error())
    }
    defer db.Close()

    fmt.Fprintf(w, "You've requested the gameweek: %s\n", gw)
}

func PostMatchInfo(w http.ResponseWriter, r *http.Request) {
    // post match info
    vars := mux.Vars(r)
    id := vars["id"]
    fmt.Fprintf(w, "You've requested the match info: %s\n", id)
}

func GetMatchInfo(w http.ResponseWriter, r *http.Request) {
    // get match info
    vars := mux.Vars(r)
    id := vars["id"]
    fmt.Fprintf(w, "You've requested the match info: %s\n", id)
}

func UpdateMatchInfo(w http.ResponseWriter, r *http.Request) {
    // update match info
    vars := mux.Vars(r)
    id := vars["id"]
    fmt.Fprintf(w, "You've requested the match info: %s\n", id)
}

func GetPlayers(w http.ResponseWriter, r *http.Request) {
    // get player available for a given gameweek
    vars := mux.Vars(r)
    teamId := vars["teamId"]
    fmt.Fprintf(w, "You've requested the team: %s\n", teamId)
}

func PostLineup(w http.ResponseWriter, r *http.Request) {
    // post player for each game lineup
    vars := mux.Vars(r)
    gw := vars["gw"]
    teamId := vars["teamId"]
    fmt.Fprintf(w, "You've requested the gameweek: %s\n", gw)
    fmt.Fprintf(w, "You've requested the team: %s\n", teamId)
}

func GetLineup(w http.ResponseWriter, r *http.Request) {
    // get player for each game lineup
    vars := mux.Vars(r)
    gw := vars["gw"]
    teamId := vars["teamId"]
    fmt.Fprintf(w, "You've requested the gameweek: %s\n", gw)
    fmt.Fprintf(w, "You've requested the team: %s\n", teamId)
}

func GetMatchEvents(w http.ResponseWriter, r *http.Request) {
    // get match events
    vars := mux.Vars(r)

    matchinfoId := vars["matchinfoId"]
    fmt.Fprintf(w, "You've requested the match info: %s\n", matchinfoId)
}

func PostMatchEvents(w http.ResponseWriter, r *http.Request) {
    // post match events
    vars := mux.Vars(r)
    matchinfoId := vars["matchinfoId"]
    fmt.Fprintf(w, "You've requested the match info: %s\n", matchinfoId)
}

func UpdateMatchEvents(w http.ResponseWriter, r *http.Request) {
    // update match events
    vars := mux.Vars(r)
    matchinfoId := vars["matchinfoId"]
    matcheventId := vars["matcheventId"]
    fmt.Fprintf(w, "You've requested the match info: %s\n", matchinfoId)
    fmt.Fprintf(w, "You've requested the match event: %s\n", matcheventId)
}

func DeleteMatchEvents(w http.ResponseWriter, r *http.Request) {
    // delete match events
    vars := mux.Vars(r)
    matchinfoId := vars["matchinfoId"]
    matcheventId := vars["matcheventId"]
    fmt.Fprintf(w, "You've requested the match info: %s\n", matchinfoId)
    fmt.Fprintf(w, "You've requested the match event: %s\n", matcheventId)
}

