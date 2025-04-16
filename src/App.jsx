import { useState } from 'react';
import { Alert, Button, Form, Container } from 'react-bootstrap';
import axios from 'axios';
import WeatherCard from './components/WeatherCard';

export default function App() {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const API_KEY = import.meta.env.VITE_APP_WEATHER_API_KEY;

  const getWeather = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      const response = await axios.get('https://api.openweathermap.org/data/2.5/weather', {
        params: {
          q: city,
          appid: API_KEY,
          units: 'metric',
          lang: 'fr'
        }
      });
      setWeather(response.data);
    } catch (err) {
      setError('Ville non trouvée');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container className="text-center mt-5">
      <h1 className="mb-4">Application Météo</h1>
      
      <Form onSubmit={getWeather} className="mb-4">
        <Form.Group className="mb-3">
          <Form.Control
            type="text"
            placeholder="Entrez une ville"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            style={{ maxWidth: '300px', margin: '0 auto' }}
          />
        </Form.Group>
        <Button variant="primary" type="submit" disabled={loading}>
          {loading ? 'Chargement...' : 'Rechercher'}
        </Button>
      </Form>

      {error && <Alert variant="danger" dismissible onClose={() => setError('')}>{error}</Alert>}
      
      <WeatherCard weather={weather} loading={loading} />
    </Container>
  );
}