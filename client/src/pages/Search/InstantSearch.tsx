import React from "react";
import {
  InstantSearch as AlgoliaInstantSearch,
  SearchBox,
  Hits,
  Pagination,
  Highlight,
} from "react-instantsearch-dom";
import { typesenseSearchClient } from "./typesense";

const indexName = "Sites";

interface HitType {
  name: string;
  description: string;
}

const Hit: React.FC<{ hit: HitType }> = ({ hit }) => (
  <div>
    <h2>
      <Highlight attribute="name" hit={hit} />
    </h2>
    <p>
      <Highlight attribute="description" hit={hit} />
    </p>
  </div>
);

const InstantSearch: React.FC = () => {
  return (
    <AlgoliaInstantSearch
      searchClient={typesenseSearchClient(indexName)}
      indexName={indexName}
    >
      <div>
        <SearchBox />
        <div>
          <Hits hitComponent={Hit} />
          <Pagination />
        </div>
      </div>
    </AlgoliaInstantSearch>
  );
};

export default InstantSearch;
