import React, { useState, useEffect, useRef } from 'react';
import { OralProLogo } from './OralProLogo';
import { PageView } from '../types';
import { useLanguage } from '../i18n/LanguageContext';
import { LanguageSelector } from './LanguageSelector';
import { Calendar, Menu, X, ChevronRight, ShieldCheck } from 'lucide-react';

interface NavbarProps {
  currentPage: PageView;
  onNavigate: (page: PageView) => void;
  onOpenBooking: () => void;
  onOpenChat?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentPage,
  onNavigate,
  onOpenBooking,
}) => {
  const { t } = useLanguage();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const toggleButtonRef = useRef<HTMLButtonElement>(null);

  // Close mobile menu on Esc key or click outside
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && mobileMenuOpen) {
        setMobileMenuOpen(false);
        toggleButtonRef.current?.focus();
      }
    };

    const handleClickOutside = (e: MouseEvent) => {
      if (
        mobileMenuOpen &&
        mobileMenuRef.current &&
        !mobileMenuRef.current.contains(e.target as Node) &&
        toggleButtonRef.current &&
        !toggleButtonRef.current.contains(e.target as Node)
      ) {
        setMobileMenuOpen(false);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [mobileMenuOpen]);

  const handleNavClick = (page: PageView) => {
    onNavigate(page);
    setMobileMenuOpen(false);
  };

  const navItems: { page: PageView; label: string }[] = [
    { page: 'home', label: t.nav.home },
    { page: 'servicos', label: t.nav.services },
    { page: 'metodo', label: t.nav.method },
    { page: 'areas', label: t.nav.areas },
    { page: 'sobre', label: t.nav.about },
    { page: 'duvidas', label: t.nav.faq },
    { page: 'contactos', label: t.nav.contact },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-slate-200/90 shadow-xs transition-colors w-full">
      <div className="w-full max-w-full px-4 sm:px-6 lg:px-8 xl:px-10 h-20 sm:h-22 lg:h-24 flex items-center justify-between gap-2 sm:gap-3 lg:gap-4">
        {/* ========================================================= */}
        {/* AREA 1: LOGÓTIPO À ESQUERDA */}
        {/* ========================================================= */}
        <div className="flex items-center shrink-0">
          <button
            type="button"
            onClick={() => handleNavClick('home')}
            className="group text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 rounded-xl p-0.5 transition-opacity hover:opacity-90 cursor-pointer flex items-center shrink-0"
            aria-label="OralPro - Página Inicial"
          >
            <OralProLogo size="header" />
          </button>
        </div>

        {/* ========================================================= */}
        {/* AREA 2: NAVEGAÇÃO PRINCIPAL AO CENTRO (DESKTOP) */}
        {/* ========================================================= */}
        <nav
          className="hidden lg:flex items-center justify-center gap-1 xl:gap-2.5 2xl:gap-3.5 font-medium"
          aria-label="Navegação Principal"
        >
          {navItems.map((item) => {
            const isActive = currentPage === item.page;
            return (
              <button
                key={item.page}
                type="button"
                onClick={() => handleNavClick(item.page)}
                className={`relative py-2 px-2 xl:px-3 2xl:px-3.5 transition-colors cursor-pointer text-[15px] xl:text-[16.5px] 2xl:text-[18px] tracking-tight whitespace-nowrap focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 rounded-xl ${
                  isActive
                    ? 'text-blue-600 font-bold'
                    : 'text-slate-700 hover:text-blue-600 font-semibold'
                }`}
              >
                <span>{item.label}</span>
                {isActive && (
                  <span
                    aria-hidden="true"
                    className="absolute -bottom-1.5 left-2 right-2 h-1 bg-blue-600 rounded-full shadow-xs"
                  />
                )}
              </button>
            );
          })}
        </nav>

        {/* ========================================================= */}
        {/* AREA 3: CONTROLOS À DIREITA (ADMIN, IDIOMA & AGENDAMENTO) */}
        {/* ========================================================= */}
        <div className="flex items-center gap-1.5 sm:gap-2 lg:gap-2.5 shrink-0">
          {/* Botão Admin Provisório - Visível no topo em tablets/desktop (sm: >= 640px) */}
          <button
            type="button"
            onClick={() => onNavigate('admin')}
            className={`hidden sm:inline-flex animate-orange-pulse items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-xl transition-all cursor-pointer border shrink-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 shadow-xs ${
              currentPage === 'admin'
                ? 'bg-orange-600 text-white border-orange-700 ring-2 ring-orange-300'
                : 'bg-orange-500 hover:bg-orange-600 active:bg-orange-700 text-white border-orange-600 hover:border-orange-700'
            }`}
            title="Botão Admin provisório"
            aria-label="Botão Admin provisório"
          >
            <ShieldCheck className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white shrink-0" />
            <div className="flex flex-col text-left justify-center leading-none">
              <span className="text-[10.5px] sm:text-[11.5px] font-bold text-white tracking-tight whitespace-nowrap">
                Botão Admin
              </span>
              <span className="text-[8px] sm:text-[9px] font-medium text-orange-100 tracking-wider lowercase whitespace-nowrap mt-0.5">
                provisório
              </span>
            </div>
          </button>

          {/* Seletor de Idioma no Cabeçalho (Mobile, Tablet e Desktop) */}
          <div className="shrink-0">
            <LanguageSelector variant="dropdown" />
          </div>

          {/* Botão Principal para Agendar Reunião - 100% visível, nunca cortado */}
          <button
            type="button"
            onClick={onOpenBooking}
            className={`inline-flex items-center gap-1.5 sm:gap-2 font-bold text-xs sm:text-xs xl:text-sm px-2.5 sm:px-3.5 xl:px-4 py-2 xl:py-2.5 min-h-[38px] sm:min-h-[40px] rounded-xl shadow-xs transition-all whitespace-nowrap shrink-0 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2 ${
              currentPage === 'agendamento'
                ? 'bg-blue-700 text-white ring-2 ring-blue-300'
                : 'bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white'
            }`}
            title={t.common.scheduleMeeting}
          >
            <Calendar className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" />
            <span className="hidden sm:inline">{t.common.scheduleMeeting}</span>
            <span className="sm:hidden font-bold">Agendar</span>
          </button>

          {/* Botão de Menu (Apenas Mobile e Tablet < 1024px; Oculto em Desktop) */}
          <button
            ref={toggleButtonRef}
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden min-w-[38px] sm:min-w-[40px] min-h-[38px] sm:min-h-[40px] h-9.5 sm:h-10 px-2 sm:px-2.5 flex items-center justify-center rounded-xl bg-slate-100 hover:bg-slate-200 active:bg-slate-300 text-slate-800 transition-colors shrink-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 cursor-pointer shadow-2xs border border-slate-200/90"
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-navigation-menu"
            aria-label={mobileMenuOpen ? 'Fechar menu de navegação' : 'Abrir menu de navegação'}
          >
            {mobileMenuOpen ? <X className="w-5 h-5 text-slate-900" /> : <Menu className="w-5 h-5 text-slate-900" />}
          </button>
        </div>
      </div>

      {/* ========================================================= */}
      {/* 100% FULL-SCREEN ADJUSTED & RESPONSIVE MENU MODAL */}
      {/* ========================================================= */}
      {mobileMenuOpen && (
        <div
          id="mobile-navigation-menu"
          ref={mobileMenuRef}
          role="dialog"
          aria-modal="true"
          aria-label="Menu Principal de Navegação"
          className="fixed inset-0 w-full h-full bg-white z-[60] flex flex-col overflow-hidden animate-in fade-in duration-200"
        >
          {/* Top Bar: 100% width with Logo and Close */}
          <div className="w-full px-4 sm:px-6 lg:px-10 xl:px-12 py-3.5 sm:py-4 border-b border-slate-200 bg-white flex items-center justify-between shrink-0 shadow-2xs">
            <div className="flex items-center gap-3">
              <OralProLogo size="header" />
            </div>

            <div className="flex items-center gap-2 sm:gap-3">
              <button
                type="button"
                onClick={() => setMobileMenuOpen(false)}
                className="inline-flex items-center gap-2 px-3.5 py-2 sm:px-4 sm:py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 active:bg-slate-300 text-slate-800 transition-colors cursor-pointer border border-slate-200 text-xs sm:text-sm font-bold shadow-2xs focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600"
                aria-label="Fechar menu de navegação"
              >
                <X className="w-5 h-5 text-slate-900" />
                <span className="hidden sm:inline">Fechar Menu</span>
              </button>
            </div>
          </div>

          {/* Scrollable Content Container - 100% Screen Responsive Layout */}
          <div className="flex-1 overflow-y-auto px-4 sm:px-6 lg:px-10 xl:px-12 py-6 sm:py-8 lg:py-10 overscroll-contain bg-slate-50/50">
            <div className="w-full max-w-7xl mx-auto">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
                {/* Left Column (Desktop: 4 cols) - Priority Action Cards */}
                <div className="lg:col-span-5 xl:col-span-4 space-y-4">
                  {/* Botão Admin Provisório */}
                  <button
                    type="button"
                    onClick={() => handleNavClick('admin')}
                    className={`animate-orange-pulse w-full p-4 rounded-2xl transition-all cursor-pointer flex items-center justify-between text-left border shadow-xs ${
                      currentPage === 'admin'
                        ? 'bg-orange-600 text-white border-orange-700 ring-2 ring-orange-300'
                        : 'bg-orange-500 hover:bg-orange-600 active:bg-orange-700 text-white border-orange-600'
                    }`}
                    title="Botão Admin provisório"
                    aria-label="Botão Admin provisório"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center shrink-0">
                        <ShieldCheck className="w-6 h-6 text-white shrink-0" />
                      </div>
                      <div className="flex flex-col">
                        <span className="text-base font-bold text-white tracking-tight leading-tight">
                          Botão Admin
                        </span>
                        <span className="text-xs font-medium text-orange-100 tracking-wider lowercase leading-tight">
                          provisório
                        </span>
                      </div>
                    </div>
                    <span className="text-xs font-bold px-3 py-1.5 rounded-lg bg-white/20 text-white border border-white/30 whitespace-nowrap">
                      Acesso Restrito
                    </span>
                  </button>

                  {/* Botão de Agendamento Completo */}
                  <button
                    type="button"
                    onClick={() => {
                      setMobileMenuOpen(false);
                      onOpenBooking();
                    }}
                    className="w-full py-4 px-4 rounded-2xl bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-bold text-sm sm:text-base shadow-sm shadow-blue-600/20 transition-all flex items-center justify-center gap-3 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600"
                  >
                    <Calendar className="w-5 h-5 shrink-0" />
                    <span>{t.common.scheduleMeeting}</span>
                  </button>

                  {/* Seletor de Idioma Completo no Menu */}
                  <div className="p-4 bg-white rounded-2xl border border-slate-200 shadow-xs">
                    <LanguageSelector variant="mobile" />
                  </div>
                </div>

                {/* Right Column (Desktop: 7-8 cols) - Navigation Cards */}
                <div className="lg:col-span-7 xl:col-span-8 space-y-3">
                  <div className="flex items-center justify-between px-1">
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block">
                      Navegação
                    </span>
                    <span className="text-xs text-slate-400 hidden sm:inline">
                      Selecione uma área para navegar
                    </span>
                  </div>

                  <nav
                    className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3"
                    aria-label="Links do Menu"
                  >
                    {navItems.map((item) => {
                      const isActive = currentPage === item.page;
                      return (
                        <button
                          key={item.page}
                          type="button"
                          onClick={() => handleNavClick(item.page)}
                          className={`w-full p-4 rounded-2xl transition-all cursor-pointer flex items-center justify-between text-left border ${
                            isActive
                              ? 'text-blue-600 bg-blue-50/90 font-bold border-blue-200 shadow-xs'
                              : 'text-slate-800 bg-white hover:text-blue-600 hover:bg-blue-50/40 hover:border-blue-200 border-slate-200 shadow-2xs'
                          }`}
                        >
                          <div className="flex flex-col pr-2">
                            <span className="text-base font-bold">{item.label}</span>
                            <span className="text-xs text-slate-500 font-normal mt-0.5">
                              {item.page === 'home' && 'Página inicial da OralPro'}
                              {item.page === 'servicos' && 'Marketing e captação de pacientes'}
                              {item.page === 'metodo' && 'Metodologia comercial em 4 etapas'}
                              {item.page === 'areas' && 'Implantes, ortodontia e estética'}
                              {item.page === 'sobre' && 'Nossa história e liderança'}
                              {item.page === 'duvidas' && 'Perguntas frequentes e suporte'}
                              {item.page === 'contactos' && 'Localização e canais de contacto'}
                            </span>
                          </div>
                          <div
                            className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 transition-colors ${
                              isActive ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-400 group-hover:bg-blue-100 group-hover:text-blue-600'
                            }`}
                          >
                            <ChevronRight className="w-4 h-4" />
                          </div>
                        </button>
                      );
                    })}
                  </nav>
                </div>
              </div>
            </div>
          </div>

          {/* Footer do Menu 100% Largura */}
          <div className="w-full px-4 sm:px-6 lg:px-10 xl:px-12 py-3 bg-white border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 shrink-0 gap-2">
            <span className="font-medium">OralPro · Marketing & Estratégia Odontológica</span>
            <span className="text-slate-400 text-[11px]">Especialistas em captação de pacientes de alto valor</span>
          </div>
        </div>
      )}
    </header>
  );
};
