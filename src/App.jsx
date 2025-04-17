import { useState } from 'react';
import { Alert, Button, Form, Container, Row, Col } from 'react-bootstrap';
import axios from 'axios';
import { FiSearch } from 'react-icons/fi'; // Import manquant ici
import WeatherCard from './components/WeatherCard';
import './styles.css';

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
    <Container className="min-vh-100 d-flex flex-column justify-content-center">
      <Row className="justify-content-center mb-5">
        <Col md={8} className="text-center">
          <h1 className="text-shadow display-4 mb-4 fw-bold">☀️ Météo Instantanée 🌤️</h1>
          
          <Form onSubmit={getWeather} className="mb-4">
            <Form.Group>
              <div className="d-flex gap-2 justify-content-center">
                <Form.Control
                  type="text"
                  placeholder="Entrez une ville..."
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="custom-input"
                  style={{ width: '400px' }}
                />
                <Button 
                  variant="light" 
                  type="submit" 
                  disabled={loading}
                  className="rounded-circle d-flex align-items-center justify-content-center"
                  style={{ width: '50px', height: '50px' }}
                >
                  <FiSearch size={20} />
                </Button>
              </div>
            </Form.Group>
          </Form>
  
            {error && (
              <Alert 
                variant="danger" 
                dismissible 
                onClose={() => setError('')}
                className="glass-card"
              >
                ⚠️ {error}
              </Alert>
            )}
          </Col>
        </Row>
  
        <Row className="justify-content-center">
          <Col md={6}>
            <WeatherCard weather={weather} loading={loading} />
          </Col>
        </Row>
      </Container>
    );
  }