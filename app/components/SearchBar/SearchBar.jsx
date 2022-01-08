import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { SORT_OPTIONS, SORTS } from "constants/options";
import Box from "@mui/material/Box";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemText from "@mui/material/ListItemText";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import ClearIcon from "@mui/icons-material/Clear";
import SortIcon from "@mui/icons-material/Sort";

function SearchBar({}) {
  const router = useRouter();
  const { paths, sortBy: sortByQuery, search: searchQuery } = router.query;

  const [sortBy, setSortBy] = useState(
    sortByQuery ? sortByQuery : SORTS.DATE_ASC
  );

  const [searchKey, setSearchKey] = useState(searchQuery);

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  useEffect(() => {
    if (searchQuery) {
      setSearchKey(searchQuery);
    } else {
      setSearchKey("");
    }
  }, [searchQuery]);

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  function sort(value) {
    const query = {};

    value && (query.sortBy = value);
    searchQuery && (query.search = searchQuery);

    router.push({
      // @ts-ignore
      pathname: paths ? paths.join("/") : "",
      // @ts-ignore
      query,
    });
  }

  function search(value) {
    const query = {};

    sortByQuery && (query.sortBy = sortByQuery);
    value && (query.search = value);

    router.push({
      // @ts-ignore
      pathname: paths ? paths.join("/") : "",
      // @ts-ignore
      query,
    });
  }

  function handleSortChange(value) {
    // @ts-ignore
    return (e) => {
      setSortBy(value);
      sort(value);
    };
  }

  function handleSearchChange({ target: { value } }) {
    setSearchKey(value);
  }

  function handleSearchKeyPress(e) {
    if (e.key === "Enter") {
      search(searchKey);
    }
  }

  function handleClearSearch() {
    setSearchKey("");
    search("");
  }

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Paper
        sx={{
          p: "0px 4px",
          display: "flex",
          alignItems: "center",
          width: "100%",
        }}
      >
        <IconButton type="submit" sx={{ p: "10px" }} aria-label="search">
          <SearchIcon />
        </IconButton>
        <InputBase
          sx={{ ml: 1, flex: 1 }}
          placeholder="Search files"
          inputProps={{
            "aria-label": "search files",
            value: searchKey,
            // @ts-ignore
            onChange: handleSearchChange,
            onKeyPress: handleSearchKeyPress,
          }}
        />
        {searchKey && (
          <IconButton
            type="submit"
            sx={{ p: "10px" }}
            aria-label="search"
            onClick={handleClearSearch}
          >
            <ClearIcon />
          </IconButton>
        )}
        <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
        <IconButton
          color="primary"
          sx={{ p: "10px" }}
          aria-label="directions"
          onClick={handleMenuClick}
        >
          <SortIcon />
        </IconButton>
      </Paper>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleMenuClose}
        onChange={handleSortChange}
        MenuListProps={{ dense: true }}
      >
        {SORT_OPTIONS.map((option) => (
          <MenuItem
            key={option.id}
            value={option.id}
            selected={option.id === sortBy}
            onClick={handleSortChange(option.id)}
          >
            <ListItemText>{option.name}</ListItemText>
          </MenuItem>
        ))}
      </Menu>
    </Box>
  );
}

export default SearchBar;
