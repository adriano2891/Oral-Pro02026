import { Language } from '../types';

export function getOralProAssistantReply(
  message: string,
  userName?: string,
  language: Language = 'pt'
): { reply: string; detectedLanguage?: Language } {
  const lower = message.trim().toLowerCase();
  const name = userName ? userName.trim() : '';

  // Language switch detection
  if (
    lower.includes('speak english') ||
    lower.includes('in english') ||
    lower.includes('can we talk in english')
  ) {
    return {
      reply: name
        ? `Hello ${name}! It is a pleasure. I have switched our conversation to English. How can OralPro assist your dental practice today?`
        : 'Hello! I have switched our conversation to English. How can OralPro assist your dental practice today?',
      detectedLanguage: 'en',
    };
  }

  if (
    lower.includes('parla italiano') ||
    lower.includes('in italiano') ||
    lower.includes('parliamo in italiano')
  ) {
    return {
      reply: name
        ? `Piacere ${name}! Ho impostato la lingua in italiano. In che modo OralPro può aiutare il tuo studio dentistico oggi?`
        : 'Ciao! Ho impostato la lingua in italiano. In che modo OralPro può aiutare il tuo studio dentistico oggi?',
      detectedLanguage: 'it',
    };
  }

  if (
    lower.includes('falar português') ||
    lower.includes('em português') ||
    lower.includes('falemos em português')
  ) {
    return {
      reply: name
        ? `Olá ${name}! Com todo o gosto, passamos a conversar em português. Em que posso ajudar a sua clínica hoje?`
        : 'Olá! Com todo o gosto, passamos a conversar em português. Em que posso ajudar a sua clínica hoje?',
      detectedLanguage: 'pt',
    };
  }

  // ENGLISH REPLIES
  if (language === 'en') {
    if (lower.includes('implant') || lower.includes('implantology')) {
      return {
        reply:
          'Implantology is one of our primary specialties at OralPro. We help dental practices attract and convert candidates seeking full-arch fixed restorations and complex cases, moving away from low-price shoppers. Does your clinic currently perform surgical placements on a regular basis?',
      };
    }
    if (lower.includes('ortho') || lower.includes('aligner') || lower.includes('invisalign')) {
      return {
        reply:
          'Clear aligners and digital orthodontics represent a significant opportunity for treatment acceptance and patient lifetime value. We develop dedicated patient journeys for aligners. How is your clinic currently handling orthodontic inquiries?',
      };
    }
    if (lower.includes('method') || lower.includes('how it works') || lower.includes('steps')) {
      return {
        reply:
          'The OralPro Method consists of 4 validated stages: 1. Target Attraction (high-value treatments); 2. Qualification & Screening (filtering tire-kickers); 3. Reception & Team Scripting (securing confirmed appointments); 4. Scalable Growth. Would you like to focus on patient acquisition or reception conversion first?',
      };
    }
    if (
      lower.includes('book') ||
      lower.includes('schedule') ||
      lower.includes('meeting') ||
      lower.includes('appointment') ||
      lower.includes('hour') ||
      lower.includes('time') ||
      lower.includes('calendar')
    ) {
      return {
        reply:
          'Our strategic diagnostic sessions are held online in Lisbon Time (Europe/Lisbon, UTC+1). You can choose your preferred date and time directly using the "Schedule Meeting" button or via the calendar on this page!',
      };
    }
    if (lower.includes('price') || lower.includes('cost') || lower.includes('fee') || lower.includes('how much')) {
      return {
        reply:
          'OralPro programs are customized to the operational capacity of your practice (number of chairs, clinical team, and target revenue). Exact figures are confirmed during an initial diagnostic session with our leadership team. Would you like to book a 30-minute diagnosis in Lisbon Time?',
      };
    }
    if (lower.includes('lead') || lower.includes('ad') || lower.includes('patient') || lower.includes('marketing')) {
      return {
        reply:
          'Many practices experience leads that fail to show up or complain about prices. Our methodology combines targeted clinical marketing with specialized training for your front-desk team so inquiries actually show up for their first consultation.',
      };
    }
    return {
      reply: name
        ? `Pleasure to assist you, ${name}. We help dental practices attract high-value patients and structure a predictable commercial system. Would you like to explore our clinical services or discuss your clinic's specific goals?`
        : 'Hello! I am the OralPro virtual assistant. We specialize in patient acquisition for dental practices in Implantology, Orthodontics, and Aesthetics. How may I assist your clinic today?',
    };
  }

  // ITALIAN REPLIES
  if (language === 'it') {
    if (lower.includes('impiant') || lower.includes('implantologia')) {
      return {
        reply:
          'L’implantologia è una delle nostre branche di maggior successo. Aiutiamo lo studio dentistico ad attrarre pazienti motivati per riabilitazioni fisse complete e chirurgia avanzata, allontanando chi cerca solo il prezzo più basso. Nel vostro studio eseguite regolarmente interventi implantari?',
      };
    }
    if (lower.includes('ortodon') || lower.includes('allineator') || lower.includes('invisalign')) {
      return {
        reply:
          'Gli allineatori trasparenti e l’ortodonzia invisibile offrono un valore elevato per lo studio. Creiamo percorsi di attrazione dedicati per intercettare pazienti adulti motivati. Come gestite attualmente le richieste per ortodonzia invisibile?',
      };
    }
    if (lower.includes('metodo') || lower.includes('come funziona') || lower.includes('fasi')) {
      return {
        reply:
          'Il Metodo OralPro si articola in 4 fasi: 1. Attrazione mirata di trattamenti ad alto valore; 2. Pre-qualifica e screening dei contatti; 3. Formazione e script per la segreteria clinica; 4. Scalabilità e previsione del fatturato. Vorresti approfondire la fase di attrazione o la conversione in segreteria?',
      };
    }
    if (
      lower.includes('prenot') ||
      lower.includes('appuntament') ||
      lower.includes('incontro') ||
      lower.includes('orari') ||
      lower.includes('calendario')
    ) {
      return {
        reply:
          'Le nostre sessioni di diagnosi strategica si tengono online in Orario di Lisbona (Europe/Lisbon, UTC+1). Puoi prenotare il giorno e l’ora preferiti direttamente cliccando su "Agendar reunião" o nel calendario interattivo della pagina!',
      };
    }
    if (lower.includes('prezzo') || lower.includes('costo') || lower.includes('tariffa') || lower.includes('quanto costa')) {
      return {
        reply:
          'I programmi OralPro sono dimensionati sulla capacità dello studio (numero di riuniti e medici). La proposta economica viene definita in modo trasparente dopo una prima diagnosi strategica individuale. Vorresti verificare le disponibilità in Orario di Lisbona?',
      };
    }
    if (lower.includes('pazient') || lower.includes('lead') || lower.includes('contatt') || lower.includes('marketing')) {
      return {
        reply:
          'Capita a molti studi di ricevere contatti poco qualificati che poi non si presentano alla prima visita. Con il nostro metodo uniamo marketing sanitario etico e protocolli di accoglienza per la segreteria, garantendo pazienti realmente interessati alle cure.',
      };
    }
    return {
      reply: name
        ? `Piacere di conoscerti, ${name}. Aiutiamo gli studi dentistici ad attrarre pazienti alto-spendenti e a organizzare la segreteria per massimizzare le prime visite. Vuoi conoscere i nostri servizi o hai un obiettivo specifico per il tuo studio?`
        : 'Ciao! Sono l’assistente virtuale di OralPro. Supportiamo i titolari di studi dentistici in Implantologia, Ortodonzia ed Estetica. In che modo posso aiutarti oggi?',
    };
  }

  // PORTUGUESE REPLIES (Default)
  if (lower.includes('implante') || lower.includes('implantologia') || lower.includes('reabilitação')) {
    return {
      reply:
        'A Implantologia é uma das nossas três áreas de maior especialização. Ajudamos a clínica a atrair pacientes que valorizam reabilitações completas e fixas (All-on-4, All-on-6 e unitários complexos), afastando quem procura apenas o preço mais baixo. Na sua clínica, já realizam cirurgias regularmente ou pretendem aumentar o volume de pacientes cirúrgicos?',
    };
  }

  if (lower.includes('ortodontia') || lower.includes('alinhador') || lower.includes('invisalign')) {
    return {
      reply:
        'A Ortodontia Digital e os Alinhadores Invisíveis são fundamentais para o ticket médio e fidelização de pacientes adultos. Criamos funis de qualificação clínica específicos para garantir que os pacientes chegam informados sobre o valor do tratamento. Qual é hoje o maior desafio da sua clínica nesta área?',
    };
  }

  if (lower.includes('estética') || lower.includes('facetas') || lower.includes('lentes')) {
    return {
      reply:
        'A Estética Dentária (facetas de cerâmica, lentes de contacto e harmonização do sorriso) atrai pacientes que decidem por confiança e qualidade. Estruturamos campanhas com foco em resultados reais e casos clínicos. Gostaria de saber como posicionar a sua clínica como referência estética na sua região?',
    };
  }

  if (lower.includes('método') || lower.includes('metodo') || lower.includes('como funciona') || lower.includes('etapas')) {
    return {
      reply:
        'O Método OralPro funciona em 4 etapas consolidadas: 1. Atração cirúrgica de pacientes de alto valor; 2. Triagem e qualificação prévia (eliminando curiosos); 3. Roteiro comercial e formação para a receção/secretárias; 4. Previsibilidade e escala de faturação da clínica. Gostaria de focar primeiro na captação ou na conversão interna?',
    };
  }

  if (
    lower.includes('horário') ||
    lower.includes('horario') ||
    lower.includes('agendar') ||
    lower.includes('reunião') ||
    lower.includes('reuniao') ||
    lower.includes('marcação') ||
    lower.includes('marcacao') ||
    lower.includes('lisboa') ||
    lower.includes('calendário') ||
    lower.includes('calendario')
  ) {
    return {
      reply:
        'As nossas reuniões de diagnóstico realizam-se online no Horário de Lisboa (Europe/Lisbon, UTC+1). A sessão dura cerca de 30 minutos com a nossa equipa estratégica. Pode escolher o dia e hora de forma imediata clicando no botão "Agendar reunião" aqui no chat ou na página!',
    };
  }

  if (
    lower.includes('preço') ||
    lower.includes('preco') ||
    lower.includes('custo') ||
    lower.includes('quanto custa') ||
    lower.includes('valor') ||
    lower.includes('investimento')
  ) {
    return {
      reply:
        'Os programas da OralPro são ajustados à capacidade instalada da clínica (número de gabinetes dentários, corpo clínico e metas de faturação). Esse detalhe é confirmado com total clareza numa reunião de diagnóstico inicial sem compromisso. Gostaria de verificar horários livres no Horário de Lisboa?',
    };
  }

  if (
    lower.includes('leads') ||
    lower.includes('anúncio') ||
    lower.includes('anuncio') ||
    lower.includes('contacto') ||
    lower.includes('não avançam') ||
    lower.includes('curiosos')
  ) {
    return {
      reply:
        'Percebo perfeitamente. A queixa mais comum dos médicos dentistas é receber "leads de curiosos" que nunca chegam a marcar ou faltam à primeira consulta. O nosso método filtra e qualifica esses contactos antes de chegarem à sua equipa. Como é feito hoje o primeiro contacto com os novos pacientes na sua clínica?',
    };
  }

  if (lower.includes('mario') || lower.includes('provenzano') || lower.includes('quem é') || lower.includes('equipa')) {
    return {
      reply:
        'A OralPro é liderada por Mario Provenzano, com presença consolidada no Instagram (@oralpro.italia) e atuação direta com centenas de médicos dentistas e clínicas em Itália e Portugal, focada no crescimento comercial ético de clínicas dentárias.',
    };
  }

  return {
    reply: name
      ? `Prazer, ${name}. Ajudamos clínicas dentárias a captar pacientes de alto valor (Implantologia, Ortodontia e Estética) e a estruturar o processo comercial da clínica. Gostaria de conhecer os nossos serviços ou já tem alguma necessidade em mente para a sua clínica?`
      : 'Olá! Sou o assistente virtual da OralPro. Ajudamos clínicas dentárias a captar pacientes de alto valor e a estruturar o processo comercial da clínica. Gostaria de conhecer a nossa metodologia ou já tem alguma necessidade específica para a sua clínica?',
  };
}
