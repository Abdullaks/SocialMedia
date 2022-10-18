import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import React from "react";
import {
  Home,
  Pages,
  Settings,
  Shop,
} from "@mui/icons-material";
function AdminSidebar() {
  return (
    <Box
      flex={1}
      p={2}
      sx={{
        display: {
          xs: "none",
          sm: "block",
        },
      }}
    >
      <Box position="fixed">
        <List>
          <ListItem disablePadding>
            <ListItemButton component="a" href="#userManagement">
              <ListItemIcon>
                <Home />
              </ListItemIcon>
              <ListItemText primary="User Management" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton component="a" href="#adManagement">
              <ListItemIcon>
                <Pages />
              </ListItemIcon>
              <ListItemText primary="Ad Management" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton component="a" href="#reportManagement">
              <ListItemIcon>
                <Settings />
              </ListItemIcon>
              <ListItemText primary="Report Management" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton component="a" href="#shop">
              <ListItemIcon>
                <Shop />
              </ListItemIcon>
              <ListItemText primary="shop" />
            </ListItemButton>
          </ListItem>
        </List>
      </Box>
    </Box>
  );
}

export default AdminSidebar;
