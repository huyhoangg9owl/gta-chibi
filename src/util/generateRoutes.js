function generatePath(path, params) {
	return path
		.replace(/:(\w+)/g, (_, key) => {
			return params[key];
		})
		.replace(/\/*\*$/, (_) => (params['*'] === null ? '' : params['*'].replace(/^\/*/, '/')));
}

export const generateRoutes = (routes) => {
	return Object.keys(routes).reduce((agg, next) => {
		agg[next] = {
			path: routes[next],
			to: (params) => generatePath(routes[next], params),
		};
		return agg;
	}, {});
};
