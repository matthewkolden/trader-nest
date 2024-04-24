import * as React from "react";
import { useController } from "../controllers/Controller";
import { userService } from "../services/userService";
import { Link } from "react-router-dom";
import { AppBar, Box, Toolbar, Typography, Button } from "@mui/material";

interface Props {
  setUser: React.Dispatch<any>;
}

export default function NavBar(props: Props) {
  const { setUser } = props;

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <Link
              to="/"
              style={{
                textDecoration: "none",
                color: "inherit",
              }}
            >
              TraderNest
            </Link>
          </Typography>
          <Button
            color="inherit"
            onClick={(e) => {
              userService.logOut();
              setUser(null);
            }}
          >
            Logout
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
