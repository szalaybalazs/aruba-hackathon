import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import Container from "@mui/material/Container";
import MenuItem from "@mui/material/MenuItem";
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import CartDrawer from "./CartDrawer";
import UserAvatar from "./UserAvatar";

const pages = ["Shop", "Profile"];

const NavBar = () => {
  const { logout, user } = useAuth();
  const navigate = useNavigate();

  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu: React.MouseEventHandler<HTMLLIElement> = (e) => {
    e.preventDefault();
    switch (e.currentTarget.textContent) {
      case "Profile":
        navigate("/profile");
        break;
      case "Logout":
        logout();
        break;
      case "Login":
        navigate("/login");
        break;
      default:
        break;
    }
    setAnchorElUser(null);
  };

  return (
    <AppBar position="sticky" sx={{ background: "#457b9d" }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <img
            src="src/assets/images/asd.png"
            height={60}
            style={{ borderRadius: 10, margin: 15 }}
            onClick={() => navigate("/")}
          />
          <Box
            sx={{
              flexGrow: 1,
              display: "flex",
              flexDirection: "row",
              px: 1.5,
            }}
          >
            {pages.map((page) => (
              <MenuItem
                key={page}
                onClick={(e) => {
                  e.preventDefault();
                  navigate(`/${page.toLowerCase()}`);
                }}
                sx={{
                  p: 1,
                  borderRadius: 2,
                }}
              >
                <Typography variant="h6" component="div" sx={{ color: "#f1faee", flexGrow: 0 }}>
                  {page}
                </Typography>
              </MenuItem>
            ))}
          </Box>
          <Box sx={{ flexGrow: 0 }}>
            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
              <UserAvatar firstName={user?.firstname} lastName={user?.lastname} />
            </IconButton>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              <MenuItem onClick={handleCloseUserMenu}>
                <Typography textAlign="center">Profile</Typography>
              </MenuItem>
              <MenuItem onClick={handleCloseUserMenu}>
                <Typography textAlign="center">{user ? "Logout" : "Login"}</Typography>
              </MenuItem>
            </Menu>
          </Box>
          <Box sx={{ flexGrow: 0, px: 2 }}>
            <CartDrawer />
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default NavBar;
