import React from 'react';
import { render, screen, waitFor, within } from '@testing-library/react';
import { ChakraProvider } from '@chakra-ui/react';
import { describe, test, expect, vi, beforeEach } from 'vitest';
import theme from '../assets/js/theme';
import Team from '../components/team/Team';
import { mockTeamData } from '../constants/mockData';
import { getTeams } from '../utils/fetchData';

// vi.mock('../utils/fetchData.js', () => ({
//   getTeams: vi.fn(() => Promise.resolve(mockTeamData)),
// }));

vi.mock('../utils/fetchData.js', () => ({
  getTeams: vi.fn(),
}));

describe('Team Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.mocked(getTeams).mockResolvedValue(mockTeamData);
  });
  test('renders the Team component with correct title and subtitle', async () => {
    render(
      <ChakraProvider theme={theme}>
        <Team />
      </ChakraProvider>
    );

    expect(await screen.findByText(/Our Featured Agents/i)).toBeInTheDocument();
    expect(await screen.findByText(/Our team of dedicated real estate agents brings you the best of residential and commercial properties, ensuring every transaction is smooth and beneficial./i)).toBeInTheDocument();
  });
  test('renders all team members with correct details', async () => {
    render(
      <ChakraProvider theme={theme}>
        <Team />
      </ChakraProvider>
    );
  
    await waitFor(() => {
      mockTeamData.forEach((member, index) => {
        const teamMember = screen.getByTestId(`team-member-${index}`);
        const utils = within(teamMember);
  
        expect(utils.getByText(member.name)).toBeInTheDocument();
        expect(utils.getByText(member.address)).toBeInTheDocument();
        expect(utils.getByText(`${member.list} Listings`)).toBeInTheDocument();
  
        const icons = JSON.parse(member.icon);
        icons.forEach((iconStr, iconIndex) => {
          expect(utils.getByTestId(`icon-${iconIndex}`)).toBeInTheDocument();
        });
      });
    });
  });
});