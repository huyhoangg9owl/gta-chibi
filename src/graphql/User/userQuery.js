import gql from 'graphql-tag';

export const QUERY_ME = gql`
query {
    me {
      id
      createdAt
      name
      email
      emailActivated
      lastLogin
      avatar
      ethAddr
      lastClaim
      nextClaim
      claimable
      claimAmount
      mataCollect
    }
  }`;
