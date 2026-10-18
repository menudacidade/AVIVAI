/**
 * 2º Retiro Avivai - Script Principal
 */

// ==========================================
// CONFIGURAÇÃO DO WHATSAPP
// ==========================================
const WHATSAPP_NUMBER = "554298604899"; 

// ==========================================
// 1. Menu Mobile (Hambúrguer)
// ==========================================
const menuToggle = document.getElementById('menu-toggle');
const navMenu = document.getElementById('nav-menu');

if (menuToggle && navMenu) {
    menuToggle.addEventListener('click', () => {
        const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';
        menuToggle.setAttribute('aria-expanded', !isExpanded);
        navMenu.classList.toggle('active');
    });

    document.querySelectorAll('nav a').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            menuToggle.setAttribute('aria-expanded', 'false');
        });
    });
}

// ==========================================
// 2. Header fixo com fundo ao rolar
// ==========================================
const header = document.getElementById('header');
if (header) {
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
}

// ==========================================
// 3. Carrossel Infinito
// ==========================================
const track = document.getElementById('carrossel-track');
const btnPausar = document.getElementById('btn-pausar');
let isPaused = false;

if (track && btnPausar) {
    function setupCarrossel() {
        const cards = Array.from(track.children);
        cards.forEach(card => {
            const clone = card.cloneNode(true);
            clone.setAttribute('aria-hidden', 'true'); 
            track.appendChild(clone);
        });
    }

    window.addEventListener('load', setupCarrossel);

    btnPausar.addEventListener('click', () => {
        isPaused = !isPaused;
        if (isPaused) {
            track.classList.add('pausado');
            btnPausar.textContent = 'Retomar';
        } else {
            track.classList.remove('pausado');
            btnPausar.textContent = 'Pausar';
        }
    });

    track.addEventListener('mouseenter', () => {
        if (!isPaused) track.classList.add('pausado');
    });
    track.addEventListener('mouseleave', () => {
        if (!isPaused) track.classList.remove('pausado');
    });

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (prefersReducedMotion.matches) {
        track.classList.add('pausado');
        btnPausar.style.display = 'none'; 
    }
}

// ==========================================
// 4. Lightbox (Visualizador de Imagens)
// ==========================================
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const lightboxClose = document.getElementById('lightbox-close');

if (lightbox && lightboxImg && lightboxClose) {
    document.querySelectorAll('.carrossel-card img').forEach(img => {
        img.addEventListener('click', (e) => {
            lightboxImg.src = e.target.src;
            lightboxImg.alt = e.target.alt;
            lightbox.classList.add('active');
            lightbox.setAttribute('aria-hidden', 'false');
            document.body.style.overflow = 'hidden'; 
        });
    });

    function closeLightbox() {
        lightbox.classList.remove('active');
        lightbox.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
    }

    lightboxClose.addEventListener('click', closeLightbox);
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) closeLightbox(); 
    });
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && lightbox.classList.contains('active')) closeLightbox();
    });
}

// ==========================================
// 5. Formulário de Inscrição e WhatsApp
// ==========================================
const form = document.getElementById('form-inscricao');
const btnEnviar = document.getElementById('btn-enviar');
const footerWhatsapp = document.getElementById('footer-whatsapp');

if (form && btnEnviar) {
    function showError(inputId, message) {
        const input = document.getElementById(inputId);
        const errorSpan = document.getElementById(`error-${inputId}`);
        if (input) input.classList.add('invalid');
        if (errorSpan) {
            errorSpan.textContent = message;
            errorSpan.style.display = 'block';
        }
    }

    function clearError(inputId) {
        const input = document.getElementById(inputId);
        const errorSpan = document.getElementById(`error-${inputId}`);
        if (input) input.classList.remove('invalid');
        if (errorSpan) {
            errorSpan.style.display = 'none';
        }
    }

    form.querySelectorAll('input, select').forEach(input => {
        input.addEventListener('input', () => clearError(input.id));
        input.addEventListener('change', () => clearError(input.id));
    });

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        let isValid = true;
        const nome = document.getElementById('nome') ? document.getElementById('nome').value.trim() : '';
        const nascimento = document.getElementById('nascimento') ? document.getElementById('nascimento').value : '';
        const telefone = document.getElementById('telefone') ? document.getElementById('telefone').value.trim() : '';
        const cidade = document.getElementById('cidade') ? document.getElementById('cidade').value.trim() : '';
        const participou = document.getElementById('participou') ? document.getElementById('participou').value : '';
        const pagamento = document.getElementById('pagamento') ? document.getElementById('pagamento').value : '';
        const privacidade = document.getElementById('privacidade') ? document.getElementById('privacidade').checked : false;

        // Removida a validação do lote
        if (!nome) { showError('nome', 'Por favor, insira seu nome completo.'); isValid = false; }
        if (!nascimento) { showError('nascimento', 'Insira sua data de nascimento.'); isValid = false; }
        if (!telefone) { showError('telefone', 'Insira seu WhatsApp.'); isValid = false; }
        if (!cidade) { showError('cidade', 'Insira sua cidade.'); isValid = false; }
        if (!participou) { showError('participou', 'Selecione uma opção.'); isValid = false; }
        if (!pagamento) { showError('pagamento', 'Selecione a forma de pagamento.'); isValid = false; }
        if (!privacidade) { showError('privacidade', 'Você precisa concordar com o aviso.'); isValid = false; }

        if (!isValid) {
            const firstError = form.querySelector('.invalid');
            if (firstError) firstError.focus();
            return;
        }

        btnEnviar.disabled = true;
        btnEnviar.textContent = "Preparando mensagem...";

        const email = document.getElementById('email') ? document.getElementById('email').value.trim() : 'Não informado';
        const paroquia = document.getElementById('paroquia') ? document.getElementById('paroquia').value.trim() : 'Não informada';
        const observacoes = document.getElementById('observacoes') ? document.getElementById('observacoes').value.trim() : 'Nenhuma';

        // Mensagem atualizada (sem o lote)
        let mensagem = `*INSCRIÇÃO - 2º RETIRO AVIVAI* 🔥\n\n`;
        mensagem += `*Nome:* ${nome}\n`;
        if (nascimento) mensagem += `*Nascimento:* ${nascimento.split('-').reverse().join('/')}\n`;
        mensagem += `*WhatsApp:* ${telefone}\n`;
        mensagem += `*E-mail:* ${email || 'Não informado'}\n`;
        mensagem += `*Cidade:* ${cidade}\n`;
        mensagem += `*Paróquia:* ${paroquia || 'Não informada'}\n`;
        mensagem += `*Já participou de retiro?* ${participou}\n`;
        mensagem += `----------------------------------\n`;
        mensagem += `*Forma de Pagamento:* ${pagamento}\n`;
        mensagem += `----------------------------------\n`;
        mensagem += `*Observações:* ${observacoes || 'Nenhuma'}\n\n`;
        mensagem += `_Estou ciente de que a inscrição só será válida após a confirmação do pagamento. Aguardo as instruções!_`;

        const mensagemCodificada = encodeURIComponent(mensagem);
        const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${mensagemCodificada}`;

        window.open(url, '_blank');

        setTimeout(() => {
            btnEnviar.disabled = false;
            btnEnviar.textContent = "ENVIAR INSCRIÇÃO PELO WHATSAPP";
        }, 3000);
    });
}

if (footerWhatsapp) {
    footerWhatsapp.addEventListener('click', (e) => {
        e.preventDefault();
        window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=Olá! Gostaria de saber mais informações sobre o 2º Retiro Avivai.`, '_blank');
    });
}