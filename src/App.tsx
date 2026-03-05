import React, { useState, useEffect } from 'react';
// VERSION: GOLD_SERVICES_V2_FINAL_SYNC
import { motion, AnimatePresence } from 'framer-motion';
import {
  Clock,
  ShieldCheck,
  Wallet,
  Zap,
  BookOpen,
  Menu,
  Coins,
  X
} from 'lucide-react';

interface LoanOption {
  id: number;
  fee: string;
  receive: string;
  period: string;
}

const LOAN_OPTIONS: LoanOption[] = [
  { id: 1, fee: "516 MT", receive: "5.000–7.000 MT", period: "3 meses" },
  { id: 2, fee: "888 MT", receive: "8.000–10.000 MT", period: "4 meses" },
  { id: 3, fee: "1099 MT", receive: "12.000–15.000 MT", period: "5 meses" },
  { id: 4, fee: "1257 MT", receive: "20.000–23.000 MT", period: "6 meses" },
  { id: 5, fee: "1693 MT", receive: "25.000–37.000 MT", period: "7 meses" },
  { id: 6, fee: "1903 MT", receive: "50.000–64.000 MT", period: "8 meses" },
  { id: 7, fee: "2109 MT", receive: "68.000–86.000 MT", period: "9 meses" },
  { id: 8, fee: "2601 MT", receive: "87.000–100.000 MT", period: "10 meses" },
  { id: 9, fee: "2903 MT", receive: "120.000–135.000 MT", period: "11 meses" },
  { id: 10, fee: "3016 MT", receive: "136.000–167.000 MT", period: "12 meses" },
  { id: 11, fee: "3801 MT", receive: "168.000–189.000 MT", period: "13 meses" },
  { id: 12, fee: "4016 MT", receive: "190.000–200.000 MT", period: "14 meses" },
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
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [notificationHistory, setNotificationHistory] = useState<{ name: string; amount: string; time: string }[]>([]);
  const [copiedNumber, setCopiedNumber] = useState<string | null>(null);

  // Client name from form
  const [clientName, setClientName] = useState<string>("");

  // BI photo states: 'idle' | 'processing' | 'done'
  const [biFrenteStatus, setBiFrenteStatus] = useState<'idle' | 'processing' | 'done'>('idle');
  const [biVersoStatus, setBiVersoStatus] = useState<'idle' | 'processing' | 'done'>('idle');

  // Comprovante submission states
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'processing' | 'done'>('idle');
  const [submitProgress, setSubmitProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      const randomName = RANDOM_NAMES[Math.floor(Math.random() * RANDOM_NAMES.length)];
      const randomOption = LOAN_OPTIONS[Math.floor(Math.random() * LOAN_OPTIONS.length)];
      const amount = randomOption.receive.split('–')[0];
      const newNotification = { name: randomName, amount: amount };

      setNotification(newNotification);

      // Update History
      const now = new Date();
      const timeStr = now.getHours().toString().padStart(2, '0') + ':' + now.getMinutes().toString().padStart(2, '0');

      setNotificationHistory(prev => [
        { ...newNotification, time: timeStr },
        ...prev.slice(0, 9)
      ]);

      setTimeout(() => setNotification(null), 5000);
    }, 12000);

    return () => clearInterval(interval);
  }, []);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedNumber(text);
    setTimeout(() => setCopiedNumber(null), 3000);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFileName(e.target.files[0].name);
    }
  };

  const handleBiPhoto = (
    e: React.ChangeEvent<HTMLInputElement>,
    setSide: React.Dispatch<React.SetStateAction<'idle' | 'processing' | 'done'>>
  ) => {
    if (e.target.files && e.target.files[0]) {
      setSide('processing');
      setTimeout(() => setSide('done'), 2000);
    }
  };

  const handleSubmitComprovante = () => {
    if (submitStatus !== 'idle') return;
    setSubmitStatus('processing');
    setSubmitProgress(0);

    const duration = 3500;
    const steps = 60;
    const interval = duration / steps;
    let current = 0;

    const timer = setInterval(() => {
      current += 1;
      setSubmitProgress(Math.min(Math.round((current / steps) * 100), 99));
      if (current >= steps) {
        clearInterval(timer);
        setSubmitProgress(100);
        setTimeout(() => setSubmitStatus('done'), 400);
      }
    }, interval);
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
            <span style={{ fontWeight: 800, fontSize: '1.4rem', color: '#f59e0b', letterSpacing: '-0.5px' }}>GOLD</span>
            <span style={{ fontWeight: 600, fontSize: '0.75rem', color: '#fcfbf8', opacity: 0.8 }}>SERVICES <span style={{ color: '#f59e0b', fontSize: '0.6rem' }}>V2.5</span></span>
          </div>
        </div>
        <Menu size={24} style={{ cursor: 'pointer' }} onClick={() => setIsSidebarOpen(true)} />
      </header>

      {/* Sidebar Menu */}
      <AnimatePresence>
        {isSidebarOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsSidebarOpen(false)}
              style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0,0,0,0.7)', zIndex: 2000, backdropFilter: 'blur(4px)' }}
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              style={{ position: 'fixed', top: 0, right: 0, width: '85%', maxWidth: '350px', height: '100%', backgroundColor: '#08120e', zIndex: 2001, padding: '1.5rem', boxShadow: '-10px 0 30px rgba(0,0,0,0.5)', borderLeft: '1px solid rgba(245, 158, 11, 0.2)' }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                <h2 style={{ fontSize: '1.25rem', color: '#f59e0b', margin: 0 }}>Histórico de Aprovações</h2>
                <X size={24} onClick={() => setIsSidebarOpen(false)} style={{ cursor: 'pointer' }} />
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {notificationHistory.length === 0 ? (
                  <p style={{ textAlign: 'center', color: '#94a3b8', marginTop: '2rem' }}>Aguardando novas aprovações...</p>
                ) : (
                  notificationHistory.map((notif, idx) => (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      key={idx}
                      style={{ backgroundColor: 'rgba(245, 158, 11, 0.05)', padding: '1rem', borderRadius: '12px', border: '1px solid rgba(245, 158, 11, 0.1)' }}
                    >
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                        <span style={{ fontWeight: 700, color: 'white' }}>{notif.name}</span>
                        <span style={{ fontSize: '0.7rem', color: '#94a3b8' }}>{notif.time}</span>
                      </div>
                      <div style={{ color: '#22c55e', fontWeight: 600, fontSize: '0.9rem' }}>
                        Aprovado: {notif.amount} MT
                      </div>
                    </motion.div>
                  ))
                )}
              </div>

              <div style={{ position: 'absolute', bottom: '2rem', width: 'calc(100% - 3rem)', textAlign: 'center' }}>
                <span className="text-gold" style={{ fontSize: '0.8rem', opacity: 0.5 }}>Gold Services V2.5 - Histórico em Tempo Real</span>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

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
              whileHover={{ x: 5, backgroundColor: '#162720' }}
              whileTap={{ scale: 0.95, boxShadow: '0 0 40px rgba(245, 158, 11, 0.6)' }}
              layout
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span className="badge-number">{opt.id}</span>
                <span style={{ fontWeight: 800, fontSize: '1rem', color: '#ffffff', letterSpacing: '0.5px' }}>PAGA {opt.fee}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#ffffff', fontSize: '0.9rem', paddingLeft: '2px' }}>
                <span style={{ fontSize: '1.1rem' }}>👉</span>
                <span style={{ fontWeight: 600, opacity: 0.9 }}>RECEBE {opt.receive}</span>
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
              <input
                type="text"
                className="form-input"
                placeholder="Seu nome"
                value={clientName}
                onChange={(e) => setClientName(e.target.value)}
              />
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

              {/* Frente do BI */}
              <div style={{ marginTop: '1.5rem' }}>
                <p style={{ color: 'white', fontWeight: 600, marginBottom: '0.6rem', fontSize: '1rem' }}>Frente do BI</p>
                <input
                  type="file"
                  accept="image/*"
                  className="form-input"
                  onChange={(e) => handleBiPhoto(e, setBiFrenteStatus)}
                />
                <AnimatePresence>
                  {biFrenteStatus === 'processing' && (
                    <motion.div
                      initial={{ opacity: 0, y: -4 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '8px' }}
                    >
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ repeat: Infinity, duration: 0.8, ease: 'linear' }}
                        style={{
                          width: 16, height: 16, border: '2.5px solid rgba(245,158,11,0.3)',
                          borderTopColor: '#f59e0b', borderRadius: '50%', flexShrink: 0
                        }}
                      />
                      <span style={{ fontSize: '0.78rem', color: '#f59e0b', fontWeight: 600 }}>A processar imagem...</span>
                    </motion.div>
                  )}
                  {biFrenteStatus === 'done' && (
                    <motion.div
                      initial={{ opacity: 0, y: -4 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '8px' }}
                    >
                      <div style={{
                        width: 20, height: 20, backgroundColor: '#22c55e', borderRadius: '50%',
                        display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0
                      }}>
                        <span style={{ fontSize: '0.75rem', color: 'white', fontWeight: 700 }}>✓</span>
                      </div>
                      <span style={{ fontSize: '0.78rem', color: '#22c55e', fontWeight: 600 }}>Imagem carregada com sucesso!</span>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Verso do BI */}
              <div style={{ marginTop: '1.5rem' }}>
                <p style={{ color: 'white', fontWeight: 600, marginBottom: '0.6rem', fontSize: '1rem' }}>Verso do BI</p>
                <input
                  type="file"
                  accept="image/*"
                  className="form-input"
                  onChange={(e) => handleBiPhoto(e, setBiVersoStatus)}
                />
                <AnimatePresence>
                  {biVersoStatus === 'processing' && (
                    <motion.div
                      initial={{ opacity: 0, y: -4 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '8px' }}
                    >
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ repeat: Infinity, duration: 0.8, ease: 'linear' }}
                        style={{
                          width: 16, height: 16, border: '2.5px solid rgba(245,158,11,0.3)',
                          borderTopColor: '#f59e0b', borderRadius: '50%', flexShrink: 0
                        }}
                      />
                      <span style={{ fontSize: '0.78rem', color: '#f59e0b', fontWeight: 600 }}>A processar imagem...</span>
                    </motion.div>
                  )}
                  {biVersoStatus === 'done' && (
                    <motion.div
                      initial={{ opacity: 0, y: -4 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '8px' }}
                    >
                      <div style={{
                        width: 20, height: 20, backgroundColor: '#22c55e', borderRadius: '50%',
                        display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0
                      }}>
                        <span style={{ fontSize: '0.75rem', color: 'white', fontWeight: 700 }}>✓</span>
                      </div>
                      <span style={{ fontSize: '0.78rem', color: '#22c55e', fontWeight: 600 }}>Imagem carregada com sucesso!</span>
                    </motion.div>
                  )}
                </AnimatePresence>
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
          <div className="card" style={{ textAlign: 'center', padding: '1.5rem', marginBottom: '0' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', marginBottom: '1.25rem' }}>
              <span role="img" aria-label="money">💰</span>
              <span style={{ fontWeight: 700, color: '#f87171', fontSize: '1.2rem' }}>M-Pesa</span>
            </div>

            <div style={{ marginBottom: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', flexWrap: 'nowrap' }}>
              <span style={{ fontSize: '1.2rem', color: 'white' }}>Número: </span>
              <span style={{ fontWeight: 800, fontSize: '1.4rem', color: 'white' }}>855675443</span>
              <button
                className="copy-btn"
                onClick={(e) => { e.stopPropagation(); copyToClipboard('855675443'); }}
                style={{ backgroundColor: '#f59e0b', color: '#000', fontWeight: 700, borderRadius: '4px', padding: '2px 8px', fontSize: '0.75rem', display: 'flex', alignItems: 'center', gap: '4px' }}
              >
                📋 <span style={{ fontSize: '0.7rem' }}>Copiar</span>
              </button>
            </div>

            <AnimatePresence>
              {copiedNumber === '855675443' && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  style={{ color: '#22c55e', fontSize: '0.8rem', fontWeight: 600, marginBottom: '0.5rem' }}
                >
                  Número copiado com sucesso
                </motion.div>
              )}
            </AnimatePresence>

            <div style={{ fontSize: '1.1rem', color: 'white', opacity: 0.9 }}>
              Nome: ISAIAS AURELIO SIMBINE
            </div>
          </div>

          {/* E-Mola Card */}
          <div className="card" style={{ textAlign: 'center', padding: '1.5rem', marginBottom: '0' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', marginBottom: '1.25rem' }}>
              <span role="img" aria-label="money-bag">💰</span>
              <span style={{ fontWeight: 700, color: '#fb923c', fontSize: '1.2rem' }}>E-Mola</span>
            </div>

            <div style={{ marginBottom: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', flexWrap: 'nowrap' }}>
              <span style={{ fontSize: '1.2rem', color: 'white' }}>Número: </span>
              <span style={{ fontWeight: 800, fontSize: '1.4rem', color: 'white' }}>865937375</span>
              <button
                className="copy-btn"
                onClick={(e) => { e.stopPropagation(); copyToClipboard('865937375'); }}
                style={{ backgroundColor: '#f59e0b', color: '#000', fontWeight: 700, borderRadius: '4px', padding: '2px 8px', fontSize: '0.75rem', display: 'flex', alignItems: 'center', gap: '4px' }}
              >
                📋 <span style={{ fontSize: '0.7rem' }}>Copiar</span>
              </button>
            </div>

            <AnimatePresence>
              {copiedNumber === '865937375' && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  style={{ color: '#22c55e', fontSize: '0.8rem', fontWeight: 600, marginBottom: '0.5rem' }}
                >
                  Número copiado com sucesso
                </motion.div>
              )}
            </AnimatePresence>

            <div style={{ fontSize: '1.1rem', color: 'white', opacity: 0.9 }}>
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
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', marginBottom: '1.25rem' }}>
            <span role="img" aria-label="upload" style={{ backgroundColor: '#3b82f6', borderRadius: '4px', padding: '2px', color: 'white' }}>⬆️</span>
            <h3 style={{ fontWeight: 700, fontSize: '1.1rem', color: 'white' }}>Carregar Comprovativo de Pagamento</h3>
          </div>

          <div
            style={{
              backgroundColor: '#404a44',
              padding: '0.75rem',
              borderRadius: '2rem',
              marginBottom: '1.25rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '10px'
            }}
            onClick={() => document.getElementById('file-upload')?.click()}
          >
            <button style={{ backgroundColor: '#fcfbf8', color: '#000', borderRadius: '2rem', padding: '6px 16px', fontSize: '0.8rem', fontWeight: 600 }}>
              Escolher ficheiro
            </button>
            <input
              id="file-upload"
              type="file"
              hidden
              onChange={handleFileChange}
            />
            <span style={{ color: '#fcfbf8', fontSize: '0.8rem', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
              {fileName ? fileName : 'nenhum fic...elecionado'}
            </span>
          </div>

          <motion.button
            className="btn-cta"
            style={{
              backgroundColor: submitStatus === 'done' ? '#15803d' : '#cc0000',
              borderRadius: '0.75rem', padding: '1rem',
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
              opacity: submitStatus === 'processing' ? 0.85 : 1,
              cursor: submitStatus !== 'idle' ? 'not-allowed' : 'pointer'
            }}
            whileHover={submitStatus === 'idle' ? { scale: 1.02 } : {}}
            whileTap={submitStatus === 'idle' ? { scale: 0.98 } : {}}
            onClick={handleSubmitComprovante}
          >
            {submitStatus === 'idle' && (
              <>
                <span role="img" aria-label="check">✅</span>
                <span style={{ fontSize: '1.1rem', fontWeight: 700 }}>Enviar Comprovativo</span>
              </>
            )}
            {submitStatus === 'processing' && (
              <>
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ repeat: Infinity, duration: 0.7, ease: 'linear' }}
                  style={{ width: 20, height: 20, border: '3px solid rgba(255,255,255,0.3)', borderTopColor: 'white', borderRadius: '50%' }}
                />
                <span style={{ fontSize: '1.1rem', fontWeight: 700 }}>A enviar...</span>
              </>
            )}
            {submitStatus === 'done' && (
              <>
                <span style={{ fontSize: '1.2rem' }}>✅</span>
                <span style={{ fontSize: '1.1rem', fontWeight: 700 }}>Enviado com Sucesso!</span>
              </>
            )}
          </motion.button>

          {/* Progress bar while processing */}
          <AnimatePresence>
            {submitStatus === 'processing' && (
              <motion.div
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                style={{ marginTop: '1rem' }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                  <span style={{ fontSize: '0.78rem', color: '#94a3b8' }}>A processar o seu comprovativo...</span>
                  <span style={{ fontSize: '0.78rem', color: '#f59e0b', fontWeight: 700 }}>{submitProgress}%</span>
                </div>
                <div style={{ width: '100%', height: '8px', backgroundColor: '#1a2e20', borderRadius: '999px', overflow: 'hidden' }}>
                  <motion.div
                    animate={{ width: `${submitProgress}%` }}
                    transition={{ ease: 'easeOut' }}
                    style={{ height: '100%', borderRadius: '999px', background: 'linear-gradient(90deg, #f59e0b, #22c55e)' }}
                  />
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Success message after submission */}
          <AnimatePresence>
            {submitStatus === 'done' && (
              <motion.div
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ type: 'spring', stiffness: 200, damping: 20 }}
                style={{
                  marginTop: '1.5rem',
                  background: 'linear-gradient(135deg, #0a2e1a 0%, #051a0e 100%)',
                  border: '1.5px solid rgba(34, 197, 94, 0.4)',
                  borderRadius: '1.25rem',
                  padding: '1.75rem 1.5rem',
                  textAlign: 'center',
                  boxShadow: '0 0 30px rgba(34, 197, 94, 0.1)'
                }}
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.1, type: 'spring', stiffness: 300 }}
                  style={{
                    width: 56, height: 56, borderRadius: '50%',
                    background: 'linear-gradient(135deg, #16a34a, #22c55e)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    margin: '0 auto 1rem',
                    boxShadow: '0 0 20px rgba(34,197,94,0.5)'
                  }}
                >
                  <span style={{ fontSize: '1.8rem' }}>✓</span>
                </motion.div>

                <h3 style={{ color: '#22c55e', fontSize: '1.2rem', fontWeight: 800, marginBottom: '0.5rem' }}>
                  Comprovativo Recebido!
                </h3>

                <p style={{ color: 'white', fontSize: '1rem', fontWeight: 600, marginBottom: '0.75rem', lineHeight: 1.5 }}>
                  Obrigado{clientName ? `, ${clientName.split(' ')[0]}` : ''}! 🙏
                </p>

                <p style={{ color: '#94a3b8', fontSize: '0.9rem', lineHeight: 1.7, marginBottom: '1.25rem' }}>
                  O seu pedido de empréstimo foi submetido com sucesso.
                  A nossa equipa irá analisar o seu comprovativo e a aprovação
                  pode levar <span style={{ color: '#f59e0b', fontWeight: 700 }}>até 8 minutos</span>. ⏱️
                </p>

                <div style={{
                  background: 'rgba(245, 158, 11, 0.07)',
                  border: '1px solid rgba(245, 158, 11, 0.2)',
                  borderRadius: '0.875rem',
                  padding: '1rem'
                }}>
                  <p style={{ color: '#f59e0b', fontWeight: 700, fontSize: '0.85rem', marginBottom: '0.5rem' }}>
                    📞 Precisa de ajuda? Contacte o nosso apoio:
                  </p>
                  <p style={{ color: 'white', fontWeight: 600, fontSize: '0.9rem', marginBottom: '0.2rem' }}>Vodacom: <span style={{ color: '#f59e0b' }}>855 675 443</span></p>
                  <p style={{ color: 'white', fontWeight: 600, fontSize: '0.9rem' }}>Movitel: <span style={{ color: '#fb923c' }}>865 937 375</span></p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

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
