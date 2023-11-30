package mysql

import (
	"database/sql"
	"fmt"
)

func InitDB(user, password, host, dbName string) *sql.DB {
	connString := fmt.Sprintf("%s:%s@tcp(%s)/%s", user, password, host, dbName)
	db, err := sql.Open("mysql", connString)
	if err != nil {
		panic(err.Error())
	}

	return db
}
