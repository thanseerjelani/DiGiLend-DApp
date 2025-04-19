import React, { useEffect, useState } from 'react';
import {
  Box,
  Button,
  Hidden,
  List,
  ListItem,
  ListItemText,
  Paper,
} from '@mui/material';
import {
  Paid as PaidIcon,
  Home as HomeIcon,
  CarRental as CarRentalIcon,
  Cable as CableIcon,
  Yard as YardIcon,
  BedroomParent as BedroomParentIcon,
  CreditCard as CreditCardIcon,
  KeyboardArrowDown as KeyboardArrowDownIcon,
} from '@mui/icons-material';

import { Outlet, useNavigate, Link } from 'react-router-dom';
import LendSections from '../components/LendSections';
import Navbar from '../components/Navbar';

const Lendingpage = () => {
  const [category, setCategory] = useState('Crypto');
  const [isActive, setIsActive] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    let isCancelled = true;
    if (isCancelled) {
      navigate('/lend/crypto');
    }
    return () => {
      isCancelled = false;
    };
  }, []);

  const handleCategorySelect = (text) => {
    setCategory(text);
    setIsActive(false);
  };

  const categories = [
    { title: 'Crypto', to: '/lend/crypto' },
    { title: 'Mortgage', to: '/lend/mortgage' },
    { title: 'Electronics', to: '/lend/electronics' },
    { title: 'Automotive', to: '/lend/automotive' },
    { title: 'Gardening', to: '/lend/gardening' },
    { title: 'Country Financial Aid', to: '/lend/CountryFinancialAid' },
    { title: 'Household', to: '/lend/household' },
  ];

  return (
    <Box sx={{ minHeight: '100vh', backgroundColor: '#f7f7fa' }}>
      <Navbar />

      {/* Mobile Dropdown */}
      <Hidden lgUp>
        <Box sx={{ p: 2 }}>
          <Button
            onClick={() => setIsActive(!isActive)}
            variant="outlined"
            endIcon={<KeyboardArrowDownIcon />}
            sx={{
              width: '100%',
              borderRadius: 2,
              bgcolor: '#ffffff',
              fontWeight: 600,
              boxShadow: 1,
            }}
          >
            {category}
          </Button>

          {isActive && (
            <Paper elevation={2} sx={{ mt: 1, borderRadius: 2 }}>
              <List>
                {categories.map(({ title, to }) => (
                  <ListItem
                    button
                    key={title}
                    component={Link}
                    to={to}
                    onClick={() => handleCategorySelect(title)}
                  >
                    <ListItemText primary={title} />
                  </ListItem>
                ))}
              </List>
            </Paper>
          )}
        </Box>
      </Hidden>

      {/* Desktop Layout */}
      <Box sx={{ display: 'flex' }}>
        <Hidden lgDown>
          <Box
            sx={{
              width: 260,
              minHeight: 'calc(100vh - 64px)',
              bgcolor: '#240b36',
              color: '#fff',
              py: 4,
              px: 2,
              boxShadow: 2,
              display: 'flex',
              flexDirection: 'column',
              gap: 2,
            }}
          >
            <LendSections title="crypto" selected Icon={<PaidIcon />} />
            <LendSections title="mortgage" Icon={<HomeIcon />} />
            <LendSections title="electronics" Icon={<CableIcon />} />
            <LendSections title="automotive" Icon={<CarRentalIcon />} />
            <LendSections title="gardening" Icon={<YardIcon />} />
            <LendSections title="CountryFinancialAid" Icon={<CreditCardIcon />} />
            <LendSections title="household" Icon={<BedroomParentIcon />} />
          </Box>
        </Hidden>

        {/* Main Content Area */}
        <Box
          component="main"
          sx={{
            flex: 1,
            p: { xs: 2, md: 3 },
            backgroundColor: '#ffffff',
            minHeight: 'calc(100vh - 64px)',
            borderTopLeftRadius: { lg: 12 },
            boxShadow: { lg: 3 },
          }}
        >
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
};

export default Lendingpage;
