import SearchBar from "../search-bar/SearchBar.component";
import { showsURL, APIKey } from "../consts.component";
import UseDebounce from "../use-debounce/UseDebounce.component";
import Spinner from "../spinner/Spinner.component";

import "./MainView.style.scss";

import axios from "axios";
import { useEffect, useState } from "react";

const MainView = () => {
  const [shows, setShows] = useState();
  const [searchTerm, setSearchTerm] = useState("");
  const [isSearching, setIsSearching] = useState(false);

  const debouncedSearchTerm = UseDebounce(searchTerm, 500);

  useEffect(() => {
    const getShows = async (search_term) => {
      setShows(null);
      setIsSearching(true);
      const response = await axios.get(
        `${showsURL}?apikey=${APIKey}&t=${search_term}`
      );
      setShows(response);
      setIsSearching(false);
    };
    debouncedSearchTerm ? getShows(debouncedSearchTerm) : setShows(null);
  }, [debouncedSearchTerm]);

  const getPoster = (poster) => {
    if (poster === "N/A") {
      return <div>Poster N/A</div>;
    } else {
      return <img className="picture" src={shows.data.Poster} alt="Poster" />;
    }
  };
  return (
    <div className="container">
      <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      {isSearching && <Spinner />}
      {!isSearching && shows?.data?.Title ? (
        <div className="media-container">
          <h1>{shows.data.Title}</h1>
          {getPoster(shows.data.Poster)}
        </div>
      ) : (
        !isSearching && <div>No results</div>
      )}
    </div>
  );
};

export default MainView;
