import { AppBar, IconButton, Toolbar } from "@mui/material";
import { AlignLeft } from "lucide-react";

const MenuBar = ({ handleDrawerToggle, drawerWidth }) => {
  return (
    <>
      <AppBar
        position="fixed"
        sx={{
          backgroundColor: "inherit",
          boxShadow: "none",
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
        }}
      >
        <Toolbar>
          <IconButton
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <AlignLeft className=" text-black" />
          </IconButton>
        </Toolbar>
      </AppBar>
    </>
  );
};

export default MenuBar;
