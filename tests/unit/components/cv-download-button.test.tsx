import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { CVDownloadButton } from '@/components/ui/cv-download-button';

// Mock the analytics module
jest.mock('@/lib/analytics', () => ({
  trackCVDownload: jest.fn(),
}));

describe('CVDownloadButton', () => {
  const mockFilename = 'John_Doe_Resume.pdf';
  const mockPath = '/resume.pdf';

  beforeEach(() => {
    // Clear all mocks before each test
    jest.clearAllMocks();
    
    // Mock fetch for HEAD request
    global.fetch = jest.fn();
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should render download button with correct text', () => {
    render(<CVDownloadButton filename={mockFilename} path={mockPath} />);
    
    expect(screen.getByText('Download CV')).toBeInTheDocument();
  });

  it('should have correct aria-label', () => {
    render(<CVDownloadButton filename={mockFilename} path={mockPath} />);
    
    const button = screen.getByRole('button');
    expect(button).toHaveAttribute('aria-label', `Download ${mockFilename}`);
  });

  it('should initiate download when clicked', async () => {
    // Mock successful fetch
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
    });

    render(<CVDownloadButton filename={mockFilename} path={mockPath} />);
    
    // Mock document.createElement and appendChild after render
    const mockLink = {
      href: '',
      download: '',
      style: { display: '' },
      click: jest.fn(),
    };
    const createElementSpy = jest.spyOn(document, 'createElement').mockReturnValue(mockLink as any);
    const appendChildSpy = jest.spyOn(document.body, 'appendChild').mockImplementation(() => mockLink as any);
    const removeChildSpy = jest.spyOn(document.body, 'removeChild').mockImplementation(() => mockLink as any);
    
    const button = screen.getByRole('button');
    fireEvent.click(button);

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith(mockPath, { method: 'HEAD' });
      expect(createElementSpy).toHaveBeenCalledWith('a');
      expect(mockLink.href).toBe(mockPath);
      expect(mockLink.download).toBe(mockFilename);
      expect(mockLink.click).toHaveBeenCalled();
      expect(appendChildSpy).toHaveBeenCalled();
      expect(removeChildSpy).toHaveBeenCalled();
    });

    createElementSpy.mockRestore();
    appendChildSpy.mockRestore();
    removeChildSpy.mockRestore();
  });

  it('should track analytics event on download', async () => {
    const { trackCVDownload } = require('@/lib/analytics');
    
    // Mock successful fetch
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
    });

    render(<CVDownloadButton filename={mockFilename} path={mockPath} />);
    
    // Mock document methods after render
    const mockLink = {
      href: '',
      download: '',
      style: { display: '' },
      click: jest.fn(),
    };
    jest.spyOn(document, 'createElement').mockReturnValue(mockLink as any);
    jest.spyOn(document.body, 'appendChild').mockImplementation(() => mockLink as any);
    jest.spyOn(document.body, 'removeChild').mockImplementation(() => mockLink as any);
    
    const button = screen.getByRole('button');
    fireEvent.click(button);

    await waitFor(() => {
      expect(trackCVDownload).toHaveBeenCalledWith(mockFilename);
    });
  });

  it('should show loading state during download', async () => {
    // Mock fetch with delay
    (global.fetch as jest.Mock).mockImplementation(() => 
      new Promise(resolve => setTimeout(() => resolve({ ok: true }), 100))
    );

    render(<CVDownloadButton filename={mockFilename} path={mockPath} />);
    
    // Mock document methods after render
    const mockLink = {
      href: '',
      download: '',
      style: { display: '' },
      click: jest.fn(),
    };
    jest.spyOn(document, 'createElement').mockReturnValue(mockLink as any);
    jest.spyOn(document.body, 'appendChild').mockImplementation(() => mockLink as any);
    jest.spyOn(document.body, 'removeChild').mockImplementation(() => mockLink as any);
    
    const button = screen.getByRole('button');
    fireEvent.click(button);

    // Should show loading text
    expect(screen.getByText('Downloading...')).toBeInTheDocument();
    expect(button).toBeDisabled();

    // Wait for download to complete
    await waitFor(() => {
      expect(screen.getByText('Download CV')).toBeInTheDocument();
      expect(button).not.toBeDisabled();
    });
  });

  it('should display error message when file is not found', async () => {
    // Mock failed fetch (404)
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
      status: 404,
    });

    render(<CVDownloadButton filename={mockFilename} path={mockPath} />);
    
    const button = screen.getByRole('button');
    fireEvent.click(button);

    await waitFor(() => {
      const errorMessage = screen.getByRole('alert');
      expect(errorMessage).toBeInTheDocument();
      expect(errorMessage).toHaveTextContent(/Unable to download CV/i);
    });
  });

  it('should display error message when network fails', async () => {
    // Mock network error
    (global.fetch as jest.Mock).mockRejectedValueOnce(new Error('Network error'));

    render(<CVDownloadButton filename={mockFilename} path={mockPath} />);
    
    const button = screen.getByRole('button');
    fireEvent.click(button);

    await waitFor(() => {
      const errorMessage = screen.getByRole('alert');
      expect(errorMessage).toBeInTheDocument();
      expect(errorMessage).toHaveTextContent(/Unable to download CV/i);
    });
  });

  it('should clear error message on retry', async () => {
    // First attempt fails
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
      status: 404,
    });

    render(<CVDownloadButton filename={mockFilename} path={mockPath} />);
    
    const button = screen.getByRole('button');
    fireEvent.click(button);

    await waitFor(() => {
      expect(screen.getByRole('alert')).toBeInTheDocument();
    });

    // Second attempt succeeds
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
    });

    // Mock document methods
    const mockLink = {
      href: '',
      download: '',
      style: { display: '' },
      click: jest.fn(),
    };
    jest.spyOn(document, 'createElement').mockReturnValue(mockLink as any);
    jest.spyOn(document.body, 'appendChild').mockImplementation(() => mockLink as any);
    jest.spyOn(document.body, 'removeChild').mockImplementation(() => mockLink as any);

    fireEvent.click(button);

    await waitFor(() => {
      expect(screen.queryByRole('alert')).not.toBeInTheDocument();
    });
  });

  it('should render with custom variant and size', () => {
    render(
      <CVDownloadButton
        filename={mockFilename}
        path={mockPath}
        variant="outline"
        size="lg"
      />
    );
    
    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();
  });

  it('should apply custom className', () => {
    const customClass = 'custom-test-class';
    render(
      <CVDownloadButton
        filename={mockFilename}
        path={mockPath}
        className={customClass}
      />
    );
    
    const button = screen.getByRole('button');
    expect(button).toHaveClass(customClass);
  });
});
