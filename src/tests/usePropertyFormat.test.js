import { renderHook } from '@testing-library/react';
import { usePropertyFormat } from '../hooks/usePropertyFormat';
import propertyMock from '../data/property.json';
import { convertToEuro } from '../utils/currency';

describe('usePropertyFormat', () => {
  test('formats property correctly with complete data', () => {
    const property = propertyMock[0];

    const { result } = renderHook(() => usePropertyFormat(property));

    expect(result.current.address).toBe('UAE, Dubai, Business Bay, Mayfair Tower');
    expect(result.current.coverPhoto).toBe('https://bayut-production.s3.eu-central-1.amazonaws.com/image/319179042/3e120c40662d4f02b49c220db8d60f6d');
    expect(result.current.propertyType).toBe('Residential, Apartments');

    const convertedPrice = convertToEuro(property.price);
    expect(result.current.price).toBe(`${convertedPrice}`);

    expect(result.current.title).toBe('1-Bedroom | Vacant | Canal View');
    expect(result.current.rooms).toBe(1);
    expect(result.current.baths).toBe(1);
    expect(result.current.purpose).toBe('for-sale');
    expect(result.current.sqSize).toBe('58.16');
    expect(result.current.externalID).toBe('6679108');
    expect(result.current.photos).toEqual([
      'https://bayut-production.s3.eu-central-1.amazonaws.com/image/319179042/3e120c40662d4f02b49c220db8d60f6d',
      'https://bayut-production.s3.eu-central-1.amazonaws.com/image/319179043/2119ad4d7cdc48b8a424107db96a5ebe',
      'https://bayut-production.s3.eu-central-1.amazonaws.com/image/319179044/35a73c818ffe424b9a80aaedbbacf8f1',
      'https://bayut-production.s3.eu-central-1.amazonaws.com/image/319179045/9badeb4d32ac4f63966d62e72579d351',
      'https://bayut-production.s3.eu-central-1.amazonaws.com/image/319179046/6a86347dc89245a6ae2bc925227f75fb',
      'https://bayut-production.s3.eu-central-1.amazonaws.com/image/319179047/f5217cd2d87d4633ae971b981c517999',
      'https://bayut-production.s3.eu-central-1.amazonaws.com/image/319179048/1cec8270337544d89a00c7044f917292',
      'https://bayut-production.s3.eu-central-1.amazonaws.com/image/319179049/12c0399ec2864cd2b9c9a4fca8794ba0',
      'https://bayut-production.s3.eu-central-1.amazonaws.com/image/327377461/d41ff994bd1a4ed0b21b25ad74d4a93f',
      'https://bayut-production.s3.eu-central-1.amazonaws.com/image/319179051/ede309abbb23407ea91a3d5e60587ae6',
      'https://bayut-production.s3.eu-central-1.amazonaws.com/image/327377463/0e772a82d38947bcb11fd6c7b597cb4c',
      'https://bayut-production.s3.eu-central-1.amazonaws.com/image/319179053/275a870e69e24c04a73f05f03ecb14be',
      'https://bayut-production.s3.eu-central-1.amazonaws.com/image/319179054/9925c54b3a2e460aa9289a00cd8f93b9',
      'https://bayut-production.s3.eu-central-1.amazonaws.com/image/319179055/d2f5de27a8ac4774bcd5a999a354c112',
      'https://bayut-production.s3.eu-central-1.amazonaws.com/image/319179056/f9313eac991d4c09b7d72c10f2922966'
    ]);
    expect(result.current.description).toBe(`-1 Bedroom
-1 Bathroom
-Open Kitchen
-Built-in Wardrobes
-Laundry Room
-Balcony Canal View

luxe homes is please to present you this 1-Bedroom Apartment in Business Bay, Mayfair Tower. A 22-storey residential building developed by Deyaar. 

Main Roads nearby: Al Khail Road, Sheikh Zayed Road
Closest Metro Station: Business Bay
Closest Bust Stations: Fairview Residency 2

Amenities:
-High-speed Elevators, CCTV and Fire-alarms
-Security, and Maintenance Services
-Gym, Pool and Spa
-Children's Play Area

For further details, please drop us a message on WhatsApp - or peruse the extraordinary selection of properties we maintain on the luxe home website. Our area specialist will be happy to answer any of your questions related to the property listed. 

Get in touch with us on:
Call: [redacted phone number]
Email: [redacted email address]
Web: www. luxehomesdubai. com`);
    expect(result.current.coverVideo).toBe('jFwDfJ6eze0');
    expect(result.current.amenities).toEqual(['Furnished', 'Centrally Air-Conditioned', 'Balcony or Terrace', 'Gym or Health Club', "Swimming Pool", 'Jacuzzi', 'Sauna', 'Steam Room', 'Maintenance Staff', 'Security Staff', '24 Hours Concierge']);
    expect(result.current.panoramas).toBe('https://my.matterport.com/show/?m=sdqfDBLwd8B');
    expect(result.current.furnished).toBe('furnished');
  });

  test('handles missing property data gracefully', () => {
    const property = {};

    const { result } = renderHook(() => usePropertyFormat(property));

    expect(result.current.address).toBe('Unknown Address');
    expect(result.current.coverPhoto).toBe('/images/noresult.svg');
    expect(result.current.propertyType).toBe(', ');
    expect(result.current.price).toBe('N/A');
    expect(result.current.title).toBe('No Title');
    expect(result.current.rooms).toBe('N/A');
    expect(result.current.baths).toBe('N/A');
    expect(result.current.purpose).toBe('N/A');
    expect(result.current.sqSize).toBe('N/A');
    expect(result.current.externalID).toBe('N/A');
    expect(result.current.photos).toEqual([]);
    expect(result.current.description).toBe('No Description');
    expect(result.current.coverVideo).toBe('');
    expect(result.current.amenities).toEqual([]);
    expect(result.current.panoramas).toEqual([]);
    expect(result.current.furnished).toBe('N/A');
  });
});