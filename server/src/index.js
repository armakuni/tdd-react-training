import server from './server.js';

const port = 5001;

// eslint-disable-next-line no-console
server().listen(port, () => console.log(`Running on port ${port}`));
