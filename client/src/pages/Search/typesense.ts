import Typesense from "typesense";

export const typesenseClient = new Typesense.Client({
  nodes: [
    {
      host: "typesense.skycap.co.in",
      port: 443,
      protocol: "https",
    },
  ],
  apiKey: "51NN8X9cxGjciXvXrlP19GBW0wlANVzf",
});

// export const typesenseSearchClient = (indexName: string) => {
//   return {
//     search: async (request: any) => {
//       const { query, page, hitsPerPage } = request;
//       const searchParameters = {
//         q: query,
//         page: page || 0,
//         per_page: hitsPerPage || 10,
//         query_by: "shopname,address",
//       };

//       const response = await typesenseClient
//         .collections(indexName)
//         .documents()
//         .search(searchParameters);

//       return {
//         results: [
//           {
//             hits: response.hits.map((hit: any) => ({
//               ...hit.document,
//               objectID: hit.id,
//             })),
//             nbHits: response.found,
//           },
//         ],
//       };
//     },
//   };
// };
