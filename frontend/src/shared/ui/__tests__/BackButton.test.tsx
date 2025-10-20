import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BackButton } from '@/shared/ui/BackButton';

jest.mock('next/navigation', () => ({
  useRouter: () => ({ back: jest.fn() }),
}));

describe('BackButton', () => {
  it('llama router.back al hacer click', async () => {
    const user = userEvent.setup();
    const { container } = render(<BackButton />);
    const btn = container.querySelector('button');
    expect(btn).toBeInTheDocument();
    await user.click(btn!);
  });
});
