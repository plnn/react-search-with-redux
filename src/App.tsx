import React, { ChangeEvent, useEffect, useState } from "react";

import "react-bulma-components/dist/react-bulma-components.min.css";
import "./styles.scss";
import { useDispatch } from "react-redux";
import { SET_VALUE } from "./redux/state-keys";

interface ISearchData {
  id: string;
  name: string;
}

export default function App() {
  const REQUEST_TIMEOUT = 500;
  const MINIMUM_SEARCH_LETTER_COUNT = 2;
  const API = "https://api.jsonbin.io/b/5face85443fc1e2e1b41199d";
  const [data, setData] = useState<ISearchData[]>();
  const [result, setResult] = useState<ISearchData[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [inputValue, setInputValue] = useState<string>("");
  const dispatch = useDispatch();
  useEffect(() => {
    fetch(API)
      .then((response) => response.json())
      .then((result) => {
        setData(result);
      })
      .catch((err) => console.log(err));
  }, []);

  const onSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e?.target?.value);
    if (e?.target?.value?.length >= MINIMUM_SEARCH_LETTER_COUNT) {
      setLoading(true);
      setTimeout(() => {
        const temp: ISearchData[] = data?.filter(
          (elem) =>
            elem.name.toLowerCase().indexOf(e?.target?.value?.toLowerCase()) >=
            0
        );
        setResult(temp);
        setLoading(false);
      }, REQUEST_TIMEOUT);
    } else {
      setResult([]);
    }
  };
  const setSelectedValue = (val: string) => {
    setInputValue(val);
    setResult([]);
    dispatch({ type: SET_VALUE, payload: val });
  };
  return (
    <div className="App">
      <div className="control">
        {loading && <div className="is-loading"></div>}
        <input
          onChange={onSearch}
          className="input is-focused"
          type="text"
          placeholder="Search"
          value={inputValue}
        />
      </div>
      <div className="content">
        <div className="list-group">
          {result?.map((item) => {
            return (
              <div
                key={`list-item-${item?.id}`}
                onClick={() => setSelectedValue(item?.name)}
                className="list-group--item"
              >
                {item.name}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
