import { useQuery } from '@apollo/client';
import { QUERY_SERVER_TIME } from '../graphql/User/marketQuery';

export function useServerTime() {
	const { data } = useQuery(QUERY_SERVER_TIME);

	if (data) return data.serverTime.message;
}
