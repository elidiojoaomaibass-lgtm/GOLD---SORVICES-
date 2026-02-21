import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Clock,
  ShieldCheck,
  Wallet,
  Zap,
  BookOpen,
  Menu,
  Coins
} from 'lucide-react';

interface LoanOption {
  id: number;
  fee: string;
  receive: string;
  period: string;
}

const LOAN_OPTIONS: LoanOption[] = [
  { id: 1, fee: "516 MT", receive: "6.000–8.000 MT", period: "3 meses" },
  { id: 2, fee: "1099 MT", receive: "12.000–15.000 MT", period: "4 meses" },
  { id: 3, fee: "1693 MT", receive: "25.000–37.000 MT", period: "5 meses" },
  { id: 4, fee: "1903 MT", receive: "50.000–64.000 MT", period: "6 meses" },
  { id: 5, fee: "2109 MT", receive: "68.000–86.000 MT", period: "7 meses" },
  { id: 6, fee: "2601 MT", receive: "87.000–100.000 MT", period: "8 meses" },
  { id: 7, fee: "2903 MT", receive: "120.000–135.000 MT", period: "9 meses" },
  { id: 8, fee: "3016 MT", receive: "136.000–167.000 MT", period: "10 meses" },
  { id: 9, fee: "3801 MT", receive: "168.000–189.000 MT", period: "11 meses" },
  { id: 10, fee: "4016 MT", receive: "190.000–200.000 MT", period: "12 meses" },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

const RANDOM_NAMES = [
  "António Matsinhe", "Isabel Chirindza", "Fernando Mucavele", "Sílvia Langa",
  "Rui Mondlane", "Artur Chissano", "Fátima Mabote", "José Tembe",
  "Bernardo Machava", "Lucília Guambe", "Edson Cuamba", "Helena Muianga",
  "Patrício Sitoe", "Gilda Bata", "Mário Cossa", "Teresa Huo",
  "Armando Guebuza", "Graça Machel", "Alberto Mondlane", "Rosa Bila"
];

function App() {
  const [selectedOption, setSelectedOption] = useState<LoanOption | null>(null);
  const [fileName, setFileName] = useState<string>("");
  const [notification, setNotification] = useState<{ name: string; amount: string } | null>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      const randomName = RANDOM_NAMES[Math.floor(Math.random() * RANDOM_NAMES.length)];
      const randomOption = LOAN_OPTIONS[Math.floor(Math.random() * LOAN_OPTIONS.length)];
      setNotification({ name: randomName, amount: randomOption.receive.split('–')[0] });

      setTimeout(() => setNotification(null), 5000);
    }, 12000);

    return () => clearInterval(interval);
  }, []);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    alert('Número copiado para a área de transferência!');
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFileName(e.target.files[0].name);
    }
  };

  return (
    <div style={{ backgroundColor: '#04160f', minHeight: '100vh', color: '#fcfbf8', paddingBottom: '2rem', overflowX: 'hidden' }}>
      {/* Floating Notification */}
      <AnimatePresence>
        {notification && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, x: 50 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            exit={{ opacity: 0, scale: 0.8, x: 50 }}
            className="floating-notification"
          >
            <div className="notification-icon" style={{ backgroundColor: '#eab308', borderRadius: '50%', padding: '8px', display: 'flex' }}>
              <Zap size={20} color="#04160f" />
            </div>
            <div>
              <p className="notification-title" style={{ fontSize: '0.75rem', color: '#eab308', fontWeight: 700, margin: 0 }}>APROVADO AGORA!</p>
              <p className="notification-name" style={{ fontSize: '0.9rem', fontWeight: 600, color: 'white', margin: '2px 0' }}>{notification.name}</p>
              <p className="notification-text" style={{ fontSize: '0.8rem', color: '#94a3b8', margin: 0 }}>Recebeu {notification.amount} MT</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Sticky Header */}
      <header className="header">
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Coins className="text-gold" size={28} />
          <div style={{ display: 'flex', flexDirection: 'column', lineHeight: 1 }}>
            <span style={{ fontWeight: 800, fontSize: '1.4rem', color: '#eab308', letterSpacing: '-0.5px' }}>GOLD</span>
            <span style={{ fontWeight: 600, fontSize: '0.75rem', color: '#fcfbf8', opacity: 0.8 }}>SERVICES</span>
          </div>
        </div>
        <Menu size={24} />
      </header>

      <motion.div
        className="container"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        {/* Hero Section */}
        <motion.div
          variants={itemVariants}
          style={{ textAlign: 'center', marginBottom: '3rem' }}
        >
          <h1 style={{ fontSize: '2.5rem', fontWeight: 700, marginBottom: '0.5rem', lineHeight: 1.1 }}>
            Empréstimos Rápidos <br />
            <span className="text-gold">para Realizar os Seus Sonhos</span>
          </h1>
          <p style={{ fontSize: '1rem', color: '#94a3b8', margin: '1.5rem 0' }}>
            Crédito de <span className="text-gold">5.000 a 200.000 MZN</span><br />
            aprovação em até <span className="text-red">8 minutos</span>
          </p>
          <motion.button
            className="btn-cta"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            style={{ borderRadius: '1rem', padding: '1.25rem' }}
            onClick={() => document.getElementById('loan-options')?.scrollIntoView({ behavior: 'smooth' })}
          >
            💰 Solicite Agora
          </motion.button>
        </motion.div>

        {/* Features Grid */}
        <motion.div className="feature-grid" variants={itemVariants}>
          <div className="feature-card" style={{ padding: '2rem' }}>
            <Clock size={24} className="text-gold" />
            <h3 style={{ fontSize: '1rem', fontWeight: 600 }}>Aprovação Rápida</h3>
            <p style={{ fontSize: '0.875rem', color: 'var(--muted-foreground)' }}>Resposta em até 8 minutos após a solicitação</p>
          </div>
          <div className="feature-card" style={{ padding: '2rem' }}>
            <ShieldCheck size={24} className="text-gold" />
            <h3 style={{ fontSize: '1rem', fontWeight: 600 }}>100% Seguro</h3>
            <p style={{ fontSize: '0.875rem', color: 'var(--muted-foreground)' }}>Seus dados protegidos com criptografia de ponta</p>
          </div>
          <div className="feature-card" style={{ padding: '2rem' }}>
            <Wallet size={24} className="text-gold" />
            <h3 style={{ fontSize: '1rem', fontWeight: 600 }}>Sem Burocracia</h3>
            <p style={{ fontSize: '0.875rem', color: 'var(--muted-foreground)' }}>Processo simples, apenas documentos básicos</p>
          </div>
          <div className="feature-card" style={{ padding: '2rem' }}>
            <Zap size={24} className="text-gold" />
            <h3 style={{ fontSize: '1rem', fontWeight: 600 }}>Transferência Imediata</h3>
            <p style={{ fontSize: '0.875rem', color: 'var(--muted-foreground)' }}>Dinheiro na sua conta em minutos</p>
          </div>
        </motion.div>

        {/* Pricing Table Title */}
        <motion.div id="loan-options" variants={itemVariants} style={{ textAlign: 'center', margin: '4rem 0 2rem' }}>
          <h2 style={{ fontSize: '1.25rem', fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', marginBottom: '0.5rem' }}>
            📊 TABELA DE TAXA DE RECEPÇÃO IMEDIATA ⚠️
          </h2>
          <p style={{ fontSize: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', fontWeight: 600 }}>
            <span>💬</span> ESCOLHE A OPÇÃO IDEAL PARA TI
          </p>
        </motion.div>

        <motion.div className="option-list" variants={itemVariants}>
          {LOAN_OPTIONS.map((opt) => (
            <motion.div
              key={opt.id}
              className={`option-item ${selectedOption?.id === opt.id ? 'selected' : ''}`}
              onClick={() => setSelectedOption(opt)}
              whileHover={{ x: 5 }}
              whileTap={{ scale: 0.98 }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span className="badge-number">{opt.id}</span>
                <span style={{ fontWeight: 700, fontSize: '1.1rem', color: '#ffffff' }}>PAGA {opt.fee}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#ffffff', fontSize: '1rem' }}>
                <span style={{ fontSize: '1.2rem' }}>�</span>
                <span style={{ fontWeight: 500 }}>RECEBE {opt.receive}</span>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Selected Option Detail Panel (ALWAYS VISIBLE) */}
        <motion.div
          className="card border-gold"
          style={{ marginTop: '2.5rem', padding: '1.5rem', backgroundColor: '#05100b' }}
          variants={itemVariants}
        >
          <h3 style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '1.5rem', color: 'white', justifyContent: 'flex-start', fontSize: '1.25rem' }}>
            📌 Opção Selecionada
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {/* Taxa */}
            <div style={{ backgroundColor: '#2d1414', padding: '1.25rem', borderRadius: '1rem', textAlign: 'center', border: '1px solid rgba(255, 77, 77, 0.1)' }}>
              <div style={{ fontSize: '1.25rem', fontWeight: 800, color: '#ff4d4d', marginBottom: '0.5rem' }}>Taxa de Inscrição</div>
              <div style={{ fontSize: '1.25rem', fontWeight: 700, color: 'white' }}>{selectedOption ? selectedOption.fee : '---'}</div>
            </div>

            {/* Valor */}
            <div style={{ backgroundColor: '#2d2614', padding: '1.25rem', borderRadius: '1rem', textAlign: 'center', border: '1px solid rgba(234, 179, 8, 0.1)' }}>
              <div style={{ fontSize: '1.25rem', fontWeight: 800, color: '#eab308', marginBottom: '0.5rem' }}>Valor a Receber</div>
              <div style={{ fontSize: '1.25rem', fontWeight: 700, color: 'white' }}>{selectedOption ? selectedOption.receive : '---'}</div>
            </div>

            {/* Prazo */}
            <div style={{ backgroundColor: '#142d20', padding: '1.25rem', borderRadius: '1rem', textAlign: 'center', border: '1px solid rgba(34, 197, 94, 0.1)' }}>
              <div style={{ fontSize: '1.25rem', fontWeight: 800, color: '#22c55e', marginBottom: '0.5rem' }}>Prazo</div>
              <div style={{ fontSize: '1.25rem', fontWeight: 700, color: 'white' }}>{selectedOption ? selectedOption.period : '---'}</div>
            </div>
          </div>
        </motion.div>

        {/* Request Form */}
        <motion.div variants={itemVariants} className="card border-gold" style={{ marginTop: '3rem', padding: '2rem' }}>
          <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
            <h2 style={{ fontSize: '1.5rem', color: '#eab308', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', marginBottom: '1rem' }}>
              📝 Formulário de Solicitação
            </h2>
            <p style={{ color: 'white', marginTop: '0.5rem', fontSize: '1.125rem' }}>Preencha os seus dados para solicitar o seu empréstimo</p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', textAlign: 'left' }}>
            <div className="form-group">
              <label className="form-label">Nome Completo *</label>
              <input type="text" className="form-input" placeholder="Seu nome" />
            </div>
            <div className="form-group">
              <label className="form-label">Contacto *</label>
              <input type="text" className="form-input" placeholder="Seu contacto" />
            </div>
            <div className="form-group">
              <label className="form-label">Método de Recebimento *</label>
              <select className="form-select">
                <option>E-Mola</option>
                <option>M-Pesa</option>
              </select>
            </div>
            <div className="form-group">
              <label className="form-label">Província *</label>
              <select className="form-select">
                <option>Selecione a província</option>
                <option>Maputo</option>
                <option>Matola</option>
                <option>Gaza</option>
                <option>Inhambane</option>
                <option>Sofala</option>
                <option>Manica</option>
                <option>Tete</option>
                <option>Zambézia</option>
                <option>Nampula</option>
                <option>Niassa</option>
                <option>Cabo Delgado</option>
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">Setor de Trabalho</label>
              <input type="text" className="form-input" placeholder="Conta propria" />
            </div>

            <div className="form-group">
              <label className="form-label">Foto do BI (Bilhete de Identidade) *</label>

              <div style={{ marginTop: '1.5rem' }}>
                <p style={{ color: 'white', fontWeight: 600, marginBottom: '0.4rem', fontSize: '1rem' }}>Frente do BI</p>
                <input type="file" className="form-input" />
              </div>

              <div style={{ marginTop: '1.5rem' }}>
                <p style={{ color: 'white', fontWeight: 600, marginBottom: '0.4rem', fontSize: '1rem' }}>Verso do BI</p>
                <input type="file" className="form-input" />
              </div>
            </div>
          </div>
        </motion.div>

        {/* Instructions */}
        <motion.div className="instruction-box" variants={itemVariants} style={{ marginTop: '3rem' }}>
          <h3 style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <BookOpen size={20} /> Instruções de Pagamento:
          </h3>
          <ol>
            <li>Selecione o valor desejado na tabela acima.</li>
            <li>Faça a transferência para o número indicado abaixo.</li>
            <li>Tire um print/foto do comprovativo.</li>
            <li>Carregue o ficheiro na área de upload no final da página.</li>
          </ol>
        </motion.div>

        {/* Payment Details (Simbine Only) */}
        <motion.div
          variants={itemVariants}
          style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', marginTop: '2rem' }}
        >
          {/* M-Pesa Card */}
          <div className="card" style={{ textAlign: 'center', padding: '2rem', marginBottom: '0' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', marginBottom: '1.5rem' }}>
              <span role="img" aria-label="money">💰</span>
              <span style={{ fontWeight: 700, color: '#ff4d4d', fontSize: '1.25rem' }}>M-Pesa</span>
            </div>
            <div style={{ marginBottom: '1.5rem' }}>
              <span style={{ fontSize: '1.25rem', color: 'white' }}>Número: </span>
              <span style={{ fontWeight: 800, fontSize: '1.75rem', color: 'white' }}>855675443</span>
              <button
                className="copy-btn"
                onClick={(e) => { e.stopPropagation(); copyToClipboard('855675443'); }}
                style={{ backgroundColor: '#eab308', color: '#04160f', fontWeight: 700, borderRadius: '8px', padding: '4px 12px', fontSize: '0.875rem' }}
              >
                📋 Copiar
              </button>
            </div>
            <div style={{ fontSize: '1.25rem', color: 'white', opacity: 0.9 }}>
              Nome: ISAIAS AURELIO SIMBINE
            </div>
          </div>

          {/* E-Mola Card */}
          <div className="card" style={{ textAlign: 'center', padding: '2rem', marginBottom: '0' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', marginBottom: '1.5rem' }}>
              <span role="img" aria-label="money-bag">💰</span>
              <span style={{ fontWeight: 700, color: '#eab308', fontSize: '1.25rem' }}>E-Mola</span>
            </div>
            <div style={{ marginBottom: '1.5rem' }}>
              <span style={{ fontSize: '1.25rem', color: 'white' }}>Número: </span>
              <span style={{ fontWeight: 800, fontSize: '1.75rem', color: 'white' }}>865937375</span>
              <button
                className="copy-btn"
                onClick={(e) => { e.stopPropagation(); copyToClipboard('865937375'); }}
                style={{ backgroundColor: '#eab308', color: '#04160f', fontWeight: 700, borderRadius: '8px', padding: '4px 12px', fontSize: '0.875rem' }}
              >
                📋 Copiar
              </button>
            </div>
            <div style={{ fontSize: '1.25rem', color: 'white', opacity: 0.9 }}>
              Nome: ISAIAS AURELIO SIMBINE
            </div>
          </div>
        </motion.div>

        {/* Upload Area Refined */}
        <motion.div
          variants={itemVariants}
          className="card"
          style={{ marginTop: '3rem', padding: '2rem', textAlign: 'center' }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', marginBottom: '1.5rem' }}>
            <span role="img" aria-label="upload" style={{ backgroundColor: '#3b82f6', borderRadius: '4px', padding: '4px' }}>⬆️</span>
            <h3 style={{ fontWeight: 700, fontSize: '1.25rem', color: 'white' }}>Carregar Comprovativo de Pagamento</h3>
          </div>

          <div
            style={{
              backgroundColor: '#262f2b',
              padding: '1rem',
              borderRadius: '1rem',
              marginBottom: '1.5rem',
              cursor: 'pointer'
            }}
            onClick={() => document.getElementById('file-upload')?.click()}
          >
            <input
              id="file-upload"
              type="file"
              hidden
              onChange={handleFileChange}
            />
            <span style={{ color: '#94a3b8' }}>{fileName ? fileName : 'Escolher ficheiro nenhum fic...elecionado'}</span>
          </div>

          <motion.button
            className="btn-cta"
            style={{ backgroundColor: '#ff0000', borderRadius: '1rem', padding: '1.25rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <span role="img" aria-label="check">✅</span>
            <span style={{ fontSize: '1.25rem', fontWeight: 700 }}>Enviar Comprovativo</span>
          </motion.button>
        </motion.div>

        {/* Footer */}
        <footer className="footer-section" style={{ marginTop: '5rem', borderTop: '1px solid #1a4d3a', paddingTop: '3rem' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '2rem' }}>
            <div>
              <h3 style={{ color: '#eab308', fontSize: '1.25rem', marginBottom: '1rem' }}>Serviços Gold</h3>
              <p style={{ color: '#94a3b8', lineHeight: 1.6 }}>Empréstimos rápidos e seguros em Moçambique. Receba o seu crédito em minutos via M-Pesa ou E-Mola.</p>
            </div>

            <div>
              <h3 style={{ color: '#eab308', fontSize: '1rem', marginBottom: '1rem' }}>Links Úteis</h3>
              <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', color: '#94a3b8', fontSize: '0.875rem' }}>
                <span>Sobre</span> | <span>Termos</span> | <span>Privacidade</span> | <span>Apoio</span>
              </div>
            </div>

            <div>
              <h3 style={{ color: '#eab308', fontSize: '1rem', marginBottom: '1rem' }}>Contatos</h3>
              <div style={{ color: '#94a3b8', fontSize: '0.875rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <span>📞 855675443 | 865937375</span>
                <span>📧 info@goldservices.co.mz</span>
                <span>📍 Maputo, Moçambique</span>
              </div>
            </div>
          </div>

          <div style={{ textAlign: 'center', marginTop: '4rem', fontSize: '10px', color: '#333' }}>
            © 2024 Gold Services. Todos os direitos reservados.
            <br />
            Processamos o seu pedido em tempo recorde.
          </div>
        </footer>
      </motion.div>
    </div>
  );
}

export default App;
