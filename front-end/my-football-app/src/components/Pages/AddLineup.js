const AddLinupGrid = () => {
    return (
      <Stack
        justifyContent="center"
        divider={<Divider orientation="vertical" flexItem />}
        padding={1}
        width={"100%"}
        direction={{ xs: "column", sm: "row" }}
        spacing={{ xs: 1, sm: 2, md: 4 }}
      >
        {/* Home Team Lineup */}
        <Paper
          elevation={3}
          sx={{ p: 2, textAlign: "center", mb: 2, width: "35%" }}
        >
          <h2 className="team-name">
            {"Home Lineups: " + matchInfo?.homeTeamName}
          </h2>
          {homeselectedPlayers.map((player, index) => (
            <PlayerDividers key={index} player={player} />
          ))}
          <Button
            className="btn-icon"
            onClick={handleHomeDone}
            style={{ position: "absolute", bottom: 0, right: 0 }}
          >
            Done
          </Button>
          <Button
            className="btn-icon"
            onClick={handleHomeCancel}
            style={{ position: "absolute", bottom: 0, left: 0 }}
          >
            Cancel
          </Button>
        </Paper>

        {/* Away Team Lineup */}
        <Paper
          elevation={3}
          sx={{ p: 2, textAlign: "center", mb: 2, width: "35%" }}
        >
          <h2 className="team-name">
            {"Away Lineups: " + matchInfo?.awayTeamName}
          </h2>
          {awayselectedPlayers.map((player, index) => (
            <PlayerDividers key={index} player={player} />
          ))}
          <Button
            className="btn-icon"
            onClick={handleAwayDone}
            style={{ position: "absolute", bottom: 0, right: 0 }}
          >
            Done
          </Button>
          <Button
            className="btn-icon"
            onClick={handleAwayCancel}
            style={{ position: "absolute", bottom: 0, left: 0 }}
          >
            Cancel
          </Button>
        </Paper>
      </Stack>
    );
  };

  export default AddLinupGrid;