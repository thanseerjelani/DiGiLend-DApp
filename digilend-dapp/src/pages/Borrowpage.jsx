import React from "react";
import Navbar from "../components/Navbar";
import BorrowForm from "../components/BorrowForm";
import BorrowItem from "../components/BorrowItem";
import {
  Box,
  Tab,
  useMediaQuery,
  useTheme,
  Container,
  Paper,
  Fade,
} from "@mui/material";
import { TabContext, TabList, TabPanel } from "@mui/lab";

const Borrowpage = () => {
  const [selectedTab, setSelectedTab] = React.useState("1");
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const handleChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  return (
    <>
      <Navbar />

      <Box
        sx={{
          minHeight: "100vh",
          background: "linear-gradient(to right, #fce3ff, #e1f4ff)",
          pt: 12,
          pb: 6,
        }}
      >
        <Container maxWidth="md">
          <Paper
            elevation={4}
            sx={{
              borderRadius: 4,
              p: isMobile ? 2 : 4,
              backdropFilter: "blur(10px)",
              background: "rgba(255, 255, 255, 0.6)",
              boxShadow: "0 8px 30px rgba(0,0,0,0.1)",
              border: "1px solid rgba(255, 255, 255, 0.3)",
              transition: "all 0.3s ease",
            }}
          >
            <TabContext value={selectedTab}>
              <TabList
                onChange={handleChange}
                variant="fullWidth"
                sx={{
                  backgroundColor: "transparent",
                  borderRadius: "12px",
                  mb: 3,
                  boxShadow: "inset 0 -1px 0 #ccc",
                }}
              >
                <Tab
                  label="💰 Borrow Crypto"
                  value="1"
                  sx={{
                    fontWeight: 600,
                    fontSize: isMobile ? 14 : 16,
                    color: "#555",
                    transition: "0.3s",
                    "&.Mui-selected": {
                      color: "#6A0DAD",
                      borderBottom: "3px solid #6A0DAD",
                    },
                    "&:hover": {
                      color: "#6A0DAD",
                    },
                  }}
                />
                <Tab
                  label="📦 Borrow Item"
                  value="2"
                  sx={{
                    fontWeight: 600,
                    fontSize: isMobile ? 14 : 16,
                    color: "#555",
                    transition: "0.3s",
                    "&.Mui-selected": {
                      color: "#6A0DAD",
                      borderBottom: "3px solid #6A0DAD",
                    },
                    "&:hover": {
                      color: "#6A0DAD",
                    },
                  }}
                />
              </TabList>

              <Fade in={selectedTab === "1"} timeout={500} unmountOnExit>
                <TabPanel value="1" sx={{ px: 0 }}>
                  <BorrowForm />
                </TabPanel>
              </Fade>

              <Fade in={selectedTab === "2"} timeout={500} unmountOnExit>
                <TabPanel value="2" sx={{ px: 0 }}>
                  <BorrowItem />
                </TabPanel>
              </Fade>
            </TabContext>
          </Paper>
        </Container>
      </Box>
    </>
  );
};

export default Borrowpage;
