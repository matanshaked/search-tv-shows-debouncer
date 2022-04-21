import SearchBar from "../search-bar/SearchBar.component";
import { showsURL } from "../consts.component";
import ListItem from "../list-item/ListItem.component";
import UseDebounce from "../use-debounce/UseDebounce.component";

import axios from "axios";
import { useEffect, useState } from "react";

const MainView = () => {
  const [shows, setShows] = useState();
  const [searchTerm, setSearchTerm] = useState("");

  const debouncedSearchTerm = UseDebounce(searchTerm, 500);

  useEffect(() => {
    const getShows = async (search_term) => {
      setShows(null);
      const response = await axios.get(`${showsURL}?q=${search_term}`);
      setShows(response);
    };
    debouncedSearchTerm && getShows(debouncedSearchTerm);
  }, [debouncedSearchTerm]);

  return (
    <div>
      <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      {shows?.data && (
        <div>
          {shows.data.map((obj) => (
            <ListItem key={obj.show.id} item={obj} />
          ))}
        </div>
      )}
    </div>
  );
};

export default MainView;
