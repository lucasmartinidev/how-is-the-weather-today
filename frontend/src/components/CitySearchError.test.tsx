import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { CitySearchError } from './CitySearchError';

describe('city search error', () => {
  it('announces the message as an alert linked to the city search field', () => {
    render(<CitySearchError message="City not found." />);

    const alert = screen.getByRole('alert');
    expect(alert.textContent).toBe('City not found.');
    expect(alert.id).toBe('city-search-error');
  });
});
