package main

import (
	"back-end/database/mysql"
	"fmt"
	"net/http"

	_ "github.com/go-sql-driver/mysql"
	"github.com/gorilla/mux"

	"back-end/config"
	"back-end/internal/core/repository"
	"back-end/internal/core/services"
	"back-end/internal/handlers"
)

func main() {

	masterDB := mysql.InitDB()

	teamRepo := repository.NewTeamRepo(masterDB)
	matchInfoRepo := repository.NewMatchInfoRepo(masterDB)
	playerRepo := repository.NewPlayerRepo(masterDB)
	lineupRepo := repository.NewLineupRepo(masterDB)
	matchEventRepo := repository.NewMatchEventRepo(masterDB)
	userRepo := repository.NewUserRepository(masterDB)

	teamsrv := services.NewTeamService(teamRepo)
	matchInfosrv := services.NewMatchInfoService(matchInfoRepo)
	playersrv := services.NewPlayerService(playerRepo)
	lineupsrv := services.NewLineupService(lineupRepo)
	matchEventsrv := services.NewMatchEventService(matchEventRepo)
	usersrv := services.NewUserService(userRepo)

	// Create a new main router
	mainRouter := mux.NewRouter()

	// Create instances of the handlers
	teamhdl := handlers.NewTeamHandler(teamsrv)
	matchInfohdl := handlers.NewMatchInfoHandler(matchInfosrv)
	playerhdl := handlers.NewPlayerHandler(playersrv)
	lineuphdl := handlers.NewlineupHandler(lineupsrv)
	matchEventhdl := handlers.NewMatchEventHandler(matchEventsrv)
	userhdl := handlers.NewUserHandler(usersrv, masterDB)

	// Set up routes for both team and matchinfo handlers
	teamhdl.SetupTeamRoutes(mainRouter)
	matchInfohdl.SetupMatchInfoRoutes(mainRouter)
	playerhdl.SetupPlayerRoutes(mainRouter)
	lineuphdl.SetupLineupRoutes(mainRouter)
	matchEventhdl.SetupMatchEventRoutes(mainRouter)
	userhdl.SetupUserRoutes(mainRouter)

	// Create a channel to wait for the server to finish
	done := make(chan bool)

	// Start the server in a goroutine
	go func() {
		if err := http.ListenAndServe(config.LocalAPIUrl, &CORSRouterDecorator{mainRouter}); err != nil {
			fmt.Printf("Server error: %v\n", err)
		}
		done <- true
	}()

	// Block until the server finishes or an interrupt signal is received
	<-done
}

type CORSRouterDecorator struct {
	R *mux.Router
}

func (c *CORSRouterDecorator) ServeHTTP(rw http.ResponseWriter,
	req *http.Request) {
	if origin := req.Header.Get("Origin"); origin != "" {
		rw.Header().Set("Access-Control-Allow-Origin", origin)
		rw.Header().Set("Access-Control-Allow-Methods",
			"POST, GET, OPTIONS, PUT, DELETE")
		rw.Header().Set("Access-Control-Allow-Headers",
			"Accept, Accept-Language,"+
				" Content-Type, YourOwnHeader")
	}
	// Stop here if its Preflighted OPTIONS request
	if req.Method == "OPTIONS" {
		return
	}

	c.R.ServeHTTP(rw, req)
}
