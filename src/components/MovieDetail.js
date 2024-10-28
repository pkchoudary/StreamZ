import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchStreamingAvailability } from '../tmdb';

// Full list of countries with names
const countries = [
  { code: 'IN', name: 'India' },
  { code: 'US', name: 'United States' },
  { code: 'UK', name: 'United Kingdom' },
  { code: 'DE', name: 'Germany' },
  { code: 'FR', name: 'France' },
  { code: 'CA', name: 'Canada' },
  { code: 'AU', name: 'Australia' },
  { code: 'BR', name: 'Brazil' },
  { code: 'ES', name: 'Spain' },
  { code: 'IT', name: 'Italy' },
  { code: 'NL', name: 'Netherlands' },
  { code: 'JP', name: 'Japan' },
  { code: 'KR', name: 'South Korea' },
  { code: 'MX', name: 'Mexico' },
  { code: 'RU', name: 'Russia' },
  { code: 'AR', name: 'Argentina' },
  { code: 'SE', name: 'Sweden' },
  { code: 'ZA', name: 'South Africa' },
  { code: 'TR', name: 'Turkey' },
  { code: 'PL', name: 'Poland' },
  { code: 'BE', name: 'Belgium' },
  { code: 'NO', name: 'Norway' },
  { code: 'CH', name: 'Switzerland' },
  { code: 'PT', name: 'Portugal' },
  { code: 'DK', name: 'Denmark' },
  { code: 'FI', name: 'Finland' },
  { code: 'IE', name: 'Ireland' },
  { code: 'NZ', name: 'New Zealand' },
  { code: 'IS', name: 'Iceland' },
  { code: 'CN', name: 'China' },
  { code: 'HK', name: 'Hong Kong' },
  { code: 'SG', name: 'Singapore' },
  { code: 'MY', name: 'Malaysia' },
  { code: 'ID', name: 'Indonesia' },
  { code: 'PH', name: 'Philippines' },
];

// Full list of major streaming platforms
const platforms = [
  'Netflix',
  'Disney Plus',
  'Hulu',
  'Amazon Prime Video',
  'Apple TV',
  'HBO Max',
  'Paramount Plus',
  'Peacock',
  'Starz',
  'Showtime',
  'Crave',
  'Sling TV',
  'BBC iPlayer',
  'ITV Hub',
  'All 4',
  'Rakuten TV',
  'Canal+',
  'DAZN',
  'Crunchyroll',
  'Tubi TV',
  'Vudu',
  'Pluto TV',
  'Viaplay',
  'Kocowa',
];

const MovieDetail = () => {
  const { movieId } = useParams();
  const [platformsInCountry, setPlatformsInCountry] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState('IN');
  const [selectedPlatform, setSelectedPlatform] = useState('');
  const [platformCountryAvailability, setPlatformCountryAvailability] = useState({});

  useEffect(() => {
    const loadAvailabilityByCountry = async () => {
      const availability = await fetchStreamingAvailability(movieId, selectedCountry, 'movie');
      setPlatformsInCountry(availability);
    };
    loadAvailabilityByCountry();
  }, [movieId, selectedCountry]);

  const handlePlatformSelect = async (platformName) => {
    setSelectedPlatform(platformName);
    const availabilityForPlatform = {};

    for (let country of countries) {
      const availability = await fetchStreamingAvailability(movieId, country.code, 'movie');
      const platformAvailable = availability.find(p => p.provider_name === platformName);
      if (platformAvailable) {
        availabilityForPlatform[country.code] = platformAvailable;
      }
    }

    setPlatformCountryAvailability(availabilityForPlatform);
  };

  return (
    <div>
      <h1>Movie Availability</h1>

      {/* Select Country and Show Streaming Platforms */}
      <div>
        <h2>Select Country:</h2>
        <select onChange={(e) => setSelectedCountry(e.target.value)} value={selectedCountry}>
          {countries.map((country) => (
            <option key={country.code} value={country.code}>
              {country.name}
            </option>
          ))}
        </select>

        <h2>Available Platforms in {countries.find(c => c.code === selectedCountry)?.name}:</h2>
        <div>
          {platformsInCountry.length > 0 ? (
            platformsInCountry.map((platform) => (
              <button key={platform.provider_id}>
                <img
                  src={`https://image.tmdb.org/t/p/w200${platform.logo_path}`}
                  alt={platform.provider_name}
                  style={{ width: '50px', height: '50px' }}
                />
                {platform.provider_name}
              </button>
            ))
          ) : (
            <p>No platforms available in {countries.find(c => c.code === selectedCountry)?.name}.</p>
          )}
        </div>
      </div>

      {/* Select Platform and Show Country Availability */}
      <div>
        <h2>Select Platform:</h2>
        <select onChange={(e) => handlePlatformSelect(e.target.value)} value={selectedPlatform}>
          <option value="">--Select Platform--</option>
          {platforms.map((platform) => (
            <option key={platform} value={platform}>
              {platform}
            </option>
          ))}
        </select>

        {selectedPlatform && (
          <div>
            <h2>Availability of {selectedPlatform} by Country:</h2>
            <ul>
              {Object.keys(platformCountryAvailability).length > 0 ? (
                Object.keys(platformCountryAvailability).map((countryCode) => (
                  <li key={countryCode}>
                    {countries.find(c => c.code === countryCode)?.name}: Available on {selectedPlatform}
                  </li>
                ))
              ) : (
                <li>No availability for {selectedPlatform}</li>
              )}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default MovieDetail;
