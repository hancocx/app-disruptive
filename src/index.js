import app from './app';
import './database';

// Arranca el servidor
app.listen(app.get('port'), () => {
  console.log('Server listen on port', app.get('port'));
});
