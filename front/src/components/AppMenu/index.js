import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { useNavigate } from "react-router-dom";

export default function AppMenu ({ handleClose, anchorEl, open }) {
  const navigate = useNavigate();

  const createNav = (nav) => () => {
    handleClose();
    navigate(nav);
  };

  return (
    <Menu
      id="basic-menu"
      anchorEl={anchorEl}
      open={open}
      onClose={handleClose}
      MenuListProps={{
        "aria-labelledby": "basic-button",
      }}
    >
      <MenuItem onClick={createNav("/")}>home</MenuItem>
      <MenuItem onClick={createNav("/entities")}>entities</MenuItem>
      <MenuItem onClick={createNav("/entities/new")}>
        Create new entity
      </MenuItem>
    </Menu>
  );
}
