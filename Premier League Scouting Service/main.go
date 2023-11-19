package main

import (
    "fmt"
    "net/http"
	"log"
	"database/sql"
	_ "github.com/go-sql-driver/mysql"
    "github.com/gorilla/mux"
)

func main() {
	r := mux.NewRouter()

	r.HandleFunc("/", func (w http.ResponseWriter, r *http.Request) {
		fmt.Fprintf(w, "Hello, you've requested: %s\n", r.URL.Path)
	})

    r.HandleFunc("/books/{title}/page/{page}", func(w http.ResponseWriter, r *http.Request) {
        vars := mux.Vars(r)
        title := vars["title"]
        page := vars["page"]

        fmt.Fprintf(w, "You've requested the book: %s on page %s\n", title, page)
    })

	// Create a subrouter for static files
    r.PathPrefix("/static/").Handler(http.StripPrefix("/static/", http.FileServer(http.Dir("static/"))))
    // staticRouter.PathPrefix("/css/").Handler(http.StripPrefix("/static/css/", http.FileServer(http.Dir("static/css/"))))

	// Configure the database connection (always check errors)
	db, err := sql.Open("mysql", "root:root@(127.0.0.1:3306)/siit?parseTime=true")
	if err != nil {
		log.Fatal(err)
	}

	// Initialize the first connection to the database, to see if everything works correctly.
	// Make sure to check the error.
	if err = db.Ping(); err != nil {
		log.Fatal(err)
	}

	http.Handle("/", r)
	http.ListenAndServe(":80", r)
}






// CORSRouterDecorator applies CORS headers to a mux.Router
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