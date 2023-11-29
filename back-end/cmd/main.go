package main

import (
	"database/sql"
	"fmt"
	"net/http"

	_ "github.com/go-sql-driver/mysql"
	"github.com/gorilla/mux"

	// "github.com/gorilla/mux"

	"back-end/internal/core/repository"
	"back-end/internal/core/services"
	"back-end/internal/handlers"
)

var db *sql.DB
var err error

func main() {
	InitDB()

	teamRepo := repository.NewTeamRepo(db)
	matchInfoRepo := repository.NewMatchInfoRepo(db)
	playerRepo := repository.NewPlayerRepo(db)
	lineupRepo := repository.NewLineupRepo(db)
	matchEventRepo := repository.NewMatchEventRepo(db)

	teamsrv := services.NewTeamService(teamRepo)
	matchInfosrv := services.NewMatchInfoService(matchInfoRepo)
	playersrv := services.NewPlayerService(playerRepo)
	lineupsrv := services.NewLineupService(lineupRepo)
	matchEventsrv := services.NewMatchEventService(matchEventRepo)

	// Create a new main router
	mainRouter := mux.NewRouter()

	// Create instances of the handlers
	teamhdl := handlers.NewTeamHandler(teamsrv)
	matchInfohdl := handlers.NewMatchInfoHandler(matchInfosrv)
	playerhdl := handlers.NewPlayerHandler(playersrv)
	lineuphdl := handlers.NewlineupHandler(lineupsrv)
	matchEventhdl := handlers.NewMatchEventHandler(matchEventsrv)

	// Set up routes for both team and matchinfo handlers
	teamhdl.SetupTeamRoutes(mainRouter)
	matchInfohdl.SetupMatchInfoRoutes(mainRouter)
	playerhdl.SetupPlayerRoutes(mainRouter)
	lineuphdl.SetupLineupRoutes(mainRouter)
	matchEventhdl.SetupMatchEventRoutes(mainRouter)

	// Start the server with the main router
	http.ListenAndServe("localhost:80", mainRouter)

	fmt.Println("Server is running on :80")
}

func InitDB() {
	db, err = sql.Open("mysql", "root:root@tcp(localhost:3306)/eplScout") // fix this
	if err != nil {
		panic(err.Error())
	}
}
