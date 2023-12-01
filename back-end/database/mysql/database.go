package mysql

import (
	"back-end/config"
	"database/sql"
	"fmt"
)

type MasterDB struct {
	DB        *sql.DB
	DefaultDB *sql.DB
	UserDB    *sql.DB
	AdminDB   *sql.DB
}

func InitDB() *MasterDB {

	defaultConnString := fmt.Sprintf("%s:%s@tcp(%s)/%s", config.DefaultUser, config.DefaultPassword, config.LocalDatabaseUrl, "eplScout")
	defaultDB, _ := sql.Open("mysql", defaultConnString)

	userConnString := fmt.Sprintf("%s:%s@tcp(%s)/%s", config.UserUser, config.UserPassword, config.LocalDatabaseUrl, "eplScout")
	userDB, _ := sql.Open("mysql", userConnString)

	adminConnString := fmt.Sprintf("%s:%s@tcp(%s)/%s", config.AdminUser, config.AdminPassword, config.LocalDatabaseUrl, "eplScout")
	adminDB, _ := sql.Open("mysql", adminConnString)

	return &MasterDB{
		DB:        defaultDB,
		DefaultDB: defaultDB,
		UserDB:    userDB,
		AdminDB:   adminDB,
	}
}

func (m *MasterDB) ChangeToDefaultDB() {
	m.DB = m.DefaultDB
}

func (m *MasterDB) ChangeToUserDB() {
	m.DB = m.UserDB
}

func (m *MasterDB) ChangeToAdminDB() {
	m.DB = m.AdminDB
}
