import app from './app.js';

app.listen(app.get('port'), () => console.log(`The server running on http://localhost:${app.get('port')}`));