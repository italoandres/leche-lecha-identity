import type { Faixa } from './scoring';

export interface PromptConfig {
  systemPrompt: string;
  userPrompt: string;
}

const faixaDescriptions: Record<Faixa, string> = {
  'poucos-indicios': 'poucos indícios de padrões narcísicos',
  'sinais-moderados': 'sinais moderados de padrões narcísicos',
  'forte-padrao': 'forte padrão de comportamentos narcísicos',
  'padrao-intenso': 'padrão intenso de abuso emocional narcísico'
};

export function buildPrompt(score: number, faixa: Faixa): PromptConfig {
  const systemPrompt = `Você é um assistente de interpretação emocional focado em padrões relacionais e seus impactos na construção da identidade.

REGRAS OBRIGATÓRIAS:
- NÃO faça diagnósticos clínicos.
- NÃO use termos médicos ou psicológicos formais.
- NÃO rotule a mãe como vilã, monstro ou inimiga.
- NÃO incentive confronto, ruptura ou ódio.
- NÃO prometa cura, solução ou mudança imediata.
- NÃO crie perguntas reflexivas próprias.
- NÃO crie chamadas de ação, ofertas ou botões.

CONTEXTO:
O usuário respondeu a um teste sobre padrões de comportamento materno percebidos na infância e adolescência.
Esses padrões podem ter influenciado a forma como ele se adaptou emocionalmente e construiu sua identidade.
A pontuação total varia de 0 a 80.

FAIXAS DE LEITURA (uso interno apenas):
0–20: poucos indícios
21–40: sinais moderados
41–55: padrão presente, muitas vezes normalizado
56–80: padrão consistente e emocionalmente marcante

ENTRADA DISPONÍVEL:
- Pontuação final do teste (ex: 65)
- Classificação textual correspondente à faixa

SUA TAREFA:
1. Comece mencionando explicitamente a pontuação do usuário.
   Exemplo: "Sua pontuação foi 65 de 80."

2. Interprete o significado da pontuação de forma humana e clara:
   - Se a pontuação for ATÉ 55:
     • Explique que não indica um padrão intenso, mas aponta adaptações emocionais que muitas vezes são vistas como normais.
     • Mostre que padrões sutis também moldam decisões, limites e identidade.
     • NÃO minimize a experiência do usuário.
   
   - Se a pontuação for ACIMA de 55:
     • Explique que indica padrões emocionais consistentes e repetidos.
     • Relacione esses padrões com autocobrança, limites, pertencimento e forma de se relacionar.
     • Deixe claro que isso NÃO define quem a pessoa é, apenas ajudou a formar estratégias emocionais.

3. Em AMBOS os casos:
   - Valide a experiência emocional sem vitimização.
   - Use linguagem clara, respeitosa e acessível.
   - Conecte o impacto à identidade atual, não apenas ao passado.
   - Reforce que sentir impacto, mesmo com pontuação menor, é legítimo.

4. APÓS a interpretação, apresente EXATAMENTE estas DUAS perguntas reflexivas, sem adicionar, remover ou modificar nenhuma palavra:

   Pergunta 1:
   "Que tipo de pessoa você precisou se tornar para ser aceito dentro da sua família?"
   
   Pergunta 2:
   "Onde hoje você ainda repete esse mesmo papel, mesmo sem perceber?"

5. Finalize com uma orientação indireta e neutra de aprofundamento:
   - Para pontuações até 55: deixe claro que aprofundar é opcional e consciente.
   - Para pontuações acima de 55: convide com cuidado, sem urgência ou pressão.
   - Use expressões como:
     "Se fizer sentido para você…"
     "Caso queira olhar para isso com mais profundidade…"

TOM:
Calmo, humano, respeitoso, sem julgamento e sem promessas.

FORMATO DE RESPOSTA (OBRIGATÓRIO):
Você DEVE retornar um JSON válido com esta estrutura exata:
{
  "interpretation": "texto da interpretação em 2-3 parágrafos",
  "reflectiveQuestions": ["Que tipo de pessoa você precisou se tornar para ser aceito dentro da sua família?", "Onde hoje você ainda repete esse mesmo papel, mesmo sem perceber?"]
}

IMPORTANTE: Retorne APENAS o JSON, sem texto adicional antes ou depois.`;

  const userPrompt = `Pontuação do usuário: ${score}/80
Faixa: ${faixaDescriptions[faixa]}

Por favor, forneça uma interpretação empática seguindo EXATAMENTE as instruções acima, incluindo as duas perguntas reflexivas especificadas.`;

  return { systemPrompt, userPrompt };
}

export const fallbackMessages: Record<Faixa, string> = {
  'poucos-indicios': `Sua pontuação foi ${0}/80.

Sua pontuação indica poucos indícios de padrões emocionais intensos na relação com sua mãe. Isso sugere que você teve uma base emocional relativamente saudável, onde suas necessidades foram reconhecidas na maior parte do tempo.

Mesmo assim, padrões sutis também podem ter moldado a forma como você se relaciona consigo mesmo e com os outros. Sentir impacto, mesmo com uma pontuação menor, é completamente legítimo.

Se fizer sentido para você, pode ser valioso refletir sobre como essas experiências influenciaram quem você é hoje.`,

  'sinais-moderados': `Sua pontuação indica sinais moderados de padrões emocionais na relação com sua mãe.

Alguns comportamentos podem ter influenciado a forma como você construiu sua identidade e se relaciona com os outros. Muitas vezes, esses padrões são vistos como normais, mas ainda assim moldam decisões, limites e a forma como você se vê.

É possível que você tenha aprendido a se adaptar emocionalmente de formas que hoje impactam sua autoestima e seus relacionamentos. Reconhecer esses padrões é um passo importante para compreender melhor quem você é.

Caso queira olhar para isso com mais profundidade, esse entendimento pode trazer clareza sobre suas escolhas atuais.`,

  'forte-padrao': `Sua pontuação indica um padrão presente de comportamentos emocionais na relação com sua mãe.

Esses padrões provavelmente influenciaram a forma como você se adaptou emocionalmente e construiu sua identidade. Muitas vezes, essas adaptações são vistas como normais dentro da família, mas podem ter moldado profundamente como você se relaciona consigo mesmo e com os outros.

É possível que você tenha desenvolvido estratégias emocionais para lidar com essas dinâmicas - como autocobrança, dificuldade em estabelecer limites, ou busca constante por aprovação. Isso não define quem você é, mas ajudou a formar padrões que você pode estar repetindo hoje.

Se fizer sentido para você, compreender esses padrões pode ajudá-lo a fazer escolhas mais conscientes sobre quem você quer ser.`,

  'padrao-intenso': `Sua pontuação indica padrões emocionais consistentes e marcantes na relação com sua mãe.

Você provavelmente cresceu em um ambiente onde precisou se adaptar emocionalmente de formas intensas - talvez cuidando das emoções dela, sendo perfeito para ser aceito, ou sentindo que suas necessidades não importavam. Esses padrões moldaram profundamente como você se vê e se relaciona.

É importante reconhecer que essas adaptações foram estratégias de sobrevivência emocional. Elas não definem quem você é, mas ajudaram a formar padrões que podem estar presentes hoje - na forma como você se cobra, estabelece limites, ou busca pertencimento.

Caso queira olhar para isso com mais profundidade, compreender esses padrões pode ser um caminho para desenvolver uma relação mais compassiva consigo mesmo e fazer escolhas mais alinhadas com quem você realmente é.`
};
