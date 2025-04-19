import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  CircularProgress,
  Button,
  IconButton,
  Zoom,
  useMediaQuery,
  useTheme,
  Tooltip,
} from "@mui/material";
import ZoomInIcon from "@mui/icons-material/ZoomIn";
import ZoomOutIcon from "@mui/icons-material/ZoomOut";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import { useSelector } from "react-redux";
import { ethers } from "ethers";
import Navbar from "../components/Navbar";
import Lender from "../components/Lender";
import { LOANLENDING_CONTRACT_ADDRESS, abi } from "../constants";

const PayOffpage = () => {
  const address = useSelector((state) => state.connectWallet.address);
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const contract = new ethers.Contract(
    LOANLENDING_CONTRACT_ADDRESS,
    abi,
    provider.getSigner(address)
  );

  const [addressInfo, setAddressInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [zoom, setZoom] = useState(1);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const handleZoom = (type) => {
    if (type === "in") setZoom((prev) => Math.min(prev + 0.1, 1.5));
    else if (type === "out") setZoom((prev) => Math.max(prev - 0.1, 0.5));
    else setZoom(1);
  };

  useEffect(() => {
    const getAllBorrowers = async () => {
      try {
        const data = await contract.cryptoBorrowers(address);
        setAddressInfo({
          loanDuration: parseFloat(data[0]) / 10,
          returnAmount: Number(ethers.utils.formatEther(data[1])).toFixed(4),
          lender: data[2],
        });
      } catch (err) {
        console.error("Error fetching borrower data:", err);
        setError(
          err.reason || "Failed to fetch loan details. Please try again."
        );
      } finally {
        setLoading(false);
      }
    };

    getAllBorrowers();
  }, []);

  return (
    <div>
      <Navbar />
      <Box
        sx={{
          width: "100%",
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
          justifyContent: "center",
          background: "linear-gradient(to right, #141E30, #243B55)",
          color: "white",
          px: 2,
          py: 5,
          position: "relative",
        }}
      >
        {/* Zoom Controls */}
        <Box
          sx={{
            display: "flex",
            gap: 1,
            alignItems: "center",
            position: "absolute",
            top: isMobile ? 70 : 100,
            right: isMobile ? 16 : 40,
            background: "rgba(255, 255, 255, 0.1)",
            backdropFilter: "blur(8px)",
            borderRadius: "12px",
            padding: "6px 12px",
            zIndex: 10,
          }}
        >
          <Tooltip title="Zoom In">
            <IconButton onClick={() => handleZoom("in")} color="inherit">
              <ZoomInIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Zoom Out">
            <IconButton onClick={() => handleZoom("out")} color="inherit">
              <ZoomOutIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Reset Zoom">
            <IconButton onClick={() => handleZoom("reset")} color="inherit">
              <RestartAltIcon />
            </IconButton>
          </Tooltip>
        </Box>

        {/* Content Container */}
        <Box
          sx={{
            transform: `scale(${zoom})`,
            transition: "transform 0.3s ease-in-out",
            width: "100%",
            maxWidth: 600,
            mx: "auto",
            px: isMobile ? 1 : 2,
          }}
        >
          {loading ? (
            <CircularProgress sx={{ color: "white" }} />
          ) : error ? (
            <Zoom in timeout={500}>
              <Box
                sx={{
                  background: "rgba(255,77,77,0.2)",
                  backdropFilter: "blur(10px)",
                  border: "1px solid rgba(255,77,77,0.4)",
                  borderRadius: "15px",
                  padding: 4,
                  textAlign: "center",
                  color: "#ffb3b3",
                  boxShadow: "0 8px 24px rgba(0,0,0,0.2)",
                }}
              >
                <ErrorOutlineIcon sx={{ fontSize: 50, mb: 2 }} />
                <Typography variant="h4" gutterBottom>
                  Error Occurred
                </Typography>
                <Typography variant="body1" sx={{ mb: 2 }}>
                  {error}
                </Typography>
                <Button
                  variant="contained"
                  sx={{
                    mt: 1,
                    backgroundColor: "#fff",
                    color: "#000",
                    fontWeight: "bold",
                    "&:hover": {
                      backgroundColor: "#f0f0f0",
                    },
                  }}
                  onClick={() => window.location.reload()}
                >
                  Retry
                </Button>
              </Box>
            </Zoom>
          ) : (
            <Zoom in timeout={500}>
              <Box
                sx={{
                  background: "rgba(255, 255, 255, 0.1)",
                  backdropFilter: "blur(10px)",
                  borderRadius: "16px",
                  padding: 4,
                  boxShadow: "0px 10px 30px rgba(0,0,0,0.3)",
                  border: "1px solid rgba(255,255,255,0.2)",
                }}
              >
                <Lender
                  loanAmount={addressInfo.returnAmount}
                  lender={addressInfo.lender}
                  loanDuration={addressInfo.loanDuration}
                />
              </Box>
            </Zoom>
          )}
        </Box>
      </Box>
    </div>
  );
};

export default PayOffpage;
