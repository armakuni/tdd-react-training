import server from './server';

const port = process.env.SERVER_PORT || 5001;

// eslint-disable-next-line no-console
server().listen(port, () => console.log(`Running on port ${port}`));
