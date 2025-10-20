import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ThemeToggleButton } from '@/shared/ui/ThemeToggleButton';

const toggleTheme = jest.fn();
jest.mock('@/context/ThemeContext', () => ({
  useTheme: () => ({ theme: 'light', toggleTheme }),
}));

describe('ThemeToggleButton', () => {
  it('muestra icono acorde al tema y dispara toggle', async () => {
    const user = userEvent.setup();
    render(<ThemeToggleButton />);
    const button = await screen.findByRole('button', {
      name: /switch to dark mode/i,
    });
    expect(button).toBeInTheDocument();
    await user.click(button);
    expect(toggleTheme).toHaveBeenCalled();
  });
});
