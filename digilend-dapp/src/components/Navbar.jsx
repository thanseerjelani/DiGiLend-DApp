import React, { useEffect } from "react";
import {
  AppBar,
  Box,
  Container,
  Hidden,
  IconButton,
  Toolbar,
  Typography,
  useTheme,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toggle } from "../features/toggleMenuSlice";
import DrawerComponent from "./DrawerComponent";
import { changeAddress } from "../features/ConnectWalletSlice";

const Navbar = ({ darkMode = true }) => {
  const dispatch = useDispatch();
  const address = useSelector((state) => state.connectWallet.address);
  const theme = useTheme();

  useEffect(() => {
    if (window.ethereum) {
      window.ethereum.on("chainChanged", () => {
        window.location.reload();
      });
      window.ethereum.on("accountsChanged", (a) => {
        dispatch(changeAddress(a[0]));
      });
    }
  }, []);

  const navLinkStyles = ({ isActive }) => {
    return {
      fontSize: "1rem",
      padding: "8px 16px",
      fontWeight: isActive ? 700 : 500,
      color: isActive
        ? darkMode
          ? "#ff4ecd"
          : "#6f00ff"
        : darkMode
        ? "#ffffff"
        : "#111111",
      textDecoration: isActive ? "underline" : "none",
      transition: "color 0.3s ease",
    };
  };

  return (
    <AppBar
      position="sticky"
      elevation={1}
      sx={{
        background: darkMode ? "#240b36" : "#ffffff",
        color: darkMode ? "#ffffff" : "#111111",
        transition: "background 0.3s ease",
      }}
    >
      <Container maxWidth="lg" sx={{ px: { xs: 1, sm: 2 } }}>
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          {/* Logo & Mobile Menu */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <Hidden mdUp>
              <IconButton onClick={() => dispatch(toggle())}>
                <MenuIcon
                  sx={{ color: darkMode ? "#ffffff" : "#240b36" }}
                  fontSize="large"
                />
              </IconButton>
            </Hidden>
            <Typography
              variant="h5"
              sx={{
                fontWeight: 700,
                fontFamily: "serif",
                background: darkMode
                  ? "linear-gradient(90deg, #ff4ecd, #6f00ff)"
                  : "linear-gradient(90deg, #6f00ff, #ff4ecd)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                cursor: "pointer",
                transition: "transform 0.3s ease",
                "&:hover": {
                  transform: "scale(1.1)",
                },
              }}
            >
              DigiLend
            </Typography>
          </Box>

          {/* Desktop Nav Links */}
          <Hidden mdDown>
            <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
              <NavLink to="/" style={navLinkStyles}>
                Home
              </NavLink>
              <NavLink to="/lend" style={navLinkStyles}>
                Lend
              </NavLink>
              <NavLink to="/borrow" style={navLinkStyles}>
                Borrow
              </NavLink>
              <NavLink to="/payoff" style={navLinkStyles}>
                PayOff
              </NavLink>
              {/* Uncomment below when ready
              <NavLink to="/stake" style={navLinkStyles}>Stake</NavLink>
              <NavLink to="/market" style={navLinkStyles}>Market</NavLink>
              */}
            </Box>
          </Hidden>

          {/* Wallet Info */}
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Typography
              variant="caption"
              sx={{
                fontWeight: 500,
                color: darkMode ? "#cccccc" : "#666666",
              }}
            >
              Wallet Connected
            </Typography>
            <Typography
              sx={{
                fontSize: "0.875rem",
                fontWeight: 700,
                color: darkMode ? "#ffffff" : "#240b36",
              }}
            >
              {address?.slice(0, 4)}...{address?.slice(-4)}
            </Typography>
          </Box>
        </Toolbar>
        <DrawerComponent />
      </Container>
    </AppBar>
  );
};

export default Navbar;
