import gql from 'graphql-tag';

export const EXCHANGE_RATES = gql`
  query exchangeRates  {
    exchangeRates {
        bnb
      }
    }`;

export const QUERY_SERVER_TIME = gql`
query serverTime {
  serverTime {
    code
    message
}
}`;

export const QUERY_PET = gql`
    query pet( $id: Int!)  {
        pet(id: $id) {
          id,
          createdAt,
          name,
          avatarURL,
        }
      }`;


