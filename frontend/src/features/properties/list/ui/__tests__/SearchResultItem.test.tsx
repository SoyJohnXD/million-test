import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { SearchResultItem } from '@/features/properties/list/ui/SearchResultItem';

describe('SearchResultItem', () => {
  it('renderiza city, country y llama onSelect al hacer click', async () => {
    const user = userEvent.setup();
    const onSelect = jest.fn();
    render(
      <SearchResultItem
        location={{ city: 'Bogota', country: 'Colombia', lat: '0', lon: '0' }}
        onSelect={onSelect}
      />
    );

    const btn = screen.getByRole('button', { name: /bogota, colombia/i });
    await user.click(btn);
    expect(onSelect).toHaveBeenCalledWith('Bogota, Colombia');
  });
});
