// Aguarda o DOM carregar completamente
document.addEventListener('DOMContentLoaded', () => {

    // --- GERENCIAMENTO DE MENU MOBILE (HAMBÚRGUER) ---
    const menuBtn = document.getElementById('menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');

    menuBtn.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
        // Alterna o ícone de hambúrguer para fechar (X)
        const icon = menuBtn.querySelector('i');
        icon.classList.toggle('fa-bars');
        icon.classList.toggle('fa-xmark');
    });

    // Fecha o menu mobile ao clicar em algum link interno
    const mobileLinks = mobileMenu.querySelectorAll('a');
    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.add('hidden');
            const icon = menuBtn.querySelector('i');
            icon.classList.add('fa-bars');
            icon.classList.remove('fa-xmark');
        });
    });


    // --- IMPLEMENTAÇÃO DE DARK MODE ---
    const themeToggleBtn = document.getElementById('theme-toggle');
    const themeToggleMobileBtn = document.getElementById('theme-toggle-mobile');
    const themeIcon = document.getElementById('theme-icon');
    const themeIconMobile = document.getElementById('theme-icon-mobile');

    // Função para alterar e salvar o estado do tema
    function toggleDarkMode() {
        if (document.documentElement.classList.contains('dark')) {
            document.documentElement.classList.remove('dark');
            localStorage.setItem('theme', 'light');
            updateIcons(false);
        } else {
            document.documentElement.classList.add('dark');
            localStorage.setItem('theme', 'dark');
            updateIcons(true);
        }
    }

    // Função para atualizar os ícones visuais (Lua / Sol)
    function updateIcons(isDark) {
        if (isDark) {
            themeIcon.className = 'fa-solid fa-sun text-yellow-400 text-lg';
            themeIconMobile.className = 'fa-solid fa-sun text-yellow-400 text-lg';
        } else {
            themeIcon.className = 'fa-solid fa-moon text-lg';
            themeIconMobile.className = 'fa-solid fa-moon text-lg';
        }
    }

    // Ouvintes de evento de click para os botões de tema (Desktop e Mobile)
    themeToggleBtn.addEventListener('click', toggleDarkMode);
    themeToggleMobileBtn.addEventListener('click', toggleDarkMode);

    // Checagem inicial do tema baseado na memória local ou do sistema operacional
    if (localStorage.getItem('theme') === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
        document.documentElement.classList.add('dark');
        updateIcons(true);
    } else {
        document.documentElement.classList.remove('dark');
        updateIcons(false);
    }


    // --- FEEDBACK VISUAL NOS BOTÕES DE COMPRA ---
    const compraButtons = document.querySelectorAll('#produtos button');
    compraButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            const originalText = button.innerText;
            button.innerText = 'Adicionado! ✓';
            button.classList.remove('bg-slate-900', 'dark:bg-blue-600');
            button.classList.add('bg-emerald-600');

            // Retorna ao estado original após 2 segundos (Simulando adição ao carrinho via API)
            setTimeout(() => {
                button.innerText = originalText;
                button.classList.add('bg-slate-900', 'dark:bg-blue-600');
                button.classList.remove('bg-emerald-600');
            }, 2000);
        });
    });
});