'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '@/contexts/AuthContext';
import { markReadingComplete } from '@/lib/supabase';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';

const introductionText = `INTRODUÇÃO — Identidade Negociada

Se você chegou até aqui, provavelmente já ouviu muitas explicações sobre narcisismo.

Talvez tenha ouvido que certas pessoas são "tóxicas". Talvez tenha escutado que alguns comportamentos são "manipulação". Talvez até tenham te dito que você foi vítima de alguém que "só queria te controlar".

Mas quase ninguém te explicou o ponto mais importante de todos:

o que isso exigiu de você.

Este material não é sobre rotular sua mãe. Não é sobre diagnosticar ninguém. E definitivamente não é sobre transformar histórias familiares em vilões e heróis.

Ele é sobre algo mais silencioso — e muito mais determinante:

👉 as negociações emocionais que você fez para manter o vínculo.

Toda criança quer pertencer. Quer ser aceita. Quer sentir que o amor não vai desaparecer.

Quando o afeto vem com condições — explícitas ou não — a criança aprende rápido: ela ajusta comportamento, emoção, silêncio, força… para não perder o lugar.

É aqui que nasce a identidade negociada.

Não como escolha consciente. Mas como adaptação.

Talvez você tenha aprendido a:

engolir sentimentos para evitar conflito
ser forte cedo demais
agradar para ser visto
assumir responsabilidades que não eram suas
ou se desconectar para não sentir

Nada disso te torna fraco. Nada disso define quem você é.

Mas tudo isso moldou quem você precisou se tornar.

Se você veio de conteúdos sobre narcisismo, pode ser que esteja buscando respostas claras, culpados claros, explicações diretas. Aqui, o caminho é diferente.

Não porque o impacto não foi real — mas porque entender a identidade que se formou é mais libertador do que apontar um rótulo.

Este e-book não substitui nada do que você já aprendeu. Ele ocupa um espaço que quase ninguém aborda.

O espaço entre:

o que você sentiu
e quem você virou para continuar pertencendo

No próximo capítulo, vamos olhar diretamente para isso. Não para o passado em si — mas para o papel emocional que começou a ser desempenhado ali e que, muitas vezes, continua ativo até hoje.`;

const chapters = [
  {
    number: 'I',
    title: 'O erro de procurar culpados',
    content: `Quando alguém descobre o termo "narcisismo", algo quase inevitável acontece: a mente corre para fora.

Ela começa a revisitar histórias, falas, cenas, comportamentos. Começa a montar um quebra-cabeça onde tudo finalmente parece fazer sentido.

"Então era isso." "Agora entendo por que doía." "Agora sei quem era o problema."

Esse momento pode trazer alívio. Dar nome a algo confuso costuma aliviar.

Mas existe um ponto em que essa busca começa a cobrar um preço alto — e quase ninguém fala sobre isso.

👉 quando toda a compreensão fica focada no outro, a própria história fica congelada.

O rótulo vira um lugar de descanso… mas também pode virar um lugar de prisão.

O perigo silencioso do diagnóstico emocional

Quanto mais a pessoa tenta entender o comportamento do outro, mais tempo ela passa mentalmente ligada a ele.

Não porque quer. Mas porque acredita que só assim vai se libertar.

O problema é que:

entender o outro não reorganiza quem você se tornou
identificar o padrão não desfaz a adaptação
apontar a origem não desmonta o papel aprendido

Muita gente passa anos acumulando informação e continua vivendo com as mesmas reações, os mesmos gatilhos, as mesmas negociações internas.

Não por falta de inteligência. Mas porque está olhando para o lugar errado.

Culpa externa não constrói autonomia interna

Existe uma diferença grande entre:

"Isso me afetou" e "Isso explica tudo que eu sou"

Quando a explicação vira identidade, a pessoa troca uma prisão por outra.

Ela deixa de se perguntar:

por que ainda me comporto assim?
por que isso ainda dói?
por que isso ainda se repete?

E passa a repetir apenas:

"porque eu vivi isso."

Esse livro não nega o impacto. Mas também não permite que o impacto vire destino.

Antes de existir qualquer rótulo, antes de existir qualquer explicação técnica, existiu algo mais simples — e mais profundo.

👉 uma adaptação emocional feita para não perder o vínculo.

É isso que vamos começar a olhar agora.

No próximo capítulo, entramos exatamente nesse ponto: o que acontece antes do rótulo, quando a criança ainda não entende o que está acontecendo, mas já está aprendendo quem precisa ser para permanecer.`
  },
  // Placeholder para os próximos capítulos
  {
    number: 'II',
    title: 'Antes do rótulo, existiu uma adaptação',
    content: `Se você chegou até aqui, provavelmente ouviu muitas coisas sobre narcisismo.

Talvez tenha assistido vídeos explicando comportamentos. Talvez tenha reconhecido alguém próximo. Talvez tenha sentido alívio por finalmente dar nome ao que viveu.

Ou talvez tenha sentido algo mais desconfortável:

"E se isso também existir em mim?"

Antes de qualquer coisa, é importante dizer algo que quase ninguém diz:

👉 rótulos explicam comportamentos, mas não explicam origens.

Eles ajudam a identificar padrões, mas não mostram como esses padrões nascem nem por que se repetem, inclusive em pessoas que sofreram.

Nem todo comportamento começou como escolha

Existe uma narrativa muito comum nas redes:

de um lado, o "narcisista"
do outro, a "vítima"

Essa divisão pode até aliviar a dor no começo, mas ela é rasa demais para explicar a realidade emocional.

Porque muitos comportamentos que hoje são chamados de narcisistas começaram, na verdade, como estratégias de adaptação.

Adaptação a quê?

A ambientes onde:

sentimentos não eram bem-vindos
vulnerabilidade não era segura
errar custava afeto
existir como se é não garantia pertencimento

Em contextos assim, usar máscaras não é maldade. É sobrevivência emocional.

Máscaras não surgem do ego. Surgem do medo de perder vínculo.

Antes de alguém aprender a controlar, a agradar, a manipular, a se defender excessivamente ou a se fechar… essa pessoa aprendeu algo mais básico:

"Do jeito que eu sou, eu não permaneço."

Alguns aprendem a se calar. Outros aprendem a dominar.
Alguns se tornam sensíveis demais. Outros rígidos demais.

O comportamento muda. A raiz é a mesma.

Por que este livro não vai te apontar culpados

Você não vai encontrar aqui uma lista de monstros.
Nem um manual para atacar pais, mães ou parceiros.

Porque isso mantém você preso ao mesmo jogo:

👉 o jogo de reagir, não de compreender.

Este livro parte de outro lugar.

Ele não pergunta:
"Quem foi o narcisista?"

Ele pergunta:
"O que você precisou aprender sobre si mesmo para continuar pertencendo?"

Essa pergunta serve:

para quem sofreu
para quem repete padrões
para quem sente culpa
para quem sente raiva
para quem sente confusão

Um aviso importante antes de seguir

Entender padrões não é se acusar.
Mas também não é se anestesiar.

Aqui, você não vai encontrar promessas de cura, nem atalhos emocionais.

O que você vai encontrar é clareza.

E clareza, às vezes, desmonta mais do que acusa.

No próximo capítulo, vamos olhar com mais profundidade para algo essencial:

👉 o papel emocional que se forma antes mesmo da identidade consciente existir.

É ali que tudo começa.`
  },
  {
    number: 'III',
    title: 'O papel emocional que você aprendeu a desempenhar',
    content: `Antes de você saber quem era, antes de ter linguagem para sentimentos, antes de entender dinâmica familiar, algo já estava acontecendo.

Você estava ocupando um lugar.

Toda família funciona como um sistema emocional. Mesmo sem regras claras, todos aprendem rapidamente: quem pode sentir o quê, quem pode precisar, quem pode errar, quem sustenta, quem cede.

E quando o ambiente é instável, imprevisível ou condicional, esse sistema não se organiza por escolha — ele se organiza por sobrevivência emocional.

Papéis não são escolhidos. São assumidos.

Ninguém acorda um dia e decide:

"Vou ser o forte."
"Vou ser o responsável."
"Vou ser o invisível."
"Vou ser o que não dá trabalho."

Esses papéis surgem como resposta ao clima emocional da casa.

Algumas crianças aprendem que:

sentir demais desorganiza o ambiente
precisar demais incomoda
discordar ameaça o vínculo
existir de forma espontânea não é seguro

Então elas fazem o que qualquer ser humano faria: se ajustam.

O papel vira uma forma de continuar pertencendo sem aumentar o risco.

O papel parece personalidade — mas não é

Com o tempo, esse papel deixa de ser percebido como estratégia. Ele começa a parecer:

"meu jeito"
"minha personalidade"
"quem eu sou"

A criança cresce sendo:

madura demais
sensível demais
controlada demais
prestativa demais
distante demais

E recebe reforços por isso.

"Você é tão forte."
"Você não dá trabalho."
"Você entende tudo."
"Você é diferente."

Pouca gente percebe que esses elogios às vezes não reconhecem a criança — reconhecem a função que ela cumpre.

Quando o papel vira obrigação interna

O problema não é ter desenvolvido esse papel. Ele foi necessário.

O problema começa quando:

o ambiente muda
a vida adulta chega
os contextos se transformam

…mas o papel continua operando como se ainda fosse vital.

A pessoa sente culpa ao relaxar. Ansiedade ao decepcionar. Vazio ao não ser necessária. Medo ao não controlar.

Não porque algo esteja "errado" com ela, mas porque o papel nunca foi revisado.

Ele foi mantido.

Um ponto essencial antes de seguir

Nem todo mundo que sofreu se torna vítima passiva. Nem todo mundo que se adapta se torna controlador. Mas todo papel emocional não revisado cobra um custo.

Este livro não está aqui para tirar funções à força. Nem para desmontar defesas rapidamente.

Ele está aqui para ajudar você a perceber algo fundamental:

👉 o papel que um dia te protegeu pode hoje estar te limitando.

No próximo capítulo, vamos avançar um passo com cuidado: não para mudar nada ainda, mas para entender quando esse papel deixou de ser apenas adaptação e começou a se confundir com identidade.

É ali que a negociação se aprofunda.`
  },
  {
    number: 'IV',
    title: 'Quando o papel começa a se confundir com quem você é',
    content: `Existe um momento silencioso — e quase nunca consciente — em que o papel deixa de ser apenas uma resposta ao ambiente e começa a ser vivido como identidade.

Não acontece de uma vez. Não vem com aviso. Acontece aos poucos.

A criança que aprendeu a se ajustar cresce. O ambiente muda. Mas a lógica interna permanece.

O que antes era:
"Eu faço isso para não perder o vínculo"

vira:
"Eu sou assim."

A identidade se forma em cima do que funcionou

Nenhuma identidade nasce do nada. Ela se organiza a partir do que foi validado, aceito ou tolerado.

Se ser forte manteve o amor, a força vira valor absoluto.
Se não precisar evitou rejeição, a autossuficiência vira regra.
Se agradar trouxe segurança, o outro vira prioridade constante.

Não porque seja saudável — mas porque funcionou.

A identidade, nesse ponto, não é quem você é em essência. É quem você aprendeu que precisava ser para continuar existindo emocionalmente.

O custo de não perceber essa transição

Enquanto o papel é visto como escolha, existe liberdade.
Quando ele vira identidade, ele vira obrigação interna.

A pessoa não percebe, mas começa a:

se sentir culpada ao sair do papel
sentir ansiedade ao contrariar expectativas
experimentar vazio quando não está "cumprindo"
confundir descanso com fraqueza
confundir limite com egoísmo

Nada disso aparece como "problema familiar". Aparece como traço pessoal.

"Eu sou assim mesmo."
"Sempre fui desse jeito."
"Não consigo ser diferente."

Mas o que parece natureza muitas vezes é lealdade emocional antiga.

Identidade negociada não é identidade escolhida

Este é um ponto-chave deste livro.

Identidade negociada é aquela construída a partir de acordos silenciosos:

eu fico, se eu for assim
eu pertenço, se eu não for isso
eu sou amado, se eu não precisar tanto

Esses acordos não foram feitos com palavras. Foram feitos com medo de perder.

E tudo que nasce do medo tende a se endurecer.

Um detalhe importante

Perceber isso não significa culpar o passado. Nem desfazer quem você se tornou.

Significa apenas reconhecer:

👉 nem tudo que hoje parece "quem eu sou" nasceu como escolha livre.

Essa percepção não muda nada imediatamente. E não precisa mudar.

Mas ela cria uma fenda. Pequena. Silenciosa. Honesta.

No próximo capítulo, vamos olhar para essa fenda com mais atenção: o ponto em que a pessoa começa a sentir que algo não encaixa mais — mesmo sem saber exatamente o quê.

É aí que muitos chamam de crise. Aqui, vamos chamar de sinal.`
  },
  {
    number: 'V',
    title: 'Quando o que te sustentou começa a te cansar',
    content: `Existe um momento em que aquilo que um dia funcionou

para manter o vínculo
para garantir pertencimento
para evitar dor

…começa a pesar.

Não porque você esteja errado. Mas porque a fase mudou — e o papel não acompanhou.

O cansaço que não vem do corpo

Muitas pessoas chegam até conteúdos sobre narcisismo não por raiva, mas por exaustão.

Um cansaço difícil de explicar:

cansaço de se adaptar
cansaço de se explicar
cansaço de sustentar expectativas
cansaço de ser sempre o mesmo papel

Não é preguiça. Não é fraqueza. É desgaste de identidade.

Quando a pessoa vive muito tempo sendo algo para manter o vínculo, o custo aparece mais tarde — geralmente quando a vida pede algo novo.

A sensação de "não caber mais"

Esse é um sinal comum: a pessoa sente que não cabe mais em si mesma.

O que antes parecia certo agora gera:

irritação sem motivo claro
sensação de estar vivendo no automático
conflitos internos silenciosos
vontade de se afastar sem saber de quê
culpa por desejar algo diferente

Ela tenta voltar ao papel antigo. Tenta se ajustar mais. Tenta "ser grata".

Mas o incômodo não some.

Porque o problema não é falta de esforço. É excesso de lealdade.

Quando o rótulo vira alívio temporário

É aqui que muitos encontram os rótulos.

"Narcisista." "Tóxico." "Abusivo."

Esses nomes aliviam por um momento, porque organizam a dor.

Mas se a pessoa para aí, ela corre o risco de continuar presa ao mesmo lugar: reagindo ao outro, em vez de se escutar.

O rótulo explica o passado, mas não responde a pergunta que o cansaço traz:

👉 "Quem eu sou além do papel que me manteve?"

Um ponto delicado (e importante)

Sentir esse cansaço não significa que você precisa romper tudo. Nem que alguém precisa ser confrontado. Nem que sua história foi uma mentira.

Significa apenas que a identidade negociada cumpriu sua função — e agora pede revisão.

Não por revolta. Mas por maturidade emocional.

O convite silencioso desse cansaço

O cansaço não vem para te punir. Ele vem para avisar.

Avisar que:

você cresceu
o contexto mudou
a adaptação antiga não te sustenta mais

No próximo capítulo, vamos olhar para o medo que surge exatamente aqui: o medo de existir sem o papel, sem a máscara, sem a função.

Esse medo é o último guardião da identidade negociada.`
  },
  {
    number: 'VI',
    title: 'O medo de existir sem o papel',
    content: `Quando a identidade negociada começa a falhar, o primeiro sentimento que surge não é liberdade.

É medo.

Não um medo barulhento. Mas um medo silencioso, profundo e difícil de nomear.

Não é medo de mudar.

É medo de deixar de ser necessário.

Para quem cresceu ajustando comportamento para manter vínculo, existir sempre esteve ligado a uma função.

Ser:

o forte
o sensato
o que resolve
o que entende
o que não dá trabalho

Quando o cansaço aparece, o inconsciente faz uma pergunta perigosa:

👉 "Se eu não for isso… o que sobra de mim?"

E mais fundo ainda:

👉 "Se eu não for isso… eu ainda pertenço?"

O vazio que assusta mais do que a dor

Muita gente prefere continuar cansada a encarar o vazio temporário que surge sem o papel.

Porque o papel dói, mas é conhecido.

O vazio não dói — ele assusta.

Assusta porque:

não tem roteiro
não tem aprovação garantida
não tem identidade pronta

É aqui que muitos voltam atrás. Reforçam o personagem. Se cobram mais. Se anulam mais um pouco.

Não por fraqueza. Por lealdade emocional.

Por que a culpa aparece nesse ponto

Quando a pessoa começa a questionar o papel, a culpa surge rápido.

Culpa por:

desejar distância
desejar silêncio
desejar algo próprio
desejar não sustentar tudo

Essa culpa não é sinal de egoísmo. É sinal de que o pertencimento foi aprendido como troca.

"Se eu paro de entregar, eu perco."

Essa equação não foi pensada. Foi aprendida.

Um ponto crucial

Questionar o papel não é rejeitar sua história. Nem negar o amor que existiu. Nem acusar ninguém.

É apenas reconhecer algo simples:

👉 você não é só o que aprendeu a ser para sobreviver emocionalmente.

Isso não destrói vínculos. Mas pode desmontar ilusões.

O medo não é o inimigo

Aqui vai algo importante: o medo que aparece não precisa ser vencido. Ele precisa ser compreendido.

Ele existe para proteger algo antigo: a ligação. A pertença. O amor.

Só que agora, a mesma proteção que antes te salvava começa a te limitar.

No próximo capítulo — o último deste material — vamos olhar para o ponto de virada: o momento em que a consciência surge, antes de qualquer reconstrução, antes de qualquer caminho.

Não é sobre mudar ainda. É sobre parar de fugir de si.`
  },
  {
    number: 'VII',
    title: 'Quando você percebe — e ainda não sabe o que fazer',
    content: `Existe um momento específico nesse processo. Ele não é explosivo. Não é libertador. Não é empolgante.

Ele é silencioso.

É quando você percebe que:

não dá mais para fingir que não vê
mas também não sabe como ser diferente
e ainda não quer (ou não pode) romper nada

Esse é o ponto mais honesto de todos.

Consciência não é mudança

Muita gente confunde consciência com transformação. Mas consciência é só enxergar.

E enxergar, no começo, dói.

Porque você passa a notar:

quando está agradando automaticamente
quando está se anulando sem perceber
quando está assumindo papéis que ninguém pediu
quando está se culpando por querer menos peso

Nada disso te torna livre ainda. Mas te torna presente.

Por que esse ponto é tão desconfortável

Antes, havia um personagem funcionando. Agora, há alguém observando.

E esse alguém ainda não tem linguagem, nem estrutura, nem permissão interna para existir plenamente.

Por isso surge a sensação de:

estar no meio do caminho
não caber mais onde estava
mas ainda não saber onde ficar

Esse "entre" é real. E não precisa ser resolvido agora.

Um erro comum aqui

Nesse ponto, muitas pessoas:

tentam acelerar
buscam soluções prontas
pulam direto para técnicas
tentam se reconstruir antes de se reconhecer

Isso só cria um novo personagem: o do "curado", do "resolvido", do "evoluído".

E o ciclo recomeça.

O que este livro fez — e o que ele não fez

Este material não te consertou. E nem tentou.

Ele fez algo mais raro:

👉 te devolveu a percepção de onde você está.

Ele não disse quem você é. Não disse quem você deveria ser. Não disse o que fazer com sua família, sua mãe ou sua história.

Ele apenas apontou:

o papel
a negociação
o medo
o ponto em que a consciência surge

Isso já é muito. E, para muitos, já é o início.

Uma última coisa, antes de fechar

Se você sentiu que algo aqui tocou fundo, não é porque você está quebrado.

É porque algo em você nunca teve espaço para existir sem precisar se explicar.

E agora foi visto.

Sem pressa. Sem promessa. Sem culpa.

Se em algum momento você quiser seguir adiante, o próximo passo não é "se tornar alguém novo".

É, pela primeira vez, não precisar negociar para existir.`
  }
];

export default function LeituraPage() {
  const { user } = useAuth();
  const searchParams = useSearchParams();
  const [displayedText, setDisplayedText] = useState('');
  const [isIntroComplete, setIsIntroComplete] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showChapters, setShowChapters] = useState(false);
  const [selectedChapter, setSelectedChapter] = useState<number | null>(null);
  const [showFinalScreen, setShowFinalScreen] = useState(false);

  // Verificar se há parâmetro de capítulo na URL
  useEffect(() => {
    const chapterParam = searchParams.get('chapter');
    if (chapterParam !== null) {
      const chapterIndex = parseInt(chapterParam, 10);
      if (!isNaN(chapterIndex) && chapterIndex >= 0 && chapterIndex < chapters.length) {
        setSelectedChapter(chapterIndex);
        setShowChapters(false);
        setIsIntroComplete(true);
      }
    }
  }, [searchParams]);

  // Efeito de digitação apenas na introdução
  useEffect(() => {
    if (!showChapters && selectedChapter === null && currentIndex < introductionText.length) {
      const timeout = setTimeout(() => {
        setDisplayedText(prev => prev + introductionText[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      }, 30);

      return () => clearTimeout(timeout);
    } else if (currentIndex >= introductionText.length && !isIntroComplete && selectedChapter === null) {
      setIsIntroComplete(true);
    }
  }, [currentIndex, showChapters, isIntroComplete, selectedChapter]);

  const handleShowChapters = () => {
    setShowChapters(true);
  };

  const handleSelectChapter = (index: number) => {
    setSelectedChapter(index);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackToIntro = () => {
    setSelectedChapter(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleShowFinalScreen = () => {
    setShowFinalScreen(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleContinue = async () => {
    // Marcar leitura como concluída no Supabase
    if (user) {
      try {
        await markReadingComplete(user.id);
        console.log('✅ Leitura marcada como concluída');
      } catch (error) {
        console.error('❌ Erro ao marcar leitura como concluída:', error);
      }
    }
    
    // Redirecionar para a página de boas-vindas
    window.location.href = '/bem-vindo';
  };

  // Tela final de transição
  if (showFinalScreen) {
    return (
      <main className="min-h-screen bg-background flex items-center justify-center px-6">
        <div className="max-w-2xl mx-auto text-center">
          
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 2, delay: 0.5 }}
          >
            <p 
              className="text-2xl md:text-3xl font-light text-foreground/90 leading-relaxed mb-8"
              style={{ fontFamily: 'Georgia, serif' }}
            >
              Você não saiu do lugar onde começou.
              <br />
              Mas não está mais no mesmo ponto.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 2, delay: 1.5 }}
          >
            <p 
              className="text-lg font-light text-foreground/70 leading-relaxed mb-16"
              style={{ fontFamily: 'Georgia, serif' }}
            >
              O que foi visto não exige reação.
              <br />
              Exige continuidade.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 2, delay: 2.5 }}
          >
            <button
              onClick={handleContinue}
              className="px-12 py-4 border border-foreground/20 text-foreground/80 hover:bg-foreground/5 font-light text-sm tracking-wider transition-all duration-500"
            >
              Continuar
            </button>
          </motion.div>

        </div>
      </main>
    );
  }

  if (selectedChapter !== null) {
    // Visualização de capítulo
    const chapter = chapters[selectedChapter];
    return (
      <main className="min-h-screen bg-background py-16 px-6">
        <div className="max-w-3xl mx-auto">
          
          {/* Botão voltar ao índice */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            <Link
              href="/leitura/capitulos"
              className="inline-flex items-center text-foreground/60 hover:text-foreground font-light text-sm transition-colors duration-300"
            >
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
              Índice de capítulos
            </Link>
          </motion.div>
          
          {/* Título do capítulo */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="mb-16"
          >
            <p className="text-muted/60 text-sm font-light tracking-wider mb-4">
              CAPÍTULO {chapter.number}
            </p>
            <h1 
              className="text-2xl font-light text-foreground/90 leading-relaxed"
              style={{ fontFamily: 'Georgia, serif' }}
            >
              {chapter.title}
            </h1>
          </motion.div>

          {/* Conteúdo do capítulo */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="prose prose-lg max-w-none"
          >
            <div 
              className="text-foreground/80 font-light leading-relaxed whitespace-pre-wrap"
              style={{ fontFamily: 'Georgia, serif', fontSize: '1.125rem', lineHeight: '1.8' }}
            >
              {chapter.content}
            </div>
          </motion.div>

          {/* Navegação */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="mt-24 pt-8 border-t border-foreground/10 flex justify-between items-center"
          >
            <button
              onClick={handleBackToIntro}
              className="text-foreground/60 hover:text-foreground font-light text-sm transition-colors duration-300"
            >
              ← Voltar à introdução
            </button>

            {selectedChapter < chapters.length - 1 ? (
              <button
                onClick={() => handleSelectChapter(selectedChapter + 1)}
                className="text-foreground/60 hover:text-foreground font-light text-sm transition-colors duration-300"
              >
                Próximo capítulo →
              </button>
            ) : (
              <button
                onClick={handleShowFinalScreen}
                className="text-foreground/60 hover:text-foreground font-light text-sm transition-colors duration-300"
              >
                Continuar →
              </button>
            )}
          </motion.div>

        </div>
      </main>
    );
  }

  // Visualização da introdução
  return (
    <main className="min-h-screen bg-background py-16 px-6">
      <div className="max-w-3xl mx-auto">
        
        {/* Botão voltar ao índice */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <Link
            href="/leitura/capitulos"
            className="inline-flex items-center text-foreground/60 hover:text-foreground font-light text-sm transition-colors duration-300"
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
            Índice de capítulos
          </Link>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="prose prose-lg max-w-none"
        >
          <div 
            className="text-foreground/90 font-light leading-relaxed whitespace-pre-wrap"
            style={{ fontFamily: 'Georgia, serif', fontSize: '1.125rem', lineHeight: '1.8' }}
          >
            {displayedText}
            {!isIntroComplete && (
              <span className="inline-block w-0.5 h-5 bg-foreground/40 ml-0.5 animate-pulse"></span>
            )}
          </div>
        </motion.div>

        {/* Indicador de scroll após término */}
        {isIntroComplete && !showChapters && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 1 }}
            className="mt-24 text-center"
          >
            <button
              onClick={handleShowChapters}
              className="text-muted/60 hover:text-foreground text-sm font-light tracking-wide transition-colors duration-300"
            >
              Ver capítulos
            </button>
            <div className="mt-4 flex justify-center">
              <div className="w-px h-12 bg-foreground/20"></div>
            </div>
          </motion.div>
        )}

        {/* Lista de capítulos */}
        {showChapters && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
            className="mt-32"
          >
            <h2 
              className="text-xl font-light text-foreground/80 mb-12 text-center tracking-wide"
              style={{ fontFamily: 'Georgia, serif' }}
            >
              Capítulos
            </h2>
            
            <div className="space-y-6">
              {chapters.map((chapter, index) => (
                <motion.button
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 + (index * 0.1), duration: 0.6 }}
                  onClick={() => handleSelectChapter(index)}
                  className="w-full text-left px-8 py-6 border border-foreground/10 hover:bg-foreground/5 transition-all duration-300"
                >
                  <p className="text-muted/60 text-xs font-light tracking-wider mb-2">
                    CAPÍTULO {chapter.number}
                  </p>
                  <p className="text-foreground/80 font-light text-lg">
                    {chapter.title}
                  </p>
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}

      </div>
    </main>
  );
}
