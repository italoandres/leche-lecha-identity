import { render, screen } from '@testing-library/react';
import Home from '@/app/page';

describe('Landing Page', () => {
  it('should display the main title', () => {
    render(<Home />);
    expect(screen.getByText(/Compreenda Seus Padrões Emocionais/i)).toBeInTheDocument();
  });

  it('should display instructions about honesty and confidentiality', () => {
    render(<Home />);
    expect(screen.getByText(/Responda com sinceridade/i)).toBeInTheDocument();
    expect(screen.getByText(/Não existem respostas certas ou erradas/i)).toBeInTheDocument();
    expect(screen.getByText(/confidenciais/i)).toBeInTheDocument();
  });

  it('should have a start button that links to /teste', () => {
    render(<Home />);
    const startButton = screen.getByRole('link', { name: /Começar o Teste/i });
    expect(startButton).toBeInTheDocument();
    expect(startButton).toHaveAttribute('href', '/teste');
  });

  it('should display disclaimer about not being clinical diagnosis', () => {
    render(<Home />);
    expect(screen.getByText(/não é um diagnóstico clínico/i)).toBeInTheDocument();
  });

  it('should explain the test purpose', () => {
    render(<Home />);
    expect(screen.getByText(/20 perguntas/i)).toBeInTheDocument();
    expect(screen.getByText(/interpretação clara/i)).toBeInTheDocument();
  });
});
