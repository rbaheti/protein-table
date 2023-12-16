import { gql } from "@apollo/client";
export const LOAD_SAMPLES = gql`
  query LoadSamples($first: Int!, $offset: Int!) {
    allSamples(first: $first, offset: $offset) {
      nodes {
        id
        proteinName
        abundance
        confidence
      }
    }
  }
`;
