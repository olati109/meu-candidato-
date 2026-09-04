import { useEffect, useRef, useState } from "react";

function useIntersection(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return { ref, visible };
}

function FadeUp({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  const { ref, visible } = useIntersection();
  return (
    <div
      ref={ref}
      className={`animate-fade-up ${visible ? "visible" : ""} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

const PROPOSALS = [
  {
    emoji: "🦜",
    title: "WIFI GRÁTIS EM TODO BOTECO",
    desc: "Para que o povo possa discutir política em tempo real, com dados ilimitados no ZAP.",
    badge: "META PRIORITÁRIA",
  },
  {
    emoji: "☕",
    title: "CAFÉ SUBSIDIADO AO TRABALHADOR",
    desc: "Nenhum brasileiro vai trabalhar sem café. É uma questão de dignidade nacional e produtividade.",
    badge: "EM ANÁLISE",
  },
  {
    emoji: "🎙️",
    title: "HORÁRIO ELEITORAL 24H",
    desc: "Porque 45 dias não são suficientes. O povo merece mais jingles, e o candidato também.",
    badge: "PROPOSTA AUDACIOSA",
  },
  {
    emoji: "📱",
    title: "MODERAÇÃO NO GRUPO DA FAMÍLIA",
    desc: "Um moderador oficial do governo para cada grupo de WhatsApp da família brasileira.",
    badge: "URGENTE",
  },
  {
    emoji: "🏆",
    title: "COPA A CADA 2 ANOS",
    desc: "Porque esperar 4 anos é tempo demais. O Brasil merece mais taças, mais seleção, mais emoção.",
    badge: "VIÁVEL",
  },
  {
    emoji: "🍖",
    title: "CHURRASCO COMO DIREITO UNIVERSAL",
    desc: "Picanha na mesa de todo trabalhador. Sem asterisco, sem condicional, sem miolo de alcatra.",
    badge: "JÁ TESTADO",
  },
];

const STATS = [
  { number: "99%", label: "de confiança da tia do WhatsApp", sub: "(baseado em correntes não verificadas)" },
  { number: "87M", label: "de opiniões diferentes sobre o mesmo assunto", sub: "uma por brasileiro" },
  { number: "1", label: "país inteiro discutindo no grupo da família", sub: "diariamente, incluindo domingo" },
  { number: "∞", label: "memes gerados por campanha", sub: "número cresce a cada discurso" },
  { number: "3", label: "vezes que você já mudou de opinião hoje", sub: "sem contar após o café" },
  { number: "100%", label: "dos brasileiros têm opinião política firme", sub: "até alguém falar diferente" },
];

const TESTIMONIALS = [
  { name: "Dona Zuleide, 67", local: "Vitória da Conquista, BA", text: "Já votei nele, vou votar de novo. E se precisar voto uma terceira vez. Pode isso Arnaldo?" },
  { name: "Marquinhos, 28", local: "São Paulo, SP", text: "Discordo de tudo mas minha família vai me crucificar se eu votar diferente. O que é democracia?" },
  { name: "Professor Waldomiro", local: "Recife, PE", text: "Dei aula sobre ele por 20 anos. Agora meus alunos me dão aula sobre ele. A vida é cíclica." },
  { name: "Tia Marlene", local: "Grupo da Família 👨‍👩‍👧‍👦", text: "Mandei esse link no grupo e fui removida. Mas eu continuo apoiando." },
  { name: "Reinaldo, 45", local: "Porto Alegre, RS", text: "Nunca concordei com nada mas admiro a consistência. Parece minha esposa." },
  { name: "Giovanna, 22", local: "TikTok", text: "Fiz um vídeo falando dele e ganhei 2 milhões de visualizações. Não sei se é bom ou ruim." },
];

const FAQS = [
  {
    q: "Preciso votar mesmo?",
    a: "Tecnicamente é obrigatório. Mas se você tiver 70 anos ou mais, pode descansar. O país agradece o seu serviço.",
  },
  {
    q: "Tem horário eleitoral?",
    a: "Tem sim. Ele aparece bem na hora que você liga a TV para ver qualquer outra coisa. A democracia funciona assim.",
  },
  {
    q: "Posso discordar nos comentários?",
    a: "Pode. Mas esteja ciente de que isso iniciará um ciclo de 47 respostas, 12 emojis e pelo menos 3 printscreens.",
  },
  {
    q: "É possível não ter opinião?",
    a: "No Brasil? Não. Você vai ter uma antes de terminar de ler essa frase. Já aconteceu.",
  },
  {
    q: "Essa página é oficial?",
    a: "Não. É uma paródia. Humorística. Satírica. De portfólio. Se você chegou aqui achando que era oficial, a gente respeita a jornada.",
  },
  {
    q: "O que acontece se eu clicar em 'Vote Agora'?",
    a: "Absolutamente nada de oficial. É um botão fictício de uma página fictícia. Mas clique mesmo assim, faz bem para o ego do desenvolvedor.",
  },
];

export default function App() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="min-h-screen bg-white text-gray-900 overflow-x-hidden">

      {/* HEADER */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? "bg-white/95 backdrop-blur-md shadow-lg" : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-red-600 flex items-center justify-center text-white font-display font-black text-sm">
              L
            </div>
            <span className="font-display font-black text-xl tracking-wide uppercase text-red-700">
              Lula<span className="text-gray-900">2026</span>
              <span className="text-xs font-body font-medium text-gray-400 ml-2 normal-case tracking-normal">PARÓDIA</span>
            </span>
          </div>

          <nav className="hidden md:flex items-center gap-8">
            {["Por que ele?", "Propostas", "Números", "FAQ"].map((item) => (
              <a
                key={item}
                href="#"
                className={`text-sm font-semibold tracking-wide uppercase transition-colors ${
                  scrolled ? "text-gray-700 hover:text-red-600" : "text-white/90 hover:text-white"
                }`}
              >
                {item}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <button className="hidden md:block bg-red-600 hover:bg-red-700 text-white font-display font-bold text-sm uppercase tracking-widest px-5 py-2.5 transition-all duration-200 hover:scale-105 active:scale-95">
              VOTE AGORA
            </button>
            <button
              className="md:hidden p-2"
              onClick={() => setMobileMenu(!mobileMenu)}
            >
              <div className={`w-6 h-0.5 mb-1.5 transition-all ${scrolled ? "bg-gray-900" : "bg-white"}`} />
              <div className={`w-6 h-0.5 mb-1.5 transition-all ${scrolled ? "bg-gray-900" : "bg-white"}`} />
              <div className={`w-6 h-0.5 transition-all ${scrolled ? "bg-gray-900" : "bg-white"}`} />
            </button>
          </div>
        </div>

        {mobileMenu && (
          <div className="md:hidden bg-white border-t border-gray-100 px-6 py-4 space-y-3">
            {["Por que ele?", "Propostas", "Números", "FAQ"].map((item) => (
              <a key={item} href="#" className="block text-sm font-semibold uppercase tracking-wide text-gray-700 hover:text-red-600">
                {item}
              </a>
            ))}
            <button className="w-full bg-red-600 text-white font-display font-bold text-sm uppercase tracking-widest px-5 py-3 mt-2">
              VOTE AGORA
            </button>
          </div>
        )}
      </header>

      {/* HERO */}
      <section className="relative min-h-screen flex items-center overflow-hidden bg-gray-950">
        <div className="absolute inset-0 star-pattern" />
        <div
          className="absolute inset-0 opacity-30"
          style={{
            background: "radial-gradient(ellipse 80% 70% at 60% 50%, #7b0000 0%, transparent 70%)",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-gray-950 via-gray-950/80 to-transparent" />

        {/* Hero image */}
        <div className="absolute right-0 top-0 bottom-0 w-full md:w-3/5">
          <img
            src="https://images.unsplash.com/photo-1540910419892-4a36d2c3266c?w=1200&h=900&fit=crop&auto=format"
            alt="Imagem de paródia política — fotografia editorial fictícia"
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-gray-950 via-gray-950/40 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-950/80 via-transparent to-gray-950/20" />
        </div>

        {/* Red accent bar */}
        <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-red-600" />

        <div className="relative z-10 max-w-7xl mx-auto px-8 md:px-12 py-32">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 bg-red-600 text-white text-xs font-display font-bold uppercase tracking-widest px-4 py-2 mb-8">
              ★ CAMPANHA FICTÍCIA 2026 ★
            </div>

            <h1 className="font-display font-black text-white leading-none mb-6" style={{ fontSize: "clamp(3.5rem, 8vw, 7rem)" }}>
              LULA 2026
              <span className="block text-red-500">AGORA VAI.</span>
              <span className="block italic" style={{ fontSize: "0.65em" }}>DE NOVO.</span>
            </h1>

            <p className="text-gray-300 font-body text-lg md:text-xl leading-relaxed mb-10 max-w-lg">
              Porque o Brasil é grande demais para caber em apenas um mandato.
              Ou dois. Ou três. A história é longa,{" "}
              <span className="text-red-400 font-semibold">o povo é teimoso</span>, e essa página é ficção.
            </p>

            <div className="flex flex-wrap gap-4">
              <button className="group bg-red-600 hover:bg-red-500 text-white font-display font-black text-base uppercase tracking-widest px-8 py-4 transition-all duration-200 hover:scale-105 active:scale-95 flex items-center gap-3">
                QUERO PARTICIPAR DESSA HISTÓRIA
                <span className="group-hover:translate-x-1 transition-transform">→</span>
              </button>
              <button className="border-2 border-white/30 hover:border-white/60 text-white/80 hover:text-white font-display font-bold text-sm uppercase tracking-widest px-6 py-4 transition-all duration-200">
                SAIBA MAIS
              </button>
            </div>

            <p className="mt-6 text-gray-500 text-xs uppercase tracking-widest">
              ⚠️ Página fictícia · Conteúdo humorístico · Não é campanha oficial
            </p>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/40">
          <span className="text-xs uppercase tracking-widest font-display">Role</span>
          <div className="w-px h-12 bg-gradient-to-b from-white/40 to-transparent animate-pulse" />
        </div>
      </section>

      {/* DISCLAIMER BANNER */}
      <div className="bg-yellow-50 border-y border-yellow-200 py-3 px-6">
        <p className="text-center text-yellow-800 text-sm font-medium">
          🎭 <strong>PARÓDIA HUMORÍSTICA</strong> — Este site é totalmente fictício e criado para fins de humor e portfólio.
          Não pertence ao candidato nem a nenhum partido político. <strong>Não é campanha oficial.</strong>
        </p>
      </div>

      {/* POR QUE ELE? */}
      <section className="py-24 md:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <FadeUp>
            <div className="text-center mb-16">
              <div className="inline-block text-xs font-display font-bold uppercase tracking-widest text-red-600 border border-red-200 px-4 py-1.5 mb-6">
                A pergunta que todos fazem
              </div>
              <h2
                className="font-display font-black text-gray-950 leading-none"
                style={{ fontSize: "clamp(2.5rem, 6vw, 5rem)" }}
              >
                POR QUE ELE?
              </h2>
              <p className="text-gray-500 text-lg mt-4 max-w-xl mx-auto">
                Três razões que nenhum grupo de WhatsApp vai contestar sem pelo menos três horas de debate.
              </p>
            </div>
          </FadeUp>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                num: "01",
                title: "PORQUE JÁ TENTAMOS OUTRA COISA",
                desc: "A história brasileira é uma caixinha de surpresas. Às vezes você experimenta o novo e descobre que o velho tinha seus méritos. Não é nostalgia, é peer review.",
                color: "border-red-600",
              },
              {
                num: "02",
                title: "PORQUE ELE VOLTA",
                desc: "Como toda boa franquia, o protagonista retorna. Mais experiente, mais resiliente, e com muito mais material para seus críticos e seus apoiadores igualmente.",
                color: "border-gray-900",
              },
              {
                num: "03",
                title: "PORQUE O BRASIL MERECE",
                desc: "Esse argumento funciona para qualquer candidato e qualquer eleição no mundo inteiro. Mas soa muito bem em palanque com som alto e fogos de artifício.",
                color: "border-red-600",
              },
            ].map((card, i) => (
              <FadeUp key={i} delay={i * 120}>
                <div
                  className={`group border-t-4 ${card.color} bg-white p-8 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1`}
                >
                  <span className="font-display font-black text-6xl text-gray-100 block mb-4 group-hover:text-red-50 transition-colors">
                    {card.num}
                  </span>
                  <h3 className="font-display font-bold text-xl uppercase tracking-wide text-gray-900 mb-3 leading-tight">
                    {card.title}
                  </h3>
                  <p className="text-gray-500 leading-relaxed text-sm">{card.desc}</p>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* GRANDES PROPOSTAS */}
      <section className="py-24 md:py-32 bg-gray-950 relative overflow-hidden">
        <div className="absolute inset-0 star-pattern opacity-50" />
        <div className="absolute top-0 left-0 right-0 h-px bg-red-600" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-red-600" />

        <div className="relative max-w-7xl mx-auto px-6 md:px-12">
          <FadeUp>
            <div className="text-center mb-16">
              <div className="inline-block text-xs font-display font-bold uppercase tracking-widest text-red-400 border border-red-800 px-4 py-1.5 mb-6">
                Programa de Governo Fictício
              </div>
              <h2
                className="font-display font-black text-white leading-none"
                style={{ fontSize: "clamp(2.5rem, 6vw, 5rem)" }}
              >
                GRANDES{" "}
                <span className="text-red-500">PROPOSTAS</span>
              </h2>
              <p className="text-gray-400 text-lg mt-4 max-w-xl mx-auto">
                Um programa de governo à altura das expectativas do povo brasileiro.
                Todas as propostas são fictícias. Todas mesmo.
              </p>
            </div>
          </FadeUp>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {PROPOSALS.map((p, i) => (
              <FadeUp key={i} delay={i * 80}>
                <div className="group bg-white/5 hover:bg-white/10 border border-white/10 hover:border-red-600/50 p-6 transition-all duration-300">
                  <div className="text-4xl mb-4">{p.emoji}</div>
                  <div className="inline-block text-xs font-display font-bold uppercase tracking-widest text-red-400 bg-red-950/50 px-2.5 py-1 mb-3">
                    {p.badge}
                  </div>
                  <h3 className="font-display font-bold text-white text-lg uppercase tracking-wide leading-tight mb-2">
                    {p.title}
                  </h3>
                  <p className="text-gray-400 text-sm leading-relaxed">{p.desc}</p>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* NÚMEROS DA CAMPANHA */}
      <section className="py-24 md:py-32 bg-red-600 relative overflow-hidden">
        <div className="absolute inset-0 diagonal-stripe" />
        <div className="relative max-w-7xl mx-auto px-6 md:px-12">
          <FadeUp>
            <div className="text-center mb-16">
              <div className="inline-block text-xs font-display font-bold uppercase tracking-widest text-white/70 border border-white/30 px-4 py-1.5 mb-6">
                Dados não verificados por nenhuma urna
              </div>
              <h2
                className="font-display font-black text-white leading-none"
                style={{ fontSize: "clamp(2.5rem, 6vw, 5rem)" }}
              >
                NÚMEROS DA{" "}
                <span className="text-yellow-300">CAMPANHA</span>
              </h2>
            </div>
          </FadeUp>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-6 md:gap-8">
            {STATS.map((s, i) => (
              <FadeUp key={i} delay={i * 80}>
                <div className="text-center">
                  <div className="font-display font-black text-white number-counter leading-none mb-2" style={{ fontSize: "clamp(2.5rem, 5vw, 4.5rem)" }}>
                    {s.number}
                  </div>
                  <p className="text-white/90 font-semibold text-sm leading-tight mb-1">{s.label}</p>
                  <p className="text-white/50 text-xs italic">{s.sub}</p>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* DEPOIMENTOS */}
      <section className="py-24 md:py-32 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <FadeUp>
            <div className="text-center mb-16">
              <div className="inline-block text-xs font-display font-bold uppercase tracking-widest text-red-600 border border-red-200 px-4 py-1.5 mb-6">
                Voz do povo — fictícia, mas representativa
              </div>
              <h2
                className="font-display font-black text-gray-950 leading-none"
                style={{ fontSize: "clamp(2.5rem, 6vw, 5rem)" }}
              >
                DEPOIMENTOS
              </h2>
            </div>
          </FadeUp>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {TESTIMONIALS.map((t, i) => (
              <FadeUp key={i} delay={i * 80}>
                <div className="bg-white p-6 shadow-sm hover:shadow-md transition-shadow border-l-4 border-red-600">
                  <div className="text-4xl text-red-100 font-display font-black leading-none mb-3">"</div>
                  <p className="text-gray-700 leading-relaxed mb-5 italic">"{t.text}"</p>
                  <div>
                    <p className="font-display font-bold text-gray-900 uppercase tracking-wide text-sm">{t.name}</p>
                    <p className="text-gray-400 text-xs mt-0.5">{t.local}</p>
                  </div>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24 md:py-32 bg-white">
        <div className="max-w-3xl mx-auto px-6 md:px-12">
          <FadeUp>
            <div className="text-center mb-16">
              <div className="inline-block text-xs font-display font-bold uppercase tracking-widest text-red-600 border border-red-200 px-4 py-1.5 mb-6">
                Perguntas que ninguém tem vergonha de fazer
              </div>
              <h2
                className="font-display font-black text-gray-950 leading-none"
                style={{ fontSize: "clamp(2.5rem, 6vw, 5rem)" }}
              >
                PERGUNTAS<br />
                <span className="text-red-600">FREQUENTES</span>
              </h2>
            </div>
          </FadeUp>

          <div className="space-y-3">
            {FAQS.map((faq, i) => (
              <FadeUp key={i} delay={i * 60}>
                <div className="border border-gray-200 overflow-hidden">
                  <button
                    className="w-full flex items-center justify-between px-6 py-5 text-left hover:bg-gray-50 transition-colors"
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  >
                    <span className="font-display font-bold text-gray-900 uppercase tracking-wide text-base pr-4">
                      {faq.q}
                    </span>
                    <span
                      className={`text-red-600 font-bold text-xl flex-shrink-0 transition-transform duration-200 ${
                        openFaq === i ? "rotate-45" : ""
                      }`}
                    >
                      +
                    </span>
                  </button>
                  <div
                    className={`overflow-hidden transition-all duration-300 ${
                      openFaq === i ? "max-h-40" : "max-h-0"
                    }`}
                  >
                    <p className="px-6 pb-5 text-gray-500 leading-relaxed border-t border-gray-100 pt-4">
                      {faq.a}
                    </p>
                  </div>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* CTA FINAL */}
      <section className="py-32 md:py-40 bg-gray-950 relative overflow-hidden">
        <div className="absolute inset-0 star-pattern opacity-40" />
        <div
          className="absolute inset-0 opacity-20"
          style={{ background: "radial-gradient(ellipse 60% 80% at 50% 50%, #7b0000 0%, transparent 70%)" }}
        />
        <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-red-600" />
        <div className="absolute right-0 top-0 bottom-0 w-1.5 bg-red-600" />

        <div className="relative max-w-4xl mx-auto px-8 text-center">
          <FadeUp>
            <div className="inline-block text-xs font-display font-bold uppercase tracking-widest text-red-400 border border-red-800 px-4 py-1.5 mb-8">
              Contagem regressiva fictícia em andamento
            </div>
            <h2
              className="font-display font-black text-white leading-none mb-6"
              style={{ fontSize: "clamp(3rem, 8vw, 7rem)" }}
            >
              2026 ESTÁ<br />
              <span className="text-red-500">CHEGANDO.</span>
            </h2>
            <p className="text-gray-400 text-xl leading-relaxed mb-12 max-w-2xl mx-auto">
              E com ele vem a polêmica, os memes, os debates na mesa do almoço e pelo menos
              três grupinhos de WhatsApp novos. Você vai estar do lado certo da história.
              Ou não. Mas vai estar aqui.
            </p>
            <button className="group bg-red-600 hover:bg-red-500 text-white font-display font-black text-lg uppercase tracking-widest px-10 py-5 transition-all duration-200 hover:scale-105 active:scale-95 inline-flex items-center gap-4">
              ENTRAR PARA A CAMPANHA
              <span className="group-hover:translate-x-2 transition-transform text-2xl">★</span>
            </button>
            <p className="mt-6 text-gray-600 text-xs uppercase tracking-widest">
              Nenhum dado real será coletado · É tudo ficção mesmo
            </p>
          </FadeUp>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-black py-10 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-8">
            <div className="flex items-center gap-3">
              <div className="w-7 h-7 rounded-full bg-red-600 flex items-center justify-center text-white font-display font-black text-xs">
                L
              </div>
              <span className="font-display font-black text-white text-lg uppercase tracking-wide">
                Lula<span className="text-gray-400">2026</span>
              </span>
            </div>
            <div className="flex gap-8">
              {["Paródia", "Humor", "Portfólio", "Ficção"].map((l) => (
                <a key={l} href="#" className="text-gray-500 hover:text-white text-xs uppercase tracking-widest transition-colors">
                  {l}
                </a>
              ))}
            </div>
          </div>

          <div className="border-t border-gray-800 pt-8">
            <div className="bg-yellow-950/40 border border-yellow-700/30 rounded p-4 mb-6">
              <p className="text-yellow-400 text-sm text-center leading-relaxed">
                ⚠️ <strong>AVISO IMPORTANTE:</strong> Página fictícia criada para fins de humor e portfólio.{" "}
                <strong>Não é uma campanha eleitoral oficial.</strong> Não representa o candidato, nenhum partido político,
                nem qualquer organização. Todo o conteúdo é satírico e não deve ser interpretado como informação eleitoral real.
              </p>
            </div>
            <p className="text-gray-600 text-xs text-center">
              © 2026 · Paródia Fictícia · Feito com humor e muito café ·{" "}
              <span className="text-gray-700">Não é campanha oficial · Luiz Inácio Lula da Silva não endossa esta página</span>
            </p>
          </div>
        </div>
      </footer>

      <FloatingWhatsApp />
    </div>
  );
}

function FloatingWhatsApp() {
  return (
    <a
      href="https://wa.me/5511999999999?text=Oi%21%20Vi%20a%20p%C3%A1gina%20parodia%20e%20quero%20saber%20mais%20%28brincadeira%2C%20%C3%A9%20fic%C3%A7%C3%A3o%29."
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Conversar no WhatsApp"
      style={{
        position: "fixed",
        bottom: "24px",
        right: "24px",
        zIndex: 100,
        width: "58px",
        height: "58px",
        borderRadius: "50%",
        backgroundColor: "#25D366",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "#FFFFFF",
        boxShadow: "0 6px 20px rgba(0,0,0,0.3)",
        transition: "transform 0.25s ease",
      }}
      onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.transform = "scale(1.08)" }}
      onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.transform = "scale(1)" }}
    >
      <svg width="30" height="30" viewBox="0 0 24 24" fill="currentColor">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
      </svg>
    </a>
  );
}
