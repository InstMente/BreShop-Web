import {
  Box,
  Stack,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Badge,
  Button,
  Typography,
  Divider,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  RadioGroup,
  FormControlLabel,
  Radio,
  CircularProgress,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import CloseIcon from '@mui/icons-material/Close';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { useContext, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import GlobalContext from '../../context/GlobalContext';
import {
  formatarComMascara,
  MASCARA_CARTAO,
  MASCARA_VALIDADE,
  MASCARA_CVV,
} from '../../utils/mascaras';

function Header() {
  const [menuAberto, setMenuAberto] = useState(false);
  const [carrinhoAberto, setCarrinhoAberto] = useState(false);
  const [finalizarAberto, setFinalizarAberto] = useState(false);
  const [finalizado, setFinalizado] = useState(false);
  const [carregando, setCarregando] = useState(false);
  const [pagamento, setPagamento] = useState('pix');
  const [numeroCartao, setNumeroCartao] = useState('');
  const [validade, setValidade] = useState('');
  const [cvv, setCvv] = useState('');

  const location = useLocation();
  const navigate = useNavigate();

  const paginasOcultas = ['/', '/cadastro', '/recuperacaoSenha'];
  const logado = true;

  const { carrinho, limparCarrinho } = useContext(GlobalContext);

  const sair = () => {
    setMenuAberto(false);
    navigate('/');
  };

  const navegarPara = (rota) => {
    setMenuAberto(false);
    navigate(rota);
  };

  const mostrarCabecalho = !paginasOcultas.includes(location.pathname);

  const total = carrinho.reduce((soma, anuncio) => soma + parseFloat(anuncio.valor), 0);

  const confirmarCompra = () => {
    setCarregando(true);
    setTimeout(() => {
      if (pagamento !== 'pix') {
        localStorage.setItem('cartao', JSON.stringify({
          numero: numeroCartao,
          validade,
          cvv,
        }));
      }

      setCarregando(false);
      setFinalizarAberto(false);
      setFinalizado(true);
      limparCarrinho();

      setTimeout(() => setFinalizado(false), 3000);
    }, 2000);
  };

  return (
    <>
      <Box
        sx={{
          width: '100%',
          height: '9%',
          backgroundColor: '#003566',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          px: 2,
          position: 'fixed',
          top: 0,
          left: 0,
          zIndex: 1300,
        }}
      >
        <Box component="img" src="/image.png" alt="Logo da empresa" sx={{ height: 50 }} />

        {mostrarCabecalho && (
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            {logado ? (
              <>
                <IconButton onClick={() => setCarrinhoAberto(true)} sx={{ color: 'white' }}>
                  <Badge badgeContent={carrinho.length} color="error">
                    <ShoppingCartIcon />
                  </Badge>
                </IconButton>
                <IconButton onClick={() => setMenuAberto(true)} sx={{ color: 'white', mr: 2 }}>
                  <MenuIcon sx={{ fontSize: 34 }} />
                </IconButton>
              </>
            ) : (
              <>
                <Button onClick={() => navigate('/')} sx={{ color: 'white', border: '1px solid white', borderRadius: 2 }}>
                  Entrar
                </Button>
                <Button onClick={() => navigate('/cadastro')} sx={{ color: 'white', border: '1px solid white', borderRadius: 2 }}>
                  Cadastrar
                </Button>
              </>
            )}
          </Box>
        )}
      </Box>

      <Box sx={{ height: '70px' }} />

      <Drawer anchor="right" open={menuAberto} onClose={() => setMenuAberto()} PaperProps={{
        sx: {
          mt: '80px', width: '250px', height: '40vh', borderRadius: '1px 1px 1px 20px', p: 2,
        },
      }}>
        <List sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
          {[{ label: 'Minha Conta', action: () => navegarPara('/minhaConta') },
          { label: 'Registro de Vendas', action: () => navegarPara('/registroVendas') },
          { label: 'Meus Anuncios', action: () => navegarPara('/meusAnuncio') },
          { label: 'Sair', action: sair }].map(({ label, action }) => (
            <ListItem button key={label} onClick={action} sx={{ borderRadius: '8px', bgcolor: '#f5f5f5', '&:hover': { bgcolor: '#e0e0e0' } }}>
              <ListItemText primary={label} />
            </ListItem>
          ))}
        </List>
      </Drawer>

      <Drawer anchor="right" open={carrinhoAberto} onClose={() => setCarrinhoAberto(false)} PaperProps={{
        sx: {
          mt: '80px', width: { xs: '90%', sm: '60%', md: '50%' }, height: { xs: '60%', sm: '70%', md: '80%' },
          maxWidth: '600px', maxHeight: '800px', borderRadius: '1px 1px 1px 20px', p: 3, overflow: 'auto',
        },
      }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Typography variant="h5" fontWeight="bold">Carrinho de Compras</Typography>
          <IconButton onClick={() => setCarrinhoAberto(false)}><CloseIcon /></IconButton>
        </Box>

        {carrinho.length === 0 ? (
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '70%' }}>
            <ShoppingCartIcon sx={{ fontSize: 60, color: 'text.disabled', mb: 2 }} />
            <Typography variant="h6" color="text.secondary">Seu carrinho está vazio</Typography>
          </Box>
        ) : (
          <>
            <List sx={{ mb: 2 }}>
              {carrinho.map((anuncio) => (
                <Box key={anuncio.id}>
                  <ListItem sx={{ py: 2 }}>
                    <Box sx={{ flexGrow: 1 }}>
                      <Typography fontWeight="medium">{anuncio.titulo}</Typography>
                      <Typography variant="body2" color="text.secondary">
                        R$ {Number(anuncio.valor).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                      </Typography>
                    </Box>
                  </ListItem>
                  <Divider />
                </Box>
              ))}
            </List>

            <Box sx={{ mt: 'auto', pt: 2 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
                <Typography variant="h6">Total:</Typography>
                <Typography variant="h6" fontWeight="bold">
                  R$ {Number(total).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                </Typography>
              </Box>
              <Button fullWidth variant="contained" size="large" onClick={() => setFinalizarAberto(true)}
                sx={{ py: 1.5, backgroundColor: '#003566', '&:hover': { backgroundColor: '#002244' } }}>
                Finalizar Compra
              </Button>
            </Box>
          </>
        )}
      </Drawer>

      <Dialog open={finalizarAberto} onClose={() => setFinalizarAberto(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Resumo da Compra</DialogTitle>
        <DialogContent dividers>
          {carrinho.map((anuncio) => (
            <Box key={anuncio.id} sx={{ mb: 2 }}>
              <Typography variant="subtitle1">{anuncio.titulo}</Typography>
              <Typography variant="body2" color="text.secondary">
                R$ {Number(anuncio.valor).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
              </Typography>
              <Divider sx={{ mt: 1 }} />
            </Box>
          ))}

          <Box sx={{ mt: 2 }}>
            <Typography variant="h6">
              Total: R$ {Number(total).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
            </Typography>
          </Box>

          <Box sx={{ mt: 3 }}>
            <Typography variant="subtitle1" gutterBottom>
              Forma de Pagamento:
            </Typography>
            <RadioGroup value={pagamento} onChange={(e) => setPagamento(e.target.value)}>
              <FormControlLabel value="pix" control={<Radio />} label="PIX" />
              <FormControlLabel value="credito" control={<Radio />} label="Cartão de Crédito" />
              <FormControlLabel value="debito" control={<Radio />} label="Cartão de Débito" />
            </RadioGroup>

            {(pagamento === 'credito' || pagamento === 'debito') && (
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 2 }}>
                <input
                  type="text"
                  placeholder="Número do Cartão"
                  value={formatarComMascara(numeroCartao, MASCARA_CARTAO)}
                  onChange={(e) => setNumeroCartao(e.target.value)}
                  style={{ padding: 10, borderRadius: 6, border: '1px solid #ccc' }}
                />
                <Box sx={{ display: 'flex', gap: 2 }}>
                  <input
                    type="text"
                    placeholder="Validade (MM/AA)"
                    value={formatarComMascara(validade, MASCARA_VALIDADE)}
                    onChange={(e) => setValidade(e.target.value)}
                    style={{ flex: 1, padding: 10, borderRadius: 6, border: '1px solid #ccc' }}
                  />
                  <input
                    type="text"
                    placeholder="CVV"
                    value={formatarComMascara(cvv, MASCARA_CVV)}
                    onChange={(e) => setCvv(e.target.value)}
                    style={{ flex: 1, padding: 10, borderRadius: 6, border: '1px solid #ccc' }}
                  />
                </Box>
              </Box>
            )}

            {pagamento === 'pix' && (
              <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
                Você receberá um QR Code para pagamento via PIX.
              </Typography>
            )}
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setFinalizarAberto(false)} color="error">Cancelar</Button>
          <Button variant="contained" sx={{ backgroundColor: '#003566' }} onClick={confirmarCompra}>
            {carregando ? 'Processando...' : 'Confirmar Compra'}
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={finalizado} onClose={() => setFinalizado(false)}>
        <DialogContent sx={{ textAlign: 'center', p: 4 }}>
          <Box
            sx={{
              position: 'relative',
              width: 80,
              height: 80,
              margin: '0 auto',
            }}
          >
            <CircularProgress
              size={80}
              thickness={4}
              sx={{
                color: '#28a745',
                position: 'absolute',
                top: 0,
                left: 0,
              }}
            />
            <CheckCircleIcon
              sx={{
                fontSize: 60,
                color: '#28a745',
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
              }}
            />
          </Box>
          <Typography variant="h6" fontWeight="bold" sx={{ mt: 2 }}>
            Compra Finalizada com Sucesso!
          </Typography>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default Header;
