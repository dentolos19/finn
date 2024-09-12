import { deleteSession } from "@/session";
import HelpIcon from "@mui/icons-material/Help";
import HistoryIcon from "@mui/icons-material/History";
import LogoutIcon from "@mui/icons-material/Logout";
import MenuIcon from "@mui/icons-material/Menu";
import SettingsIcon from "@mui/icons-material/Settings";
import {
  Divider,
  IconButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Paper,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function HeaderPanel(props: { onHelp?: () => void }) {
  const router = useRouter();

  const [menuAnchor, setAnchorEl] = useState<null | HTMLElement>(null);
  const menuOpen = Boolean(menuAnchor);
  const handleMenuClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    deleteSession().then(() => {
      router.push("/login");
    });
  };

  return (
    <Paper>
      <Toolbar>
        <Tooltip title={"More Options"}>
          <IconButton onClick={handleMenuClick}>
            <MenuIcon />
          </IconButton>
        </Tooltip>
        <Menu anchorEl={menuAnchor} open={menuOpen} onClose={handleMenuClose}>
          <MenuItem onClick={handleMenuClose}>
            <ListItemIcon>
              <HistoryIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText>History</ListItemText>
          </MenuItem>
          <MenuItem onClick={handleMenuClose}>
            <ListItemIcon>
              <SettingsIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText>Settings</ListItemText>
          </MenuItem>
          <Divider />
          <MenuItem onClick={handleLogout}>
            <ListItemIcon>
              <LogoutIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText>Logout</ListItemText>
          </MenuItem>
        </Menu>
        <Typography
          sx={{
            flexGrow: 1,
            textAlign: "center",
          }}
          variant={"h6"}
        >
          Finn
        </Typography>
        <Tooltip title={"Help"}>
          <IconButton onClick={props.onHelp}>
            <HelpIcon />
          </IconButton>
        </Tooltip>
      </Toolbar>
    </Paper>
  );
}